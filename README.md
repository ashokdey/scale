### Large file to DB

#### Problem statement

Given a large `JSON` file, fetch records and save in DB

##### Tech Stack

* Node
* MongoDB
* Express
* Mongoose

##### How to USE

* Run `node createLargeFile.js` to create a JSON file of 190 MB containing 1 million records
* Run `mongod` to start MongoDB Server
* Run `node scriot.js` to start import from file to DB

#### Note:

Currently the `BATCH_INSERT_VALUE` in `config.json` is set to **1000** (Best value for batch insert according to completion time of `script.js`)
