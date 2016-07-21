var sequelize=require("./sequelize");

module.exports=sequelize.import("usermusique",function(sequelize,datatypes){
	return sequelize.define("usermusique", {
		iduser:{
			type: datatypes.BIGINT,
			primaryKey:true,
		
		},
		idmusique:{
			type: datatypes.BIGINT,
			primaryKey:true,

		},
		date :{
			type: datatypes.DATE
		}
	}, {
		paranoid:true,
		freezeTableName:true,
		underscored:true

	});
})
