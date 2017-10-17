# Art Reference

Create a RESTful api that helps to manage a list of art information.  Include scripts to load data.  Provide developer documentation to minimize on-boarding friction.  

## Getting Started

1. Fork the repo

  Sign in to your GitHub account and fork the following repo to your account:

  ```
  https://github.com/jrs-innovation-center/art-api-exam-nolist
  ```

2. Clone your fork

  Clone your fork to your local machine and install the project's dependencies.

  ```
  $ git clone <url>
  $ cd art-api-exam-nolist
  $ npm install
  ```

## Instructions and Grading Scale.

- Successfully complete the first 4 steps to receive a grade of 'Meets Expectations'. Complete step 5 to receive a grade of 'Exceeds Expectations'.  Complete step 6 to receive a grade of 'Outstanding'.

- Send your instructor a private direct message containing your repo url before the exam deadline.

- Check the grind channel in Slack for further instructions including exam deadline date and time.

> READ THESE INSTRUCTIONS TWICE.  READ THESE INSTRUCTIONS CAREFULLY.

## Step 1

- Using the existing file named **load-data.js**, create a program that adds the following paintings into a CouchDB database named `<your first name>Art`.  Ex:  `TripArt`:

  > Hint:  https://pouchdb.com/api.html#batch_create

- Create an npm script named `load` that runs your **load-data.js** program.  
- Test this program by running `npm run load` from your terminal.

  If you're interacting with CouchDB within IBM Bluemix/Cloudant, remember to keep your API key and password (secret) safe. Do not share on GitHub.  

  ```
  [
    {
      "_id": "painting_starry_night",
      "name": "The Starry Night",
      "type": "painting",
      "movement": "post-impressionism",
      "artist": "Vincent van Gogh",
      "yearCreated": 1889,
      "museum": {name: "Museum of Modern Art", location: "New York"}
    },
    {
      "_id": "painting_water_lilies_nympheas",
      "name": "Water Lilies Nympheas",
      "type": "painting",
      "movement": "impressionism",
      "artist": "Claude Monet",
      "yearCreated": 1907,
      "museum": {name: "Art Gallery of Ontario", location: "Toronto"}
    },
    {
      "_id": "painting_last_supper",
      "name": "The Last Supper",
      "type": "painting",
      "movement": "Renaissance",
      "artist": "Leonardo da Vinci",
      "yearCreated": 1495,
      "museum": {name: "Santa Maria delle Grazie", location: "Milan"}
    },
    {
      "_id": "painting_sunday_afternoon_on_the_island_of_la_grande_jatte",
      "name": "A Sunday Afternoon on the Island of La Grande Jatte",
      "type": "painting",
      "movement": "impressionism",
      "artist": "Georges Seurat",
      "yearCreated": 1884,
      "museum": {name: "Art Institute of Chicago", location: "Chicago"}
    },
    {
      "_id": "painting_guernica",
      "name": "Guernica",
      "type": "painting",
      "movement": "surrealism",
      "artist": "Pablo Picasso",
      "yearCreated": 1937,
      "museum": {name: "Museo Nacional Centro de Arte Reina Sofía", location: "Madrid"}
    },
    {
      "_id": "painting_bal_du_moulin_de_la_galette",
      "name": "Bal du moulin de la Galette",
      "type": "painting",
      "movement": "impressionism",
      "artist": "Pierre-Auguste Renoires",
      "yearCreated": 1876,
      "museum": {name: "Musée d’Orsay", location: "Paris"}
    }
  ]
  ```

## Step 2

Review the information below and create the described functionality.

> Your api should run on port 4000.

- Create a painting

  `POST  /paintings`  

  Creates a painting.  The request body must contain a JSON object that represents the painting being created.  The request body must include the `name`, `movement`, `artist`, `yearCreated`, and `museum` fields.  

  Use the `name` field in the creation of the `_id` value.  **DO NOT ALLOW** the articles "a" or "the" in the beginning of the name for the primary key value.

  > DO NOT ALLOW the articles "a" or "the" in the beginning of the name for the primary key value.  In the example below the name of the painting to create is "The Persistence of Memory".  When created the painting should have a primary key value of `_id: "painting_persistence_of_memory"`

  **Sample Request**

  ```
  POST /paintings
  ```

  **Sample Request Body JSON Data**

  ```
  {
    "name": "The Persistence of Memory",
    "movement": "surrealism",
    "artist": "Salvador Dali",
    "yearCreated": 1931,
    "museum": {name: "Museum of Modern Art", location: "New York"}
  }
  ```

  **Sample Response**

  ```
  {
    "ok": true,
    "id": "painting_persistence_of_memory",
    "rev": "1-c617189487fbe325d01cb7fc74acf45b"
  }
  ```

