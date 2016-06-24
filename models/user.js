var sequelize=require("./sequelize");

module.exports=sequelize.import("user",function(sequelize,datatypes){
	return sequelize.define("user", {
		id:{
			type: datatypes.BIGINT,
			primaryKey:true,
			autoIncrement:true
		}

	}, {
		paranoid:true,
		freezeTableName:true,
		underscored:true

	});
})
