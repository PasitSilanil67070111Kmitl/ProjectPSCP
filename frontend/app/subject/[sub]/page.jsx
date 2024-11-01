"use client"
import { Plus } from "lucide-react"
import { useState } from "react"
export default function Page({ params }) {
    const i = params.sub
    const [ subject_assignment , setAssignment ] = useState("")
    const [ my_score , setMyscore ] = useState("")
    const [ score_assignment , setScore ] = useState("")
    return (
        <div className="flex justify-center items-center min-h-screen bg-[url('https://img.freepik.com/free-photo/artistic-blurry-colorful-wallpaper-background_58702-8283.jpg?t=st=1730457212~exp=1730460812~hmac=eb35c2503d617b2e891048eb19ada7d3c48ce4c9d417eb91f6fa8cfa359b1724&w=996')] bg-cover bg-center h-64 rounded-lg shadow-md">
            <div className="bg-white p-6 border border-zinc-300 rounded-xl max-w-[450px]">
                <h1 className="font-bold text-4xl text-center mb-2 text-sky-500">{i}</h1>
                <div className="flex justify-center gap-6 border-b-2 border-blue-500 pb-2">
                    <input value={subject_assignment} onChange={(e) => setAssignment(e.target.value)} type="text" className="w-full border border-zinc-300 px-4 p-2 mb-2 rounded-xl" placeholder="หัวข้องาน" />
                    <input value={my_score} onChange={(e) => setMyscore(e.target.value)} type="text" className="w-full border border-zinc-300 px-4 p-2 mb-2 rounded-xl" placeholder="คะแนนที่ได้" />
                    <p className="text-black">/</p>
                    <input value={score_assignment} onChange={(e) => setScore(e.target.value)} type="text" className="w-full border border-zinc-300 px-4 p-2 mb-2 rounded-xl" placeholder="คะแนนเต็ม" />
                    <button onClick={onCreate} className=" border border-zinc-300 p-2 text-xl mb-4 w-full rounded-full text-black"><Plus /></button>
                </div>
                <div className="flex justify-center gap-6 " id="new">
                    <p id="assignment"></p>
                    <p id="myscore"></p>
                    <p className="text-black">/</p>
                    <p id="score"></p>
                </div>
            </div>
       </div>
    )
    
    function onCreate(){
        const newdiv = document.getElementById("new");
        const assignment = document.createElement("assignment")
        const myscore = document.createElement("myscore")
        const score = document.createElement("score")
        assignment.textContent = subject_assignment;
        newdiv.appendChild(assignment);

        myscore.textContent = my_score;
        newdiv.appendChild(myscore);

        score.textContent = score_assignment;
        newdiv.appendChild(score);

        subject_assignment.value = ""
        my_score.value = ""
        score_assignment.value = ""
    }
}