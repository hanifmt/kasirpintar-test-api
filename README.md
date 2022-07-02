# Kasir Pintar Test - API

This repository is a sample api using node js to answer the test given by Kasir Pintar


## Installation

Install the dependencies and start the server. When you clonse the respository, cd into it and cd into one of the directories to start. Whichever one you pick is where you will run the following commands below. <project_directory> is the directory you've chosen.

- install
```
$ cd <project_directory>
$ npm install
```
- run server
```
$ npm run start
```

## Sample API Test

- login

`[POST] localhost:8000/api/user/login`

request body :
```
  {
    "email": "admin@mail.com"
    "password": "admin"
  }
```

- district by id

`[POST] localhost:8000/api/kecamatan/id`

request hearder [authorization] : `bearer ${token}`

request body :
```
  {
    "id": 1101010
  }
```

- district by kota_id

`[POST] localhost:8000/api/kecamatan/kota`

request hearder [authorization] : `bearer ${token}`

request body :
```
  {
    "kota_id": 1101
  }
```

