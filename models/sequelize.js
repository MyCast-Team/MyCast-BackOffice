var sequelize=require("sequelize");

module.exports= new sequelize("mycast","test","",{
	pool:false,
	host:"127.0.0.1"
});
