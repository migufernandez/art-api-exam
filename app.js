require('dotenv').config()
const express = require('express')
const app = express()
const NodeHTTPError = require('node-http-error')
const port = process.env.PORT || 4000
const { prop, isEmpty, join, path } = require('ramda')
const {
  addPainting,
  getPainting,
  updatePainting,
  deletePainting,
  addArtist,
  getArtist,
  updateArtist,
  deleteArtist
} = require('./dal')
const bodyParser = require('body-parser')
const checkRequiredFields = require('./lib/check-required-fields')

app.use(bodyParser.json())

app.get('/', (req, res, next) =>
  res.status(200).send({
    message: 'Welcome to the Art API. Manage all the paintings for much win.'
  })
)

// PAINTINGS

app.post('/paintings', (req, res, next) => {
  const checkResults = checkRequiredFields(
    ['name', 'movement', 'artist', 'yearCreated', 'museum'],
    prop('body', req)
  )
  if (isEmpty(checkResults)) {
    addPainting(prop('body', req))
      .then(response => res.status(201).send(response))
      .catch(err => next(new NodeHTTPError(err.status, err.message)))
  } else {
    return next(
      new NodeHTTPError(
        400,
        `Missing required fields in Request Body', ${join(' ', checkResults)}`
      )
    )
  }
})

app.get('/paintings/:id', (req, res, next) => {
  const paintingID = path(['params', 'id'], req)
  getPainting(paintingID)
    .then(result => res.status(200).send(result))
    .catch(err => next(new NodeHTTPError(err.status, err.message)))
})

app.put('/paintings/:id', (req, res, next) => {
  if (req.params.id === req.body._id) {
    const checkResults = checkRequiredFields(
      [
        '_id',
        '_rev',
        'name',
        'movement',
        'type',
        'artist',
        'yearCreated',
        'museum'
      ],
      prop('body', req)
    )
    if (isEmpty(checkResults)) {
      updatePainting(prop('body', req))
        .then(updatePaintingResult =>
          res.status(200).send(updatePaintingResult)
        )
        .catch(err => next(new NodeHTTPError(err.status, err.message)))
    } else {
      return next(
        new NodeHTTPError(
          400,
          `Missing Requires Fields in Request body: ${join(',', checkResults)}`
        )
      )
    }
  } else {
    next(
      new NodeHTTPError(400, `Painting id in path does not match _id in body.`)
    )
  }
})

app.delete('/paintings/:id', (req, res, next) => {
  deletePainting(path(['params', 'id'], req))
    .then(result => res.status(200).send(result))
    .catch(err => next(new NodeHTTPError(err.status, err.message)))
})

// ARTISTS

app.post('/artists', (req, res, next) => {
  const checkResults = checkRequiredFields(
    ['artistName', 'placeOfBirth'],
    prop('body', req)
  )
  if (isEmpty(checkResults)) {
    addArtist(prop('body', req))
      .then(response => res.status(201).send(response))
      .catch(err => next(new NodeHTTPError(err.status, err.message)))
  } else {
    return next(
      new NodeHTTPError(
        400,
        `Missing required fields in Request Body', ${join(' ', checkResults)}`
      )
    )
  }
})

app.get('/artists/:id', (req, res, next) => {
  const artistsID = path(['params', 'id'], req)
  getArtist(artistsID)
    .then(result => res.status(200).send(result))
    .catch(err => next(new NodeHTTPError(err.status, err.message)))
})

app.put('/artists/:id', (req, res, next) => {
  if (req.params.id === req.body._id) {
    const checkResults = checkRequiredFields(
      ['artistName', 'placeOfBirth'],
      prop('body', req)
    )
    if (isEmpty(checkResults)) {
      updateArtist(prop('body', req))
        .then(updateArtistResult => res.status(200).send(updateArtistResult))
        .catch(err => next(new NodeHTTPError(err.status, err.message)))
    } else {
      return next(
        new NodeHTTPError(
          400,
          `Missing Requires Fields in Request body: ${join(',', checkResults)}`
        )
      )
    }
  } else {
    next(
      new NodeHTTPError(400, `Artist id in path does not match _id in body.`)
    )
  }
})

app.delete('/artists/:id', (req, res, next) => {
  deleteArtist(path(['params', 'id'], req))
    .then(result => res.status(200).send(result))
    .catch(err => next(new NodeHTTPError(err.status, err.message)))
})

// Error Handler

app.use((err, req, res, next) => {
  console.log('ERROR', err)
  res.status(err.status || 500).send(err)
})

app.listen(port, () => console.log('The best paintings on port ', port))
