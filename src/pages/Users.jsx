import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import "../styles/user.css";
import User01 from "../assets/man.png"
const Users = () => {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState({});
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("https://igtestbackend-5ab2183ee5ee.herokuapp.com/api/user/getall");


const cusData = response.data.users.filter((users)=> users.role === "customer")

      setUsers(cusData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const openEditPopup = (user) => {
    setEditUser(user);
    setIsEditModalOpen(true);
  };

  const closeEditPopup = () => {
    setIsEditModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `https://igtestbackend-5ab2183ee5ee.herokuapp.com/api/user/edit/${editUser._id}`,
        editUser
      );
      closeEditPopup();
      toast.success("User updated successfully");
      fetchData();
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Error updating user");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://igtestbackend-5ab2183ee5ee.herokuapp.com/api/user/delete/${id}`);
      setUsers(users.filter((user) => user._id !== id));
      toast.success("User deleted successfully");
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Error deleting user");
    }
  };

  return (
    <div className="user-container">
      <h2 className="my-4">Users</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">No</th>
            <th scope="col">User Image</th>
            <th scope="col">User Name</th>
            <th scope="col">Mobile Number</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id}>
              <td>{index + 1}</td>
              {/* <td>{user.username}</td> */}

{
  user.profileName ? (
    <td><img src={`https://igtestbackend-5ab2183ee5ee.herokuapp.com/api/user/getImage/${user.profileName}`} className="user-img" alt="" /></td>
    ):(
    <td><img src={User01} className="user-img" alt="" /></td>
  )
}



              
              <td>{user.username}</td>
              <td>{user.mobile}</td>

              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => openEditPopup(user)}
                >
                  <EditIcon />
                </button>
              </td>

              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(user._id)}
                >
                  <DeleteIcon />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Custom Edit Popup */}
      {isEditModalOpen && (
        <div className="custom-modal">
          <div className="modal-content">
            <span className="close" onClick={closeEditPopup}>
              &times;
            </span>
            <h2>Edit User</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <input
                  disabled
                  type="text"
                  className="form-control"
                  id="username"
                  name="username"
                  value={editUser.username || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="mobile" className="form-label">
                  Mobile Number
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="mobile"
                  name="mobile"
                  value={editUser.mobile || ""}
                  onChange={handleChange}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default Users;
