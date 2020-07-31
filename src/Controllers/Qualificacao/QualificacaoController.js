const conexao = require('../../../db/conexao');

module.exports = {
    async list(request, response) {
        const qualificacao = await conexao('qualificacao').select('*').orderBy('qualificacao');
        return response.json(qualificacao);
    },

    async create(request, response) {
        const { qualificacao } = request.body;
        try{
            await conexao('qualificacao').insert({
                qualificacao,
            })
            return response.json({ 'success': 'Cadastro efetuado com sucesso!' });
        }catch(error){
            return response.status(406).send();
        }
    },

    async deletar(request, response){
        const { id } = request.params;
        await conexao('qualificacao')
        .where('id_qualificacao', id)
        .delete();
        return response.json({ 'success': 'Cadastro deletado!' });
    },

    
    async selecionar(request, response){
        const { id } = request.params;
        const qualificacao = await conexao('qualificacao')
        .where('id_qualificacao', id)
        .first();
        return response.json(qualificacao);
    },

    async update(request, response){
        const { id } = request.params;
        const qualif = request.body;
    try{
        await conexao('qualificacao')
        .where('id_qualificacao', id)
        .update(qualif);
        return response.json({ 'success': 'Qualificação atualizada com sucesso!' });
    }catch(error){
        return response.status(406).send();
    
    }
    }


}