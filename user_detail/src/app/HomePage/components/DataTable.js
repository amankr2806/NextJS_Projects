'use client';
import * as React from "react";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function DataTable({ data, setData, setEditUser }) {

  const router = useRouter();
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "name", width: 130 },
    { field: "username", headerName: "username", width: 130 },
    {
      field: "email",
      headerName: "email",
      // type: "number",
      width: 200,
    },
    {
      field: "edit",
      headerName: "Edit",
      width: 100,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={() => handleEdit(params.row)}
        >
          Edit
        </Button>
      ),
    },
    {
      field: "delete",
      headerName: "Delete",
      width: 100,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="error"
          size="small"
          onClick={() => handleDelete(params.id)}
        >
          Delete
        </Button>
      ),
    },
    {
      field: "view",
      headerName: "View",
      width: 100,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={() => handleView(params.id)}
        >
          View
        </Button>
      ),
    },
  ];

  

  const handleView = (id) => {
    
      router.push(`/HomePage/${id}`)
  
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://jsonplaceholder.typicode.com/users/${id}`);
      setData((prevData) => prevData.filter((row) => row.id !== id));
      console.log("Deleted row with id:", id);
    } catch (error) {
      console.error("Error deleting row:", error);
    }
  };

  const handleEdit = (row) => {
    setEditUser(row);
  };

  return (
    <div
      style={{
        height: 400,
        width: "100%",
        marginBottom: "15px",
        marginTop: "15px",
      }}
    >
      <DataGrid
        rows={data}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 1, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
         //checkboxSelection
      />
    </div>
  );
}

