## Scents of Serge Lutens

### Background

Serge Lutens is a well-known perfume brand launched by Serge Lutens, who is a French photographer, filmmaker, hair stylist, perfume art-director and fashion designer. Some fragrances like Ambre sultan, Tubéreuse criminelle, Cuir mauresque have made the brand write a new page in the History of Fragrances. Inspired by their unique and deep fragrances, this project will visualize the scents of Serge Lutens using D3.js and Node.js.

### Minimum Viable Product (MVP)

- [ ] Scrape note information using Node.js
- [ ] Visualize and connect nodes of fragrance notes using D3.js
- [ ] Implement on-hover & on-click event handlers on data visualization
- [ ] Implement filters for different types (Ambery / Gourmands / Mohair / Floral / Woody) and display prevalent notes
- [ ] Display a shelf of Serge Luten main-line perfumes
- [ ] A production Readme

### Architecture and Technologies

This project will be implemented with the following technologies:

- Vanilla JavaScript and `jquery` for overall structure,
- `Node.js` for scraping notes data from the web,
- `d3.js` for data compilation and visualization,
- Webpack to bundle and serve up the various scripts.

### Implementation Timeline

**Day 1**
- Setup all necessary Node modules, including getting webpack up and running and installing `Node.js` and `d3.js`
- Create `webpack.config.js` as well as `package.json`
- Write a basic entry file and the bare bones of all scripts outlined above
- Learn how to use Node.js and d3.js and figure out the most suitable data format

**Day 2**
- Scrape fragrance notes data from basenotes.com
- Render fragrance notes in nodes and make connections per perfume
- Display the node of each fragrance notes' size relative to its prevalence

**Day 3**
- Add event handlers on nodes and connections (hover & click & drag)
- Build shelf of Serge Lutens perfumes

**Day 4**
- Link images of each perfume to a specific connection in data vizualization
- Add filters each rendering its own visualization

### Bonus features

Some anticipated updates to this project are:

- [ ] Add different lines of Serge Lutens perfume
- [ ] Display Top Notes, Heart Notes, and Base Notes distinctively
- [ ] Implement different visualization
