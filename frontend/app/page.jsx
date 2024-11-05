"use client"

import Link from "next/link"
import { useEffect, useState } from 'react';

export default function Page(){

  return (
    <div className="flex justify-center items-center min-h-screen bg-[url('https://img.freepik.com/free-photo/artistic-blurry-colorful-wallpaper-background_58702-8283.jpg?t=st=1730457212~exp=1730460812~hmac=eb35c2503d617b2e891048eb19ada7d3c48ce4c9d417eb91f6fa8cfa359b1724&w=996')] bg-cover bg-center h-64 rounded-lg shadow-md">
            <div className=" p-6  max-w-[450px]">
                <h1 className="font-bold text-4xl text-center mb-2 text-blue-500" >หน้าหลัก</h1>
                <button className="bg-slate-50 p-2 text-xl mb-4 w-full h-16 rounded-xl text-black">
                  <Link href={"/add-subject"} className="text-blue-400">เพิ่มรายวิชา</Link></button>
                <button className="bg-slate-50 p-2 text-xl mb-4 w-full h-16 rounded-xl text-black">
                  <Link href={"/show"} className="text-blue-400">ดูคะแนน</Link></button>
            </div>
       </div>
  );
}
