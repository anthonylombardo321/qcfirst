const express = require('express');
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient;
var path = require('path');
const app = express();

const connectionString = 'process.env.mongodb+srv://qcfirst:qcfirst@qcfirst.psuax.mongodb.net/qcFirst?retryWrites=true&w=majority'
console.log("Server Running");

MongoClient.connect(connectionString, { useUnifiedTopology: true })

.then(client => {
  console.log('Connected to Database')
  const db = client.db('qcFirst')
  const students = db.collection('students')
  const teachers = db.collection('teachers')
  const classes = db.collection('classes')

  // ======================
  // Middlewares
  // ======================
  app.use(bodyParser.urlencoded({ extended: true }))

  app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html")
  })

  app.post('/studentsignup', (req, res) => {
    students.insertOne(req.body)
    .then(result => {
      res.redirect('/')
    })
    .catch(error => console.error(error))
  })

  app.post('/teachersignup', (req, res) => {
    teachers.insertOne(req.body)
    .then(result => {
       res.redirect('/')
    })
    .catch(error => console.error(error))
  })

  app.listen(3000, () => {
    console.log('App listening on port 3000');
  });
  
})


/* Sources
https://zellwk.com/blog/crud-express-mongodb/
https://stackoverflow.com/questions/18088034/how-to-go-up-using-dirname-in-the-folder-hierarchy
*/
