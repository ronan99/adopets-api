const bcrypt = require('bcryptjs');

const { User } = require("../../src/app/models");
const truncate = require('../utils/truncate');


describe("User" , () =>{
    beforeEach( async() =>{
        await truncate();
    })
    it("Should encrypt user password", async ()=>{
        const user = await User.create({
            name : "ronan",
            email: "ronan@email.com",
            password: "adopets"
        })
        
        const compareHash = await bcrypt.compare("adopets", user.password_hash);
        expect(compareHash).toBe(true);
    })
})