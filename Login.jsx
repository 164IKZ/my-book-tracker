import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
function Login(){
    const [credentials, setCredentials] = useState({ email: '', password: '' })
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:5500/users?email=${credentials.email}&password=${credentials.password}`);
        const users= await response.json();
        if(users.length > 0){
            localStorage.setItem('userName', users[0].username);
            alert(`Добре дошъл отново, ${users[0].username}!`);
            navigate('/profile');
        }else {
            alert('Грешен имейл или парола!');
        }
    };
    return (
        <div style={{padding: '20px', maxWidth: '300px'}}>
            <h2>Вход</h2>
            <form onSubmit={handleSubmit}>
                <input type="email"
                placeholder="Имейл"
                required
                style={{ display: 'block', marginBottom: '10px', width:'100%'}}
                onChange={(e) => setCredentials({...credentials,email:e.target.value})}/>
                <input type="password"
                placeholder="Парола"
                required
                style={{ display: 'block', marginBottom: '10px', width: '100%'}}
                 onChange={(e) => setCredentials({...credentials,password:e.target.value})}/>
                 <button type="submit" style={{backgroundColor: '#6DDE86', border: 'none', padding: '10px', cursor: 'pointer'}}>
                    Влез
                 </button>
                 </form>
        </div>
    );
}
export default Login;