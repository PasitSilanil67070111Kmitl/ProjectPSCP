"use client"

import Link from "next/link"
import { useEffect, useState } from 'react';

export default function Page(){
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/data")
      .then((response) => response.json())
      .then((result) => setData(result.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-[url('https://img.freepik.com/free-photo/artistic-blurry-colorful-wallpaper-background_58702-8283.jpg?t=st=1730457212~exp=1730460812~hmac=eb35c2503d617b2e891048eb19ada7d3c48ce4c9d417eb91f6fa8cfa359b1724&w=996')] bg-cover bg-center h-64 rounded-lg shadow-md">
            <div className=" p-6  max-w-[450px]">
                <h1 className="font-bold text-4xl text-center mb-2 text-blue-500" >ALL SUBJECT</h1>
                <button className="bg-slate-50 p-2 text-xl mb-4 w-64 h-32 rounded-xl text-black">
                  <Link href={"/add-subject"} className="text-red-400">เพิ่มรายวิชา</Link></button>
                <div className="flex justify-center gap-10">
                {data.map((item, index) => (
                <button className="bg-slate-50 p-2 text-xl mb-4 w-64 h-32 rounded-xl text-black">{item}</button>
                ))}
                </div>
            </div>
       </div>
  );
}
