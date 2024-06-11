"use client";
import axios from "axios";
import { useEffect, useState } from "react";

const UserDetail = ({ params }) => {
  
  const id = params.Pages;

  const [user, setUser] = useState(null);

  useEffect(() => {
    if (id) {
      axios
        .get(`http://jsonplaceholder.typicode.com/users/${id}`)
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [id]);

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h1>{user.name}</h1>
      <p>Email: {user.email}</p>
      <p>Username: {user.username}</p>
      {/* Render other user details here */}
    </div>
  );
};

export default UserDetail;
