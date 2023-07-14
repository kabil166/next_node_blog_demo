"use client"
import React, { useState } from 'react'

const Page = () => {

  const [title, setTitle] = useState();
  const [content, setContent] = useState();

  const blogUrl = process.env.GRAPHQL_API_URL;
  const addNewBlog= async ()=>{
    console.log("Adding new blog from addBlog page")
    const {data} = await fetch(blogUrl||"http://localhost:3000/api/graphql", {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin" : "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `mutation createBlog{
          createBlog(blogInput:{title:"${title}",content:"${content}"}){
            title
            content
          }
        }
        `
      })
    }).then((res)=>res.json());


    console.log("added new blog from the page",data);
  }



  return (
    <div class="container mx-auto py-10">
    <div class="max-w-md mx-auto bg-white p-6 rounded shadow-md">
      <h2 class="text-2xl font-semibold mb-6">Create a New Blog Post</h2>
      <div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">Title</label>
          <input class="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" id="title" name="title" placeholder="Enter the title" onChange={(e)=>setTitle(e.target.value)} required />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" htmlFor="content">Content</label>
          <textarea class="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" id="content" name="content" rows="5" placeholder="Enter the content" onChange={(e)=>setContent(e.target.value)} required></textarea>
        </div>
        <div class="flex justify-end">
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" type="submit" onClick={addNewBlog}>Create Post</button>
        </div>
        </div>
    </div>
  </div>
  )
}

export default Page