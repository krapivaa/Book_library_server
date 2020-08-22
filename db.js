const Sequelize = require('sequelize');
const sequelize = new Sequelize('booklist', 'postgres', 'password', {
  host: 'localhost',
  dialect: 'postgres'
});

sequelize.authenticate().then(
    function() {
        console.log('Connected to booklist postgres database');
    },
    function(err) {
        console.log(err);
    }
);
module.exports = sequelize;