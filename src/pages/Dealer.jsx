import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/dealer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons"; // Importing the "Plus" icon
import { toast } from "react-toastify"; // Importing Toastify
import "react-toastify/dist/ReactToastify.css";
import User01 from "../assets/man.png"



const Dealer = () => {
  const [dealer, setDealer] = useState([]);
  const [id, setId] = useState([]);
  const [editDealer, setEditDealer] = useState({
    dealer_name: "",
    dealer_location: "",
    dealer_description: "",
    dealer_rating: "",
    dealer_insta: "",
    dealer_twi: "",
    dealer_address: "",
  });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    fetch("https://igtestbackend-5ab2183ee5ee.herokuapp.com/api/dealer/getAll")
      .then((response) => response.json())
      .then((data) => setDealer(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleDelete = (id) => {
    fetch(`https://igtestbackend-5ab2183ee5ee.herokuapp.com/api/dealer/delete/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete shop");
        }
        return response.json();
      })
      .then((data) => {
        // Update the state after successfully deleting the shop
        setDealer(dealer.filter((deal) => deal._id !== id));
        toast.success("Dealer deleted successfully");
        console.log("Dealer deleted successfully:", data);
      })
      .catch((error) => {
        toast.error("Error deleting Dealer");
        console.error("Error deleting Dealer:", error);
      });
  };

  const handleEditModalOpen = (dealer) => {


    setId(dealer._id);
    setEditDealer({
      dealer_name: dealer.dealer_name,
      dealer_location: dealer.dealer_location,
      dealer_description: dealer.dealer_description,
      dealer_rating: dealer.dealer_rating,
      dealer_insta: dealer.dealer_insta,
      dealer_twi: dealer.dealer_twi,
      dealer_address: dealer.dealer_address,
      
    });
    setIsEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditDealer({ ...editDealer, [name]: value });
  };

 

  console.log("editDealer", editDealer)
  console.log("Id", id)
  const handleEditSubmit = () => {
    fetch(`https://igtestbackend-5ab2183ee5ee.herokuapp.com/api/dealer/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editDealer),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to edit dealer");
        }
        return response.json();
      })
      .then((data) => {
        // Update the state after successfully editing the dealer
        setDealer(
          dealer.map((dealer) => {
            if (dealer._id === editDealer.id) {
              return {
                ...dealer,

                dealer_name: editDealer.dealer_name,
                dealer_location: editDealer.dealer_location,
                dealer_description: editDealer.dealer_description,
                dealer_rating: editDealer.dealer_rating,
                dealer_insta: editDealer.dealer_insta,
                dealer_twi: editDealer.dealer_twi,
                dealer_address: editDealer.dealer_address,
              };
            }
            return dealer;
          })
        );
        toast.success("Dealer edited successfully");
        setIsEditModalOpen(false);
        console.log("Dealer edited successfully:", data);
      })
      .catch((error) => {
        toast.error("Error editing dealer");
        console.error("Error editing dealer:", error);
      });
  };

  return (
    <div className="body-content">
      <div className="top-shop-container">
        <h2>Dealer</h2>
        <Link to="/dealer/add_dealer" className=" btn-add">
          <FontAwesomeIcon icon={faPlus} className="icons mr-2" />{" "}
        </Link>
      </div>
      <div className="shop-table">
        <table className="table bg-dark  table-bordered">
          <thead>
            <tr>
              <th>No</th>
              <th></th>
              <th>Name</th>
              <th>location</th>
              <th>Description</th>
              <th>dealer_rating</th>
              <th>Website</th>
              <th>Instagram</th>
              <th>Twitter</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {dealer.map((dealer, index) => (
              <tr key={dealer._id}>
                <td>{index + 1}</td>
                {
  dealer.profileName ? (
    <td><img src={`https://igtestbackend-5ab2183ee5ee.herokuapp.com/api/user/getImage/${dealer.profileName}`} className="user-img" alt="" /></td>
    ):(
    <td><img src={User01} className="user-img" alt="" /></td>
  )
}
                <td>{dealer.dealer_name}</td>
                <td>
                  <a
                    href={dealer.dealer_location}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {dealer.dealer_location}
                  </a>
                </td>
                <td>{dealer.dealer_description}</td>
                <td>{dealer.dealer_rating}</td>
                <td>
                <a
                    href={dealer.dealer_address}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Website Link
                  </a>
                </td>
                <td>{dealer.dealer_insta}</td>
                <td>{dealer.dealer_twi}</td>

                <td>
                  <button
                    onClick={() => handleEditModalOpen(dealer)}
                    className="btn-edit"
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(dealer._id)}
                    className="btn-delete"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isEditModalOpen && (
        <div className="edit-modal">
          <div className="edit-modal-content">
            <span className="close" onClick={handleEditModalClose}>
              &times;
            </span>
            <h2>Edit Dealer</h2>
            <div className="form-grou">
              <label> Name:</label>
              <input
                type="text"
                name="dealer_name"
                value={editDealer.dealer_name}
                onChange={handleEditInputChange}
              />
            </div>
            <div className="form-grou">
              <label> location:</label>
              <input
                type="text"
                name="dealer_location"
                value={editDealer.dealer_location}
                onChange={handleEditInputChange}
              />
            </div>

            <div className="form-grou">
              <label> Description:</label>
              <input
                type="text"
                name="dealer_description"
                value={editDealer.dealer_description}
                onChange={handleEditInputChange}
              />
            </div>

            <div className="form-grou">
              <label> Rating:</label>
              <input
                type="text"
                name="dealer_rating"
                value={editDealer.dealer_rating}
                onChange={handleEditInputChange}
              />
            </div>

            <div className="form-grou">
              <label> Address:</label>
              <input
                type="text"
                name="dealer_address"
                value={editDealer.dealer_address}
                onChange={handleEditInputChange}
              />
            </div>

            <div className="form-grou">
              <label> Instagram:</label>
              <input
                type="text"
                name="dealer_insta"
                value={editDealer.dealer_insta}
                onChange={handleEditInputChange}
              />
            </div>

            <div className="form-grou">
              <label> Twitter:</label>
              <input
                type="text"
                name="dealer_twi"
                value={editDealer.dealer_twi}
                onChange={handleEditInputChange}
              />
            </div>

            <button onClick={handleEditSubmit}>Save</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dealer;
