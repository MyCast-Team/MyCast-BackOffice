var Stringsummary=function(){};
Stringsummary.prototype.letterPair =function(str){
  if(str==null){
    return 0;
  }
  var numPair=str.length-1;
  var pairs=[];
  var i=0;
  for(i=0;i<numPair;i++){
    pairs[i]=str.substring(i,i+2);
  }
  return pairs;
};
Stringsummary.prototype.wordLetterPair =function(str){
var stringsum=new Stringsummary();
 if(str==null){
   return 0;
 }
 var allPair=[];
 var word=str.split("\\s");

 var i;
 for(i=0;i<word.length;i++){
   var pairsinWord=stringsum.letterPair(word[i]);
   for(var y=0;y<pairsinWord.length;y++){
     allPair.push(pairsinWord[y]);

   }
 }

 return allPair;
}
Stringsummary.prototype.compareString = function(str1,str2){
  if(str1==null || str2==null){
    return 0;
  }
  var stringsum=new Stringsummary();
  var pairs1=stringsum.wordLetterPair(str1.toUpperCase());
  var pairs2=stringsum.wordLetterPair(str2.toUpperCase());
  var intersection=0;
  var union=pairs1.length+pairs2.length;

  for(var i=0;i<pairs1.length;i++){
    var pair1=pairs1[i];
    for(var j =0;j<pairs2.length;j++){
      var pair2=pairs2[j];

      if(pair1==pair2){
        intersection++;
        pairs2.splice(j,1);

        break;
      }
    }
  }
  return (2.0*intersection)/union;
}


module.exports = Stringsummary;
