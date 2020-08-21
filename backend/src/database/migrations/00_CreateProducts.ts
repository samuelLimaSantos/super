import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('products', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.integer('value').notNullable();
    table.integer('amount').notNullable();
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('products');
}
