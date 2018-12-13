const bookData = require("./data/bookData.json");

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex("books").del();

  // Inserts seed entries
  await knex("books").insert(bookData);
}