const conexao = require('../../../db/conexao');

module.exports = {
    async list(request, response) {
        const qfTecnicos = await conexao('qualificacoes_tecnicos')
        .join('qualificacao','qualificacoes_tecnicos.id_qualificacao','=','qualificacao.id_qualificacao')
        .join('tecnicos','qualificacoes_tecnicos.id_tecnico','=','tecnicos.id_tecnico')
        .leftJoin('pessoas','tecnicos.id_pessoa','=','pessoas.id_pessoa')
        .select('qualificacao.qualificacao as Qualificação','pessoas.nome_pessoa as Técnico','qualificacoes_tecnicos.id_qf_tecnicos as Código Qualificação')
        .orderBy('pessoas.nome_pessoa');
        return response.json(qfTecnicos);
    },

    async create(request, response) {
        const { id_tecnico, id_qualificacao } = request.body;

        await conexao('qualificacoes_tecnicos').insert({
            id_tecnico,
            id_qualificacao
        })

        return response.json({ 'success': 'Cadastro efetuado com sucesso!' });
    },

    async deletar(request, response){
        const { id } = request.params;
        await conexao('qualificacoes_tecnicos')
        .where('id_qf_tecnicos', id)
        .delete();
        return response.json({ 'success': 'Cadastro deletado!' });
    },

    async selecionar(request, response){
        const { id } = request.params;
        const qualificacoes = await conexao('qualificacoes_tecnicos')
        .where('qualificacoes_tecnicos', id)
        .first();
        return response.json(qualificacoes);
    },

    async update(request, response){
        const { id } = request.params;
        const qualif = request.body;
    try{
        await conexao('qualificacoes_tecnicos')
        .where('qualificacoes_tecnicos', id)
        .update(qualif);
        return response.json({ 'success': 'Qualificação atualizada com sucesso!' });
    }catch(error){
        return response.status(406).send();
    
    }
    }
}