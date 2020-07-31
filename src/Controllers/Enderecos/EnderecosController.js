const conexao = require('../../../db/conexao');

module.exports = {
    async list(request, response) {
        const enderecos = await conexao('enderecos')
        .join('pessoas','enderecos.id_pessoa','=','pessoas.id_pessoa')
        .join('municipios','enderecos.codigo_ibge','=','municipios.codigo_ibge')
        .leftJoin('estados','estados.codigo_uf','=','municipios.codigo_uf')
        .leftJoin('clientes','pessoas.id_pessoa','=','clientes.id_pessoa')
        .select('pessoas.nome_pessoa as Nome da Pessoa',
        'enderecos.logradouro',
        'enderecos.numero',
        'enderecos.complemento',
        'enderecos.bairro',
        'enderecos.cep',
        'municipios.nome',
        'estados.uf',
        'enderecos.latitude',
        'enderecos.longitude');
        return response.json(enderecos);
    },

    async create(request, response) {
        const { cep, logradouro, bairro, numero, complemento, tipo_endereco, latitude, longitude, id_pessoa, codigo_ibge  } = request.body;

        await conexao('enderecos').insert({
            cep,
            logradouro,
            bairro,
            numero,
            complemento,
            tipo_endereco,
            latitude,
            longitude,
            id_pessoa,
            codigo_ibge
        })

        return response.json({ 'success': 'Endereço cadastrado com sucesso!' });
    },
    
    async deletar(request, response){
        const { id } = request.params;
        await conexao('enderecos')
        .where('id_endereco', id)
        .delete();
        return response.json({ 'success': 'Endereço apagado!' });
    },

    async selecionar(request, response){
        const { id } = request.params;
        const selectEndereco = await conexao('enderecos')
        .join('municipios','enderecos.codigo_ibge','=','municipios.codigo_ibge')
        .leftJoin('estados','estados.codigo_uf','=','municipios.codigo_uf')
        .leftJoin('clientes','pessoas.id_pessoa','=','clientes.id_pessoa')
        .select('enderecos.logradouro as Endereço',
        'enderecos.numero as Número',
        'enderecos.complemento as Complemento',
        'enderecos.bairro as Bairro',
        'enderecos.cep as CEP',
        'municipios.nome as Cidade',
        'estados.uf as UF')
        .where('id_endereco', id)
        .first();
        return response.json(selectEndereco);
    },

    async update(request, response){
        const { id } = request.params;
        const dadosEndereco = request.body;
        await conexao('enderecos')
        .where('id_endereco', id)
        .update(dadosEndereco);
        return response.json({ 'success': 'Endereço atualizado com sucesso!' });
    }
}