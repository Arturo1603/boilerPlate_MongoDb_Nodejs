import { sign, verify } from 'jsonwebtoken';
import { accessExpire, refreshExpire, secretToken } from '../config/auth';

// {id: username}
const jwtSignIn = (payload) => {
    const accessToken = sign(payload, secretToken, {
        expiresIn: accessExpire,
    });

    const refreshToken = sign(payload, secretToken, {
        expiresIn: refreshExpire,
    })

    return {
        accessToken,
        refreshToken,
    }

    
};
const jwtVerify = (token) => verify(token, secretToken);

export { jwtSignIn, jwtVerify };