var sequelize=require("./sequelize");

module.exports=sequelize.import("token",function(sequelize,datatypes){
	return sequelize.define("token", {
		idUser:{
			type: datatypes.BIGINT,
			primaryKey:true

		},
		date:{
			type:datatypes.BIGINT
		}
	}, {
		paranoid:false,
		freezeTableName:true,
		underscored:true

	});
})
