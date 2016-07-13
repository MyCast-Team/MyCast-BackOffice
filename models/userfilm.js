var sequelize=require("./sequelize");

module.exports=sequelize.import("userfilm",function(sequelize,datatypes){
	return sequelize.define("userfilm", {
		idUser:{
			type: datatypes.BIGINT,
			primaryKey:true,
			
		},
		idFilm:{
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
