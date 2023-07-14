"use client"
import React, { useEffect, useState } from 'react'

const SingleBlog =  ({params}) => {
  const id = params.id;

  const [blog, setBlog] = useState();

  useEffect(()=>{
    async function getBlogById(){
      const res = await fetch(`/api/blogs?id=${id}`,{
        method:'GET',
        headers:{
          'Content-Type':'application/json'
        }
      })
      const data = await res.json();
      const blog = data.data;
      setBlog(blog);
    }
  
    getBlogById();
  
  },[])

  console.log(blog);

  // const id = params.id;
  // const res = await fetch(`http://localhost:3000/api/blogs/${id}`,{
  //   method:'GET',
  //   headers:{
  //     'Content-Type':'application/json'
  //   }
  // })

  // const data = await res.json();
  // const blog = data.data;
  return (
    <div>
      {id}
      {/* {blog && blog.title}
      <div>{blog && blog.content}</div> */}
    </div>
  )
}

export default SingleBlog