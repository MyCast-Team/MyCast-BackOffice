var models=require("../models");
var musiqueutils=function(singer,title,type,length,date){

	this.singer=singer;

	this.title=title;
	this.type=type;
	this.length=length;
	this.date=date;


}

musiqueutils.prototype.addmusique=function(u1,callback){
		var musique=models.musique;
		if(u1){
		musique.create({
			"singer":u1.singer,

			"title": u1.title,
			"type" : u1.type,
			"length":u1.length,
			"date":u1.date


		}).then(function(result){
			console.log("musique cr�er")
			callback(undefined,result)
		}).catch(function(err){
			console.log("musique pas cr�er")
		});


	}
}
musiqueutils.prototype.update=function(request,attributes,callback){
		var musique=models.musique;

		musique.find(request).then(function(results){
			if(results){

				results.updateAttributes(attributes).then(function(results){
					console.log("musique update");
					callback(undefined,results);


				}).catch(function(err){
					console.log("musique pas  update");
				})
			}else{
				console.log("pas de result")
			}

		}).catch(function(err){
			console.log(err);
		});

}
musiqueutils.prototype.delete = function(idmusique, callback) {
	var musique = models.musique;
	if(idmusique) {
		musique.find({
			"where" : {
				id : idmusique
			}
		}).then(function(result) {
			if(result) {
				result.destroy().then(function(success) {
					callback(success);
				}).catch(function(err) {
					callback(err);
				});
			} else {
				callback("error can't find "+idmusique);
			}
		}).catch(function(err) {
			callback(err);
		});
	} else {
		callback(results);
	}
};


module.exports=musiqueutils;