- Retrieve a painting

  `GET  /paintings/{id}`  

  Retrieves a specific painting as identified by the `:id` path parameter.

  **Sample Request**

  ```
  GET /paintings/painting_bal_du_moulin_de_la_galette
  ```

  **Sample Response**

  ```
  {
    "_id": "painting_bal_du_moulin_de_la_galette",
    "_rev": "1-c617189487fbe325d01cb7fc74acf45b",
    "name": "Bal du moulin de la Galette",
    "type": "painting",
    "movement": "impressionism",
    "artist": "Pierre-Auguste Renoires",
    "yearCreated": 1876,
    "museum": {name: "Musée d’Orsay", location: "Paris"}
  }
  ```

- Update a painting

  `PUT /paintings/{id}`  

  Updates a specific painting as identified by the `:id` path parameter.  The request body must contain a JSON object that represents the painting being updated.  The request body must include the `_id`, `_rev`, `name`, `movement`, `artist`, `yearCreated`, and `museum` fields.  Not providing the most recent `_rev` value will cause an `409 - conflict` error to occur.

  **Sample Request**

  ```
  PUT /paintings/painting_bal_du_moulin_de_la_galette
  ```

  **Sample Request Body JSON Data**

  ```
  {
    "_id": "painting_bal_du_moulin_de_la_galette",
    "_rev": "1-c617189487fbe325d01cb7fc74acf45b",
    "name": "Bal du moulin de la Galette",
    "type": "painting",
    "movement": "impressionism",
    "artist": "Pierre-Auguste Renoires",
    "yearCreated": 1877,
    "museum": {name: "Musée d’Orsay", location: "Paris"}
  }
  ```

  **200 Sample Response**

  ```
  {
    "ok": true,
    "id": "painting_bal_du_moulin_de_la_galette",
    "rev": "2-7e9b8cac710e70bfe0bef2de7bb3cfdb"
  }
  ```

- Delete a painting

  `DELETE /paintings/{id}`  

  Deletes a specific painting as identified by the `:id` path parameter.

  **200 Sample Request**

  ```
  DELETE /paintings/painting_bal_du_moulin_de_la_galette
  ```

  **Sample Response**

  ```
  {
      "ok": true,
      "id": "painting_bal_du_moulin_de_la_galette",
      "rev": "3-fdd7fcbc62477372240862772d91c88f"
  }
  ```

## Step 3 - Getting Started Documentation

Create developer on-boarding instructions by creating a **README.md** file.  Include the following sections.

### Getting Started

Within the **Getting Started** section of the readme provide guidance on how to:

  - Clone your repo
  - Install dependencies
  - Establish environment variables
  - Load your data.
  - Start the API
  - Make your first `GET` call within the browser.  

## Step 4 - Basics documentation

Within your readme, include a **Basics** section containing the following sections:

  > Hint:  https://apidocs.sky.blackbaud.com/docs/basics/

 - Base URL - All endpoints within the paitings are located at the following base URL
 - Scheme
 - HTTP Verbs
 - Content Types
 - Response Status Codes  - Include a listing of common successful and error status codes that a developer could encounter with _your API_.  Include the status code, a description of the status code, and specific code examples, including JSON request and response samples. For example, what causes a painting not to be found?  What causes a resource conflict when updating or adding a painting?  What causes a bad request?

### Step 5 - Artist CRUD

Enhance the api by supporting the ability to create, read, update, and delete artists.

  - `POST /artists`
  - `GET /artists/{id}`
  - `PUT /artists/{id}`
  - `DELETE /artists/{id}`

## Step 6 - Share code within libraries

Within the **lib** folder, refactor the following functionality into library files.

- **\lib\pk-generator.js** - Create a common primary key generator function.  Export the function from the NodeJS module.  Refactor your code to utilize the function.  

- **\lib\check-required-fields.js** - Create a function that checks the data within the incoming request body for POSTs and PUTs.  The function should accepts 2 parameters:  

  - An array of required fields/keys
  - An object containing request body

  The function should return an empty array if all required fields are present within the request body.  Otherwise return an array of missing fields. Export the function from the NodeJS module.  Refactor your code to utilize the function.  

  
