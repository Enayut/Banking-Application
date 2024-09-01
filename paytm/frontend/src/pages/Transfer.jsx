import { useNavigate, useSearchParams } from "react-router-dom";
import Header from "../components/Header";
import { useState } from "react";

export default function Transfer(){
    const [searchParams, setSearchParams] = useSearchParams();
    const userId = searchParams.get('userId');
    const firstName = searchParams.get('firstName');
    const [amount,setAmount] = useState(0);
    const navigate = useNavigate();
    console.log(firstName);
    return (<div className="mx-auto my-10 bg-white rounded-lg shadow-lg border border-gray-200 flex flex-col items-center justify-center p-5 sm: w-1/2 h-64 lg: w-1/3 h-96">
        <Header title="Transfer Money"/>
        <form className="w-full flex flex-col items-center space-y-4 mt-4">
            <input 
                type="text" 
                placeholder="Enter Amount" 
                className="w-3/4 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />
            <button 
                className="w-3/4 bg-lime-400 text-white py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={async ()=>{
                    const token = localStorage.getItem('token');
                    try{
                        await axios.post('/api/v1/account/deposit',{
                            amount: amount,
                            to: userId,
                            from: Id 
                        },{
                            headers: {
                                'Authorization': 'Bearer ' + token,
                            }
                        })
                        navigate('/api/v1/user/dashboard');
                    }catch(err){
                        return (<p>Unable to transfer Money</p>)
                    }
                }}
            >
                Transfer
            </button>
        </form>
    </div>)
}