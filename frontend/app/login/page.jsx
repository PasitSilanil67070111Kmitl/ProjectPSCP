"use client"

import Link from "next/link"
import { useState } from "react"
export default function Page() {
    const [ username_login , Name ] = useState("")
    const [ password_login , Password ] = useState("")
    
    async function onCreate(){
        try{
            const response = await fetch('http://127.0.0.1:8000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({username_login, password_login }),
            });
   
           const result = await response.json();
        }
        catch(err){
            console.log(err)
        }
    }
    return(
       <div className="flex justify-center items-center min-h-screen bg-red-50 ">
            <div className="bg-white p-6 border border-zinc-300 rounded-xl max-w-[450px]">
                <h1 
                    className="font-bold text-4xl text-center mb-2">Login</h1>
                <p className="mb-4 text-center">Hello, welcome back</p>
                <input 
                    value={username_login} 
                    onChange={(e) => Name(e.target.value)} 
                    type="text" 
                    className="w-full border border-zinc-300 px-4 p-2 mb-2 rounded-xl" 
                    placeholder="Username" />
                <input 
                    value={password_login} 
                    onChange={(e) => Password(e.target.value)} 
                    type="password" className="w-full border border-zinc-300 px-4 p-2 mb-2 rounded-xl" 
                    placeholder="Password" />
                <Link 
                    className="underline w-full block text-zinc-500 mb-2" 
                    href={"/forgot-password"}>Forgot password?</Link>
                <button 
                    onClick={onCreate} 
                    className="bg-red-400 p-2 text-xl mb-4 w-full rounded-xl text-white">Log in</button>
                <p 
                    className="text-center">Don't have an accout? <Link href={"/signup"} className="text-red-400">Sign Up</Link></p>
            </div>
       </div>
    )
}