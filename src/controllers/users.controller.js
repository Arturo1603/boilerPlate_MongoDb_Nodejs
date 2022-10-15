import users from "../models/users";
import { paginationFields, paginationResults } from "../helpers/pagination";

class UserController {
    constructor() {
        this.model = users;
    }

    // Listar usuarios
    async all(request, response) {
        try {

            // Paginacion
            // QueryParams: page, perpage 
            //     Sequealize
            // count cantidad de filas
            // rows filas solicitadas

            const { page, perPage } = request.query;
            const { limit, offset } = paginationFields(page, perPage);

            const documents = await this.model.find()
                .populate([
                    {
                        // Se coloca la propiedad virtual del schema en models
                        path: 'role',
                    }
                ])
                .select("-password")
                .limit(limit)
                .skip(offset)

            const count = await this.model.countDocuments();

            return response.status(200).json(
                paginationResults({ rows: documents, count }, page, perPage)
            );
        } catch (error) {
            return response.status(500).json({
                message: error.message
            })
        }
    }

    async createDocument(request, response) {
        try {
            const { name, last_name, username, email, password } = request.body;
            const document = this.model({
                name,
                last_name,
                username,
                email,
                password,
                role_code: "USER",
            });
            await document.hashPassword();
            await document.save();
            return response.status(201).json(document);
        } catch (error) {
            return response.status(500).json({
                message: error.message,
            });
        }
    }


    async getByField(request, response) {
        try {
            const { username } = request.params;
            const document = await this.model.findOne({
                username
            })

            return response.status(200).json(document);

        } catch (error) {
            return response.status(500).json({
                message: error.message
            })
        }
    }

    async updateDocument(request, response) {
        try {
            const { username } = request.params;
            const { body } = request;

            const document = await this.model.findOneAndUpdate({ username },
                {
                    ...body
                }, {
                new: true
            });

            return response.status(200).json({
                document
            })
        } catch (error) {
            return response.status(500).json({
                message: error.message
            })
        }
    }

    async documentDelete(request, response) {
        try {
            const { username } = request.params;
            const document = await this.model.findOneAndUpdate({ username },
                {
                    status: false
                });

            return response.status(200).json({
                message: `User deleted correctly whit username ${username}`
            })

        } catch (error) {
            return response.status(500).json({
                message: error.message
            })

        }
    }
}

export default UserController;