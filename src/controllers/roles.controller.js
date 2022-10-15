import roles from "../models/roles";
import { paginationFields, paginationResults } from "../helpers/pagination"


class RolesController {
    constructor() {
        this.model = roles;
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

            const documents = await this.model.find({
                status: true
            })
                .populate([
                    {
                        // Se coloca la propiedad virtual del schema en models
                        path:'user',
                    }
                ])
                .limit(limit)
            .skip(offset)

        const count = await this.model.countDocuments();

        return response.status(200).json(
            paginationResults({ rows: documents, count }, page, perPage)
        );
    } catch(error) {
        return response.status(500).json({
            message: error.message
        })
    }
}



    async createDocument(request, response) {
    try {
        const { name, code } = request.body;
        const document = this.model({
            name,
            code
        });
        await document.save();
        return response.status(201).json(document);
    } catch (error) {
        return response.status(500).json({
            message: error.message
        })
    }
}

    async getByField(request, response) {
    try {
        const { code } = request.params;
        const document = await this.model.findOne({
            code
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
        const { code } = request.params;
        const { body } = request;

        const document = await this.model.findOneAndUpdate({ code },
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
        const code = await this.model.findOneAndUpdate({ code },
            {
                status: false
            });

        return response.status(200).json({
            message: `Roles deleted correctly whit username ${username}`
        })

    } catch (error) {
        return response.status(500).json({
            message: error.message
        })

    }
}

}
export default RolesController