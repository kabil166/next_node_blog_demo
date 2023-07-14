import mongoose from "mongoose";

global.mongoose = {
    conn: null,
    promise:null
}

const connectToDb = async ()=>{
    if (global?.mongoose?.conn) {
        return global.mongoose.conn;
      } else {
        const options = {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          autoIndex: true,
        };

    const promise = mongoose
      .connect(`mongodb+srv://admin:root@cluster0.rwgus21.mongodb.net/blog_db?retryWrites=true&w=majority`, options)
      .then((mongoose) => mongoose);

    global.mongoose = {
      conn: await promise,
      promise,
    };

    console.log("Connected to db");
    return await promise;

    
  }
}



export default connectToDb;