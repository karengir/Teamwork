import {Pool} from 'pg';

const poolReal = new Pool({
    host:'localhost',
    user:'postgres',
    database:'real',
    password:'0788481142',
    port:5432
});

const poolTest = new Pool({
    host:'localhost',
    user:'postgres',
    database:'test',
    password:'0788481142',
    port:5432
});


const executeQuery = {
    real : async (query,params=[]) => {
        const res = await poolReal.query(query,params);
        return res;
    },
    test : async (query,params=[]) => {
        const res = await poolTest.query(query,params);
        return res;
    }
} 

export default executeQuery;