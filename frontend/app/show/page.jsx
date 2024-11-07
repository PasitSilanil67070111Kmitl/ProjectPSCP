"use client";

import { useEffect, useState } from 'react';

export default function Page() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [newmyscore, setScore] = useState("");
  const [id_sub, setId] = useState("");
  async function onCreate() {
    try {
      const response = await fetch('http://127.0.0.1:8000/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ search: search }),
      });

      const result = await response.json();
      setData(result.data);
    } catch (err) {
      console.log("Error:", err);
    }
  }
  async function onUpdate() {
    try {
      const response = await fetch('http://127.0.0.1:8000/updatepdata', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id_sub,newmyscore }),
      });

      const result = await response.json();
      setData(result.data);
    } catch (err) {
      console.log("Error:", err);
    }
  }
  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-50 bg-cover bg-center h-64 rounded-lg shadow-md">
      <div className="bg-white p-6 border border-zinc-300 rounded-xl max-w-[700px]">
        <h1 className="font-bold text-4xl text-center mb-2 text-blue-500">ดูคะแนน</h1>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          className="w-full border border-zinc-300 px-4 p-2 mb-2 rounded-xl"
          placeholder="ค้นหาวิชา"
        />
        <button 
          onClick={onCreate} 
          className="bg-blue-300 p-2 text-xl mb-4 w-full rounded-xl text-white"
        >
          ค้นหา
        </button>
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
              {data.length > 1 ? (
                data.slice(0, -1).map((item) => (
                  <tr key={item.id}>
                    <td className="border border-gray-300 px-4 py-2">
                      {item.subject_assignment}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {item.score_assignment}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <input type='text' 
                      value={newmyscore} 
                      onChange={(e) => setScore(e.target.value)} >
                      {item.my_score}</input></td>
                    <td className=''>
                      <input type='text'
                      value={id_sub}
                      onChange={(e) => setId(e.target.value)} >
                      {item.id}</input>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="border border-gray-300 px-4 py-2 text-center">ไม่มีข้อมูล</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <br />
        {data.length > 0 && (
          <table className="bg-white text-black w-[500px]">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">เกรด</th>
                <th className="border border-gray-300 px-4 py-2">คะแนนเต็ม</th>
                <th className="border border-gray-300 px-4 py-2">คะแนนรวม</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2">{data[data.length - 1].result}</td>
                <td className="border border-gray-300 px-4 py-2">{data[data.length - 1].total_a}</td>
                <td className="border border-gray-300 px-4 py-2">{data[data.length - 1].total_s}</td>
              </tr>
              <br></br>
              <tr>
                <td className="border border-gray-300 px-4 py-2">GPA</td>
                <td className="border border-gray-300 px-4 py-2">{data[data.length - 1].total_result}</td>
                <td className="border border-gray-300 px-4 py-2">{data[data.length - 1].tenor}</td>
              </tr>
            </tbody>
          </table>
        )}
        <button 
          onClick={onUpdate} 
          className="bg-blue-300 p-2 text-xl mb-4 w-full rounded-xl text-white"
        >
          บันทึกการเปลี่ยนแปลง
        </button>
      </div>
    </div>
  );
}
