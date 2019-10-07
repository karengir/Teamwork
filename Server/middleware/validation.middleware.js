import Joi from '@hapi/joi';


const signUp = (req, res, next) => {
    const fields = Joi.object({
        firstname: Joi.string()
            .strict()
            .trim()
            .required(),
        lastname: Joi.string()
            .strict()
            .trim()
            .required(),
        email: Joi.string()
            .strict()
            .trim()
            .required()
            .email(),
        password: Joi.string()
            .strict()
            .trim()
            .required(),
        gender: Joi.string()
            .strict()
            .trim()
            .required(),
        jobRole: Joi.string()
            .strict()
            .trim()
            .required(),
        department: Joi.string()
            .strict()
            .trim()
            .required(),
        address: Joi.string()
            .strict()
            .trim()
            .required()
    })
    const output = fields.validate(req.body);
    if(output.error != null){
        return res.status(400).json({
            status: 400,
            error: `${output.error.details[0].message}`
    });
}
    next();
};

const signIn = (req, res, next) => {
const fields = Joi.object({
    email: Joi.string()
        .strict()
        .trim()
        .required()
        .email,
    password: Joi.string()
        .strict()
        .trim()
        .required()
        .min(5)
})
const output = fields.validate(req.body);
if(output.error != null) {
    return res.status(400).json({
        status: 400,
        error: `${output.error.details[0].message}`
    });
}
next();
};

const createArticle = (req, res, next) => {
    const fields = {
        title: Joi.string()
            .strict()
            .trim()
            .required(),
        article: Joi.string()
            .strict()
            .trim()
            .required(),
        createdOn: Joi.string()
            .strict()
            .trim()
            .required(),
        createdBy: Joi.string()
            .strict()
            .trim()
            .required()
    };
    const output = Joi.validate(req.body, fields);
    if(output.error != null){
        return res.status(400).json({
            status: 400,
            error: `${output.error.details[0].message}`
    });
    }  
    next(); 
};

const comments = (req, res, next) => {
    const fields = {
        comment : Joi.string()
            .strict()
            .trim()
            .required()
    };
    const output = Joi.validate(req.body, fields);
    if(output.error != null){
        return res.status(400).json({
            status: 400,
            error: `${output.error.details[0].message}`
    });
    }
    next();
};


export  {signUp,signIn,createArticle,comments};



