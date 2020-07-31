const conexao = require('../../../db/conexao');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');

module.exports = {
    async list(request, response) {
        const pessoas = await conexao('tecnicos')
        .join('pessoas','tecnicos.id_pessoa','=','pessoas.id_pessoa')
        .select('pessoas.nome_pessoa as Nome',
        'pessoas.cpf as CPF',
        'pessoas.email as E-Mail',
        'pessoas.telefone as Telefone',
        'pessoas.dt_nascimento as DN',
        'tecnicos.id_tecnico',
        'pessoas.id_pessoa')
        .orderBy('pessoas.nome_pessoa');  //ORDENAR PELO NOME DO TÉCNICO
        return response.json(pessoas);
    },

    async create(request, response) {
        const { nome_pessoa, cpf, email, telefone, senha, dt_nascimento } = request.body;
        const id = uuidv4();
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(senha, salt);
        
        try{
        
            await conexao('pessoas').insert({
            id_pessoa: id,
            nome_pessoa,
            cpf,
            email,
            telefone,
            senha: hash,
            dt_nascimento
        })
        const id2 = uuidv4();
        await conexao('tecnicos').insert({
            id_tecnico: id2,
            id_pessoa: id,

        })
        return response.status(200).json({id});
        // return response.json({ 'success': 'Cadastro efetuado com sucesso!' });

    }catch(error){
           return response.status(406).send();
    }
    },
   //SÓ TÁ DELETANDO O TÉCNICO, AINDA FALTA DELETAR A PESSOA
    async deletar(request, response){
        const { id } = request.params;
        await conexao('tecnicos')
        .join('pessoas','tecnicos.id_pessoa','=','pessoas.id_pessoa')
        .where('tecnicos.id_tecnico', id)
        .delete();
        return response.json({ 'success': 'Técnico apagado!' });
    },


    
    async selecionar(request, response){
        const { id } = request.params;
        const pessoa = await conexao('tecnicos')
        .join('pessoas','tecnicos.id_pessoa','=','pessoas.id_pessoa')
        .select('pessoas.nome_pessoa as Nome',
        'pessoas.cpf as CPF',
        'pessoas.email as E-Mail',
        'pessoas.telefone as Telefone',
        'pessoas.dt_nascimento as DN',
        'tecnicos.id_tecnico',
        'pessoas.id_pessoa')
        .where('tecnicos.id_tecnico', id)
        .first();
        return response.json(pessoa);
    },

    async update(request, response){
        const { id } = request.params;
        const dadospessoa = request.body;
    try{
        await conexao('tecnicos')
        .join('pessoas','tecnicos.id_pessoa','=','pessoas.id_pessoa')
        .where('tecnicos.id_tecnico', id)
        .update(dadospessoa);
        return response.json({ 'success': 'Cadastro atualizado com sucesso!' });
    }catch(error){
        return response.status(406).send();
    
    }
    },
}