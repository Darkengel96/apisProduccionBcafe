const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const port = process.env.port || 3000;

app.set('port', port);
//require('./db');

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(require('./routes'));
//app.get('/', (req, res) => {
//res.send('hello world api');

// })



app.listen(app.get('port'), () => {
    console.log('server is runnig on port:', app.get('port'));

})