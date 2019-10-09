/* eslint-disable no-mixed-spaces-and-tabs */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import users from '../db/user';

chai.should();
chai.use(chaiHttp);

const user = {
    id: 1,
    firstname: "Giramata",
    lastname: "Karen",
	email: "kgiramata%7@gmail",
    password: "100000",
    gender: "female",
    jobRole: "engineer",
    department: "IT",
    address: "Kigali"
      
};

describe('sign Up tests', ()=> {

    it.skip("user should be able to create an account", done => {
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
        users.push(user);
        chai.request(app).post("/api/v1/auth/signup")
            .send(user)
            .end((err,res) => {
            res.should.have.status(409);
            res.should.have.property("message", "user already exists");
            res.body.should.be.an("object");
            done();
        });
    });
 });
