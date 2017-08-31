/**
 * Created by GreenElephaantt on 30.07.2017.
 */

const
  path = require('path'),
  fs = require('fs'),
  db={},
  pathToDb = path.join(__dirname,'db.json');


db.createConnection = () => {//oldCode
  try {
    fs.statSync(pathToDb);
    console.log('db.json exists');
  }
  catch (err) {

    if (err.code === 'ENOENT') {
      fs.openSync(pathToDb, 'w');
      fs.appendFileSync(pathToDb, '{}');
      fs.appendFileSync('log', 'db.json was created\n');
    } else {
      console.error('Some other error in dbMethods.createConnection: ', err.code);
    }
  }
};

db.set = async (data) => {
  writeFile(pathToDb, `${data}`);
};

db.getAll = () => {
  return new Promise((resolve)=>{
    fs.readFile(pathToDb,'utf8', (err, data) => {
      if (err) throw err;
      resolve(JSON.parse(data));
    });
  })
};


function writeFile(path, data){
  return new Promise((resolve)=>{
    fs.writeFile(path, data,(err)=>{
      if (err) throw err;
      resolve();
    });
  })
}

module.exports=db;