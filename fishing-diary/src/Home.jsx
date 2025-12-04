import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Home() {
    const navigate = useNavigate();
    const userEmail = localStorage.getItem('userEmail') || 'Fisherman';

    const [records, setRecords] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [newRecord, setNewRecord] = useState({ date: "", fishType: "", weightLength: "", status: "" });
    const [editingId, setEditingId] = useState(null);

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('userEmail');
        navigate('/login');
    };

    useEffect(() => {
        if (!localStorage.getItem('accessToken')) navigate('/login');

        axios.get(`http://localhost:3001/records?userEmail=${userEmail}`)
            .then(res => setRecords(res.data))
            .catch(err => console.log(err));
    }, [navigate, userEmail]);

    const handleDelete = (id) => {
        axios.delete(`http://localhost:3001/records/${id}`)
            .then(() => setRecords(records.filter(r => r._id !== id)))
            .catch(err => console.log(err));
    };

    const handleEdit = (record) => {
        setEditingId(record._id);
        setNewRecord({
            date: record.date,
            fishType: record.fishType,
            weightLength: record.weightLength,
            status: record.status
        });
        setShowForm(true);
    };

    const handleSaveRecord = async () => {
        if (!newRecord.date || !newRecord.fishType || !newRecord.weightLength || !newRecord.status) return;

        try {
            if (editingId) {
                const res = await axios.put(`http://localhost:3001/records/${editingId}`, { ...newRecord, userEmail });
                setRecords(records.map(r => r._id === editingId ? res.data : r));
                setEditingId(null);
            } else {
                const res = await axios.post('http://localhost:3001/records', { ...newRecord, userEmail });
                setRecords([...records, res.data]);
            }

            setNewRecord({ date: "", fishType: "", weightLength: "", status: "" });
            setShowForm(false);
        } catch (err) {
            console.error(err);
            alert("Failed to save record");
        }
    };

    return (
        <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-light text-white">
            <div className="bg-white text-dark p-5 rounded shadow text-center w-50">
                <h1 className="mb-3">Welcome Back, {userEmail}!</h1>
                <p className="lead">Glad to see you on your fishing dashboard</p>
                <button className="btn btn-danger mt-4 ms-2" onClick={handleLogout}>Logout</button>
                <button className="btn btn-info mt-4 ms-2" onClick={() => navigate('/map')}>
                    View Map
                </button>
                <button
                    className="btn btn-primary mt-4 ms-2"
                    onClick={() => navigate('/tides')}
                >
                    View Tide Chart
                </button>

            </div>

            <div className="justify-content-between bg-white shadow rounded p-3 mt-5 w-75 mb-2">
                <div className="d-flex justify-content-between align-items-center w-100 text-dark mb-3">
                    <h3>Records</h3>
                    <button className="btn btn-success" onClick={() => {setShowForm(!showForm);
                            setEditingId(null);
                            setNewRecord(
                                {date: "", fishType: "", weightLength: "", status: ""}
                            );
                    }}>
                        +
                    </button>
                </div>

                {showForm && (
                    <div className="border rounded p-3 mb-4">
                        <h5>{editingId ? "Edit Record" : "Add New Record"}</h5>

                        <input
                            type="text"
                            placeholder="Date"
                            className="form-control mb-2"
                            value={newRecord.date}
                            onChange={(e) => setNewRecord({ ...newRecord, date: e.target.value })}/>
                        <input
                            type="text"
                            placeholder="Fish Type"
                            className="form-control mb-2"
                            value={newRecord.fishType}
                            onChange={(e) => setNewRecord({ ...newRecord, fishType: e.target.value })}/>
                        <input
                            type="text"
                            placeholder="Weight / Length"
                            className="form-control mb-2"
                            value={newRecord.weightLength}
                            onChange={(e) => setNewRecord({ ...newRecord, weightLength: e.target.value })}/>
                        <input
                            type="text"
                            placeholder="Status"
                            className="form-control mb-2"
                            value={newRecord.status}
                            onChange={(e) => setNewRecord({ ...newRecord, status: e.target.value })}/>

                        <button className="btn btn-primary mt-2" onClick={handleSaveRecord}>
                            {editingId ? "Update Record" : "Save Record"}
                        </button>
                    </div>
                )}

                <table className="table table-bordered">
                    <thead>
                    <tr>
                        <th>Date</th>
                        <th>Fish Type</th>
                        <th>Weight / Length</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {records.map((record) => (
                        <tr key={record._id}>
                            <td>{record.date}</td>
                            <td>{record.fishType}</td>
                            <td>{record.weightLength}</td>
                            <td>{record.status}</td>
                            <td>
                                <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(record)}>Edit</button>
                                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(record._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Home;
