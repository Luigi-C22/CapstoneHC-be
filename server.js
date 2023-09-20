const express = require ('express');
const mongoose = require ('mongoose');
const PORT = 5050;
const cors = require('cors');
const path =  require('path');

require('dotenv').config();

//require delle routes
const postsRoute = require('./routes/posts');
const usersRoute = require('./routes/users');
const loginRoute = require('./routes/login');
const backofficeRoute = require('./routes/backoffice');
const app = express();

//middleware
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cors());


app.use(express.json());


//use delle routes
app.use('/', postsRoute);
app.use('/', usersRoute);
app.use('/', loginRoute);
app.use('/', backofficeRoute);

mongoose.connect(process.env.MONGO_DB_URL);



const db = mongoose.connection;
db.on('error', console.error.bind(console, "Errore di connessione al server!"));
db.once('open', ()=> {
    console.log('Database MongoDB connesso')
});

app.listen(PORT, ()=> console.log(`Server avviato e in ascolto sulla PORT ${PORT}`));