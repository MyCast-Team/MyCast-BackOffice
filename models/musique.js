var sequelize=require("./sequelize");

module.exports=sequelize.import("musique",function(sequelize,datatypes){
	return sequelize.define("musique", {
		id:{
			type: datatypes.BIGINT,
			primaryKey:true,
			autoIncrement:true
		},

		singer :{
			type: datatypes.STRING
		},
		producer:{
			type: datatypes.STRING
		},
		title:{
			type: datatypes.STRING
		},
		type:{
			type: datatypes.STRING
		},
		length:{
			type: datatypes.STRING
		},
		date:{
			type: datatypes.STRING
		},
	}, {
		paranoid:true,
		freezeTableName:true,
		underscored:true

	});
})
