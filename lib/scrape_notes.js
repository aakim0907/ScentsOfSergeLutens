let axios = require('axios');
let cheerio = require('cheerio');
let iconv = require('iconv-lite');

function scrapePerfume() {
  const baseUrl = 'http://www.basenotes.net/fragrancedirectory/?search=Serge+Lutens&s=hn';
  axios.get(baseUrl).then( response => {
    const $ = cheerio.load(response.data, { decodeEntities: true });
    const perfumes = [];
    $('tr', 'tbody').each( (i, ele) => {
      if (i % 2 !== 0) {
        perfumes.push( {
          name: iconv.decode($(ele).find('h3').text().split('  by')[0], 'ISO-8859-1'),
          url: $(ele).find('h3').find('a').attr('href')
        });
      }
    });
    return perfumes;
  })
  .then( perfumes => {
    console.log(perfumes);
  });
}

// scrapePerfume();

const perfumeList = {
  'Daim blond': {type: 'Resinous/Ambery', url: 'http://www.basenotes.net/ID26123573.html'},
  'Ambre Sultan': {type: 'Resinous/Ambery', url: 'http://www.basenotes.net/ID26120089.html'},
  'Chergui': {type: 'Resinous/Ambery', url: 'http://www.basenotes.net/ID26122261.html'},
  'Arabie': {type: 'Resinous/Ambery', url: 'http://www.basenotes.net/ID26120122.html'},
  'Fille en Aiguilles': {type: 'Resinous/Ambery', url: 'http://www.basenotes.net/ID26131037.html'},
  'Fýminitý du bois': {type: 'Woody/Chypre', url: 'http://www.basenotes.net/ID10213071.html'},
  'Santal Majuscule': {type: 'Woody/Chypre', url: 'http://www.basenotes.net/ID26136145.html'},
  'Cýdre': {type: 'Woody/Chypre', url: 'http://www.basenotes.net/ID26123582.html'},
  'Baptýme du Feu': {type: 'Gourmands', url: 'http://www.basenotes.net/ID26149551.html'},
  'Five O\'Clock Au Gingembre': {type: 'Gourmands', url: 'http://www.basenotes.net/ID26129356.html'},
  'Un Bois Vanille': {type: 'Gourmands', url: 'http://www.basenotes.net/ID26123012.html'},
  'Jeux de Peau': {type: 'Gourmands', url: 'http://www.basenotes.net/ID26132595.html'},
  'L\'Orpheline': {type: 'Mohair', url: 'http://www.basenotes.net/ID26143341.html'},
  'Clair de Musc': {type: 'Mohair', url: 'http://www.basenotes.net/ID26123008.html'},
  'Gris Clair': {type: 'Flora', url: 'http://www.basenotes.net/ID26123788.html'},
  'Fleurs d\'Oranger': {type: 'Flora', url: 'http://www.basenotes.net/ID26120626.html'},
  'ý la Nuit': {type: 'Flora', url: 'http://www.basenotes.net/ID10213051.html'},
  'Sa Majestý la Rose': {type: 'Flora', url: 'http://www.basenotes.net/ID10213052.html'},
  'Nuit de Cellophane': {type: 'Flora', url: 'http://www.basenotes.net/ID26130429.html'},
  'Vitriol d\'Oeillet': {type: 'Flora', url: 'http://www.basenotes.net/ID26133564.html'},
  'La Fille de Berlin': {type: 'Flora', url: 'http://www.basenotes.net/ID26138053.html'},
  'Datura Noir': {type: 'Flora', url: 'http://www.basenotes.net/ID26121795.html'},
  'La Religieuse': {type: 'Flora', url: 'http://www.basenotes.net/ID26145174.html'},
  'La Vierge de Fer': {type: 'Flora', url: 'http://www.basenotes.net/ID26140099.html'}
};

