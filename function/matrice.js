var math = require('mathjs');
var matricesummary=function(){};
matricesummary.prototype.generatematrice=function(nbuser,nb,results){
  if(nbuser==null||nb==null||results==null){return 0;}
  var matrice = math.matrix();

  matrice.resize([nbuser, nb]);

  var matriceprime = math.matrix();
  matriceprime.resize([nb, nbuser]);

  for (var i = 0, len = results.length; i < len; i++) {
      var row = results[i];


      matrice.subset(math.index(row.idUser - 1, row.idFilm - 1), 1);
      matriceprime.subset(math.index(row.idFilm - 1, row.idUser - 1), 1);
  }
  var matrice3 = math.multiply(matriceprime, matrice);
  var matrice4 = math.multiply(matrice3, matriceprime);
  var matrice5 = math.transpose(matrice4);

  for (var i = 0, len = results.length; i < len; i++) {
      var row = results[i];
      if (matrice.subset(math.index(row.idUser - 1, row.idFilm - 1)) == 1) {
          matrice5.subset(math.index(row.idUser - 1, row.idFilm - 1), 0);
      }
  }
  return matrice5;
}

matricesummary.prototype.generatematricemusic=function(nbuser,nbmusique,results){
    if(nbuser==null||nbmusique==null||results==null){return 0;}
  var matrice = math.matrix();

  matrice.resize([nbuser, nbmusique]);

  var matriceprime = math.matrix();
  matriceprime.resize([nbmusique, nbuser]);

  for (var i = 0, len = results.length; i < len; i++) {
      var row = results[i];


      matrice.subset(math.index(row.iduser - 1, row.idmusique - 1), 1);
      matriceprime.subset(math.index(row.idmusique - 1, row.iduser - 1), 1);

  }
  var matrice3 = math.multiply(matriceprime, matrice);
  var matrice4 = math.multiply(matrice3, matriceprime);
  var matrice5 = math.transpose(matrice4);


  for (var i = 0, len = results.length; i < len; i++) {
      var row = results[i];
      if (matrice.subset(math.index(row.iduser - 1, row.idmusique - 1)) == 1) {
          matrice5.subset(math.index(row.iduser - 1, row.idmusique - 1), 0);
      }
  }
  return matrice5;
}



module.exports = matricesummary;
