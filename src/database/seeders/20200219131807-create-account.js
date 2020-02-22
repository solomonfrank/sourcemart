module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert(
      'Accounts',
      [
        {
          firstName: 'John',
          lastName: 'Doe',
          email: 'johndoe@test.com'
        }
      ],
      {}
    ),

  down: queryInterface => queryInterface.bulkDelete('Accounts', null, {})
};
