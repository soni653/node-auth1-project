exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        { id: 1, username: "School ", password: "abc123" },
        { id: 2, username: "Lambda School", password: "xyz123" },
        { id: 3, username: "Online School", password: "qwerty123" },
      ]);
    });
};
