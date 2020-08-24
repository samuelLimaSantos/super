import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('products', (table) => {
    table.increments('id').primary();
    table
      .integer('user_id')
      .notNullable()
      .references('id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    table.string('title').notNullable();
    table.string('image').notNullable();
    table.integer('value').notNullable();
    table.integer('amount').notNullable();
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('products');
}
