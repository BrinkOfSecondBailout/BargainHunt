const express = require('express');
const cors = require('cors') 
const app = express();
const bodyParser = require('body-parser');

app.use(cors());

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
require('./config/mongoose.config');
require('./routes/user.route')(app);
require('./routes/item.route')(app);
require('./routes/cart.route')(app);
require('./routes/watchlist.route')(app);
require('./routes/inbox.route')(app);


app.listen(8000, () => {
    console.log("Listening at port 8000");
})