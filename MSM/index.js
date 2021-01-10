const key = require('key-creator');
const accountSid='ACb7deb60013081e0e8498484dc51c3cb4';
const authToken='cbc9ceee3693a704c7b58a931d6e2dad';

//AC306b55b6d8abab1f13d7fb25dcf1443d
//bcbc1e37d75690bf8d8ec97661c199c8

const client = require('twilio')(accountSid, authToken);

console.log("hola mundo");
var minumero= "9614465502";
var lada="+52 "+"1"+" "+minumero;
client.messages
  .create({
     body: 'ahora ere el admin',
     from: '+18042698096',
     to:lada,
   })
  .then(message => console.log(message.sid));
  
  
  //2 de diciembre entrega del proyrecto
  //revision 22 de Nomvienbre 

var id = key.generate();
console.log("generator ",id);