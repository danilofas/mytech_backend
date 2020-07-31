const conexao = require('../../../../db/conexao');

module.exports = {
    async list(request, response) {
        const cliente  = await conexao('pedidos')
        .join('clientes', 'pedidos.id_cliente', '=', 'clientes.id_cliente')
        .join('pessoas', 'clientes.id_pessoa', '=', 'pessoas.id_pessoa')
        .join('categorias', 'pedidos.id_categoria', '=', 'categorias.id_categoria')
        .join('situacao_pedido', 'pedidos.id_sit_pedido', '=', 'situacao_pedido.id_situacao')
        .join('enderecos', 'pedidos.id_endereco', '=', 'enderecos.id_endereco')
        .select('pedidos.id_pedido', 
        'created_at',
        'updated_at',
        'observacoes', 
        'situacao_pedido.descricao as situacao_pedido.descricao', 
        'categorias.descricao as categoria.descricao', 
        'nome_pessoa', 
        'email',
        'telefone',
        'enderecos.id_endereco',
        'clientes.id_cliente',
        'enderecos.latitude',
        'enderecos.longitude')
        // .select('*')
        
        const tecnico = await conexao('pedidos')
        .join('tecnicos', 'pedidos.id_tecnico', '=', 'tecnicos.id_tecnico')
        .join('pessoas', 'tecnicos.id_pessoa', '=', 'pessoas.id_pessoa')
        .select('pessoas.nome_pessoa as Técnico','tecnicos.id_tecnico');
        
        return response.json({cliente, tecnico});

    },

    async create(request, response) {
        const { observacoes, id_cliente, id_tecnico, id_sit_pedido, id_categoria, id_endereco  } = request.body;

        await conexao('pedidos').insert({
            observacoes, 
            id_cliente, 
            id_tecnico, 
            id_sit_pedido, 
            id_categoria,
            id_endereco
        })

        return response.json({ 'success': 'Pronto, sua demanda está salva, aguarde um técnico responde-la!' });
    },

    async deletar(request, response){
        const { id } = request.params;
        await conexao('pedidos')
        .where('id_pedido', id)
        .delete();
        return response.json({ 'success': 'Pedido apagado!' });
    },

     
    async selecionar(request, response){
        const { id } = request.params;
        const ped = await conexao('pedidos')
        .join('clientes', 'pedidos.id_cliente', '=', 'clientes.id_cliente')
        .join('pessoas', 'clientes.id_pessoa', '=', 'pessoas.id_pessoa')
        .join('categorias', 'pedidos.id_categoria', '=', 'categorias.id_categoria')
        .join('situacao_pedido', 'pedidos.id_sit_pedido', '=', 'situacao_pedido.id_situacao')
        .join('enderecos', 'pedidos.id_endereco', '=', 'enderecos.id_endereco')
        .select('id_pedido as Pedido', 
        'observacoes as Observações', 
        'situacao_pedido.descricao as Situação', 
        'categorias.descricao as Categoria', 
        'nome_pessoa as Cliente', 
        'email as E-mail',
        'telefone as Contato',
        'clientes.id_cliente',
        'enderecos.id_endereco',
        'enderecos.cep',
        'enderecos.logradouro',
        'enderecos.bairro',
        'enderecos.numero',
        'enderecos.complemento',
        'enderecos.latitude',
        'enderecos.longitude')
        .where('id_pedido', id)
        .first()
        
        // const tec = await conexao('pedidos')
        // .join('tecnicos', 'pedidos.id_tecnico', '=', 'tecnicos.id_tecnico')
        // .join('pessoas', 'tecnicos.id_pessoa', '=', 'pessoas.id_pessoa')
        // .select('pessoas.nome_pessoa as Técnico','tecnicos.id_tecnico');
        
        //return response.json({ped, tec});
      
         return response.json(ped);
    },

    // async update(request, response){
    //     const { id } = request.params;
    //     const pedUpdate = request.body;
    //     await conexao('pedidos')
    //     .where('id_pedido', id)
    //     .update(pedUpdate);
    //     return response.json({ 'success': 'O Pedido foi atendido!' });
    // }
}