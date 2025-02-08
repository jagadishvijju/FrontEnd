import React, { useState, useEffect } from "react";
import axios from "axios";

const apiUrl = "http://127.0.0.1:8000/students/";

function App() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ name: "", age: "", grade: "" });
  const [editingId, setEditingId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(apiUrl);
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`${apiUrl}${editingId}`, form);
      } else {
        await axios.post(apiUrl, form);
      }
      setForm({ name: "", age: "", grade: "" });
      setEditingId(null);
      fetchStudents();
    } catch (error) {
      console.error("Error saving student:", error);
    }
  };

  const handleEdit = (student) => {
    setForm({ name: student.name, age: student.age, grade: student.grade });
    setEditingId(student.name);
  };

  const handleDelete = async (name) => {
    try {
      await axios.delete(`${apiUrl}${name}`);
      fetchStudents();
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="App" style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      {/* Header and Search */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>Student Report</h1>
        <input
          type="text"
          placeholder="Search by name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            padding: "10px",
            width: "250px",
            border: "1px solid #ddd",
            borderRadius: "5px",
          }}
        />
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} style={{ margin: "20px 0" }}>
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
          style={{
            padding: "10px",
            marginRight: "10px",
            border: "1px solid #ddd",
            borderRadius: "5px",
          }}
        />
        <input
          type="number"
          placeholder="Age"
          value={form.age}
          onChange={(e) => setForm({ ...form, age: e.target.value })}
          required
          style={{
            padding: "10px",
            marginRight: "10px",
            border: "1px solid #ddd",
            borderRadius: "5px",
          }}
        />
        <input
          type="text"
          placeholder="Grade"
          value={form.grade}
          onChange={(e) => setForm({ ...form, grade: e.target.value })}
          required
          style={{
            padding: "10px",
            marginRight: "10px",
            border: "1px solid #ddd",
            borderRadius: "5px",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            backgroundColor: editingId ? "#f0ad4e" : "#4CAF50",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {editingId ? "Update" : "Add"}
        </button>
      </form>

      {/* Scrollable Table */}
      <div
        style={{
          width: "100%",
          maxHeight: "400px",
          overflowY: "auto",
          border: "1px solid #ddd",
          borderRadius: "5px",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#f4f4f4", textAlign: "left" }}>
              <th style={{ border: "1px solid #ddd", padding: "10px" }}>Name</th>
              <th style={{ border: "1px solid #ddd", padding: "10px" }}>Age</th>
              <th style={{ border: "1px solid #ddd", padding: "10px" }}>Grade</th>
              <th style={{ border: "1px solid #ddd", padding: "10px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => (
              <tr key={student.id}>
                <td style={{ border: "1px solid #ddd", padding: "10px" }}>{student.name}</td>
                <td style={{ border: "1px solid #ddd", padding: "10px" }}>{student.age}</td>
                <td style={{ border: "1px solid #ddd", padding: "10px" }}>{student.grade}</td>
                <td style={{ border: "1px solid #ddd", padding: "10px" }}>
                  <button
                    onClick={() => handleEdit(student)}
                    style={{
                      padding: "5px 10px",
                      marginRight: "10px",
                      backgroundColor: "#5bc0de",
                      color: "#fff",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(student.name)}
                    style={{
                      padding: "5px 10px",
                      backgroundColor: "#d9534f",
                      color: "#fff",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
