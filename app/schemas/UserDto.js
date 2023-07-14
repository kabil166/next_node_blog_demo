const mongoose= require("mongoose");

const userSchema = mongoose.Schema({
    firstName:{
        type:String,
        requied:true
    },
    lastName:{
        type:String,
        requied:true
    },
    email:{
        type:String,
        requied:true
    },
    country:{
        type:String,
        requied:true
    },
    state:{
        type:String,
        requied:true
    },
    city:{
        type:String,
        requied:true
    },

    password:{
        type:String,
        requied:true
    }
    
});

export default mongoose.models.User || mongoose.model('User', userSchema);