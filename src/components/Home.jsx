import { useState } from "react";
import './home.css'

const API_URL = "https://api.github.com";

const fetchData = async (query) => {
  try {
    const response = await fetch(`${API_URL}/search/users?q=${query}`);
    const resData = await response.json();

    return resData.items;
  } catch (e) {
    console.log(e);
  }
};

export default function Home() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await fetchData(query);
    setResult(data);
  };

  return (
    <div className="app">
      <main className="main">
    
      <h2> GitHub User Search</h2>
        <form className="search-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter username"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
        <h3>Results</h3>
        <div className="result">
          
            {result.map((user) => (
              <div className="user" key={user.login}>
                <img
                  src={user.avatar_url}
                  alt="Profile"
                  width="50"
                  height="50"
                />
                <a
                  href={user.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {user.login}
                </a>
                </div>
            ))}
         
        </div>
    
      </main>
    </div>
  );
}
