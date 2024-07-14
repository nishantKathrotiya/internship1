import React, { useState } from "react";
import { fileEdit } from "../services/operation/student";
import "../stylesheets/Form.css";
import "../stylesheets/Navbar.css";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditFile = () => {
  const navigate = useNavigate();
  const {applicationID} = useParams();
  // State variables for each form field
  const [formData, setFormData] = useState({
    conferenceAcceptance: null,
    regFeesProof: null,
    indexingProof: null,
  });

  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);


  // Handle change function
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]:
        type === "checkbox" ? checked : type === "file" ? files[0] : value,
    }));
  };


  const validation = () => {
    const {
      regFeesProof,
      indexingProof,
      conferenceAcceptance,
    } = formData;

    // Check if any of the fields are empty or null
    const isEmpty = (value) => value === "" || value === null || value === undefined;

    // Validate each field
    const isFormValid = (
      conferenceAcceptance !== null &&
      regFeesProof !== null &&
      indexingProof !== null 
    );

    return !isFormValid;
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData)
    if (validation()) {
      return toast.error("Fill All the Fields");
    }
    // Process the form data here
    console.log(formData);
    fileEdit(formData,applicationID,setLoading, navigate);
  };

  return (
    <div className="parentAdjuster">
      <div className="application-form-container">
        <div className="main-text">
          Application form for Financial Support for Research Paper
        </div>
        <div>
          <form className="actualContainer" onSubmit={handleSubmit}>
            <div className="name-main-container">
            <div className="attechments">
              <div className="conference-acceptence">
                <label htmlFor="conferenceAcceptance">
                  1. Conference Acceptance Letter
                </label>
                <input
                  type="file"
                  accept=".pdf"
                  id="conferenceAcceptance"
                  name="conferenceAcceptance"
                  onChange={handleChange}
                />
              </div>
              <div className="reg-fees-proof">
                <label htmlFor="regFeesProof">
                  2. Registration Fees Proof
                </label>
                <input
                  type="file"
                  accept=".pdf"
                  id="regFeesProof"
                  name="regFeesProof"
                  onChange={handleChange}
                />
              </div>
              <div className="indexing-proof">
                <label htmlFor="indexingProof">
                  3. Indexing Proof (Scopus AND/OR Web of Science)
                </label>
                <input
                  type="file"
                  accept=".pdf"
                  id="indexingProof"
                  name="indexingProof"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
            <div className="form-submit">
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditFile;
