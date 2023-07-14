'use client'

import { useEffect } from "react"
import { useRouter } from "next/navigation";
// const axios

export default async function Home() {
  
  const router = useRouter();
  
  useEffect(()=>{
    let Authorization;
    if(localStorage.getItem('Authorization')){
        Authorization = localStorage.getItem('Authorization')
    }
    async function getUserData(){
      try {
        const response = await fetch('http://localhost:4000/users/profile', {
          method: 'GET',
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            "Authorization": Authorization

          }
        });
      
        if (!response.ok) {
          throw new Error('Network response was not OK');
        }
      
        const data = await response.json();
        const userData = JSON.stringify(data);
        localStorage.setItem("user-data",userData);
        // Use the retrieved 'data' as needed
      } catch (error) {
        // Handle any errors that occurred during the fetch request
        console.error(error);
      }
      
    }
    getUserData();

  },[])

  return (
    
    <div className=''>

      <div>

      </div>
     
    </div>
  )
}
