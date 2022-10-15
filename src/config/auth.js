module.exports = {
    rounds: 10,
    secretToken: process.env.JWT_SECRET,
    accessExpire: process.env.JWT_ACCESS_EXPIRE,
    refreshExpire: process.env.JWT_REFESH_TOKEN
}