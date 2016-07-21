var models=require("../models");
var usermusicutils=function(iduser,idmusic,date){
	this.iduser=iduser;
	this.idmusic=idmusic;
	this.date=date;

}

usermusicutils.prototype.addusermusic=function(u1,callback){
		var usermusic=models.usermusic;
		if(u1){

		usermusic.create({
			"iduser":u1.iduser,
			"idmusique":u1.idmusic,
			"date":u1.date
		}).then(function(result){
			console.log("usermusic creer")
			callback(undefined,result)
		}).catch(function(err){
			console.log(err);
			console.log("usermusic pas creer")
		});


	}
}

module.exports=usermusicutils;
