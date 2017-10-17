# miguel-paintings-api

Manages a list of great paintings selected by Miguel.

## Getting started

Clone the repo, install dependencies, create env variables, create data base, load data, start de api.

```
$ git clone https://github.com/migufernandez/art-api-exam-nolist.git
$ cd project directory
$ npm install

```

### Create environment variables

- Create a file named **.env** containing the following environment variables:
 - PORT=4000
 - COUCH_DB=NAMEOFTHEDATABASE
 - COUCH_URL=http://key:password@url

### Load data

// in the script ()
```
$ npm run load
```

###  Start API
- start de API on port 4000

```
$ npm start
```

- Open your browser: http://localhost:4000 and view the welcome message.
- Grab a painting. Browse to http://localhost:4000/paintings/painting_persistence_of_memory

## BASICS GUIDE

### Base URL

- http://localhost:4000

### Routes

- /paintings - This is the path to all paintings
- /paintings/painting_guernica - This is the path to an specific painting{:id}
- /artists - This is the path to all artists
- /artists/artist_el_greco - This is the path to an specific artist{:id}

### Scheme

### HTTP verbs

- POST - The HTTP POST method sends data to the server. The type of the body of the request is indicated by the Content-Type header.
- GET - The HTTP GET method requests a representation of the specified resource. Requests using GET should only retrieve data.
- PUT - The HTTP PUT request method creates a new resource or replaces a representation of the target resource with the request payload.
- DELETE - The HTTP DELETE request method deletes the specified resource.

### Content type

- application JSON

### Response status Codes

- 200 - OK: The request has succeeded.
- 201 - Created: The request has succeeded and a new resource has been created as a result of it.
- 400 - Bad request: This response means that server could not understand the request due to invalid syntax.
- 404 - Not Found: The server can not find requested resource. In the browser, this means the URL is not recognized.
- 409 - Conflict: This response is sent when a request conflicts with the current state of the server.
- 500 - Internal Server Error: The server has encountered a situation it doesn't know how to handle.



## Endpoints

## PAINTINGS

## Create a painting

`POST  /paintings`  

Creates a painting.

**Example**

```
POST /paintings
```

**Sample Request Body JSON Data**

```
{
  {
    "name": "Guernica",
    "movement": "surrealism",
    "artist": "Pablo Picasso",
    "yearCreated": 1937,
    "museum": {
      "name": "Museo Nacional Centro de Arte Reina Sofía",
      "location": "Madrid"
    }
  }
}
```

**Sample Response**

```
{
  "ok": true,
  "id": "painting_guernica",
  "rev": "1-c617189487fbe325d01cb7fc74acf45b"
}
```
## Grab a painting

`GET/ paintings/{id}`

Retrieves a specific painting as identified by the `:id` path parameter.

**Example**

```
GET /paintings/painting_guernica
```

**Sample Response**

```
{
  "_id": "painting_guernica",
  "_rev": "1-5b3a61d71e6c4fc1542e1ccc66ed50dd",
  "name": "Guernica",
  "type": "painting",
  "movement": "surrealism",
  "artist": "Pablo Picasso",
  "yearCreated": 1937,
  "museum": {
    "name": "Museo Nacional Centro de Arte Reina Sofía",
    "location": "Madrid"
  }
}
```

## Update a painting

`PUT /paintings/{id}`

Updates a specific painting as identified by the `:id` path parameter.

**Example**

```
PUT /paintings/painting_guernica
```

**Sample Request Body JSON Data**

```
{
  "_id": "painting_guernica",
  "rev": "3-540052b9c70863c2f0c90cf9e534d7f6",
  "name": "GuernicaAAAAAAA",
  "type": "painting",
  "movement": "surrealism",
  "artist": "Pablo Picasso",
  "yearCreated": 1937,
  "museum": {
    "name": "Museo Nacional Centro de Arte Reina Sofía",
    "location": "Madrid"
  }
}
```

**200 Sample Response**

```
{
"ok": true,
"id": "painting_guernica",
"rev": "3-540052b9c70863c2f0c90cf9e534d7f6"
}
```

## Delete a painting

`DELETE /paintings/{id}`  

Deletes a specific painting as identified by the `:id` path parameter.

**200 Sample Request**

```
DELETE /paintings/painting_guernica
```

**Sample Response**

```
{
    "ok": true,
    "id": "painting_guernica",
    "rev": "3-fdd7fcbc62477372240862772d91c88f"
}
```
## ARTISTS

## create an Artist

- `POST /artists`

Creates an artist.

**Example**

```
POST /artists
```

**Sample Request Body JSON Data**

```
{

    "artistName": "Pablo Picasso",
    "placeOfBirth": "Madrid Capital",
    "type": "artist"
}
```

**Sample Response**

```
{
  "ok": true,
  "id": "artist_pablo_picasso",
  "rev": "1-c617189487fbe325d01cb7fc74acf45b"
}
```

## Grab an Artist

- `GET /artists/{id}`

Retrieves a specific painting as identified by the `:id` path parameter.

**Example**

```
GET /artists/artist_pablo_picasso
```

**Sample Response**

```
{
    "_id": "artist_pablo_picasso",
    "_rev": "1-5abd516e821edad2630bca67f2f63035",
    "artistName": "Pablo Picasso",
    "placeOfBirth": "Madrid Capital",
    "type": "artist"
}
```


## Update an Artist

- `PUT /artists/{id}`

Updates a specific painting as identified by the `:id` path parameter.

**Example**

```
PUT /artists/artist_pablo_picasso
```

**Sample Request Body JSON Data**

```
{
    "_id": "artist_pablo_picasso",
    "_rev": "1-5abd516e821edad2630bca67f2f63035",
    "artistName": "Pablo Picasso",
    "placeOfBirth": "Madrid Capital",
    "type": "artist"
}
```

**200 Sample Response**

```
{
"ok": true,
"id": "artist_el_greco",
"rev": "3-540052b9c70863c2f0c90cf9e534d7f6"
}
```

## Delete an Artist

- `DELETE /artists/{id}`

Deletes a specific painting as identified by the `:id` path parameter.

**200 Sample Request**

```
DELETE /artist_pablo_picasso
```

**Sample Response**

```
{
    "ok": true,
    "id": "artist_pablo_picasso",
    "rev": "3-fdd7fcbc62477372240862772d91c88f"
}
```
