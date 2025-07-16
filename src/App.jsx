import React from 'react';
import { useEffect, useState, useRef } from 'react';
import './App.css'
import UserLoading from './components/Skeleton';


export default function App(){

const [users, setUsers] = useState([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);
const inputRef = useRef('');
const [searchQuery, setSearchQuery] = useState('');
const [selectedLanguage, setSelectedLanguage] = useState('All');

const languages = ['All', ...new Set(users.map(repo => repo.language).filter(Boolean))];

useEffect(() =>{
  setLoading(true);
  setError(null)
  async function fetchRepo(){
    try {
      const response = await fetch('https://api.github.com/search/repositories?q=stars:>1&sort=stars&order=desc&per_page=10')
      if(!response.ok) throw new Error('API is not working')
      const data = await response.json();
      setUsers(data.items);  
    } catch (error) {
      setError(error)
      
    }finally{
      setLoading(false);
    }
  }
  fetchRepo();
},[])

const handleSearch= async () =>{
  const query = inputRef.current.value.trim();
  if(!query) return
  setLoading(true);
  setError(null)

  try {
    const res = await fetch(`https://api.github.com/search/repositories?q=${query}&sort=stars&order=desc`);
    if(!res.ok) throw new Error('Issue in API Key');
    const data = await res.json();
    setUsers(data.items);
  } catch (error) {
    setError(error);
  }finally{
    setLoading(false);
  }

}

useEffect(() =>{
  const timer = setTimeout(()=>{
    if(searchQuery.trim()){
      fetchRepo(searchQuery.trim());
    }

  }, 600)
  return () => clearTimeout(timer)
},[searchQuery])

const filteredUsers = selectedLanguage === 'All'
? users : users.filter(repo => repo.language === selectedLanguage);


return(
  <>
  {loading && <p>Loading.....</p>}
  {error && <p>{error.message}</p>}
    <div className="searchbar">
      <input ref={inputRef} placeholder='Search or Jump to...' type='text' />
      <button onClick={handleSearch}>Search</button>
      <select onChange={(e) => setSelectedLanguage(e.target.value)}>
        {languages.map((lang, i)=>(
          <option key={i} value={lang}>{lang}</option>
        ))}
      </select>
    </div>
  <div className="mainDiv">
    {loading ? (
      Array.from({length: 5}).map((_,i) => <UserLoading  key={i} />)
    ):(
      filteredUsers.map(user =>(
        <div key={user.id} className='mainCard'>
        <img width={'60px'} src={user.owner.avatar_url} alt={user.name} />
        <h4 style={{textTransform:'capitalize'}}>{user.name}</h4>
        <p>Profile : {user.owner.user_view_type}</p>
        <p>{user.description}</p>
        <p><a style={{color:'blue'}} href={user.owner.html_url}>View Profile</a></p>
      </div>
      ))
    )
    }
    
    </div>
  </>
)



}