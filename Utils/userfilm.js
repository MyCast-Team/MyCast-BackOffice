var models=require("../models");
var userfilmutils=function(iduser,idfilm,date){
	this.idUser=iduser;
	this.idFilm=idfilm;
	this.date=date;

}

userfilmutils.prototype.adduserfilm=function(u1,callback){
		var userfilm=models.userfilm;
		if(u1){

		userfilm.create({
			"idUser":u1.idUser,
			"idFilm":u1.idFilm,
			"date":u1.date
		}).then(function(result){
			console.log("userfilm creer")
			callback(undefined,result)
		}).catch(function(err){
			console.log(err);
			console.log("userfilm pas creer")
		});


	}
}

module.exports=userfilmutils;
