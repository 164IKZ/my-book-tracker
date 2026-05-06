import React, { useState, useEffect } from 'react' ;
function Home() {
    const [books, setBooks] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetch('http://localhost:5500/books')
        .then(res => res.json())
        .then(data => setBooks(data))
        .catch(err => console.error("Грешка при връзката на сървъра:", err));     
    }, []);
const addToLibrary=(id) =>{
    const currentUser= localStorage.getItem("userName");
    if(!currentUser){
        alert("Моля влезте в профила!");
        return;
    }
    fetch(`http://localhost:5500/books/${id}`,{
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body:JSON.stringify({added: true, status: 'за четене', userID: currentUser})
    })
    .then(res => res.json())
    .then(updateBook => {
        setBooks(books.map(book => book.id ===id ?updateBook : book));
    });
};
return (
    <div style ={{ padding: '20px'}}>
    <h2> Каталог с книги</h2>
    <input 
    type="text"
    placeholder="Търси..."
    style={{ padding: '10px', marginBottom: '20px', width: '350px', borderRadius: '8px', bprder: '1px solid #6DDE86'}}
    onChange={(e)=> setSearchTerm(e.target.value)}/>
<div style={{display: 'flex', gap: '20px', flexWrap: 'wrap'}}>
    {books.filter(b => b.title.toLowerCase().includes(searchTerm.toLowerCase())).map(book =>(
        <div key ={book.id} style={{ border: '1px solid #6dde86', padding:'15px', borderRadius: '10px', width: '220px'}}>
        <h3>{book.title}</h3>
        <p><small>{book.author}</small></p>
        {book.added ? (
            <p style={{ color: '#6DDE86', fontWeight: 'bold'}}>В библиотеката </p>
        ):( 
            <button onClick ={() => addToLibrary(book.id)}
            style={{ background: '6DDE86', border: 'none', padding: '10px', cursor: 'pointer', borderRadius: '5px', width: '100%'}}
            > Добави към библиотека</button>
        )}
  </div>
    ))}
    </div>
    </div>
);}
export default Home;