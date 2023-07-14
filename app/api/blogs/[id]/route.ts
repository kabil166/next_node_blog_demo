import connectToDb from '../../../lib/mongodb';
import Blog from '../../../schemas/BlogDto';

import {  NextResponse } from 'next/server';

export async function GET(request: Request) {
    const searchParams = new URLSearchParams(request.url.split('?')[1]);
    const id = searchParams.get('id');  
    
    console.log("Calling find by id api");

    console.log("Id: ", id);
    await connectToDb();
    const blog = await Blog.findOne({id});
    console.log("Blog", blog);
    return NextResponse.json({ data: blog, status: 200 });
  }