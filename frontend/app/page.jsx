"use client"

import Link from "next/link"
import { useEffect, useState } from 'react';

export default function Page(){

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-50 bg-cover bg-center h-64 rounded-lg shadow-md">
            <div className="bg-white p-6 border border-zinc-300 rounded-xl max-w-[700px]">
                <h1 className="font-bold text-4xl text-center mb-2 text-blue-500" >หน้าหลัก</h1>
                <button className="bg-blue-300 p-2 text-xl mb-4 w-full rounded-xl text-white">
                  <Link href={"/add-subject"} className="text-white">เพิ่มรายวิชา</Link></button>
                <button className="bg-blue-300 p-2 text-xl mb-4 w-full rounded-xl text-white">
                  <Link href={"/show"} className="text-white">ดูคะแนน</Link></button>
            </div>
       </div>
  );
}
