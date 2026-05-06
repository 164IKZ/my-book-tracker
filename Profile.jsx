import React, {useState, useEffect} from "react";
import { useNavigate} from "react-router-dom";
function Profile(){
    const navigate= useNavigate();
    const name = localStorage.getItem("userName");
    const [myBooks, setMyBooks] = useState([]);
    useEffect(() => {
        const currentUser= localStorage.getItem("userName");
        if (currentUser) {
        fetch('http://localhost:5500/books')
        .then(res=> res.json())
        .then(data=>{ const myBooksOnly = data.filter(book =>book.added === true && book.userID === currentUser );
         setMyBooks(myBooksOnly);
        })
        .catch(err => console.error("Грешка:", err));
}}, [name]);
    const currentTrack = myBooks.filter(book => book.status === 'прочетена' || book.status === 'изслушана').length;
    const updateStatus = (id, newStatus) =>{
        fetch(`http://localhost:5500/books/${id}`,{
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ status: newStatus})
        })
        .then(res => res.json())
        .then(updatedBook => { setMyBooks(myBooks.map(book => book.id === id ? updatedBook: book));         
        });
    };
    const handleLogout =() =>{
        localStorage.removeItem("userName");
        navigate("/Login");
};
if(!name) return <div style={{padding: "20px"}}>Моля, влезте в профила си.</div>;
    return (
        <div style={{ padding: "20px", textAlign: "center"}}>
            <h2>Моят Профил</h2>
                <div style={{ border: "1px solid #6DDE86", padding: "20px", borderRadius: "10px", display: "inline-block"}}>
                    <p>Здравей отново, <strong>{name}</strong>!</p>
                    {currentTrack>0? (
                    <p>Твоят прогрес: <strong>{currentTrack}</strong> Завършени книги.</p>) : ( <p>Все още нямате прочетени книги.</p>)}
                    <button
                    onClick={handleLogout}
                    style={{ backgroundColor: "#4fa6f7", color: "white", border: "none", padding: "10px 15px", cursor: "pointer", borderRadius: "5px"}}>
                        Изход
                    </button>
            </div>
            <div style={{marginTop: "20px"}}>
                <h3>Моята библиотека:</h3>
                 {myBooks.length > 0 ? (
                    <div style={{display:"flex", flexDirection: "column", alignItems: "center", gap: "10px"}}>
                        {myBooks.map(book => (
                            <div key={book.id} style={{padding: "10px", border: "1px solid #eee", borderRadius: "5px", width: "250px",
                                 background: book.status === 'прочетена' ? '#00fd3b' :book.status === 'изслушана' ? '#03d7fd' : '#fff'
                                }}>
                                <strong style={{fontSize: "16px"}}>{book.title}</strong>
                                <p style={{ fontSize: "12px"}}>Статус: <strong>{book.status}</strong></p>
                                <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginTop: "10px"}}>
                               <button onClick={() => updateStatus(book.id, 'прочетена')}style={{ cursor: 'pointer', fontSize: "11px"}}>Прочетена</button>
                               <button onClick={() => updateStatus(book.id, 'изслушана')} style={{ cursor: 'pointer', fontSize: "11px"}}>Изслушана</button>
                                </div>
                        </div>
                    ))}
                    </div>
            ) : (
                <p>Все още нямате добавени книги.</p>
            )}
        </div>
        </div>
    );
}
export default Profile;