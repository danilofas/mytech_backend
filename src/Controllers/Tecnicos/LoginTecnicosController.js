const conexao = require('../../../db/conexao');
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


module.exports = {

    async login (require, response){

        const { email, senha } = require.body;

        const findEmail = await conexao('tecnicos')
            .join('pessoas', 'tecnicos.id_pessoa', "=", 'pessoas.id_pessoa')
            .where('pessoas.email', email)
            .first();
        // console.log(findEmail);

        // if (findEmail[0] != email)
        //     return response.status(401).send();

        if (findEmail.email == email && bcrypt.compareSync(senha, findEmail.senha)) {
                const id = findEmail.id_cliente;
                var token = jwt.sign({ id }, process.env.SECRET, {
                    expiresIn: 300 // Expirar em 5 minutos //
                });
                response.setHeader('X_token_Autorizado', token);
                return response.status(202).json({ id_tecnico: findEmail.id_tecnico});     
            }
        return response.status(401).json({ message: 'Login inválido'})
        
    },

    logout(require, response){
        response.json({ auth: false, token: null});
    }

}