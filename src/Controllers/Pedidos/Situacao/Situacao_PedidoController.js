const conexao = require('../../../../db/conexao');

module.exports = {
    async list(request, response) {
        const sit_ped = await conexao('situacao_pedido').select('*');
        return response.json(sit_ped);
    },

    async create(request, response) {
        const { descricao } = request.body;

        await conexao('situacao_pedido').insert({
            descricao
        })

        return response.json({ 'success': 'Cadastro efetuado com sucesso!' });
    }
}