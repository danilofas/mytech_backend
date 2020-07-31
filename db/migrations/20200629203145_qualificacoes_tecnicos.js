
exports.up = function (knex) {
    return knex.schema.createTable('qualificacoes_tecnicos', function (table) {
        table.increments('id_qf_tecnicos').primary();
        table.string('id_tecnico').notNullable();
        table.foreign('id_tecnico').references('id_tecnico').inTable('tecnicos').onDelete('CASCADE').onUpdate('CASCADE');
        table.integer('id_qualificacao').unsigned();
        table.foreign('id_qualificacao').references('id_qualificacao').inTable('qualificacao').onDelete('CASCADE').onUpdate('CASCADE');
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('qualificacoes_tecnicos');
};
