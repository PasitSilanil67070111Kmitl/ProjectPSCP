"use client"

import Link from "next/link"
import { useEffect, useState } from 'react';

export default function Page(){

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-50 bg-cover bg-center h-64 rounded-lg shadow-md">
            <div className="bg-white p-6 border border-zinc-300 rounded-xl max-w-[700px]">
                <h1 className="font-bold text-4xl text-center mb-2 text-blue-500" >หน้าหลัก</h1>
                <button className="w-full border border-zinc-300 px-4 p-2 mb-2 rounded-xl">
                  <Link href={"/add-subject"} className="text-blue-400">เพิ่มรายวิชา</Link></button>
                <button className="w-full border border-zinc-300 px-4 p-2 mb-2 rounded-xl">
                  <Link href={"/show"} className="text-blue-400">ดูคะแนน</Link></button>
            </div>
       </div>
  );
}
