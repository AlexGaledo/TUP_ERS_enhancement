import { useState } from "react"



export default function Otp(){

    const [otp, setOtp] = useState('')
    const [disabled, setDisabled] = useState(false)
    const [timer, setTimer] = useState(0)


    const loading = () => {
        setDisabled(true);
        setTimer(60);
        let countdown = 60;
        const interval = setInterval(() => {
            countdown -= 1;
            setTimer(countdown);
            if (countdown === 0) {
                clearInterval(interval);
                setDisabled(false);
            }
        }, 1000);
    }

    const get_otp = async () => {
        if (disabled) return;
        loading();
        const email = localStorage.getItem('email_for_verification');
        if (!email) {
            window.alert("email not found");
            setDisabled(false);
            return;
        }
        const res = await fetch(`${import.meta.env.VITE_API_SECOND_URL}/send-otp`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "email": email
            })
        });
        if (res.status === 200) {
            window.alert("otp sent");
        }
    }

    const verify_otp = async() =>{
        const email = localStorage.getItem('email_for_verification');
        if (!email || !otp) {
            window.alert("Please enter your OTP");
            return;
        }
        const res = await fetch(`${import.meta.env.VITE_API_SECOND_URL}/verify-otp`,{
            method:'POST',
            headers: {
                'Content-Type':'application/json',
            },
            body:JSON.stringify({
                "email":email,
                "otp":otp
            })
        })
        if (res.status == 200){
            localStorage.removeItem('email_for_verification');
            window.alert("user verified");
        }

    }

    return (
        <>
            <div className="otp-container">
                <form action="submit" onSubmit={(e) =>{e.preventDefault();verify_otp()}}>
                    <input type="text" className="otp-textspace" placeholder="6-DIGIT OTP" required value={otp} onChange={(e)=>{setOtp(e.target.value)}} />
                    <h1
                        onClick={get_otp}
                        style={{ cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.5 : 1 }}
                    >
                        {disabled ? `please wait ${timer}s before trying again` : "send code"}
                    </h1>
                    <button className="otp-submit" type="submit">submit otp</button>
                </form>
            </div>
        </>
    );
}