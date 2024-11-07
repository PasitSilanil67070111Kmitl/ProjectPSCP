"use client"
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
    const [name, setName] = useState("");
    const [subID, setSubID] = useState("");
    const [id, setId] = useState(null);
    const [subjectAssignment, setAssignment] = useState("");
    const [myScore, setMyScore] = useState("");
    const [scoreAssignment, setScore] = useState("");
    const [assignmentList, setAssignmentList] = useState([]);
    const router = useRouter()

    async function onCreate() {
        if (id === null){
            router.push("/login")
            return alert("please login first")
        }
        const userid = id;
        const subject_id = subID;
        const subject_name = name;

        try {
            const response = await fetch('http://127.0.0.1:8000/totaldata', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userid,
                    subject_id,
                    subject_name,
                    subjectAssignment,
                    scoreAssignment,
                    myScore,
                }),
            });

            const result = await response.json();
            setAssignmentList([...assignmentList, { subjectAssignment, myScore, scoreAssignment }]);

            setAssignment("");
            setMyScore("");
            setScore("");
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        const _id = localStorage.getItem("user_id")
         if (_id) setId(+_id)
     }, []);
    return (
        <div className="flex justify-center items-center min-h-screen bg-blue-50 bg-cover bg-center h-64 rounded-lg shadow-md text-black">
            <div className="bg-white p-6 border border-zinc-300 rounded-xl max-w-[700px]">
                <h1 className="font-bold text-4xl text-center mb-2 text-black">เพิ่มรายวิชา</h1>
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    className="w-full border border-zinc-300 px-4 p-2 mb-2 rounded-xl"
                    placeholder="ชื่อวิชา"
                />
                <input
                    value={subID}
                    onChange={(e) => setSubID(e.target.value)}
                    type="text"
                    className="w-full border border-zinc-300 px-4 p-2 mb-2 rounded-xl"
                    placeholder="รหัสวิชา"
                />
                <div className="flex justify-center gap-6 border-b-2 border-blue-500 pb-2">
                    <input
                        value={subjectAssignment}
                        onChange={(e) => setAssignment(e.target.value)}
                        type="text"
                        className="w-full border border-zinc-300 px-4 p-2 mb-2 rounded-xl"
                        placeholder="หัวข้องาน"
                    />
                    <input
                        value={myScore}
                        onChange={(e) => setMyScore(e.target.value)}
                        type="text"
                        className="w-full border border-zinc-300 px-4 p-2 mb-2 rounded-xl"
                        placeholder="คะแนนที่ได้"
                    />
                    <input
                        value={scoreAssignment}
                        onChange={(e) => setScore(e.target.value)}
                        type="text"
                        className="w-full border border-zinc-300 px-4 p-2 mb-2 rounded-xl"
                        placeholder="คะแนนเต็ม"
                    />
                    <button
                        onClick={onCreate}
                        className="border border-zinc-300 p-2 text-xl mb-4 max-w-[100px] rounded-full text-black"
                    >
                        <Plus />
                    </button>
                </div>
                
                <div className="flex flex-col gap-4 mt-4" id="new">
                    {assignmentList.map((assignment, index) => (
                        <div key={index} className="flex justify-between">
                            <p>{assignment.subjectAssignment}</p>
                            <p>{assignment.myScore}</p>
                            <p>{assignment.scoreAssignment}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

