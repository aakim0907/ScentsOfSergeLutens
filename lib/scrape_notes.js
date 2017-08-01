let axios = require('axios');
let cheerio = require('cheerio');

let base_url = 'http://www.basenotes.net/fragrancedirectory/?search=Serge+Lutens&s=hn';

axios.get(base_url).then( (response) => {
  let $ = cheerio.load(response.data);
  let perfumes = [];
  $('tr', 'tbody').each( (i, ele) => {
    if (i % 2 !== 0) {
      perfumes.push( {
        name: $(ele).find('h3').text().split('  by')[0],
        url: $(ele).find('h3').find('a').attr('href')
      });
    }
  });
  return(perfumes);
})
.then ( perfumes => {
  console.log(perfumes);
});
