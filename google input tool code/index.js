//JAVASCRIPT DEFAULT GOOGLE INPUT TOOL
let googleTransliterate = require('google-input-tool');

//SHORT CODE TO TRANSLATE THE LANGUAGE INTO BENGALI
let inputLanguage = 'bn-t-i0-und';

//MAX OUTPUT RESULT OF A WORD IS 12 CHARACTER
let maxResult = 12;
//HELP OF THE XHR2, THE XML REQUEST SENDS TO THE SERVER
let XMLHttpRequest = require('xhr2');
let request = new XMLHttpRequest();
//TO READ AND WRITE ANYTHING FROM FILE, USED NPM DEFAULT FILESYSTEM
const fs = require('fs');
const trans = [];
const convert_trans = [];

//READ FILE USING FILE SYSTEM
fs.readFile('Input.txt', (err, data) => {
    if (err) throw err;
    //READ A PARTICULAR WORD BY SPLITTING SPACE
    const result = data.toString().split(/\r?\n/);
    //result.forEach(myFunction);
    for(let i =0;i<result.length;i++){
        if(result[i] !==''){
            trans.push(result[i])
        }
    }
    //AFTER SPLITTING THE WORDS,CALL A FUNCTION
    myFunction();
})
 async function myFunction() {
      for (let x=0; x<=trans.length;x++){
         let sourceText = trans[x];
          if(sourceText !== undefined){
              //TRANSLITERATION THE WORDS USING GOOGLE INPUT
              await googleTransliterate(request, sourceText, inputLanguage, maxResult)
                  .then(function (response) {
                      let result = response[0][0]
                      //TRANSLITERATION THE WORDS, POSSIBLE 5 OUTPUTS
                      let fine_trans= sourceText + "," + result + ","+ response[1][0]+ ","+ response[2][0]+","+ response[3][0]+","+  response[4][0]
                      convert_trans.push(fine_trans)
                      console.log(x);
                  });
          }
      }
     //GETTING THE RESULTS, CALLING A FUNCTION TO WRITE IT
     myFunction2();
}
function myFunction2() {
    for (let y=0; y<=convert_trans.length;y++){
        if(convert_trans[y] !== undefined){
            //WRITE THE GOOGLE INPUT RESULTS
            fs.appendFile('inputResult.txt',  convert_trans[y]+"\n", function (err) {
                if (err) {
                    return console.error(err);
                }
            });
        }
    }
}
