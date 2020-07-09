const request = require('supertest');
const {Session} = require("../../src/app/models")
const app = require("../../src/app")
const factory = require("../factories")

const truncate = require("../utils/truncate");

describe('Products' , () =>{
    beforeEach( async () => {
        await truncate();
    })

    it("Should be able to access private routes with JWT token" , async () => {
        const user = await factory.create("User", {
            password: "adopets"
        })

        const userToken =  `${user.generateToken()}`;
        const session = await Session.create({
            user_id : user.id,
            token : userToken
        })

        

        const response = await request(app)
        .get('/products')
        .set('Authorization' , 'Bearer ' + userToken )
        expect(response.status).toBe(200);
        
    })

    it("Should not be able to access private routes without JWT token" , async () => {

        const response = await request(app)
        .get('/products');
        expect(response.status).toBe(401);
    })

    it("Should not be able to access private routes with invalid JWT token" , async () => {

        const response = await request(app)
        .get('/products')
        .set('Authorization' , `Bearer 123467`);
        expect(response.status).toBe(401);
    })
})
