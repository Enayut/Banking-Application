import Header from "../components/Header"
import InputBox from "../components/InputBox"
import {Link} from 'react-router-dom'
import { useState } from "react";
import axios from 'axios';
export default function Signin(){
    const [password,setpassword] = useState("");
    const [email,setEmail] = useState("");
    return <div className="flex items-center justify-center h-full min-h-screen w-full bg-gray-100">
        <div className="card bg-white p-6 rounded-lg shadow-lg">
            <Header title="Sign In"/>
            <form className="space-y-4 my-4">
                <InputBox type="email" placeholder="johndoe@gmail.com" title="Email" onChange={e=>{
                    setEmail(e.target.value)
                }}/>
                <InputBox type="text" placeholder="********" title="Password" onChange={e=>{
                    setpassword(e.target.value)
                }}/>
                <button onSubmit={
                    ()=>{
                        axios.post("http://localhost:3000/api/v1/user/login",{
                            email,
                            password
                        })
                    }
                } type="submit" className="py-2 px-4 bg-gradient-to-r from-blue-600 to-indigo-400 text-white">Sign Up</button>
            </form>
            <p className="mt-4">
                Dont have an account? <Link to="/signup" className="text-blue-600">Sign Up</Link>
            </p>
        </div>
    </div>
}