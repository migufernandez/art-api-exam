const pkGen = require('./lib/pk-generator')
const PouchDB = require('pouchdb')
const { compose, concat, replace, toLower, prop } = require('ramda')
const db = new PouchDB(process.env.COUCH_URL + process.env.COUCH_DB)

// PAINTINGS

const addPainting = painting => {
  // const removeArticles = splitString => {
  //   const paintingArr = split(' ', painting.name)
  //   if (head(paintingArr) === 'The' || head(paintingArr) === 'A') {
  //     return drop(1, paintingArr)
  //   } else {
  //     return paintingArr
  //   }
  // }
  // const newID = compose(
  //   concat('painting_'),
  //   replace(/ /gi, '_'),
  //   toLower(),
  //   join(' '),
  //   removeArticles,
  //   split(' ')
  // )(painting.name)

  painting._id = pkGen('painting', '_', painting.name)
  painting.type = 'painting'
  return db.put(painting)
}

const getPainting = id => db.get(id)
const updatePainting = painting => db.put(painting)
const deletePainting = paintingID =>
  db.get(paintingID).then(doc => db.remove(doc))

// ARTISTS

const addArtist = artist => {
  const newArtistID = compose(
    concat('artist_'),
    replace(/ /gi, '_'),
    toLower()
  )(prop('artistName', artist))

  artist._id = newArtistID
  artist.type = 'artist'

  return db.put(artist)
}
const getArtist = id => db.get(id)
const updateArtist = artist => db.put(artist)
const deleteArtist = artistID => db.get(artistID).then(doc => db.remove(doc))

module.exports = {
  addPainting,
  getPainting,
  updatePainting,
  deletePainting,
  addArtist,
  getArtist,
  updateArtist,
  deleteArtist
}
