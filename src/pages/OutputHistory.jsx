import React, { useState, useCallback, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { updateHistory, selectHistory } from "../redux/historySlice";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faBan } from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { selectUserId } from "../redux/authSlice";
import Swal from "sweetalert2";
import { faCalendarAlt } from "@fortawesome/free-regular-svg-icons";

const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

function OutputHistory() {
  const [historyData, setHistoryData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTool, setSelectedTool] = useState("all");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const history = useSelector(selectHistory);
  const [allTools, setAllTools] = useState([]);
  const userId = useSelector(selectUserId);
  

  const fetchHistoryData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      let url = `${API_BASE_URL}/api/history?user_id=${userId}`;
      if (searchQuery) url += `&search=${searchQuery}`;
      if (selectedTool !== "all") url += `&tool=${selectedTool}`;
      if (startDate) url += `&startDate=${format(startDate, "yyyy-MM-dd")}`;
      if (endDate) url += `&endDate=${format(endDate, "yyyy-MM-dd")}`;

      const response = await axios.get(url);
      setHistoryData(response.data);
      dispatch(updateHistory(response.data));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [searchQuery, selectedTool, startDate, endDate, dispatch, userId]);

  useEffect(() => {
    fetchHistoryData();

    const getDistinctTools = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/distinct-tools?user_id=${userId}`
        );
        setAllTools(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getDistinctTools();
  }, [fetchHistoryData, userId]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleToolChange = (selectedOption) => {
    setSelectedTool(selectedOption ? selectedOption.value : "all");
  };

  const handleDateChange = (type, date) => {
    if (type === "start") setStartDate(date);
    else setEndDate(date);
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoading(true);
        setError(null);
        try {
          await axios.post(`${API_BASE_URL}/api/delete/history`, {
            history_id: id,
            user_id: userId,
          });

          fetchHistoryData();
          Swal.fire("Deleted!", "Your entry has been deleted.", "success");
        } catch (err) {
          setError(err.message);
          Swal.fire(
            "Error!",
            "There was an error deleting your entry.",
            "error"
          );
        } finally {
          setLoading(false);
        }
      }
    });
  };

  const deleteAllHistory = async () => {
    Swal.fire({
      title: "Are you absolutely sure?",
      text: "This will delete all your history entries and cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete all!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoading(true);
        setError(null);
        try {
          await axios.post(`${API_BASE_URL}/api/delete_all_history`, {
            user_id: userId,
          });

          fetchHistoryData();
          Swal.fire(
            "Deleted!",
            "All history entries have been deleted.",
            "success"
          );
        } catch (err) {
          setError(err.message);
          Swal.fire("Error!", "There was an error deleting history.", "error");
        } finally {
          setLoading(false);
        }
      }
    });
  };

  const toolOptions = [
    { value: "all", label: "All Tools" },
    ...allTools.map((tool) => ({ value: tool, label: tool })),
  ];

  const filteredData = historyData.filter((item) => {
    const searchMatch = item.title
      ?.toLowerCase()
      .includes(searchQuery.toLowerCase());

    let toolMatch = true;
    if (selectedTool !== "all") {
      toolMatch = item.tool === selectedTool;
    }

    const dateMatch =
      (!startDate || new Date(item.createdAt) >= new Date(startDate)) &&
      (!endDate || new Date(item.createdAt) <= new Date(endDate));

    return searchMatch && toolMatch && dateMatch;
  });

  return (
    <div className="container" id="outputhistory">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Output History</h2>
        <button
          className="btn btn-outline-primary"
          onClick={deleteAllHistory}
          disabled={loading}
        >
          <FontAwesomeIcon icon={faBan} style={{ marginRight: "5px" }} />
          Delete All History
        </button>
      </div>

      <div className="row mb-3">
        {/* Search Filter */}
        <div className="col-md-4 mb-2">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search by Title"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
        </div>

        {/* Tool Filter */}
        <div className="col-md-4 mb-2">
          <Select
            className="react-select-container"
            classNamePrefix="react-select"
            options={toolOptions}
            value={toolOptions.find((option) => option.value === selectedTool)}
            onChange={handleToolChange}
            placeholder="Select Tool"
            isClearable={false} // Prevent clearing the selected tool to keep 'All Tools' always available
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                borderColor: state.isFocused ? "#80bdff" : "#ced4da",
                boxShadow: state.isFocused
                  ? "0 0 0 0.2rem rgba(0,123,255,.25)"
                  : null,
              }),
            }}
          />
        </div>

        {/* Date Filters */}
        <div className="col-md-4">
          <div className="d-flex">
            <div className="input-group mr-2">
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
              <DatePicker
                selected={startDate}
                onChange={(date) => handleDateChange("start", date)}
                dateFormat="MM/dd/yyyy"
                placeholderText="Start Date"
                className="form-control"
                selectsStart
                startDate={startDate}
                endDate={endDate}
              />
            </div>

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
              <DatePicker
                selected={endDate}
                onChange={(date) => handleDateChange("end", date)}
                dateFormat="MM/dd/yyyy"
                placeholderText="End Date"
                className="form-control"
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
              />
            </div>
          </div>
        </div>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="thead-dark">
            <tr>
              <th>Title</th>
              <th>Tool</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr key={item._id}>
                <td>{item.title}</td>
                <td>{item.tool}</td>
                <td>{format(new Date(item.createdAt), "MM/dd/yyyy HH:mm")}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(item._id)}
                    disabled={loading}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredData.length === 0 && !loading && (
          <p>No matching data found.</p>
        )}
      </div>
    </div>
  );
}

export default OutputHistory;
