var models=require("../models");
var tokenUtils=function(id){
	this.id=id;
}

tokenUtils.prototype.addtoken=function(u1,callback){
		var token=models.token;
		if(u1){
		token.create({
			"idUser" : u1.id
		}).then(function(result){
			console.log("token cr�er")
			callback(undefined,result)
		}).catch(function(err){

			console.log("token pas cr�er")
			callback(err,undefined);


		});


	}
}
tokenUtils.prototype.delete = function(idtoken, callback) {
	var token = models.token;
	if(idtoken) {
		token.find({
			"where" : {
				idUser : idtoken
			}
		}).then(function(result) {
			if(result) {
				result.destroy().then(function(success) {
					callback(undefined,success);
				}).catch(function(err) {
					callback(err,undefined);
					console.log(err);
				});
			} else {
				callback("error can't find "+idtoken);
			}
		}).catch(function(err) {
			callback(err);
		});
	} else {
		callback(results);
	}
};



module.exports=tokenUtils;
