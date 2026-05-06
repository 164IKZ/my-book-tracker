import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
function Register() {
    const [user, setUser] = useState({
        username: '',
        email: '',
        password: '',
        age: ''
    });
    const navigate = useNavigate();
    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        fetch ('http://localhost:5500/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(user)
        })
        .then(res => {
            if(res.ok){
                alert('Вие се регистрирахте успешно!');
                navigate('/profile');
            }
        })
        .catch(err => console.error("Грешка:", err));
    };
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '77vh'
        }}>
            <form onSubmit={handleSubmit} style={{
                border: '2px solid #46F26B',
                padding: '25px',
                borderRadius: '36px',
                boxShadow: '0 8px 16px rgba(0,0,0,0.26)',
                width: '300px',
                display: 'flex',
                flexDirection: 'column',
                gap: '15px'
            }}>
                <h3 style={{ textAlign: 'center', color: '#C61459'}}>Регистрация</h3>
                <input
                type="text"
                name="username"
                placeholder="Потребителско име"
                value={user.username}
                onChange={handleChange}
                required
                style={inputStyle}/>
                <input
                type="email"
                name="email"
                placeholder="Имейл"
                value={user.email}
                onChange={handleChange}
                required
                style={inputStyle}/>
                <input
                type="password"
                name="password"
                placeholder="Парола"
                value={user.password}
                onChange={handleChange}
                required
                style={inputStyle}/>
                <input 
                type="number"
                name="age"
                placeholder="Възраст"
                value={user.age}
                onChange={handleChange}
                required
                style={inputStyle} />
                <button type="submit" style={{
                    backgroundColor: '#C23067' ,
                    color: 'white',
                    border: '2px' ,
                    padding: '22px' ,
                    borderRadius: '16px',
                    fontSize: '22px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    boxShadow: '0 4px 4px rgba(0,0,0,0.26)'
                }}>Регистрация</button>
            </form>
        </div>
    );
}
const inputStyle= {
    padding: '22px',
    borderRadius: '16px',
    border: '2px solid #F59ABC',
    fontSize: '22px'
};
export default Register;