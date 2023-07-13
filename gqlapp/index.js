const express = require('express')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
const cors = require('cors');
const cookieParser = require('cookie-parser');
const User = require('./models/User');
const passport = require('passport');
const auth = require('./routes/auth');
const user = require('./routes/user');
require('./passport');


const PORT=4000;

const app = express();

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(cors()); 
app.use(cookieParser());
app.use(passport.initialize());
app.use('/auth', auth);
app.use('/users', passport.authenticate('jwt', {session: false}), user);




app.post('/user/register', async (req, res) => {
    try {
        const input = req.body;
        const {firstName, lastName, email, country, state, city, password} = input;

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);
        const user = await User.create({firstName, lastName, email, country, state, city, password:hashedPassword});
        res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  });


app.listen(PORT,() => {
    console.log(`Server is running on port::${PORT}`);
  })