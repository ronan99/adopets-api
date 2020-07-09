const request = require('supertest');
const {Session} = require("../../src/app/models")
const app = require("../../src/app")
const factory = require("../factories")

const truncate = require("../utils/truncate");

describe('Login' , () =>{
    beforeEach( async () => {
        await truncate();
    })
    it('It should authenticate with valid credentials' , async ()=>{
        const user = await factory.create("User", {
            password: "adopets"
        })

        const response = await request(app)
        .post('/login')
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
        .post('/login')
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
        .post('/login')
        .send({
            email : user.email,
            password: "adopets"
        })
        expect(response.body).toHaveProperty("token");
    })
    it("Should logout when authenticated" , async ()=>{
        const user = await factory.create("User", {
            password: "adopets"
        })

        const userToken =  `${user.generateToken()}`;
        const session = await Session.create({
            user_id : user.id,
            token : userToken
        })
        const response = await request(app)
        .post('/logout')
        .send({
            user_id : user.id,
        })
        expect(response.status).toBe(200);
    })
})
