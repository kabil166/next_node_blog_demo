"use-client"
import React from 'react'

const BlogComp = (props) => {

  return (
    <div>
        <div className='title flex'>
            <h1 className='bold'>Title: </h1>
            <span>{props.title}</span>
        </div>
        <div className='content flex flex-col'>
            <h1>Content: </h1>
            <span>{props.content}</span>
        </div>
        <div>
            <button className='bg-lime-600 h-10 w-40' onClick={props.deleteBlog(props.id)}>Delete</button>
        </div>
    </div>
  )
}

export default BlogComp