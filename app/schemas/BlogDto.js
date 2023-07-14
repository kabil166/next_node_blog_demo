const mongoose= require("mongoose");

const blogSchema = mongoose.Schema({
    title:{
        type:String,
        requied:true
    },
    content:{
        type:String,
        requied:true
    }
    
});

export default mongoose.models.Blog || mongoose.model('Blog', blogSchema);