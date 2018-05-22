const fs = require('fs');

const arrayOfUsers = [];

for (let i = 0; i <= 1e6; i += 1) {
  arrayOfUsers.push({
    firstName: 'Barb',
    lastName: 'E. Riser',
    status: 'unregistered',
    updatedOn: '2017-01-17T13:24:51.403Z',
    createdOn: '2017-01-17T13:24:51.403Z',
    googleLocation: {
      loc: {
        coordinates: [null, null],
      },
    },
  });
}

// write data to file
fs.writeFile(`${__dirname}/largeUsers.json`, JSON.stringify(arrayOfUsers), (err) => {
  if (err) {
    console.error(err);
    console.log('Error ocured, exiting...');
    process.exit(-1);
  }

  console.log('Write to file successfully. Exiting now..');
  process.exit(0);
});
