const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
import { createYoga, createSchema } from 'graphql-yoga'
import { gql } from 'apollo-server'
import User from '../../schemas/UserDto'
import connectToDb from '../../lib/mongodb'


const { handleRequest } = createYoga({
  schema: createSchema({
    typeDefs: gql `

        type User{
          id:ID!
          firstName:String!
          lastName:String!
          email:String!
          country:String!
          state:String!
          city:String!
          password:String!
        }
        input userInput{
          firstName:String!
          lastName:String!
          email:String!
          country:String!
          state:String!
          city:String!
          password:String!
        }
        input loginUserInput{
          email:String!
          password:String!
        }


        type Query {
          user(loginUserInput:loginUserInput): User
        }

        type Mutation{
          createUser(userInput:userInput):User!
          updateUser(id:ID!, userInput:userInput):Boolean
          login(loginUserInput:loginUserInput):String!
        }
    `,
    resolvers: {
      Query:{
        user:async(_,{loginUserInput:{email,password}})=>{
          
            console.log("User trying to login");

            await connectToDb();

            const existingUser = User.findOne({email:email});

            console.log(existingUser);

            if(!existingUser || existingUser===undefined || existingUser==null){
                return "User Not found"
            }else if(!bcrypt.compare( password, existingUser.password)){
                return "Wrong Password"
            }

            return existingUser;
        }
      },
      Mutation:{
        createUser: async(_,{userInput:{firstName,lastName,email,country,state,city,password}})=>{
          console.log('Received createBlog mutation request:', firstName,lastName,email,country,state,city,password );

          await connectToDb();
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(password,salt)
          console.log(hashedPassword);
          const newUser = new User({ firstName,lastName,email,country,state,city,password:hashedPassword });
          const response = await newUser.save();
          
          return response;
        },

        login: async (_, {loginUserInput:{ email, password }},{res}) => {

          await connectToDb();
          const user = await User.findOne({ email:email });
    
          if(!user || user===undefined || user==null){
            return "User Not found"
          }else if(!bcrypt.compare( password, user.password)){
              return "Wrong Password"
          }

        const token = jwt.sign({_id: user.id}, "secret");

        // res.cookie('token', token, {
        //   httpOnly: true,
        //   maxAge: 900000, // set the expiration time as desired
        //   secure: true, // set it to true if using HTTPS
        //   sameSite: 'strict' // restricts the cookie to the same site
        // });
    
        return token;
        },
      }
      
    }
  }),


  graphqlEndpoint: '/api/user',
 
  fetchAPI: { Request: Request, Response: Response }
})
 
export { handleRequest as GET, handleRequest as POST }