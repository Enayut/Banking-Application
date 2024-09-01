import { useState } from "react"
import Header from "../components/Header"
import InputBox from "../components/InputBox"
import {Link,useNavigate} from 'react-router-dom'
import axios from "axios";
export default function Signup(){
    const [firstName,setFirstName] = useState("");
    const [lastName,setlastName] = useState("");
    const [password,setpassword] = useState("");
    const [email,setEmail] = useState("");
    const navigate = useNavigate();
    return <div className="flex items-center justify-center h-full min-h-screen w-full bg-gray-100">
        <div className="card bg-white p-6 rounded-lg shadow-lg">
            <Header title="Sign Up"/>
            <form className="space-y-4 my-4">
                <InputBox type="text" placeholder="John" title="Firt Name" onChange={e=>{
                    setFirstName(e.target.value);
                }}/>
                <InputBox type="text" placeholder="Doe" title="Last Name" onChange={e=>{
                    setlastName(e.target.value);
                }}/>
                <InputBox type="email" placeholder="johndoe@gmail.com" title="Email" onChange={e=>{
                    setEmail(e.target.value);
                }}/>
                <InputBox type="password" placeholder="********" title="Password" onChange={e=>{
                    setpassword(e.target.value);
                }}/>
                <button onClick={(e)=>{
                    e.preventDefault();
                    axios.post("http://localhost:3000/api/v1/user/signup",{
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
                        password: password
                    }).then((response)=>{
                        localStorage.setItem('token', response.data.token);
                        navigate("/signin")
                    }).catch((res)=>{
                        console.log(res);
                        alert("Error Occured");
                    })
                }} type="submit" className="py-2 px-4 bg-gradient-to-r from-blue-600 to-indigo-400 text-white" >Sign Up</button>
            </form>
            <p className="mt-4">
                Already have an account? <Link to="/signin" className="text-blue-600">Sign In</Link>
            </p>
        </div>
    </div>
}