import { body, query } from "express-validator";


const createSchema = [
    body('name').notEmpty().isLength({ min: 3, max: 10 }),
    body('last_name').notEmpty().isLength({ min: 3, max: 10 }),
    body('username').notEmpty().isLength({ min: 3, max: 15 }),
    body('email').notEmpty().isEmail(),
    body('password').notEmpty().isLength({ min: 3, max: 10 })
];

const getSchema = [
    query('page').isInt({min:1}),
    query('perPage').isInt({min:1})
]

export { createSchema, getSchema };


// {
//     "name": "pedro",
//     "last_name": "castillo",
//     "username": "habiaunpollo",
//     "email": "castillo@gmail.com",
//     "password": "123456"
//   }