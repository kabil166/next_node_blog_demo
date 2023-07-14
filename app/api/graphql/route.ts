import { createYoga, createSchema } from 'graphql-yoga'
import { gql } from 'apollo-server'
import Blog from '../../schemas/BlogDto'
import connectToDb from '../../lib/mongodb'

const { handleRequest } = createYoga({
  schema: createSchema({
    typeDefs: gql `

        type Blogs{
          id:ID!
          title: String!
          content:String!
        }

        type Blog{
          title:String!
          content:String!
        }
        input blogInput{
          title:String!
          content:String!
        }

        type Query {
          blogs:[Blogs!]
        }

        type Mutation{
          createBlog(blogInput:blogInput):Blogs!
          deleteBlog(id:String):Boolean
          updateBlog(id:ID!, blogInput:blogInput):Boolean
        }
    `,
    resolvers: {
      Query:{
        blogs:async()=>{
            await connectToDb();
            return  Blog.find();
        }
      },
      Mutation:{
        createBlog: async(_,{blogInput:{title,content}})=>{
          console.log('Received createBlog mutation request:',  title, content );

          await connectToDb();
          const newBlog = new Blog({ title, content });
          const response = await newBlog.save();
          
          return response;
        },
        deleteBlog: async(_, {id})=>{
          console.log("Trying to delete record with id: ", id);

          await connectToDb();
          const isDeleted = await Blog.findByIdAndDelete(id);

          return isDeleted ? true : false;

        },
        async updateBlog(_,{id, blogInput:{title,content}}){
          const isEdited = (await Blog.updateOne({_id:id },{title:title, content:content})).modifiedCount

          return isEdited ? true : false;
      }
      }
      
    }
  }),


  graphqlEndpoint: '/api/graphql',
 
  fetchAPI: { Request: Request, Response: Response }
})
 
export { handleRequest as GET, handleRequest as POST }