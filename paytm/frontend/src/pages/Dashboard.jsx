import Balance from '../components/Balance'
import Header from '../components/Header'
import SubHeading from '../components/SubHeading'
import Users from '../components/Users'
import { useState,useEffect } from 'react'
import axios from 'axios'

export default function Dashboard() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [balance, setBalance]= useState(0);

    useEffect(() => {
        // Function to fetch user data
        const fetchUser = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get('http://localhost:3000/api/v1/user/me', {
                    headers: {
                        'Authorization' : `Bearer ` + token 
                    }
                });
                setUser(response.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        const fetchBalance = async () =>{
            try{
                const response = await axios.get('http://localhost:3000/api/v1/account/balance', {
                    headers: {
                        'Authorization' : `Bearer ` + localStorage.getItem('token') 
                    }
                });
                setBalance(response.data.balance);
            }catch(err){
                return (<div>404 balance not found</div>)
            }
        }
        
        fetchUser();
        fetchBalance();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>404 {JSON.stringify(error)}</div>;


    return <div>
        <Header title="Dashboard" />
        <SubHeading content="Your Bank Account" />
        <br />
        <Balance balance={ Math.floor(balance)} />
        <Users />
    </div>
}