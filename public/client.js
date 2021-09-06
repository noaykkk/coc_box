const clashApi = require('clash-of-clans-api')

const COC_API_TOKEN = process.env.COC_API_TOKEN;
module.exports = clashApi({
  token: COC_API_TOKEN 
});

// async function showClanByTag(tag) {
//   client
//   .clanCurrentWarByTag(tag)
//   .then(response => console.log(response))
//   .catch(err => console.log(err));
//   }
  
//   showClanByTag('#9RPJR8LL')
//   // JSON.stringify(response)
// // #298PY2GQL