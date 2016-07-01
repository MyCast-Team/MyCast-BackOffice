var sequelize=require("./sequelize");

module.exports=sequelize.import("film",function(sequelize,datatypes){
	return sequelize.define("film", {
		id:{
			type: datatypes.BIGINT,
			primaryKey:true,
			autoIncrement:true
		},

    name :{
			type: datatypes.STRING
		},
		director:{
			type: datatypes.STRING
		},
		date:{
			type: datatypes.DATE
		},
		type:{
			type: datatypes.STRING
		},
		length:{
			type: datatypes.STRING
		}
	}, {
		paranoid:true,
		freezeTableName:true,
		underscored:true

	});
})
