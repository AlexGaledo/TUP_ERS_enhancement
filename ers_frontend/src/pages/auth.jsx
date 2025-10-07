import { useState } from "react"
import backend from "../api/axios"
import { useNavigate } from "react-router-dom"
import tup_artisan from '../assets/tup_artisan.png'
import logo from '../assets/logo-rectangles.png'


export default function Auth() {
    const [tup_Id,setTupId] = useState('')
    const [password, setPassword] = useState('')
    const [bday, setBday] = useState('')
    const [username, setUsername] = useState('')
    const navigate = useNavigate()
    
    //multi state toggle function
    const [state, setState] = useState({
        signup:false
    })

    const toggle = (key) => { 
        setState(prev => ({
            ...prev, [key] : !prev[key],
        }))
    }


    //Create account function
    const create_acc = async() =>{
        try {
            const res = await backend.post('/auth/sign-up',{
                email,
                password,
                username,
                bday
            })
            
            if (res.status === 201) window.alert("account created")// redirect logic dito
        } catch (error) {
            const msg = error?.response?.data?.error
            alert(msg)
        }
        
        setBday('')
        setEmail('')
        setPassword('')
        setUsername('')   
    }

    //Login function
    const login_acc = async(e) =>{
        e.preventDefault();
        try {
            const res = await backend.post('/auth/sign-in',{
                tup_Id,
                password,
            })

            if (res.status === 200) {
                window.alert("login succ") 
                localStorage.setItem('tup_Id', tup_Id)
                navigate('/otp')
            }
        } catch (error) {
            const msg = error?.response?.data?.error;
            alert(msg)
        }

        setTupId('')
        setPassword('')
        setUsername('')
        
    }

    return (
    <>
        <div className="login-container">
            <div className="login-form-container">
                <form action='submit' onSubmit={login_acc}  className="login-form" >
                    <div className="left-box">
                        <h1>Student Access Module</h1>
                        <img src={logo} alt="logo" className="logo" width={350}/>
                    </div>
                    
                    <div className="right-box">
                        <h1>Student Login</h1>
                        <input type="username" placeholder="TUP Student ID (TUPM-XX-XXXX)" value={tup_Id} 
                        onChange={(e)=>setTupId(e.target.value)} required/>
                        <input type="password" placeholder="Password" value={password} 
                        onChange={(e)=>setPassword(e.target.value)} required/>
                        <a>Forgot password?</a>
                        <button type="submit">Log In</button>
                    </div>
                </form>
            </div>
        </div>
    </>
    )
}