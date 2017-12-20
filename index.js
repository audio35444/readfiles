const fs = require('fs');

let arrTest = [
  {"start":"\/\/#start ","end":"\[\\s\\S\]\*\/\/#end "},
  {"start":"\/\/start ","end":"\[\\s\\S\]\*\/\/end "},
  {"start":"\/\/#s ","end":"\[\\s\\S\]\*\/\/#e "},
  {"start":"\/\/s ","end":"\[\\s\\S\]\*\/\/e "},
  {"start":"\/\/ ","end":""},
  {"start":"\/\/# ","end":""}
]
const reacurValidation=(data,searchTag,index,arrTestVal,callbackEdit) => {
  let regExpS =arrTestVal[index].start,
  regExpE=arrTestVal[index].end,
  regExpST=regExpS.trim(),
  regExpET=regExpE.trim(),
  regExpArr=[];
  regExpArr.push(regExpS+searchTag+regExpE+searchTag);
  regExpArr.push(regExpST+searchTag+regExpET+searchTag);
  regExpArr.push(regExpST+searchTag+regExpE+searchTag);
  regExpArr.push(regExpS+searchTag+regExpET+searchTag);
  regExpArr.push(regExpS+searchTag);
  regExpArr.push(regExpST+searchTag);
  let objRegExpToUse = null,
  i=0,
  regExpArrLength=regExpArr.length;
  for(;i<regExpArrLength;i++){
    let objRegExp = new RegExp(regExpArr[i],"g");
    if(objRegExp.test(data)){
      objRegExpToUse=objRegExp;
      break;
    }
  }
  if(!objRegExpToUse){
    index++;
    if(index >= arrTestVal.length)
    callbackEdit(objRegExpToUse);
    else reacurValidation(data,searchTag,index,arrTestVal,callbackEdit);
  }else {
    callbackEdit(objRegExpToUse);
  }
};

//inputFilePath => file to open
//newText => code to add in inputFilePath
//searchTag => they're compents in the code for applicate replace
//paramsVar => outputFilePath define destination file for do the pushing,doExistNewText verify the code existentce
const fileChanger = (inputFilePath,newText,searchTag='caster',paramsVar) => {
  if(!paramsVar)paramsVar={"outputFilePath":inputFilePath,"doExistNewText":false};
  else {
    if(!paramsVar.outputFilePath)paramsVar.outputFilePath=inputFilePath;
    if(!paramsVar.doExistNewText)paramsVar.doExistNewText=false;
  }
  fs.readFile(inputFilePath,'utf8',(err,data)=>{
    if(err)console.log(err);
    else {
      const callbackEdit = (objRegExpToUse)=>{
        if(objRegExpToUse){
          data = data.replace(objRegExpToUse,`//#start ${searchTag}
  `+newText+`
//#end ${searchTag}`);
          fs.writeFile(paramsVar.outputFilePath,data,'utf8',err=>console.log('save successful!'));
        }else console.log("Can't find the tag");
      };
      if(paramsVar.doExistNewText){
        console.log('ENTRO EN EL DOEXIST');
        let newTextNotSpaces =newText.replace(/\s/g,''),
        dataNotSpaces=data.replace(/\s/g,'');
        if(data.indexOf(newText)==-1){
          reacurValidation(data,searchTag,0,arrTest,callbackEdit);
        }else{
          console.log("it didn't add, because exist code!!" );
        }
      }else reacurValidation(data,searchTag,0,arrTest,callbackEdit);
    }
  })
};
// fileChanger('./prueba.js',`cosnt fun1 = ()=>{
//   console.log('desde ya muchas gracias');
// };
// console.log('desde ya muchas gracias');
// console.log('DESDE UN PUNTO DE VISgadgafagafagafsadjwhdkjkwhdwkjhdkjwhkjTA TEOIRICO ESTO ES BUENO')`,'emma',{"doExistNewText":true});

module.exports.fileChanger = fileChanger;
