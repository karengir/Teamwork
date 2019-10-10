/* eslint-disable no-mixed-spaces-and-tabs */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
// import users from '../db/user';
// import tokenGen from '../helpers/token.helper';
import MakeToken from '../helpers/token.helper';

chai.should();
chai.use(chaiHttp);



const user = ({
    
    firstname: "Giramata",
    lastname: "Karen",
	email: "kgiramata@gmail.com",
    password: "100000",
    gender: "female",
    jobRole: "engineer",
    department: "IT",
    address: "Kigali"
      
});

const userUpate = ({
    firstname: "Giramata",
    lastname: "Karen",
	email: "giramata@gmail.com",
    password: "100000",
    gender: "female",
    jobRole: "engineer",
    department: "IT",
    address: "Kigali"
})

const article = {
    title: 'article 1',
    article: 'gggg vvvv mmmm',
    createdOn: new Date().toDateString(),
    createdBy: 1
}

const articleUpdate = {
    title: 'article 1',
    article: 'gggg vvvv mmmm',
    createdBy: 1
}

const token = MakeToken(user.email, 1);
const token2 = MakeToken(userUpate.email);

const user2 = ({
    email: "kgiramata@gmail.com",
    password: "100000"
})

const user3 = ({
    email: "kgiramata57@gmail.com",
    password: "100000"
})

const user4 = ({
    email: "kgiramata@gmail.com",
    password: "100999"
})

