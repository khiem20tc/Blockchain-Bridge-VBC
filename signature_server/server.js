const dotenv = require("dotenv");
dotenv.config();
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();

const express = require('express');
const api_route = require('./router/api/index');
const user_route = require('./router/user/index');

const cors = require('cors');


//Connect db
require('./model/db');
//Start auto_admin server
// require('./process/auto_admin')

const app = express();
const port = process.env.PORT || 3000;

//Allow API call from the same local host
const corsOptions ={
    origin:'http://localhost:3006', 
    credentials:true,            
    optionSuccessStatus:200
}

app.use(cors(corsOptions));
//Parsing request body
//JSON format
app.use(bodyParser.json());
//URL encoded format
app.use(bodyParser.urlencoded({extended: true}));
//Multipart form data
app.use(upload.array());


app.use('/api', api_route);
app.use('/user', user_route);

app.listen(port, () => {
    console.log('Server is started on: ', port);
});