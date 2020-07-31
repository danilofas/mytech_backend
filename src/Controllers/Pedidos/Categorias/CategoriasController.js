const conexao = require('../../../../db/conexao');

module.exports = {
    async list(request, response) {
        const sit_ped = await conexao('categorias')
        .select('*')
        .orderBy('descricao');
        return response.json(sit_ped);
    },

    async create(request, response) {
        const { descricao } = request.body;
    try{
        await conexao('categorias').insert({
            descricao
        })

        return response.json({ 'success': 'Cadastro efetuado com sucesso!' });
    }catch(error){
        return response.status(406).send();

    }   
    }   
}