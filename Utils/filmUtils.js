var models=require("../models");

var filmutils=function(name,director,date,length,type){

	this.name=name;
	this.director=director;
	this.date=date;
	this.type=type;
	this.length=length


}

filmutils.prototype.addfilm=function(u1,callback){
		var film=models.film;
		if(u1){
		film.create({
			"name":u1.name,
			"director" : u1.director,
			"date": u1.date,
			"type": u1.type,
			"length":u1.length


		}).then(function(result){
			console.log("film creer")
			callback(undefined,result)
		}).catch(function(err){
			console.log("film pas creer")
			callback(err,undefined)
		});


	}
}
filmutils.prototype.update=function(request,attributes,callback){
		var film=models.film;

		film.find(request).then(function(results){
			if(results){

				results.updateAttributes(attributes).then(function(results){
					console.log("film update");
					callback(results);


				}).catch(function(err){
					console.log("film pas  update");
				})
			}else{
				console.log("pas de result")
			}

		}).catch(function(err){
			console.log(err);
		});

}
filmutils.prototype.delete = function(idfilm, callback) {
	var film = models.film;
	if(idfilm) {
		film.find({
			"where" : {
				id : idfilm
			}
		}).then(function(result) {
			if(result) {
				result.destroy().then(function(success) {
					callback(success);
				}).catch(function(err) {
					callback(err);
				});
			} else {
				callback("error can't find "+idfilm);
			}
		}).catch(function(err) {
			callback(err);
		});
	} else {
		callback(results);
	}
};

module.exports=filmutils;
