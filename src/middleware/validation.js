import { validationResult } from "express-validator";

export default (schemas) => {
    return async (request, response, next) => {
        await Promise.all(schemas.map((schema) => schema.run(request)));

        const results = validationResult(request);
        if (results.isEmpty()) return next();

        return response.status(422).json(results.mapped());
    };
};

