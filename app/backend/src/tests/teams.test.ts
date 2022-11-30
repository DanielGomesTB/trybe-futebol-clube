import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import Team from '../database/models/Team';

import App from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

const retornoTeamsId = {
    "id": 1,
    "teamName": "Avaí/Kindermann"
  }


describe('Testes teams', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Team, "findOne")
      .resolves({
        ...retornoTeamsId
      } as Team);
  });

  after(()=>{
    (Team.findOne as sinon.SinonStub).restore();
  })

  it('testa retorno da rota teams id', async () => {
    chaiHttpResponse = await chai
       .request(app).get('/teams/1')

    expect(chaiHttpResponse.ok).to.be.equal(true)
    expect(chaiHttpResponse.body).to.deep.equal(retornoTeamsId)
  });

  it('testa retorno da rota teams', async () => {
    const response = await chai.request(app).get('/teams')

    expect(response.status).to.be.equal(200)
  });
});
