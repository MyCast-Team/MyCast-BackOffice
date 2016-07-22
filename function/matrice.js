var math = require('mathjs');
var matricesummary=function(){};
matricesummary.prototype.generatematrice=function(resultuser,resultmovie,results){
  if(resultuser==null||resultmovie==null||results==null){return 0;}
  var matrice = math.matrix();

  matrice.resize([resultuser.length, resultmovie.length]);

  var tabuserid=[];
  var tabfilmid=[];

  var matriceprime = math.matrix();
  matriceprime.resize([resultmovie.length, resultuser.length]);

  for(var t=0,len=resultuser.length;t<len;t++){
      var row = resultuser[t];


      if(tabuserid.indexOf(row.id)==-1){
        tabuserid.push(row.id);
      }

  }
  for(var t=0,len=resultmovie.length;t<len;t++){
      var row = resultmovie[t];


      if(tabfilmid.indexOf(row.id)==-1){
        tabfilmid.push(row.id);
      }

  }

  for (var i = 0, len = results.length; i < len; i++) {
      var row = results[i];


      matrice.subset(math.index(tabuserid.indexOf(row.idUser),tabfilmid.indexOf(row.idFilm)), 1);
      matriceprime.subset(math.index(tabfilmid.indexOf(row.idFilm),tabuserid.indexOf(row.idUser)), 1);
  }

    var matrice3 = math.multiply(matriceprime, matrice);
  var matrice4 = math.multiply(matrice3, matriceprime);
  var matrice5 = math.transpose(matrice4);

  for (var i = 0, len = results.length; i < len; i++) {
      var row = results[i];

      if (matrice5.subset(math.index(tabuserid.indexOf(row.idUser),tabfilmid.indexOf(row.idFilm))) >1) {
          matrice5.subset(math.index(tabuserid.indexOf(row.idUser),tabfilmid.indexOf(row.idFilm)), 0);
      }
  }
  console.log(matrice5);

  return matrice5;
}

matricesummary.prototype.generatematricemusic=function(resultuser,resultmusic,results){
    if(resultuser==null||resultmusic==null||results==null){return 0;}
  var matrice = math.matrix();
  var tabuserid=[];
  var tabmusicid=[];
  matrice.resize([resultuser.length, resultmusic.length]);

  var matriceprime = math.matrix();
  matriceprime.resize([resultmusic.length,resultuser.length]);
  for(var t=0,len=resultuser.length;t<len;t++){
      var row = resultuser[t];


      if(tabuserid.indexOf(row.id)==-1){
        tabuserid.push(row.id);
      }

  }
  for(var t=0,len=resultmusic.length;t<len;t++){
      var row = resultmusic[t];


      if(tabmusicid.indexOf(row.id)==-1){
        tabmusicid.push(row.id);
      }

  }
  for (var i = 0, len = results.length; i < len; i++) {
      var row = results[i];


      matrice.subset(math.index(tabuserid.indexOf(row.idUser),tabmusicid.indexOf(row.idmusique)), 1);
      matriceprime.subset(math.index(tabmusicid.indexOf(row.idmusique),tabuserid.indexOf(row.idUser)), 1);

  }
  var matrice3 = math.multiply(matriceprime, matrice);
  var matrice4 = math.multiply(matrice3, matriceprime);
  var matrice5 = math.transpose(matrice4);


  for (var i = 0, len = results.length; i < len; i++) {
      var row = results[i];
      if (matrice.subset(math.index(tabuserid.indexOf(row.idUser),tabmusicid.indexOf(row.idmusique))) >1) {
          matrice5.subset(math.index(tabuserid.indexOf(row.idUser),tabmusicid.indexOf(row.idmusique)), 0);
      }
  }
  return matrice5;
}



module.exports = matricesummary;
