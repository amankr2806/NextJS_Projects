'use client';
import * as React from "react";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";

export default function DataTable({ data, setEditUser }) {
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "firstName", headerName: "First name", width: 130 },
    { field: "lastName", headerName: "Last name", width: 130 },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      width: 90,
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
  ];

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://dummyjson.com/users/${id}`);
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
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
}
