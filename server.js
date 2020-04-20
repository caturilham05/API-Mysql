const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

//* Manggil Models Index
const db = require('./app/models');

const app = express();

let whiteList = [
    'http://localhost:8081',
];

let corsOption  = {
    origin: function(origin, callback){
        if(whiteList.indexOf(origin) !== -1 || !origin){
            callback(null, true);
        }else{
            callback(new Error('Not Allowed By CORS'));
        }
    }
}

app.use(cors(corsOption));

//*parse request appication/json x-www-form-urlencode(Supaya Bisa Upload Gambar atau File)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//*sinkronasi database
db.sequelize.sync();

app.get('/', (req, res) =>{
    res.json({
        message: "Welcome To Mysql"
    })
})

//*post routes
require('./app/routes/post.routes')(app);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () =>{
    console.log(`Server Berjalan Di http://localhost:${PORT}`);
})