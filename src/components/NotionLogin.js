import React, { useState, useEffect } from "react";
import Modal from "./LoginModal";

function NotionLogin() {
  const [notionname, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  // Initially, user is not known (null). We'll find out after checking localStorage.
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Attempt to retrieve user info from localStorage
    const userName = localStorage.getItem("UserName");
    const userId = localStorage.getItem("PrivateId");
    const personid = localStorage.getItem("PersonID");
    const userRole = localStorage.getItem("Roll");
    if (userName && userId) {
      // If both userName and userId are found in localStorage, update the user state
      setUser({ name: userName, id: userId, role: userRole });
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
        localStorage.setItem("PersonID", data.nameid)
        localStorage.setItem("Roll" , data.userRole)
        setUser({ name: data.user, id: data.userid, role: data.userRole });
        window.location.reload();
        setShowModal(false); // Close the modal after successful login
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
    localStorage.removeItem("PersonID");
    localStorage.removeItem("Roll");
    window.location.reload();
    // Reset user state to null
    setUser(null);
  };

  return (
    <div>
      {user ? (
        <div>
          <p style={{ color: "Lightgreen", border: "1px solid Lightgreen", padding: "5px", borderRadius: "5px" }}>
  <i className='bx bxs-user-check'></i> {user.name}, ID: {user.id} <br/> {user.role}
</p>
          <button className="btn-box" onClick={handleLogout}>
            Logout
          </button>
        </div>
      ) : (
        <div>
      <button className="btn-box" onClick={() => setShowModal(true)}>
      <i class='bx bxs-user'></i> Login
      </button>
          {/* Modal for login */}
          {showModal && (
            <Modal closeModal={() => setShowModal(false)}>
              <i class='bx bxs-user-circle'></i>
               <h1 style={{ color: 'black' }}>Login</h1>
               <br />
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
                 <br />
                 <br />
                <button type="submit" className="btn-box">
                  Login
                </button>
              </form>
            </Modal>
          )}
        </div>
      )}
    </div>
  );
}
 
export default NotionLogin;