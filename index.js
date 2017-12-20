const fs = require('fs');

fs.readFile('./prueba.js','utf8',(err,data)=>{
  if(err)console.log(err);
  else {
    console.log(data);
    data = data.replace(/\/\/#start caster[\s\S]*\/\/#end caster/g,`//#start caster
cosnt fun1 = ()=>{
  console.log('desde ya muchas gracias');
};
console.log('desde ya muchas gracias');
//#end caster`);
      console.log(data);
      fs.writeFile('./resultado.js',data,'utf8',err=>console.log('save successful!'));
  }
})
