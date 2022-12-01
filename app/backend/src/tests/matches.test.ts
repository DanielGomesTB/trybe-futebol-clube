import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Testes matches', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

  let chaiHttpResponse: Response;

  it('testa retorno da rota teams id', async () => {
    chaiHttpResponse = await chai
       .request(app).get('/matches')

    expect(chaiHttpResponse.ok).to.be.equal(true)
  });

  it('testa retorno da rota teams', async () => {
    const response = await chai.request(app).get('/matches?inProgress=true')

    expect(response.status).to.be.equal(200)
  });
});
