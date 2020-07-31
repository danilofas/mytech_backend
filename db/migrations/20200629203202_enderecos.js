
exports.up = function (knex) {
    return knex.schema.createTable('enderecos', function (table) {
        table.increments('id_endereco').primary();
        table.string('cep').notNullable();
        table.string('logradouro').notNullable();
        table.string('bairro').notNullable();
        table.string('numero').notNullable();
        table.string('complemento');
        table.string('tipo_endereco');
        table.float('latitude');
        table.float('longitude');
        table.string('id_pessoa').notNullable();
        table.foreign('id_pessoa').references('id_pessoa').inTable('pessoas').onDelete('CASCADE').onUpdate('CASCADE');
        table.integer('codigo_ibge').unsigned();
        table.foreign('codigo_ibge').references('codigo_ibge').inTable('municipios').onDelete('CASCADE').onUpdate('CASCADE');
        
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('enderecos');
};
