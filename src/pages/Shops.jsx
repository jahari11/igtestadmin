import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/shop.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons"; // Importing the "Plus" icon
import { toast } from "react-toastify"; // Importing Toastify
import "react-toastify/dist/ReactToastify.css";

const Shops = () => {
  const [shops, setShops] = useState([]);
  const [editShop, setEditShop] = useState({
    id: "",
    name: "",
    link: "",
    latitude: "",
    longitude: "",
    address: "",
  });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8000/api/location/getAll")
      .then((response) => response.json())
      .then((data) => setShops(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:8000/api/location/delete/${id}`, {
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
        setShops(shops.filter((shop) => shop._id !== id));
        toast.success("Shop deleted successfully");
        console.log("Shop deleted successfully:", data);
      })
      .catch((error) => {
        toast.error("Error deleting shop");
        console.error("Error deleting shop:", error);
      });
  };

  const handleEditModalOpen = (shop) => {
    setEditShop({
      id: shop._id,
      name: shop.name,
      link: shop.link,
      latitude: shop.latitude,
      longitude: shop.longitude,
      address: shop.address,
    });
    setIsEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditShop({ ...editShop, [name]: value });
  };

  const handleEditSubmit = () => {
    fetch(`http://localhost:8000/api/location/update/${editShop.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editShop),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to edit shop");
        }
        return response.json();
      })
      .then((data) => {
        // Update the state after successfully editing the shop
        setShops(
          shops.map((shop) => {
            if (shop._id === editShop.id) {
              return {
                ...shop,
                name: editShop.name,
                link: editShop.link,
                latitude: editShop.latitude,
                longitude: editShop.longitude,
                address: editShop.address,
              };
            }
            return shop;
          })
        );
        toast.success("Shop edited successfully");
        setIsEditModalOpen(false);
        console.log("Shop edited successfully:", data);
      })
      .catch((error) => {
        toast.error("Error editing shop");
        console.error("Error editing shop:", error);
      });
  };

  return (
    <div className="body-content">
      <div className="top-shop-container">
        <h2>Shops</h2>
        <Link to="/shop/add_shop" className=" btn-add">
          <FontAwesomeIcon icon={faPlus} className="icons mr-2" />{" "}
        </Link>
      </div>
      <div className="shop-table">
      <table className="table bg-dark  table-bordered">
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Link</th>
            <th>Latitude</th>
            <th>Longitude</th>
            <th>Address</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {shops.map((shop, index) => (
            <tr key={shop._id}>
              <td>{index + 1}</td>
              <td>{shop.name}</td>
              <td>
                <a href={shop.link} target="_blank" rel="noopener noreferrer">
                  {shop.link}
                </a>
              </td>
              <td>{shop.latitude}</td>
              <td>{shop.longitude}</td>
              <td>{shop.address}</td>
              <td>
                <button
                  onClick={() => handleEditModalOpen(shop)}
                  className="btn-edit"
                >
                  <FontAwesomeIcon icon={faEdit} />
                </button>
              </td>
              <td>
                <button
                  onClick={() => handleDelete(shop._id)}
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
            <h2>Edit Shop</h2>
            <div className="form-grou">
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={editShop.name}
                onChange={handleEditInputChange}
              />
            </div>
            <div className="form-grou">
              <label>Link:</label>
              <input
                type="text"
                name="link"
                value={editShop.link}
                onChange={handleEditInputChange}
              />
            </div>
            <div className="form-grou">
              <label>Latitude:</label>
              <input
                type="text"
                name="latitude"
                value={editShop.latitude}
                onChange={handleEditInputChange}
              />
            </div>
            <div className="form-grou">
              <label>Longitude:</label>
              <input
                type="text"
                name="longitude"
                value={editShop.longitude}
                onChange={handleEditInputChange}
              />
            </div>
            <div className="form-grou">
              <label>Address:</label>
              <input
                type="text"
                name="address"
                value={editShop.address}
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

export default Shops;
