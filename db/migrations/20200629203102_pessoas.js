
exports.up = function (knex) {
    return knex.schema.createTable('pessoas', function (table) {
        table.string('id_pessoa').unique().notNullable();
        table.string('nome_pessoa').notNullable();
        table.string('cpf').unique().notNullable();
        table.string('email').unique().notNullable();
        table.string('telefone').notNullable();
        table.string('senha').notNullable();
        table.date('dt_nascimento').notNullable();
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('pessoas');
};


//BACKUP 01/07/2020
// exports.up = function (knex) {
//     return knex.schema.createTable('pessoas', function (table) {
//         table.increments('id_pessoa').primary();
//         table.string('nome_pessoa').notNullable();
//         table.string('cpf').notNullable();
//         table.string('email').notNullable();
//         table.string('telefone').notNullable();
//         table.string('senha').notNullable();
//         table.date('dt_nascimento').notNullable();
//     });
// };

// exports.down = function (knex) {
//     return knex.schema.dropTable('pessoas');
// };
