'use client';
import Link from 'next/link'
import styles from './Navbar.module.css'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

const Navbar = () => { 

  const [userData, setUserdata] = useState();

  useEffect( ()=>{

    if(localStorage.getItem("user-data")){
      setUserdata(JSON.parse(localStorage.getItem("user-data")))
    }
    // if(auth !== undefined){
    //   async function getUserData(){
    //     const getUser = await fetch("http://localhost:3000/api/user",{
    //       method: "POST",
    //       headers: {
    //         "Access-Control-Allow-Origin" : "*",
    //         "Content-Type": "application/json",
    //       },
    //       credentials: "include",
    //       body: JSON.stringify({
    //         query: ` mutation getUser{
    //           getUser(loginUserInput:{email:"${payload.email}", password:"${payload.password}"})
    //         }
    //         `
    //       })
    //     }).then((res)=> res.json())
    //   }
      
    // }
  },[])

  return (
    <nav class="top-0 flex items-center justify-between p-6 lg:px-8 bg-gray bg-gray-300" aria-label="Global">
      <div class="flex lg:flex-1">
        <a href="#" class="-m-1.5 p-1.5">
          <span class="sr-only">Blogs</span>
        </a>
      </div>
      <div class="flex lg:hidden">
        <button type="button" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700">
          <span class="sr-only">Open main menu</span>
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
      </div>
      <div class="hidden lg:flex lg:gap-x-12">
        <a href="/" class="text-sm font-semibold leading-6 text-gray-900">Home</a>
        <a href="/blogs" class="text-sm font-semibold leading-6 text-gray-900">Blogs</a>
        <a href="/addBlogs" class="text-sm font-semibold leading-6 text-gray-900">Add Blogs</a>
      </div>
      <div class="hidden lg:flex lg:flex-1 lg:justify-end">
       {!userData ? 
              <a href="/login" class="text-sm font-semibold leading-6 text-gray-900">Log in <span aria-hidden="true">&rarr;</span></a>
              :
            <a href='/profile'  class="text-sm font-semibold leading-6 text-gray-900">{userData.firstName}<span aria-hidden="true">&rarr;</span></a>
            } 
      </div>
    </nav>

  )

}

export default Navbar