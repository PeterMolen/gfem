import React, { useState, useEffect } from "react";
 
function Login() {
  const [notionname, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // Initially, user is not known (null). We'll find out after checking localStorage.
  const [user, setUser] = useState(null);
 
  useEffect(() => {
    // Attempt to retrieve user info from localStorage
    const userName = localStorage.getItem("UserName");
    const userId = localStorage.getItem("PrivateId");
    if (userName && userId) {
      // If both userName and userId are found in localStorage, update the user state
      setUser({ name: userName, id: userId });
    }
  }, []);
 
  const handleLogin = async (e) => {
    e.preventDefault();
 
    try {
      const response = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ notionname, password }),
      });
      const data = await response.json();
      if (response.ok) {
        // Update localStorage and user state with new user info
        localStorage.setItem("UserName", data.user);
        localStorage.setItem("PrivateId", data.userid);
        setUser({ name: data.user, id: data.userid });
      } else {
        alert("Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Network error or server cannot be reached");
    }
  };
  const handleLogout = () => {
    // Clear user info from localStorage
    localStorage.removeItem("UserName");
    localStorage.removeItem("PrivateId");
    // Reset user state to null
    setUser(null);
  };
  return (
    <div>
      {user ? (
        // Show user info if user state is set
        <div>
          <h2>Welcome, {user.name}</h2>
          <p>Your User ID: {user.id}</p>
          <button onClick={handleLogout}>Logout</button> {/* Logout button */}
        </div>
      ) : (
        // Otherwise, show the login form
        <form onSubmit={handleLogin}>
          <input
            type="text"
            value={notionname}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button type="submit">Login</button>
        </form>
      )}
    </div>
  );
}
 
export default Login;