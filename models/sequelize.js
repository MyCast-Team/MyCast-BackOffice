var sequelize=require("sequelize");

module.exports= new sequelize("mycast","root","",{
	pool:false,
	host:"127.0.0.1"
});
