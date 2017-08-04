# Scents of Serge Lutens

[Scents of Serge Lutens](http://scentsd3.com) is a data visualization project showing the prevalence and links between fragrance notes of Serge Lutens' main-line perfumes that uses JavaScript, node.js library, d3.js library and HTML/CSS.

![main page][main]

## Main Features

- Scraped fragrance note information from [basenotes](http://www.basenotes.net) using `node.js`
- Rendered and connected nodes of fragrance notes using `d3.js`
- Implemented event handlers for dynamic and interactive visualization
- Displayed a shelf containing all of Serge Luten main-line perfumes

### Scraping data

`Node.js` was used along with `axios` and `cheerio` module to scrape fragrance notes data from [basenotes](http://www.basenotes.net). Additionally, `iconv-lite` module was used to interpret the unicode characters, and `jsonfile` module to compile the data into json format. A logic was implemented in this process to include the value (representing how many other fragrance notes it is connected to) of each node, and to create one link for each connection.

```js
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
```


// sample json data
{ "nodes":[
  ...
  {"id":5,"name":"Musk","value":40},
  {"id":6,"name":"Heliotrope","value":17},
  {"id":7,"name":"Leather","value":7},
  {"id":8,"name":"Amber","value":24},
  {"id":9,"name":"Cistus","value":2},
  ...
  ],
 "links":[
   {"source":0,"target":1},
   {"source":0,"target":2},
   {"source":0,"target":3},
   ...
   {"source":29,"target":30},
   {"source":29,"target":31},
   {"source":29,"target":32},
   ...
  ]
}
```

### Force-directed Graph
The data visualization renders each nodes of fragrance notes with its size relative to its value which represents the number of other fragrance notes they are connected to. Each nodes are connected if they are used in a perfume together. The users are allowed to drag the nodes to see which node connects with which nodes. Since there are too many links between the nodes, the users are also allowed to double click on each nodes to see only the nodes that are connected.

![interaction_gif][interaction]

```js
function connectedNodes() {
  if (toggle === 0) {
    const d = d3.select(this).node().__data__;
    node.style("opacity", function (o) {
      return neighboring(d, o) | neighboring(o, d) ? 1 : 0.1;
    });
    link.style("opacity", function (o) {
      return (d.index === o.source.index || d.index === o.target.index) ? 1 : 0.1;
    });
    label.style("opacity", function (o) {
      return neighboring(d, o) | neighboring(o, d) ? 1 : 0.1;
    });
    toggle = 1;
  } else {
    node.style("opacity", 1);
    link.style("opacity", 0.3);
    label.style("opacity", 0.8);
    toggle = 0;
  }
}
```

## Technologies
- Vanilla JavaScript and HTML/CSS for overall structure
- `Node.js` with `axios`, `cheerio`, `iconv-lite` and `jsonfile` for scraping data from the web
- `d3.js` for data compilation and visualization
- Webpack to bundle and serve up the various scripts


## Bonus features

Some anticipated updates to this project are:

- [ ] Add filters for different types of perfume
- [ ] Add interaction with the perfume images and the data visualization
- [ ] Add different lines of Serge Lutens perfume
- [ ] Display Top Notes, Heart Notes, and Base Notes distinctively
- [ ] Implement different visualization

[main]: ./docs/main_page.png
[interaction_gif]: ./docs/interaction.gif
