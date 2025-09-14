import {  useState } from "react";
import backend from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function ResetPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);


  const get_reset_link = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await backend.post('/auth/forgot-password', { email });
      if (res.status === 200) alert('reset link sent');

      
    } catch (err) {
      alert(err.response?.data?.error || 'Something went wrong');
      
    }finally{
    setLoading(false)
    }
  }


  return (
    <div className="reset-container">
      <form className="reset-form" onSubmit={get_reset_link}>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">{loading ? "Loading" : "Send Link"}</button>
      </form>
    </div>
  );
}
