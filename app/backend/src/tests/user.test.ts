import * as sinon from 'sinon';
import * as chai from 'chai';
import * as bcrypt from 'bcryptjs'
// @ts-ignore
import chaiHttp = require('chai-http');
import User from '../database/models/User';
import App from '../app';

import { Response } from 'superagent';

chai.use(chaiHttp);

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInBhc3N3b3JkIjoic2VjcmV0X2FkbWluIiwiaWF0IjoxNjY5OTM3MTA3LCJleHAiOjE2NzAwMjM1MDd9.iDQE2D_FLJlA6ILpnDRro01dC-Drc63kNOl57aZ8x18'

const { app } = new App();

const { expect } = chai;
describe('Testes user', () => {

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

  it('testa cadastro com dados errados', async () => {
    const response = await chai.request(app).post('/login').send({
      email: 'admin@admin.com', password: '11111',
    })

    expect(response.status).to.be.equal(401)
  });

  it('testa get', async () => {
    const response = await chai.request(app).get('/login/validate').set(
      'authorization', token
    )

    expect(response.status).to.be.equal(200)
  });
});
