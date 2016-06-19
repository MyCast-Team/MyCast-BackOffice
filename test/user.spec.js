var request = require("supertest-session");
var api=require("../index.js");


describe('user',function(){
	describe('GET /',function(){
		it("should return a webpage", function(){
			return request(api).get('/').send().expect(200);
		})
	})
	
	describe("POST /connection",function(){
		it("should generate token", function(){
			var data={login: 'test',password: 'test2016'};
			return request(api).post('/connection').type('form').send(data).expect(200).end(function(err,res){
				 if (err) return done(err);
					done();
			});
			  
		})
		it("should not be authorized to create a new contact with a registered id", function(done){
			return request(api).post('/connection').type('form').send({ login: 'test', password: 'test2016' }).expect(200).expect({
			  "code": 2,
      "error": {
          "errors": [
            {
              "message": "PRIMARY must be unique",
              "path": "PRIMARY",
             "type": "unique violation",
             "value": "6",
           }
         ],
         "fields": {
           "PRIMARY": "6",
         },
         "message": "Validation error",
         "name": "SequelizeUniqueConstraintError",
       },
       "message": "Sequelize error"
			
			}).end(function(err,res){
				 if (err) return done(err);
					done();
			});
		})
	})
	describe("GET /ListeUser",function(){
		it("should not display a list of user", function(){
			return request(api).get('/ListeUser').send().expect(200).expect(
			'<html>\r\n    <head>\r\n        <link href="/css/bootstrap.css" rel="stylesheet">\r\n\t\r\n        <title>WebApp</title>\r\n    </head>\r\n    <body>\r\n        <div>\r\n\r\n            <ul class="nav nav-tabs">\r\n                <li><a href="/ListeUser">Liste Users</a></li>\r\n                <li><a href="/ListeFilm">Liste Films</a></li>\r\n                <li><a href="/ListeMusique">Liste Musiques</a></li>\r\n                <li><a href="/ListeAdmin">Liste Administrateurs</a></li>\r\n                <li><a href="/ListePlugin">Liste Plugins</a></li>\r\n\t\t\t\t\t<li><a href="/Deco">Deconnexion</a></li>\r\n            </ul>\r\n        </div>\r\n        No token provided.\r\n        <form method="post" id="data"  action="/connection">\r\n           Login <input type="text" name="login">\r\n           Mot de passe <input type="password" name="password">\r\n           <input type="submit" id="form" value="valider">\r\n        </form>\r\n    </body>\r\n</html>\r\n'
			);
		})
		
	})
	describe("DELETE /Deco",function(){
		it("should delete token", function(done){
			return request(api).delete('/Deco').type('form').send({token :"eyJhbGciOiJIUzI1NiJ9.Ng.hAGbSbFGDZMTqtfa7xzAVtf3ThZF_6KOJYjRVcFPaYI"}).expect(
			'<html>\r\n    <head>\r\n        <link href="/css/bootstrap.css" rel="stylesheet">\r\n\t\r\n        <title>WebApp</title>\r\n    </head>\r\n    <body>\r\n        <div>\r\n\r\n            <ul class="nav nav-tabs">\r\n                <li><a href="/ListeUser">Liste Users</a></li>\r\n                <li><a href="/ListeFilm">Liste Films</a></li>\r\n                <li><a href="/ListeMusique">Liste Musiques</a></li>\r\n                <li><a href="/ListeAdmin">Liste Administrateurs</a></li>\r\n                <li><a href="/ListePlugin">Liste Plugins</a></li>\r\n\t\t\t\t\t<li><a href="/Deco">Deconnexion</a></li>\r\n            </ul>\r\n        </div>\r\n          <form method="post" id="data"  action="/connection">\r\n           Login <input type="text" name="login">\r\n           Mot de passe <input type="password" name="password">\r\n           <input type="submit" id="form" value="valider">\r\n        </form>\r\n    </body>\r\n</html>\r\n'
			
			).end(function(err,res){
				
					done();
			});
		})		
	})
	/*
	describe("DELETE api/contacts/:name",function(){
		it("should delete a  contact with the same name", function(){
			return request(api).delete('/contacts/foo').send().expect(200);
		})
		
	})*/
});