function scrapeNotes(obj) {
  Object.keys(obj).forEach( p => {
    let outer = [];
    const perfume = obj[p];

    axios.get(perfume['url']).then( response => {
      let inner = [];
      console.log(p);
      const $ = cheerio.load(response.data, { decodeEntities: true });
      $('div', '.notespyramid').each( (i, ele) => {
        inner.push(
          $(ele).find('li').text()
        );
      });
      return inner;
    })
    .then( inner => {
      console.log(inner);
      outer.concat(inner);
    });
  });
}

// scrapeNotes(perfumeList);

const updatedPerfumeList = {
  'Daim blond': {type: 'Resinous/Ambery', url: 'http://www.basenotes.net/ID26123573.html', notes: ['Hawthorn', 'Cardamom', 'Iris', 'Apricot Stone', 'Pallida', 'Musk', 'Heliotrope', 'Leather']},
  'Ambre Sultan': {type: 'Resinous/Ambery', url: 'http://www.basenotes.net/ID26120089.html', notes: ['Amber', 'Cistus', 'Vanilla']},
  'Chergui': {type: 'Resinous/Ambery', url: 'http://www.basenotes.net/ID26122261.html', notes: ['Hay sugar', 'Iris', 'Rose', 'Honey', 'Musk', 'Incense', 'Tobacco', 'Amber', 'Sandalwood']},
  'Arabie': {type: 'Resinous/Ambery', url: 'http://www.basenotes.net/ID26120122.html', notes: ['Candied mandarin peel', 'Dried figs', 'Dates', 'Cumin', 'Nutmeg', 'Clove', 'Balsamic resins', 'Tonka bean', 'Siamese benzoin', 'Myrrh', 'Cedarwood', 'Sandalwood']},
  'Fille en Aiguilles': {type: 'Resinous/Ambery', url: 'http://www.basenotes.net/ID26131037.html', notes: ['Pine needles', 'Vetiver', 'Sap', 'Laurel', 'Fir balsam', 'Frankincense', 'Candied fruit', 'Spice']},
  'Fýminitý du bois': {type: 'Woody/Chypre', url: 'http://www.basenotes.net/ID10213071.html', notes: ['Cedarwood', 'Floral Notes', 'Honeyed Notes']},
  'Santal Majuscule': {type: 'Woody/Chypre', url: 'http://www.basenotes.net/ID26136145.html', notes: ['Rose', 'Tonka Bean', 'Rosewood', 'Sandalwood', 'Cocoa']},
  'Cýdre': {type: 'Woody/Chypre', url: 'http://www.basenotes.net/ID26123582.html', notes: ['Cedarwood', 'Tuberose', 'Clove', 'Amber']},
  'Baptýme du Feu': {type: 'Gourmands', url: 'http://www.basenotes.net/ID26149551.html', notes: ['Scorched mandarin peel', 'Gingerbread', 'Osmanthus', 'Gunpowder', 'Castoreum', 'Woods']},
  'Five O\'Clock Au Gingembre': {type: 'Gourmands', url: 'http://www.basenotes.net/ID26129356.html', notes: ['Bergamot', 'Candied ginger', 'Honey', 'Patchouli', 'Pepper', 'Dark cocoa']},
  'Un Bois Vanille': {type: 'Gourmands', url: 'http://www.basenotes.net/ID26123012.html', notes: ['Beeswax', 'Caramelized benzoin', 'Bitter almond', 'Gaiac wood', 'Tonka bean', 'Black vanilla', 'Licorice', 'Sandalwood', 'Coconut milk']},
  'Jeux de Peau': {type: 'Gourmands', url: 'http://www.basenotes.net/ID26132595.html', notes: ['Bread note', 'Spices', 'Licorice', 'Apricot', 'Immortelle', 'Sandalwood', 'Woody notes', 'Amber']},
  'L\'Orpheline': {type: 'Mohair', url: 'http://www.basenotes.net/ID26143341.html', notes: ['Incense', 'Patchouli', 'Musk']},
  'Clair de Musc': {type: 'Mohair', url: 'http://www.basenotes.net/ID26123008.html', notes: ['Musk', 'Bergamot', 'Neroli', 'Tuscan iris']},
  'Gris Clair': {type: 'Flora', url: 'http://www.basenotes.net/ID26123788.html', notes: ['Lavender', 'Amber', 'Tonka beans', 'Iris', 'Dry wood', 'Incense']},
  // 'Fleurs d\'Oranger': {type: 'Flora', url: 'http://www.basenotes.net/ID26120626.html', notes: []},
  'ý la Nuit': {type: 'Flora', url: 'http://www.basenotes.net/ID10213051.html', notes: ['Green shoots', 'Clove', 'Moroccan jasmine', 'Indian jasmine', 'Egyptian jasmine', 'White honey', 'Benzoin', 'Musk']},
  'Sa Majestý la Rose': {type: 'Flora', url: 'http://www.basenotes.net/ID10213052.html', notes: ['Moroccan rose absolute', 'Gaiac wood', 'Clove', 'White honey', 'Musk']},
  'Nuit de Cellophane': {type: 'Flora', url: 'http://www.basenotes.net/ID26130429.html', notes: ['Mandarin', 'Apricot', 'Osmanthus', 'White flowers']},
  'Vitriol d\'Oeillet': {type: 'Flora', url: 'http://www.basenotes.net/ID26133564.html', notes: ['Carnation', 'Iris', 'Clove', 'Nutmeg', 'Cayenne', 'Black pepper', 'Pink pepper', 'Camphor', 'Woods']},
  'La Fille de Berlin': {type: 'Flora', url: 'http://www.basenotes.net/ID26138053.html', notes: ['Rose', 'Pepper', 'Amber', 'Musk', 'Patchouli']},
  'Datura Noir': {type: 'Flora', url: 'http://www.basenotes.net/ID26121795.html', notes: ['Mandarin', 'Lemon blossom', 'Osmanthus', 'Heliotrope', 'Tuberose', 'Vanilla', 'Coconut oil', 'Apricot', 'Myrrh', 'Bitter almond', 'Tonka bean', 'Musk']},
  'La Religieuse': {type: 'Flora', url: 'http://www.basenotes.net/ID26145174.html', notes: ['Jasmine', 'Incense', 'Civet', 'Musk']},
  'La Vierge de Fer': {type: 'Flora', url: 'http://www.basenotes.net/ID26140099.html', notes: ['Lily', 'Pear', 'Sandalwood']}
};

