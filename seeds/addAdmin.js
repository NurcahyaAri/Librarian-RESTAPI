
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('admin').del()
    .then(function () {
      // Inserts seed entries
      return knex('admin').insert([
        {
          created_at: new Date().getTime(),
          username : 'admin',
          password : '$2y$12$PpOATY97yEihX/DD6JP18O/THfnTspALYbltKDzgZUUiHpn9cMi0y',
          user_type : 'super_admin'
        },
      ]);
    });
};
