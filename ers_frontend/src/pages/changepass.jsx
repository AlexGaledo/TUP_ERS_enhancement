import { useState } from "react"
import backend from "../api/axios"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom";




export default function ChangePass(){
    const [password, setNewPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const { token } = useParams()
    const navigate = useNavigate()

    const verify_token = async(e) =>{
        e.preventDefault()
        setLoading(true)
        try {
            const res = await backend.post(`/auth/reset-password/${token}`,{password})
            if (res.status === 200) alert(res.data?.response)
            else alert(res.data?.response)
        } catch (error) {
           const msg = error?.response?.data?.error;
           navigate('/auth');  
           alert(msg)
        }
    
    }

    return(
        <>
        <div className="changepass-container">
            <form action="submit" className="changepass-form" onSubmit={verify_token}>
                <input type="password"onChange={(e) => setNewPassword(e.target.value)}
                value={password} required placeholder="new password"/>
                <input type="password"onChange={(e) => setNewPassword(e.target.value)}
                value={password} required placeholder=" confirm new password"/>
                <button type="submit" className="changepass-submit">{loading?"Loading...":"change password"}</button>
            </form>
        </div>
        </>
    )
}