const conexao = require('../../../../db/conexao');

module.exports = {

    async update(request, response) {
        const { id_tecnico } = request.body;
        const { id_pedido } = request.params;

        const infPedido = await conexao('pedidos')
            .where('id_pedido', id_pedido)
            .select('id_sit_pedido');
            
            // console.log(infPedido);

        if (infPedido[0].id_sit_pedido !== 1)
            return response.json({ 'message': 'Não foi possível completar a solicitação' }).status(403).send();
               
        const id_sit_pedido = 2;
        const updated_at = new Date();
        try {
            await conexao('pedidos')
                .where('id_pedido', id_pedido)
                .update({
                    id_tecnico: id_tecnico,
                    id_sit_pedido: id_sit_pedido,
                    updated_at : updated_at,
                });
            return response.status(204).send();
        } catch (error) {

            return response.json({ 'message': 'Não foi possível completar a solicitação' }).status(403).send();
        }
    }
}