describe('sign Up tests', ()=> {

    it("user should be able to create an account", done => {
        chai.request(app).post("/api/v1/auth/signup")
            .send(user)
            .end((err,res) => {
                res.should.have.status(201);
                res.body.should.have.property("message", "User successfully created");
                res.body.should.be.a("object");
                done();
            });
    });

    it("user should not be able to create account when invalid firstname", done => {
        chai.request(app).post("/api/v1/auth/signup").send({
            firstname: '',
            lastname: 'Karen',
	        email: 'kgiramata%7@gmail',
            password: '100000',
            gender: 'female',
            jobRole: 'engineer',
            department: 'IT',
            address: 'Kigali'
        }).end((err,res) => {
            res.should.have.status(400);
            res.body.should.be.an("object");
            done();
        });
    });

    it("user should not be able to create account when invalid lastname", done => {
        chai.request(app).post("/api/v1/auth/signup").send({
            firstname: 'Giramata',
            lastname: '',
	        email: 'kgiramata%7@gmail',
            password: '100000',
            gender: 'female',
            jobRole: 'engineer',
            department: 'IT',
            address: 'Kigali'
        }).end((err,res) => {
            res.should.have.status(400);
            res.body.should.be.an("object");
            done();
        });
    });

    it("user should not be able to create account when invalid email", done => {
        chai.request(app).post("/api/v1/auth/signup").send({
            firstname: 'Giramata',
            lastname: 'Karen',
	        email: '',
            password: '100000',
            gender: 'female',
            jobRole: 'engineer',
            department: 'IT',
            address: 'Kigali'
        }).end((err,res) => {
            res.should.have.status(400);
            res.body.should.be.an("object");
            done();
        });
    });

    it("user should not be able to create account when invalid password", done => {
        chai.request(app).post("/api/v1/auth/signup").send({
            firstname: 'Giramata',
            lastname: 'Karen',
	        email: 'kgiramata',
            password: '',
            gender: 'female',
            jobRole: 'engineer',
            department: 'IT',
            address: 'Kigali'
        }).end((err,res) => {
            res.should.have.status(400);
            res.body.should.be.an("object");
            done();
        });
    });

    it("user should not be able to create account when invalid gender", done => {
        chai.request(app).post("/api/v1/auth/signup").send({
            firstname: 'Giramata',
            lastname: 'Karen',
	        email: 'kgiramata',
            password: '10000',
            gender: '',
            jobRole: 'engineer',
            department: 'IT',
            address: 'Kigali'
        }).end((err,res) => {
            res.should.have.status(400);
            res.body.should.be.an("object");
            done();
        });
    });

    it("user should not be able to create account when invalid jobRole", done => {
        chai.request(app).post("/api/v1/auth/signup").send({
            firstname: 'Giramata',
            lastname: 'Karen',
	        email: 'kgiramata',
            password: '10000',
            gender: 'female',
            jobRole: '',
            department: 'IT',
            address: 'Kigali'
        }).end((err,res) => {
            res.should.have.status(400);
            res.body.should.be.an("object");
            done();
        });
    });

    it("user should not be able to create account when invalid department", done => {
        chai.request(app).post("/api/v1/auth/signup").send({
            firstname: 'Giramata',
            lastname: 'Karen',
	        email: 'kgiramata',
            password: '10000',
            gender: 'female',
            jobRole: 'engineer',
            department: '',
            address: 'Kigali'
        }).end((err,res) => {
            res.should.have.status(400);
            res.body.should.be.an("object");
            done();
        });
    });

    it("user should not be able to create account when invalid address", done => {
        chai.request(app).post("/api/v1/auth/signup").send({
            firstname: 'Giramata',
            lastname: 'Karen',
	        email: 'kgiramata',
            password: '10000',
            gender: 'female',
            jobRole: 'engineer',
            department: 'IT',
            address: ''
        }).end((err,res) => {
            res.should.have.status(400);
            res.body.should.be.an("object");
            done();
        });
    });

    it("user should not be able to create account when username already exists", done =>{
        // users.push(user);
        chai.request(app).post("/api/v1/auth/signup")
            .send(user)
            .end((err,res) => {
            res.should.have.status(409);
            res.body.should.have.property("message", "user already exists");
            res.body.should.be.an("object");
            done();
        });
    });
 });


 describe('sign In tests', ()=>{
    
    it("user should be able to signIn", done => {
        chai.request(app).post("/api/v1/auth/signin")
        .send(user2)
        .end((err,res) => {
            res.should.have.status(200);
            res.body.should.have.property("message", "user is successfully Logged In");
            res.body.should.be.an("object");
            done();
        });
    })

    it("user should not be able to signIn when password is incorect", done => {
        chai.request(app).post("/api/v1/auth/signin").send(user4).end((err, res) => {
            res.should.have.status(300);
            res.body.should.have.property("message", "wrong password");
             res.body.should.be.an("object");
            done();
        })
    })

    it("user should not be able to sign In when email is incorrect", done => {
        chai.request(app).post("/api/v1/auth/signin").send(user3).end((err, res) => {
            res.should.have.status(405);
            res.body.should.have.property("message", "user does not exist");
            res.body.should.be.an("object");
            done();
        })
    })
 } )


 describe("create article", () => {

    it("user must be able to create an article when logged in", done => {
        chai.request(app).post("/api/v1/articles/")
            .set('Authorization', token)
            .send(article)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property("message", "article successfully created");
                res.body.should.be.a("object");
                done();

        })
    })

    it("user must be able to see all articles", done => {
        chai.request(app).get("/api/v1/articles/feeds")
            .set('Authorization', token)
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.a("object");
                done();
            })
    })

    it("user must be able to see a specific article", done => {
        chai.request(app).get("/api/v1/articles/" + 1)
            .set('Authorization', token)
            .end((err, res) => {
                res.should.have.status(200);                
                res.should.be.a("object");
                done();
            })

    })

    it("user must be able to edit an article they created", done => {
        chai.request(app).patch("/api/v1/articles/" + 1)
            .set('Authorization', token)
            .send(articleUpdate)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property("message", "article successfully edited");
                res.body.should.be.a("object");
                done();
            })
    })  

    it("user must not be able to edit an article they did not create", done => {
        chai.request(app).patch("/api/v1/articles/" + 1)
            .set('Authorization', token2)
            .send(article)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.have.property("message", "You cannot edit an article that you did not create");
                res.body.should.be.a("object");
                done();
            })
    })

    it("user cannot edit an article that does not exist", done => {
        chai.request(app).patch("/api/v1/articles/" +2)
            .set('Authorization', token)
            .send(article)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.have.property("message", "article not found");
                res.body.should.be.a("object");
                done();
            })
    })

    it("user must not be able to delete an article they did not create", done => {
        chai.request(app).delete("/api/v1/articles/" + 1)
            .set('Authorization', token2)
            .end((err, res) => {
                console.log(res.data);
                res.should.have.status(400);
                res.body.should.have.property("message", "You cannot delete an article that you did not create");
                res.body.should.be.a("object");
                done();
            })
    })

    it("user must be able to delete article", done => {
        chai.request(app).delete("/api/v1/articles/" + 1)
            .set('Authorization', token)
            .end((err, res) => {
                res.should.have.status(204);
                res.body.should.be.a("object");
                done();
            })
    })

    

})