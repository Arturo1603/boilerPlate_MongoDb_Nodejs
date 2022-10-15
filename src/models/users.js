import { Schema, model, Types } from 'mongoose';
import { hashSync, genSaltSync, compareSync } from 'bcrypt';
import { rounds } from '../config/auth';

const schema = Schema({
    name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role_code: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        default: true
    }
},
    {
        collection: 'users',
        timestamps: {
            createdAt: 'created_at',
            updateAt: 'updated_at'
        },
        toJson: {
            virtuals: true,
        }
    },
);

schema.virtual('role', {
    ref: 'roles',
    localField: 'role_code',
    foreignField: '_id',
    justOne: true,
})

schema.methods.hashPassword = async function () {
    let passwordHash = hashSync(this.password, genSaltSync(rounds));
    this.password = passwordHash;
};

schema.methods.validatePassword = async function (password) {
    return compareSync(password, this.password);
}
// el primer parametro es el nombre de mi propiedad virtual

const users = model('users', schema);

export default users;