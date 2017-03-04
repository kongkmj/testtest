const Sequelize = require('sequelize');
const sequelize = new Sequelize(
  'goldensheep',
  'b9810850c992e8',
  'a8be98a5',
  {
    'host':'ja-cdbr-azure-west-a.cloudapp.net',
    'dialect':'mysql'
  }
);

const door = sequelize.define('door', {
  state: Sequelize.STRING,
  user: Sequelize.STRING
});
const light = sequelize.define('light', {
  state: Sequelize.STRING,
  user: Sequelize.STRING
});

module.exports = {
  sequelize: sequelize,
  door: door,
  light: light
}
