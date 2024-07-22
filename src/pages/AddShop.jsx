import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../styles/addshop.css";



const AddShop = () => {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [address, setAddress] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "name":
        setName(value);
        break;
      case "link":
        setLink(value);
        break;
      case "address":
        setAddress(value);
        break;
      case "latitude":
        setLatitude(value);
        break;
      case "longitude":
        setLongitude(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = {
      name,
      link,
      latitude,
      longitude,
      address,
    };

    try {
      const response = await fetch(
        "https://igtestbackend-5ab2183ee5ee.herokuapp.com/api/location/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formDataToSend),
        }
      );
      toast.success("Shop added successfully");

      navigate("/shop");
    } catch (error) {
      console.error("Error adding shop:", error);
    }
  };

  return (
    <div className="add-container">
      <div className="add-box">
        <h2 className="shop-h">Add Shop</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="old-label">Name:</label>
            <input
              className="old-input"
              type="text"
              name="name"
              value={name}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label className="old-label">Link:</label>
            <input
              className="old-input"
              type="text"
              name="link"
              value={link}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label className="old-label">Address:</label>
            <input
              className="old-input"
              type="text"
              name="address"
              value={address}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label className="old-label">Latitude:</label>
            <input
              className="old-input"
              type="text"
              name="latitude"
              value={latitude}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label className="old-label">Longitude:</label>
            <input
              className="old-input"
              type="text"
              name="longitude"
              value={longitude}
              onChange={handleChange}
            />
          </div>
          <div className="btn-box">
            <button className="btn-dark" type="submit">
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddShop;
