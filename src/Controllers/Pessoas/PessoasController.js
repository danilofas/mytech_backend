const conexao = require('../../../db/conexao');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');

module.exports = {
    async list(request, response) {
        const pessoas = await conexao('pessoas')
        .select('nome_pessoa as Nome',
        'cpf as CPF',
        'email as E-Mail',
        'telefone as Telefone',
        'dt_nascimento as DN',
        'senha',
        'id_pessoa');
        return response.json(pessoas);
    },

    async create(request, response) {
        const { nome_pessoa, cpf, email, telefone, senha, dt_nascimento } = request.body;
        const id = uuidv4();
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(senha, salt);

        await conexao('pessoas').insert({
            id_pessoa: id,
            nome_pessoa,
            cpf,
            email,
            telefone,
            senha: hash,
            dt_nascimento
        })

        return response.json({ 'success': 'Cadastro efetuado com sucesso!' });
    },

    async deletar(request, response){
        const { id } = request.params;
        await conexao('pessoas')
        .where('id_pessoa', id)
        .delete();
        return response.json({ 'success': 'Cadastro deletado!' });
    },


    async selecionar(request, response){
        const { id } = request.params;
        const pessoa = await conexao('pessoas')
        .where('id_pessoa', id)
        .first();
        return response.json(pessoa);
    },

    async update(request, response){
        const { id } = request.params;
        const dadospessoa = request.body;
    try{
        await conexao('pessoas')
        .where('id_pessoa', id)
        .update(dadospessoa);
        return response.json({ 'success': 'Cadastro atualizado com sucesso!' });
    }catch(error){
        return response.status(406).send();
    
    }
    }
}