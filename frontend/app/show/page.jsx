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
      <div className="p-6 max-w-[450px]">
        <h1 className="font-bold text-4xl text-center mb-2 text-blue-500">รหัสวิชา</h1>
        <h1 className="font-bold text-4xl text-center mb-2 text-blue-500">ชื่อวิชา</h1>
        <div className="flex justify-center gap-10">
          <table className="bg-white text-black">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">หัวข้อ</th>
                <th className="border border-gray-300 px-4 py-2">สัดส่วนคะแนน</th>
                <th className="border border-gray-300 px-4 py-2">คะแนนของเรา</th>
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
            <table className="bg-white text-black">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">เกรด</th>
                <th className="border border-gray-300 px-4 py-2">คะแนนเต็ม</th>
                <th className="border border-gray-300 px-4 py-2">คะแนนรวม</th>
                <th className="border border-gray-300 px-4 py-2">GPA</th>
              </tr>
            </thead>
            <tbody>
            {data.map((item) => (
                <tr>
                  <td className="border border-gray-300 px-4 py-2">{item.result}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.total_a}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.total_s}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.total_result}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
