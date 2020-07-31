exports.up = function(knex) {
    return knex.schema.createTable('pedidos', function(table) {
        table.increments('id_pedido').primary();
        table.text('observacoes').notNullable(500);
        table.string('id_cliente').notNullable();
        table.foreign('id_cliente').references('id_cliente').inTable('clientes').onDelete('CASCADE').onUpdate('CASCADE');
        table.string('id_tecnico');
        table.foreign('id_tecnico').references('id_tecnico').inTable('tecnicos').onDelete('CASCADE').onUpdate('CASCADE');
        table.integer('id_sit_pedido').unsigned();
        table.foreign('id_sit_pedido').references('id_situacao').inTable('situacao_pedido').onDelete('CASCADE').onUpdate('CASCADE');
        table.integer('id_categoria').unsigned();
        table.foreign('id_categoria').references('id_categoria').inTable('categorias').onDelete('CASCADE').onUpdate('CASCADE');
        table.integer('id_endereco').unsigned();
        table.foreign('id_endereco').references('id_endereco').inTable('enderecos').onDelete('CASCADE').onUpdate('CASCADE');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('pedidos');
};