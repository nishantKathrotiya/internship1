import React, { useState } from "react";
import { newApplication } from "../services/operation/student";
import "../stylesheets/Form.css";
import "../stylesheets/Navbar.css"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Form = () => {
  const navigate = useNavigate();
  // State variables for each form field
  const [formData, setFormData] = useState({
    fname: "",
    mname: "",
    lname: "",
    studentID: "",
    mobileNumber: "",
    department: "IT",
    pgUg: "PG",
    institute: "DEPSTAR",
    attendance: "",
    paperTitle: "",
    publisherDetail: "",
    conferenceName: "",
    conferenceWebsite: "",
    regFees: "",
    indexing: "Scopus",
    firstAuthor: "Yes",
    authorFullName: "",
    authorRollNo: "",
    facultyCoAuthorName: "",
    facultyDepartment: "IT",
    facultyInstitute: "DEPSTAR",
    confirmation: false,
    conferenceAcceptance: null,
    regFeesProof: null,
    indexingProof: null,
  });
  
  const [loading , setLoading] = useState(false)
  const [show, setShow] = useState(false);

  // Handle change function
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : type === "file" ? files[0] : value,
    }));
  };

  const handleAuthorChange = (e) => {
    setShow(e.target.value === "No");
    handleChange(e);
  };

  const validation =()=>{

    const {
      fname,
      mname,
      lname,
      studentID,
      mobileNumber,
      department,
      pgUg,
      institute,
      attendance,
      paperTitle,
      publisherDetail,
      conferenceName,
      conferenceWebsite,
      regFees,
      indexing,
      firstAuthor,
      authorFullName,
      authorRollNo,
      facultyCoAuthorName,
      facultyDepartment,
      facultyInstitute,
      confirmation,
      conferenceAcceptance,
      regFeesProof,
      indexingProof,
  } = formData;

    return  (
    fname==""
    || mname==""
    || lname==""
    || studentID==""
    || mobileNumber==""
    || department==""
    || pgUg==""
    || institute==""
    || attendance==""
    || paperTitle==""
    || publisherDetail==""
    || conferenceName==""
    || conferenceWebsite==""
    || regFees==""
    || indexing==""
    || facultyCoAuthorName==""
    || facultyDepartment==""
    || facultyInstitute==""
    || !conferenceAcceptance
    || !regFeesProof
    || !indexingProof
    || ((firstAuthor=='No') && (authorFullName=="" || authorRollNo==""))
    || !confirmation
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(validation()){
      return toast.error("Fill All the Fields");
    }
    // Process the form data here
    console.log(formData);
    newApplication(formData,setLoading,navigate);
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
              <div className="fname-container">
                <label htmlFor="fname">First name</label>
                <br />
                <input
                  className="name-input"
                  type="text"
                  name="fname"
                  id="fname"
                  value={formData.fname}
                  onChange={handleChange}
                  placeholder="Enter First Name"
                />
              </div>
              <div className="mname-container">
                <label htmlFor="mname">Middle name</label>
                <br />
                <input
                  className="name-input"
                  type="text"
                  name="mname"
                  id="mname"
                  value={formData.mname}
                  onChange={handleChange}
                  placeholder="Enter Middle Name"
                />
              </div>
              <div className="lname-container">
                <label htmlFor="lname">Last name </label>
                <br />
                <input
                  className="name-input"
                  type="text"
                  name="lname"
                  id="lname"
                  value={formData.lname}
                  onChange={handleChange}
                  placeholder="Enter Last Name"
                />
              </div>
            </div>
            <div className="student-mobile-main-container">
              <div className="student-ID-container">
                <label htmlFor="studentID">Student ID</label>
                <br />
                <input
                  className="student-ID-Input"
                  type="text"
                  name="studentID"
                  id="studentID"
                  value={formData.studentID}
                  onChange={handleChange}
                  placeholder="Enter ID"
                />
              </div>
              <div className="mobile-number-container">
                <label htmlFor="mobileNumber">Mobile Number</label>
                <br />
                <input
                  className="mobile-number-Input"
                  type="tel"
                  name="mobileNumber"
                  id="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  placeholder="Enter Mobile Number"
                />
              </div>
            </div>

            <div className="department-pg-ug-main-container">
              <div className="department-container">
                <label htmlFor="department">Department</label>
                <br />
                <div className="department-radio">
                  <div>
                    <label htmlFor="CE">CE</label>
                    <input
                      type="radio"
                      name="department"
                      id="CE"
                      value="CE"
                      checked={formData.department === "CE"}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="CS">CS</label>
                    <input
                      type="radio"
                      id="CS"
                      name="department"
                      value="CS"
                      checked={formData.department === "CS"}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="IT">IT</label>
                    <input
                      type="radio"
                      name="department"
                      id="IT"
                      value="IT"
                      checked={formData.department === "IT"}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              <div className="pg-ug-container">
                <label htmlFor="pgUg">Post Graduate / Under Graduate</label>
                <br />
                <div className="pg-ug-radio">
                  <div>
                    <label htmlFor="PG">PG</label>
                    <input
                      type="radio"
                      name="pgUg"
                      id="PG"
                      value="PG"
                      checked={formData.pgUg === "PG"}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="UG">UG</label>
                    <input
                      type="radio"
                      name="pgUg"
                      id="UG"
                      value="UG"
                      checked={formData.pgUg === "UG"}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="Institute-Attendence-main-container">
              <div className="Institute">
                <label htmlFor="institute">Institute</label>
                <br />
                <select
                  name="institute"
                  value={formData.institute}
                  onChange={handleChange}
                >
                  <option value="DEPSTAR">Devang Patel</option>
                  <option value="CSPIT">Chandubhai S Patel</option>
                </select>
              </div>
              <div className="Attendence">
                <label htmlFor="attendance">Attendence</label>
                <br />
                <input
                  type="number"
                  name="attendance"
                  min="0"
                  max="100"
                  value={formData.attendance}
                  onChange={handleChange}
                  placeholder="Enter your Attendance in %"
                />
              </div>
            </div>

            <div className="paper-publisher-main-container">
              <div className="paper-title">
                <label htmlFor="paperTitle">Paper Title</label> <br />
                <input
                  type="text"
                  name="paperTitle"
                  value={formData.paperTitle}
                  onChange={handleChange}
                  placeholder="Enter Paper Title"
                />
              </div>
              <div className="publisher-detail">
                <label htmlFor="publisherDetail">Publisher Detail</label>
                <br />
                <input
                  type="text"
                  name="publisherDetail"
                  value={formData.publisherDetail}
                  onChange={handleChange}
                  placeholder="Enter Publisher Detail"
                />
              </div>
            </div>
            <div className="conference-main-container">
              <div className="conference-name">
                <label htmlFor="conferenceName">Conference Name</label> <br />
                <input
                  type="text"
                  name="conferenceName"
                  value={formData.conferenceName}
                  onChange={handleChange}
                  placeholder="Enter Conference name"
                />
              </div>
              <div className="conference-website">
                <label htmlFor="conferenceWebsite">Conference Website</label>
                <br />
                <input
                  type="text"
                  name="conferenceWebsite"
                  value={formData.conferenceWebsite}
                  onChange={handleChange}
                  placeholder="Enter Conference Website"
                />
              </div>
            </div>
            <div className="fees-indexing-main-container">
              <div className="reg-fees">
                <label htmlFor="regFees">Registration Fees</label>
                <br />
                <input
                  type="number"
                  name="regFees"
                  value={formData.regFees}
                  onChange={handleChange}
                  placeholder="Enter Registration Fees"
                />
              </div>

              <div className="scopus-web-radio">
                <label htmlFor="indexing">Indexing</label>
                <br />
                <div className="Indexing">
                  <div className="scopus-radio">
                    <label htmlFor="scopus">Scopus</label>
                    <input
                      type="radio"
                      name="indexing"
                      id="scopus"
                      value="Scopus"
                      checked={formData.indexing === "Scopus"}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="web-science-radio">
                    <label htmlFor="webScience">Web Science</label>
                    <input
                      type="radio"
                      name="indexing"
                      id="webScience"
                      value="Web Science"
                      checked={formData.indexing === "Web Science"}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="Author">
              <div className="first-author">
                <label htmlFor="firstAuthor">Are you the First Author?</label>
                <div className="radio-input">
                  <div className="radio">
                    <label htmlFor="yes">Yes</label>
                    <input
                      type="radio"
                      name="firstAuthor"
                      id="yes"
                      value="Yes"
                      checked={formData.firstAuthor === "Yes"}
                      onChange={handleAuthorChange}
                    />
                  </div>
                  <div className="radio">
                    <label htmlFor="no">No</label>
                    <input
                      type="radio"
                      name="firstAuthor"
                      id="no"
                      value="No"
                      checked={formData.firstAuthor === "No"}
                      onChange={handleAuthorChange}
                    />
                  </div>
                </div>
              </div>

              {show && (
                <div className="author-detail">
                  <div className="author-name">
                    <label htmlFor="authorFullName">Author Full Name</label>
                    <br />
                    <input
                      type="text"
                      name="authorFullName"
                      value={formData.authorFullName}
                      onChange={handleChange}
                      placeholder="Enter Author Full Name"
                    />
                  </div>
                  <div className="roll-no">
                    <label htmlFor="authorRollNo">Author's Roll No.</label>
                    <br />
                    <input
                      type="text"
                      name="authorRollNo"
                      value={formData.authorRollNo}
                      onChange={handleChange}
                      placeholder="Enter Author's Roll No."
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="Faculty">
              <div className="faculty-co-author">
                <label htmlFor="facultyCoAuthorName">
                  Faculty Co-Author Name
                </label>
                <br />
                <input
                  type="text"
                  name="facultyCoAuthorName"
                  value={formData.facultyCoAuthorName}
                  onChange={handleChange}
                  placeholder="Enter Faculty Co-Author Name"
                />
              </div>

              <div className="faculty-department-institute-main-container">
                <div className="faculty-department-container">
                  <label htmlFor="facultyDepartment">
                    Faculty Co-Author Department
                  </label>
                  <br />
                  <div className="faculty-department-radio">
                    <div>
                      <label htmlFor="CE1">CE</label>
                      <input
                        type="radio"
                        name="facultyDepartment"
                        id="CE1"
                        value="CE"
                        checked={formData.facultyDepartment === "CE"}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <label htmlFor="CS1">CS</label>
                      <input
                        type="radio"
                        name="facultyDepartment"
                        id="CS1"
                        value="CS"
                        checked={formData.facultyDepartment === "CS"}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <label htmlFor="IT1">IT</label>
                      <input
                        type="radio"
                        name="facultyDepartment"
                        id="IT1"
                        value="IT"
                        checked={formData.facultyDepartment === "IT"}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="Institute">
                  <label htmlFor="facultyInstitute">
                    Faculty Co-Author Institute
                  </label>
                  <br />
                  <select
                    name="facultyInstitute"
                    value={formData.facultyInstitute}
                    onChange={handleChange}
                  >
                    <option value="DEPSTAR">Devang Patel</option>
                    <option value="CSPIT">Chandubhai S Patel</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="confirmation">
              <input
                type="checkbox"
                name="confirmation"
                id="confirmation"
                checked={formData.confirmation}
                onChange={handleChange}
              />
              <label htmlFor="confirmation">
                I hereby affirm, explicitly and with full transparency, that
                throughout my tenure, there has not been a single instance where
                disciplinary action has been taken against me.
              </label>
            </div>

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
                <label htmlFor="regFeesProof">2. Proof of Registration Fees</label>
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

            <div className="submit">
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Form;