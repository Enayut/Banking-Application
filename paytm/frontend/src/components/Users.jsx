import axios from "axios";
import { useEffect, useState } from "react";
import  Avatar  from 'react-avatar';
import InputBox from "./InputBox";
import { useNavigate } from "react-router-dom";

export default function Users() {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:3000/api/v1/user/bulk?filter=" + filter).then((res) => {
            setUsers(res.data.user);
        });
    }, [filter]);

    

    return (
        <div className="w-full bg-lime-100 p-4">
    <div className="font-bold mt-6 text-lg">Users</div>
    <InputBox 
        title="Search" 
        placeholder="Search" 
        type="text" 
        onChange={(event) => setFilter(event.target.value)} 
    />
    {users.map((user) => (
        <div 
            key={user._id} 
            className="w-full flex items-center bg-white p-4 my-2 rounded-lg shadow-sm border border-gray-200"
        >
                <Avatar 
                    name={`${user.firstName} ${user.lastName}`} 
                    size="50" 
                    round={true} 
                    textSizeRatio={1}
                />
                <p className="text-md text-zinc-950 mx-4 flex-1">
                    {user.firstName} {user.lastName}
                </p>
                <button onClick={()=>{
                    navigate(`/send?userId=${user._id},firstName=${user.firstName}`)
                }}className="bg-lime-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:relative">
                    Send Money
                </button>
            </div>
        ))}
    </div>
    );
}
