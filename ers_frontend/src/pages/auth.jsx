import { useState } from "react"
import axios from "../api/axios"


export default function Auth() {
    const [email,setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [bday, setBday] = useState('')
    const [username, setUsername] = useState('')
    
    //multi state toggle function
    const [state, setState] = useState({
        signup:false
    })

    const toggle = (key) => { 
        setState(prev => ({
            ...prev, [key] : !prev[key],
        }));
    }


    //Create account function
    const create_acc = async() =>{
        try {
            const res = await axios.post('/auth/sign-up',{
                email,
                password,
                username,
                bday
            })
            
            if (res.status === 201) window.alert("account created");// redirect logic dito
        } catch (error) {
            const msg = error?.response?.data?.error;
            alert(msg);
        }
        
        setBday('')
        setEmail('')
        setPassword('')
        setUsername('')
        
        
    }

    //Login function
    const login_acc = async() =>{
        try {
            const res = await axios.post('/auth/sign-in',{
                email,
                password,
            })

            if (res.status === 200) window.alert("login succ"); // redirect logic dito
        } catch (error) {
            const msg = error?.response?.data?.error;
            alert(msg);
        }

        setBday('')
        setEmail('')
        setPassword('')
        setUsername('')
        
    }

    return (
    <>
      <div className="auth-container">
        <form className='auth-form' action="submit" onSubmit={(e)=>{e.preventDefault();state.signup?create_acc():login_acc()}}>

        <button className="auth-box" onClick={(e)=>{e.preventDefault();toggle('signup')}}>{state.signup?"Go to Sign in":"Go to Sign un"}</button>
        <input type="text" className="auth-box" placeholder="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} required/>
        {/*optional render pag ganto, basically if true ung value saka lng magrerender*/ }
        {state.signup && <input type="text"placeholder="username"value={username} onChange={(e)=>setUsername(e.target.value)} required/>}
        {state.signup && <input type="date" className="auth-box" placeholder="birthday" value={bday }onChange={(e)=>{setBday(e.target.value)}} required/>}
        <input type="password" className="auth-box" placeholder="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} required/>
        <button className="auth-box"type="submit">{state.signup?"Create account":"Log in"}</button>
        </form>
     </div>

    </>
    )
}
