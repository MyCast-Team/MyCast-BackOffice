var Sequelize=require("sequelize");

var config    = require('config');  // we use node-config to handle environments
require('../env.js');


if(process.env.NODE_ENV=="test"){
var dbConfig =	config.get("test");
} else {
var dbConfig =	config.get('development');
}
/*module.exports= new sequelize("mycast","root","",{
	pool:false,
	host:"localhost"
});*/
module.exports = new Sequelize(
    dbConfig.database,
    dbConfig.username,
    dbConfig.password,{
      host: dbConfig.host,
      dialect: dbConfig.dialect
})
