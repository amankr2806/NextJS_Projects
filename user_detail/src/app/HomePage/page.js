'use client';
import * as React from 'react';
import DataTable from './components/DataTable';
import SignOutButton from './components/SignOut';
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AddDrawer from './components/AddDrawer';
import axios from 'axios';

export default function HomePage() {
  const [data, setData] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('https://jsonplaceholder.typicode.com/users');
        const users = res.data.map((user) => ({
          id: user.id,
          name: user.name,
          username: user.username,
          email: user.email,
        }));
        setData(users);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const addUser = (user) => {
    setData((prevData) => [user, ...prevData]);
  };

  const updateUser = (updatedUser) => {
    setData((prevData) =>
      prevData.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
  };

  useEffect(() => {
    const auth = localStorage.getItem("LoggedIn");
    if (!auth) {
      router.push("/");
    }
  }, [router]);

  return (
    <div>
      <h1>This is Home Page</h1>
      <AddDrawer addUser={addUser} editUser={editUser} updateUser={updateUser} />
      <DataTable data={data} setData={setData} setEditUser={setEditUser} />
      <SignOutButton />
    </div>
  );
}
