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
</br>
`[POST] localhost:8000/api/user/login`
</br>
request body :
```
  {
    "email": "admin@mail.com"
    "password": "admin"
  }
```

- district by id
</br>
`[POST] localhost:8000/api/kecamatan/id`
</br>
request hearder [authorization] : `bearer ${token}`
</br>
request body :
```
  {
    "id": 1101010
  }
```

- district by kota_id
</br>
`[POST] localhost:8000/api/kecamatan/id`
</br>
request hearder [authorization] : `bearer ${token}`
</br>
request body :
```
  {
    "kota_id": 1101
  }
```

