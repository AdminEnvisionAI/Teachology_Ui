import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faCalendarAlt } from "@fortawesome/free-regular-svg-icons"; // Import calendar icon

function OutputHistory() {
  const [data, setData] = useState([
    // Sample data - replace with your actual data source
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@gmail.com",
      title: "Software engineer",
      department: "IT department",
      status: "Active",
      position: "Senior",
      date: "2024-01-15",
      image: "https://mdbootstrap.com/img/new/avatars/8.jpg", // added image
    },
    {
      id: 2,
      name: "Alex Ray",
      email: "alex.ray@gmail.com",
      title: "Consultant",
      department: "Finance",
      status: "Onboarding",
      position: "Junior",
      date: "2024-02-20",
      image: "https://mdbootstrap.com/img/new/avatars/6.jpg", // added image
    },
    {
      id: 3,
      name: "Kate Hunington",
      email: "kate.hunington@gmail.com",
      title: "Designer",
      department: "UI/UX",
      status: "Awaiting",
      position: "Senior",
      date: "2024-03-10",
      image: "https://mdbootstrap.com/img/new/avatars/7.jpg", // added image
    },
    {
      id: 4,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      title: "Project Manager",
      department: "Management",
      status: "Active",
      position: "Senior",
      date: "2024-04-01",
      image: "https://mdbootstrap.com/img/new/avatars/5.jpg", // added image
    },
    {
      id: 5,
      name: "Peter Jones",
      email: "peter.jones@example.com",
      title: "Data Analyst",
      department: "Analytics",
      status: "Active",
      position: "Junior",
      date: "2024-04-15",
      image: "https://mdbootstrap.com/img/new/avatars/4.jpg", // added image
    },
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id)); //remove by item id
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const filteredData = data.filter((item) => {
    const searchMatch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.title.toLowerCase().includes(searchTerm.toLowerCase());

    const dateMatch =
      (!startDate || new Date(item.date) >= new Date(startDate)) &&
      (!endDate || new Date(item.date) <= new Date(endDate));

    return searchMatch && dateMatch;
  });

  return (
    <div className="container" id="outputhistory">
      <h2>Output History</h2>

      {/* Search and Date Filters */}
      <div className="mb-3">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Search by Name or Title"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-6">
          <div className="input-group">
            <div className="input-group-prepend">
              <span
                className="input-group-text"
                style={{
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <FontAwesomeIcon icon={faCalendarAlt} />
              </span>
            </div>
            <input
              type="date"
              className="form-control"
              value={startDate}
              onChange={handleStartDateChange}
            />
          </div>
        </div>

        <div className="col-md-6">
          <div className="input-group">
            <div className="input-group-prepend">
              <span
                className="input-group-text"
                style={{
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <FontAwesomeIcon icon={faCalendarAlt} />
              </span>
            </div>
            <input
              type="date"
              className="form-control"
              value={endDate}
              onChange={handleEndDateChange}
            />
          </div>
        </div>
      </div>

      <div className="table-responsive">
        {/* Add table responsiveness */}
        <table className="table table-striped table-bordered">
          <thead className="thead-dark">
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Title</th>
              <th>Status</th>
              <th>Position</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr key={item.id}>
                <td>
                  <div className="d-flex align-items-center">
                    <img
                      src={item.image}
                      alt={`${item.name} Avatar`}
                      style={{ width: "45px", height: "45px" }}
                      className="rounded-circle"
                    />
                    <div className="ms-3"></div>
                  </div>
                </td>
                <td>
                  <div className="d-flex align-items-center">
                    <div className="ms-3">
                      <p className="fw-bold mb-1">{item.name}</p>
                      <p className="text-muted mb-0">{item.email}</p>
                    </div>
                  </div>
                </td>
                <td>{item.title}</td>
                <td>
                  <span
                    className={`badge ${
                      item.status === "Active"
                        ? "badge-success"
                        : item.status === "Onboarding"
                        ? "badge-primary"
                        : "badge-warning"
                    } rounded-pill d-inline`}
                    style={{ color: "black" }}
                  >
                    {item.status}
                  </span>
                </td>
                <td>{item.position}</td>
                <td>{item.date}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(item.id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredData.length === 0 && <p>No matching data found.</p>}
      </div>
    </div>
  );
}

export default OutputHistory;