const types = ['Resinous/Ambery', 'Woody/Chypre', 'Gourmands', 'Mohair', 'Flora'],
      notes = {},
      links = [],
      perfumeObj = {
        'nodes': [],
        'links': []
      };

for (const key of Object.keys(updatedPerfumeList)) {
  const val = updatedPerfumeList[key];

  // Create nodes
  for (let i = 0; i < val['notes'].length; i++) {
    const keyNote = val['notes'][i];
    if (!Object.keys(notes).includes(keyNote)) {
      notes[keyNote] = [];
      perfumeObj['nodes'].push({'id': Object.keys(notes).indexOf(keyNote), 'name': keyNote, 'value': 0});
    }
    for (let j = 0; j < val['notes'].length; j++) {
      const subNote = val['notes'][j];
      if (!notes[keyNote].includes(subNote) && i !== j) {
        notes[keyNote].push(subNote);
        const temp = perfumeObj['nodes'].find(node => (
          node['name'] === keyNote
        ));
        temp['value']++;
      }
    }
  }

  // Create links
  for (let i = 0; i < val['notes'].length - 1; i++) {
    for (let j = i + 1; j < val['notes'].length; j++) {
      const firstNote = val['notes'][i],
            secondNote = val['notes'][j];
      const firstId = Object.keys(notes).indexOf(firstNote),
            secondId = Object.keys(notes).indexOf(secondNote),
            link = [firstId, secondId];

      const existingLink = links.find(l => {
        return l.includes(firstId) && l.includes(secondId);
      });
      if (typeof existingLink === 'undefined') {
        links.push(link);
        perfumeObj['links'].push({'source': link[0], 'target': link[1]});
      }
    }
  }
}

var jsonfile = require('jsonfile');
jsonfile.writeFile('lib/data.json', perfumeObj, function (err) {
  console.error(err);
});
