const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password = '123qwe';

bcrypt.genSalt(10, (err, salt) => {
   bcrypt.hash(password, salt, (err, hash) => {
      console.log(hash);
   });
});

var password1 = '$2a$10$zvp/jKlEYReIukjS62TA8eDQxjQmm9NRvGl0VZTwtb2T6njBkRcfK';

bcrypt.compare(password, password1, (err, res) => {
    console.log(res);
});

// var data = {
//     id: 10
// };
// var token = jwt.sign(data, '123qwe');
// console.log(token);
//
// var decode = jwt.verify(token, '123qwe');
// console.log(decode);

// var massege = 'I am user number 3';
// var hash = SHA256(massege).toString();
//
// console.log(`Nassege: ${massege}`);
// console.log(`Hash: ${hash}`);
//
// var data = {
//     id: 4
// };
//
// var token = {
//     data,
//     hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// };
//
// token.data.id = 5;
// token.hash =  SHA256(JSON.stringify(data)).toString();
//
// var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();
//
// if (resultHash === token.hash) {
//     console.log('Data not change');
// } else {
//     console.log('Data was change. Dont trust');
// }