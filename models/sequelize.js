var Sequelize=require("sequelize");
var config    = require('config');  // we use node-config to handle environments

var dbConfig = config.get('development');
/*module.exports= new sequelize("mycast","root","",{
	pool:false,
	host:"localhost"
});*/
module.exports = new Sequelize(
    dbConfig.database,
    dbConfig.username,
    dbConfig.password,{
      host: dbConfig.host,
      dialect: dbConfig.driver
}
