const queries = {
    users:{
        createTable:'create table users (id  SERIAL PRIMARY KEY,first_name varchar(255),last_name varchar(255), email varchar(255),password varchar(500),gender varchar(30),jobRole varchar(255),department varchar(255),address varchar(255))',
        insert:'insert into users values (DEFAULT,$1,$2,$3,$4,$5,$6,$7,$8)',
        findByEmail: 'select * from users where email=$1'
    },
    articles:{
        createTable:'create table articles (id  SERIAL PRIMARY KEY,title varchar(255),article varchar(255),createdOn varchar(255),createdBy varchar(255))',
        insert:'insert into articles values (DEFAULT,$1,$2,$3,$4)',
        delete:'delete from articles where id=$1',
        findById:'select * from articles where id=$1',
        findAll:'select * from articles'
    }
}

export default queries;