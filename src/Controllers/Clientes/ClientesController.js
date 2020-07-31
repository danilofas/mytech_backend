const conexao = require('../../../db/conexao');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const { limit, offset } = require('../../../db/conexao');

module.exports = {
    async list(request, response) {

        const [count] = await conexao('clientes').count();

        const { page = 1 } = request.query;

        const pessoas = await conexao('clientes')
        .join('pessoas','clientes.id_pessoa','=','pessoas.id_pessoa')
        .limit(5)
        .offset((page - 1 ) * 5)
        .select('pessoas.nome_pessoa as Nome',
        'pessoas.cpf as CPF',
        'pessoas.email as E-Mail',
        'pessoas.telefone as Telefone',
        'pessoas.dt_nascimento as DN',
        'clientes.id_cliente',
        'pessoas.id_pessoa')
        .orderBy('pessoas.nome_pessoa'); //ORDENAR PELO NOME DO CLIENTE
        
        response.header('Total-de-Clientes', count['count(*)']);
        
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
        await conexao('clientes').insert({
            id_cliente: id2,
            id_pessoa: id,

        })
        return response.json({ 'success': 'Cadastro efetuado com sucesso!' });
    }catch(error){
        console.log(error.message);
        return response.status(406).send();
    }
    },
    //SÓ TÁ DELETANDO O CLIENTE, AINDA FALTA DELETAR A PESSOA
    async deletar(request, response){
        const { id } = request.params;
        await conexao('clientes')
        .join('pessoas','clientes.id_pessoa','=','pessoas.id_pessoa')
        .where('clientes.id_cliente', id)
        .delete();
        return response.json({ 'success': 'Cliente apagado!' });
    },


    async selecionar(request, response){
        const { id } = request.params;
        const pessoa = await conexao('clientes')
        .join('pessoas','clientes.id_pessoa','=','pessoas.id_pessoa')
        .leftJoin('enderecos','pessoas.id_pessoa','=', 'enderecos.id_pessoa')
        .select('clientes.id_cliente',
        'pessoas.id_pessoa',
        'pessoas.nome_pessoa',
        'pessoas.cpf',
        'pessoas.email',
        'pessoas.telefone',
        'pessoas.dt_nascimento',
        'enderecos.id_endereco',
        'enderecos.cep',
        'enderecos.logradouro',
        'enderecos.bairro',
        'enderecos.numero',
        'enderecos.complemento',
        'enderecos.tipo_endereco',
        'enderecos.latitude',
        'enderecos.longitude',
        'enderecos.codigo_ibge')
        .where('clientes.id_cliente', id);
       
        return response.json(pessoa);
    },

    async update(request, response){
        const { id } = request.params;
        const dadospessoa = request.body;
    try{        
        await conexao('clientes')
        .join('pessoas','clientes.id_pessoa','=','pessoas.id_pessoa')
        .where('clientes.id_cliente', id)
        .update(dadospessoa);

        return response.json({ 'success': 'Cadastro atualizado com sucesso!' });

    }catch(error){
        return response.status(406).send();
    
    }
}
}