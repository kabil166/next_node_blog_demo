import connectToDb from '../../lib/mongodb';
import Blog from '../../schemas/BlogDto';

import { NextRequest, NextResponse } from 'next/server';


export async function POST(request: Request){
    const {title, content} = await request.json();
    await connectToDb();
    const result = new Blog(
        {
            title,
            content
        }
    )
    const response = await result.save();
    return NextResponse.json({data:response, status: 201})
}

export async function GET(request:Request){
    const searchParams = new URLSearchParams(request.url.split('?')[1]);
    const id = searchParams.get('id');  
    // return new NextResponse("Hii")
    console.log("Calling get blogs api")
    await connectToDb();
    let blogById = null;
    console.log(id);
    if(id!==null){
        blogById = await Blog.findOne({_id:id})
        console.log(blogById);
        return  NextResponse.json({data:blogById, status:200})
    }
    const blogs = await Blog.find();
    console.log(blogs);
    return  NextResponse.json({data:blogs, status:200})
}

export async function DELETE(request: Request){
    console.log("Trying to delete")
    const searchParams = new URLSearchParams(request.url.split('?')[1]);
    const id = searchParams.get('id');
    try{
        await connectToDb();
    
        if(id!==null){
            console.log(id);

            const res = await Blog.findByIdAndDelete(id)
            return  NextResponse.json({data:id, status:200})
        }
    }catch(err){
        console.log(err);
        return  NextResponse.json({message:err, status:500})
    }
   
    return "Not deleted"
    // const blogs = await Blog.findByIdAndDelete(id);
    // return  NextResponse.json({data:blogs, status:200})
}


// export default async function handler (req,res) {


//     console.log("Hit add api");
    
//     if(req.method !== 'POST'){
//         return res.status(405).json({message:"method not allowed"})
//     }

//     await connectToDb();
//     const {title, content} = req.body;

//     const result = new Blog(
//         {
//             title,
//             content
//         }
//     )

//     const response = await result.save();

//     res.status(201).json({body:response, message: 'New Blog added!' });

// }


