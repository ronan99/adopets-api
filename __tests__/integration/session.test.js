const request = require('supertest');

const app = require("../../src/app")
const factory = require("../factories")

const truncate = require("../utils/truncate");

describe('Authentication' , () =>{
    beforeEach( async () => {
        await truncate();
    })
    it('It should authenticate with valid credentials' , async ()=>{
        const user = await factory.create("User", {
            password: "adopets"
        })

        const response = await request(app)
        .post('/sessions')
        .send({
            email : user.email,
            password: "adopets"
        })
        expect(response.status).toBe(200);
    })

    it("Should not authenticate with invalid credentials" , async ()=>{
        const user = await factory.create("User", {
            password: "adopets"
        })

        const response = await request(app)
        .post('/sessions')
        .send({
            email : user.email,
            password: "123455"
        })
        expect(response.status).toBe(401);
    })

    it("Should return JWT token when authenticated" , async ()=>{
        const user = await factory.create("User", {
            password: "adopets"
        })

        const response = await request(app)
        .post('/sessions')
        .send({
            email : user.email,
            password: "adopets"
        })
        expect(response.body).toHaveProperty("token");
    })

    it("Should be able to access private routes with JWT token" , async () => {
        const user = await factory.create("User", {
            password: "adopets"
        })

        const response = await request(app)
        .get('/products')
        .set('Authorization' , `Bearer ${user.generateToken()}`)
        expect(response.status).toBe(200);
    })

    it("Should not be able to access private routes without JWT token" , async () => {
        const user = await factory.create("User", {
            password: "adopets"
        })

        const response = await request(app)
        .get('/products');
        expect(response.status).toBe(401);
    })

    it("Should not be able to access private routes with invalid JWT token" , async () => {
        const user = await factory.create("User", {
            password: "adopets"
        })

        const response = await request(app)
        .get('/products')
        .set('Authorization' , `Bearer 123467`);
        expect(response.status).toBe(401);
    })
})
