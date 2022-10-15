import { body, query, param } from "express-validator";

const allSchema = [
    query("page").isInt({ min: 1 }),
    query("perPage").isInt({ min: 1 }),
];

const createSchema = [
    body("name").notEmpty().isLength({ min: 3 }),
    body("code").notEmpty().isLength({ min: 2 }),
];

const getByFieldSchema = [param("code").notEmpty()];

const updateSchema = [
    param("code").notEmpty(),
    body("name").optional().isLength({ min: 3 }),
    body("code").optional().isLength({ min: 2 }),
];

const deleteSchema = [param("code").notEmpty()];

export {
    allSchema,
    createSchema,
    getByFieldSchema,
    updateSchema,
    deleteSchema,
};
