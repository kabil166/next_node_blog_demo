const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const jwtExtract = require('passport-jwt').ExtractJwt
const config = require('./config')
const User = require('./models/User')
const fs = require('fs')
const crypto = require('crypto')


const privateKey = fs.readFileSync('private.key', 'utf8');

function decryptToken(req) {
    const token = jwtExtract.fromAuthHeaderAsBearerToken()(req);
    const buffer = Buffer.from(token, 'base64');
    const decrypted = crypto.privateDecrypt(privateKey, buffer);
    return decrypted.toString('utf8');
  }
  
  const options = {
    jwtFromRequest: decryptToken,
    secretOrKey: config.jwtSecret
  };

passport.use(
    new JwtStrategy(options, async(payload,done)=>{

        try{
            const user = await User.findOne({where:{email:payload.email}})

            if(user){
                return done(null, user)
            }else{
                return done(null, false)
            }
        }catch(err){
            return done({message:"Unauthorized",err}, false)
        }
    })
)

module.exports = passport