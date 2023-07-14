"use client"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import BlogComp from '../components/blogcomp'
import { useRouter } from 'next/navigation'
import removeObjectWithId from '../helpers/helpers'

export default function Page(props) {

  const router = useRouter();

  const [blogData, setBlogData] = useState();
  useEffect(()=>{
    async function fetchData() {
      const { data } = await fetch(process.env.GRAPHQL_API_URL || "http://localhost:3000/api/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
          query getBlogs{
            blogs{
              id
              title
              content
            }
          }
      `,
        }),
        next: { revalidate: 10 },
      }).then((res) => res.json());
      const blogs =await data.blogs
      setBlogData(blogs);
    }
    fetchData();
    
  },[])


  const deleteBlog = async (id)=>{
    
    const { data } = await fetch(process.env.GRAPHQL_API_URL || "http://localhost:3000/api/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
        mutation deleteBlog{deleteBlog(id:"${id}")}
    `,
      })
    }).then((res) => res.json());
    // const dataa = await res.json();

    const updatedData = blogData.filter((blog) => blog.id !== id);
    setBlogData(updatedData);

    
    // window.location.reload(); 
    // console.log(newBlogData);
    // setBlogData(newBlogData);
  }
  return (
    <div className='flex flex-col items-center justify-center '>
        {blogData && blogData.map(element=>(
            <>
              <div className='title flex'>
                  <h1 className='bold'>Title: </h1>
                  <span>{element.title}</span>
              </div>
              <div className='content flex flex-col'>
                  <h1>Content: </h1>
                  <span>{element.content}</span>
              </div>
            <div >
               <button className='bg-lime-600 h-10 w-30 my-2' onClick={() => router.push(`/blogs/${element.id}`)}>Update</button>

                <button className='bg-lime-600 h-10 w-40' onClick={()=>deleteBlog(element.id)}>Delete</button>
            </div>
          </>
          // <BlogComp title={element.title} content={element.content} key={element._id} deleteBlog={deleteBlog}/>
        ))}
        <Link href="/addBlogs">
        <button className='bg-lime-600 h-10 w-40'>Add A Blog +</button>
        </Link>
    </div>
  )
}
