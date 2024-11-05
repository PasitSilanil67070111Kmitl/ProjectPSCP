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
            <h1 className="font-bold text-4xl text-center mb-2 text-blue-500" >รหัสวิชา</h1>
            <h1 className="font-bold text-4xl text-center mb-2 text-blue-500" >ชื่อวิชา</h1>
                <div className="flex justify-center gap-10">
                    <table className="bg-white text-black">
                        <tr>
                            <th className="border border-gray-300 px-4 py-2">หัวข้อ</th>
                            <th className="border border-gray-300 px-4 py-2">สัดส่วนคะแนน</th>
                            <th className="border border-gray-300 px-4 py-2">คะแนนของเรา</th>
                        </tr>

                            {data.map((item, index) => (
                                <tr>
                                    <td className="border border-gray-300 px-4 py-2">{item}</td>
                                    <td className="border border-gray-300 px-4 py-2">1</td>
                                    <td className="border border-gray-300 px-4 py-2">2</td>
                                </tr>

                            ))}
                    </table>
                </div>
            </div>
       </div>
  );
}