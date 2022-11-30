import * as sinon from 'sinon';
import * as chai from 'chai';
import * as bcrypt from 'bcryptjs'
// @ts-ignore
import chaiHttp = require('chai-http');
import User from '../database/models/User';
import App from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;
// const mochUser = {
//   id: 1, 
//   username: 'Jhonson',
//   role: 'admin',
//   email: 'jhonson@admin.com',
//   password: 'jhonsonadmin',
// }

// const mochLogin = {
//   email: 'jhonson@admin.com',
//   password: 'jhonsonadmin',
// }

describe('Testes user', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

  //  let chaiHttpResponse: Response;

  // beforeEach(async () => {
  //   sinon
  //     .stub(User, "findOne")
  //     .resolves(mochUser as User);
  // });

  // afterEach(sinon.restore)


  // it('teste validade true', async () => {
  //   sinon.stub(bcrypt, 'compareSync').returns(true)
  //   chaiHttpResponse = await chai
  //      .request(app).post('/login').send(mochLogin)

  //   expect(chaiHttpResponse.ok).to.be.equal(true)
  // });

  // it('teste validade false', async () => {
  //   sinon.stub(bcrypt, 'compareSync').returns(false)
  //   chaiHttpResponse = await chai
  //      .request(app).post('/login').send({
  //       email: mochLogin.email,
  //       password: '11111111111',
  //     })

  //   expect(chaiHttpResponse.status).to.be.equal(401)
  // });

  it('testa cadastro com dados corretos', async () => {
    const response = await chai.request(app).post('/login').send({
      email: 'admin@admin.com', password: 'secret_admin',
    })

    expect(response.status).to.be.equal(200)
  });

  it('testa cadastro sem dados', async () => {
    const response = await chai.request(app).post('/login').send({
      email: '', password: '',
    })

    expect(response.status).to.be.equal(400)
  });
});
