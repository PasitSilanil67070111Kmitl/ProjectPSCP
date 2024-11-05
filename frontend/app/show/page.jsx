"use client"

import Link from "next/link"
import { useEffect, useState } from 'react';

export default function Page() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/data")
      .then((response) => response.json())
      .then((result) => setData(result.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-50 bg-cover bg-center h-64 rounded-lg shadow-md">
      <div className="bg-white p-6 border border-zinc-300 rounded-xl max-w-[700px]">
        <h1 className="font-bold text-4xl text-center mb-2 text-blue-500">รหัสวิชา</h1>
        <h1 className="font-bold text-4xl text-center mb-2 text-blue-500">ชื่อวิชา</h1>
        <div className="flex justify-center gap-10">
          <table className="bg-white text-black w-[500px]">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2 ">หัวข้อ</th>
                <th className="border border-gray-300 px-4 py-2 ">สัดส่วนคะแนน</th>
                <th className="border border-gray-300 px-4 py-2 ">คะแนนของเรา</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr>
                  <td className="border border-gray-300 px-4 py-2">{item.subject_assignment}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.score_assignment}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.my_score}</td>
                </tr>
              ))}
            </tbody>
            </table>
        </div>
        <br></br>
        <table className="bg-white text-black w-[500px]">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">เกรด</th>
                <th className="border border-gray-300 px-4 py-2">คะแนนเต็ม</th>
                <th className="border border-gray-300 px-4 py-2">คะแนนรวม</th>
              </tr>
            </thead>
            <tbody>
            {data.length > 0 &&  (
                <tr>
                  <td className="border border-gray-300 px-4 py-2">{data[0].result}</td>
                  <td className="border border-gray-300 px-4 py-2">{data[0].total_a}</td>
                  <td className="border border-gray-300 px-4 py-2">{data[0].total_s}</td>
                </tr>
              )}
              <br></br>
              {data.length > 0 && (
              <tr>
                <td className="border border-gray-300 px-4 py-2">GPA</td>
                <td className="border border-gray-300 px-4 py-2">{data[0].total_result}</td>
              </tr>
              )}
            </tbody>
          </table>
      </div>
    </div>
  );
}
