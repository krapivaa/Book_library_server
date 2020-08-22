require('dotenv').config();
let express = require('express');
let app = express();

let sequelize = require('./db');

let list = require('./controllers/booklistcontroller')
let user = require('./controllers/usercontroller');


sequelize.sync();

app.use(express.json());
app.use(require('./middleware/headers'));

app.use('/api/user', user);
app.use('/api/booklist', list);

app.listen(3007, function() {
    console.log('App is listening on port 3007');
}); 