import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../styles/addshop.css";
import axios from "axios";



const AddDealer = () => {
  const [dealer_name, setDealer_name] = useState("");
  const [dealer_location, setDealer_location] = useState("");
  const [dealer_description, setDealer_description] = useState("");
  const [dealer_rating, setDealer_rating] = useState("");
  const [dealer_twi, setDealer_twi] = useState("");
  const [dealer_insta, setDealer_insta] = useState("");
  const [profileImage, setProfileImage] = useState();
  const [dealer_address, setDealer_address] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "dealer_name":
        setDealer_name(value);
        break;
      case "dealer_location":
        setDealer_location(value);
        break;
      case "dealer_description":
        setDealer_description(value);
        break;
      case "dealer_rating":
        setDealer_rating(value);
        break;
      case "dealer_twi":
        setDealer_twi(value);
        break;
      case "dealer_insta":
        setDealer_insta(value);
        break;
      case "dealer_address":
        setDealer_address(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    try {


      const formData = new FormData();
      formData.append('profileImage',profileImage);
      formData.append('profileName',profileImage.name);
      formData.append('dealer_name',dealer_name);
      formData.append('dealer_location',profileImage.name);
      formData.append('dealer_description', dealer_description);
      formData.append('dealer_rating', dealer_rating);
      formData.append('dealer_insta', dealer_insta);
      formData.append('dealer_twi', dealer_twi);
      formData.append('dealer_address', dealer_address);

      const response = axios.post(
        "https://igtestbackend-5ab2183ee5ee.herokuapp.com/api/dealer/create",
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      toast.success("Shop added successfully");

      navigate("/dealer");
    } catch (error) {
      console.error("Error adding shop:", error);
    }
  };

  return (
    <div className="add-container">
      <div className="add-box">
        <h2 className="shop-h">Add Dealer</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="old-label">Name:</label>
            <input
              className="old-input"
              type="text"
              name="dealer_name"
              value={dealer_name}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label className="old-label">Location</label>
            <input
              className="old-input"
              type="text"
              name="dealer_location"
              value={dealer_location}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label className="old-label">Description:</label>
            <input
              className="old-input"
              type="text"
              name="dealer_description"
              value={dealer_description}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label className="old-label">Rating:</label>
            <input
              className="old-input"
              type="text"
              name="dealer_rating"
              value={dealer_rating}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label className="old-label">Instagram:</label>
            <input
              className="old-input"
              type="text"
              name="dealer_insta"
              value={dealer_insta}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label className="old-label">Twitter:</label>
            <input
              className="old-input"
              type="text"
              name="dealer_twi"
              value={dealer_twi}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label className="old-label">Website Link:</label>
            <input
              className="old-input"
              type="text"
              name="dealer_address"
              value={dealer_address}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label className="old-label">Profile Image:</label>
            <input
                      filename={profileImage} 

                      type="file"
                      name="profileImage" 
                      onChange={e => setProfileImage(e.target.files[0])}
                      accept="image/*"
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

export default AddDealer;
