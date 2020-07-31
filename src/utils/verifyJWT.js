const jwt = require('jsonwebtoken');

module.exports = function  verifyJWT(require, response, next) {

    var token = require.headers['X-token-Autorizado'];
    if (!token)
        return response.status(401).json({ auth: false, message: 'Não existe token.' });

    jwt.verify(token, process.env.SECRET, function (err, decoded) {
        if (err)
            return response.status(406).json({ auth: false, message: 'Falha na autenticação do token.' });
        require.userId = decoded.id;
        next();
    })
}