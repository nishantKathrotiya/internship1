
import React, { useEffect, useState } from "react";
import { initialData, newApplication , updateApplication } from "../services/operation/student";
import "../stylesheets/Form.css";
import "../stylesheets/Navbar.css";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";


const EditApplication = () => {
  const navigate = useNavigate();
  const {applicationID} = useParams()
  // State variables for each form field
  const [formData, setFormData] = useState({
    fname: "",
    mname: "",
    lname: "",
    studentID: "",
    coAuthors: Array.from({ length: 0 }, () => ({
      studentName: '',
      studentID: '',
      studentDepartment: "IT",
      studentPGUG: "PG",
      studentInstitute: "DEPSTAR",
      studentAttendace: '',
    })),
    facultyCoAuthors: Array.from({ length: 1 }, () => ({
      facultyCoAuthorName: "",
      facultyCoAuthorDepartment: "IT",
      facultyInstitute: "DEPSTAR",
    })),
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
    confirmation: false,
  });

  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [numStudents, setNumStudents] = useState(0);
  const [numFacultyCoAuthors, setNumFacultyCoAuthors] = useState(1);

  useEffect(()=>{
    initialData(applicationID,setFormData , setLoading , navigate)
  },[])

  // Handle change function
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]:
        type === "checkbox" ? checked : type === "file" ? files[0] : value,
    }));
  };

  const handleAuthorChange = (e) => {
    setShow(e.target.value === "No");
    handleChange(e);
  };

  const validation = () => {
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
      facultyCoAuthors,
      confirmation,
      conferenceAcceptance,
      regFeesProof,
      indexingProof,
      coAuthors,
    } = formData;

    // Check if any of the fields are empty or null
    const isEmpty = (value) => value === "" || value === null || value === undefined;

    // Validate each field
    const isFormValid = (
      !isEmpty(fname) &&
      !isEmpty(mname) &&
      !isEmpty(lname) &&
      !isEmpty(studentID) &&
      !isEmpty(mobileNumber) &&
      !isEmpty(department) &&
      !isEmpty(pgUg) &&
      !isEmpty(institute) &&
      !isEmpty(attendance) &&
      !isEmpty(paperTitle) &&
      !isEmpty(publisherDetail) &&
      !isEmpty(conferenceName) &&
      !isEmpty(conferenceWebsite) &&
      !isEmpty(regFees) &&
      !isEmpty(indexing) &&
      conferenceAcceptance !== null &&
      regFeesProof !== null &&
      indexingProof !== null &&
      (firstAuthor === "Yes" || (!isEmpty(authorFullName) && !isEmpty(authorRollNo))) &&
      confirmation &&
      // Check co-authors fields
      coAuthors.every(coAuthor => (
        !isEmpty(coAuthor.studentName) &&
        !isEmpty(coAuthor.studentID) &&
        !isEmpty(coAuthor.studentDepartment) &&
        !isEmpty(coAuthor.studentPGUG) &&
        !isEmpty(coAuthor.studentInstitute) &&
        !isEmpty(coAuthor.studentAttendace)
      )) &&

      facultyCoAuthors.every(facultyCoAuthor => (
        !isEmpty(facultyCoAuthor.facultyCoAuthorName) &&
        !isEmpty(facultyCoAuthor.facultyCoAuthorDepartment) &&
        !isEmpty(facultyCoAuthor.facultyInstitute)
      ))
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
    updateApplication(formData, applicationID,setLoading, navigate);
  };

  const handleNumStudentsChange = (event) => {
    const count = parseInt(event.target.value, 10);
    setNumStudents(count);
    setFormData((prevData) => ({
      ...prevData,
      coAuthors: Array.from({ length: count }, (_, index) => prevData.coAuthors[index] || {
        studentName: '',
        studentID: '',
        studentDepartment: "IT",
        studentPGUG: "PG",
        studentInstitute: "DEPSTAR",
        studentAttendace: '',
      }),
    }));
  };


  const handleNumFacultyCoAuthorsChange = (event) => {
    const count = parseInt(event.target.value, 10);
    setNumFacultyCoAuthors(count);
    setFormData((prevData) => ({
      ...prevData,
      facultyCoAuthors: Array.from({ length: count }, (_, index) => prevData.facultyCoAuthors[index] || {
        facultyCoAuthorName: "",
        facultyCoAuthorDepartment: "IT",
        facultyInstitute: "DEPSTAR",
      }),
    }));
  };

  const handleCoAuthorChange = (event, index) => {
    const { name, value } = event.target;
    const updatedCoAuthors = [...formData.coAuthors];
    updatedCoAuthors[index] = {
      ...updatedCoAuthors[index],
      [name]: value,
    };
    setFormData((prevFormData) => ({
      ...prevFormData,
      coAuthors: updatedCoAuthors,
    }));
    console.log(formData)
  };

  // Handle change function for faculty co-author fields
  const handleFacultyCoAuthorChange = (event, index) => {
    const { name, value } = event.target;
    const updatedFacultyCoAuthors = [...formData.facultyCoAuthors];
    updatedFacultyCoAuthors[index] = {
      ...updatedFacultyCoAuthors[index],
      [name]: value,
    };
    setFormData((prevFormData) => ({
      ...prevFormData,
      facultyCoAuthors: updatedFacultyCoAuthors,
    }));
    console.log(formData.facultyCoAuthors)
  };

  return (
    <div className="parentAdjuster">
      {
        loading ? (<h1>Loading...</h1>) : (
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

            <div className="hr"></div>

            <div className="num-students-container">
              <label htmlFor="numStudents">
                Number of Student Co-Authors
              </label>
              <br />
              <select
                name="numStudents"
                value={numStudents}
                onChange={handleNumStudentsChange}
              >
                {[0, 1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>

            {/* Student Co-authors fields */}
            {[...Array(numStudents)].map((_, index) => (
              <div className="author-detail" key={`co-author-${index}`}>
                <div className="co-author-wrapper1">
                  <div className="author-name">
                    <label htmlFor={`studentName${index + 1}`}>
                      Student Co-author {index + 1} Name:
                    </label>
                    <br />
                    <input
                      type="text"
                      name={`studentName`}
                      value={formData.coAuthors[index] ? formData.coAuthors[index].name : ''}
                      onChange={(event) => handleCoAuthorChange(event, index)}
                      placeholder={`Enter Student ${index + 1} Name`}
                    />
                  </div>
                  <div className="roll-no">
                    <label htmlFor={`studentID${index + 1}`}>
                      Student Co-author {index + 1} ID:
                    </label>
                    <br />
                    <input
                      type="text"
                      name={`studentID`}
                      value={formData.coAuthors[index] ? formData.coAuthors[index].id : ''}
                      onChange={(event) => handleCoAuthorChange(event, index)}
                      placeholder={`Enter Student ${index + 1} ID`}
                    />
                  </div>
                </div>
                <div className="co-author-wrapper1">
                  <div className="department">
                    <label htmlFor={`studentDepartment${index + 1}`}>
                      Student Co-author {index + 1} Department:
                    </label>
                    <br />
                    <select
                      name={`studentDepartment`}
                      value={formData.coAuthors[index] ? formData.coAuthors[index].department : 'IT'}
                      onChange={(event) => handleCoAuthorChange(event, index)}
                    >
                      <option value="CE">CE</option>
                      <option value="CS">CS</option>
                      <option value="IT">IT</option>
                    </select>
                  </div>
                  <div className="pg-ug">
                    <label htmlFor={`studentPGUG${index + 1}`}>
                      Student Co-author {index + 1} Pg/Ug:
                    </label>
                    <br />
                    <select
                      name={`studentPGUG`}
                      value={formData.coAuthors[index] ? formData.coAuthors[index].pgug : 'UG'}
                      onChange={(event) => handleCoAuthorChange(event, index)}
                    >
                      <option value="PG">PG</option>
                      <option value="UG">UG</option>
                    </select>
                  </div>
                </div>

                <div className="Institute-Attendence-co-author-container" >
                  <div className="institute">
                    <label htmlFor={`studentInstitute${index + 1}`}>
                      Student Co-author {index + 1} Institute:
                    </label>
                    <br />
                    <select
                      name={`studentInstitute`}
                      value={formData.coAuthors[index] ? formData.coAuthors[index].institute : 'DEPSTAR'} // Default value can be adjusted
                      onChange={(event) => handleCoAuthorChange(event, index)}
                    >
                      <option value="DEPSTAR">Devang Patel</option>
                      <option value="CSPIT">Chandubhai S Patel</option>
                    </select>
                  </div>
                  <div className="attendance">
                    <label htmlFor={`studentAttendace${index + 1}`}>
                      Student Co-author {index + 1} Attendance:
                    </label>
                    <br />
                    <input
                      type="number"
                      name={`studentAttendace`}
                      min="0"
                      max="100"
                      value={formData.coAuthors[index] ? formData.coAuthors[index].attendance : ''}
                      onChange={(event) => handleCoAuthorChange(event, index)}
                      placeholder={`Enter Attendance for Student ${index + 1}`}
                    />
                  </div>
                </div>
                <div className="hr"></div>
              </div>
            ))}


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

            <div className="hr"></div>

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

            <div className="hr"></div>

            <div className="num-faculty-co-authors-container">
              <label htmlFor="numFacultyCoAuthors">
                Number of Faculty Co-Authors
              </label>
              <br />
              <select
                name="numFacultyCoAuthors"
                value={numFacultyCoAuthors}
                onChange={handleNumFacultyCoAuthorsChange}
              >
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>

            {/* Faculty Co-Authors fields */}
            {/* Faculty Co-Authors fields */}
            {[...Array(numFacultyCoAuthors)].map((_, index) => (
              <div className="Faculty" key={index}>
                <div className="faculty-co-author">
                  <label htmlFor={`facultyCoAuthorName${index + 1}`}>
                    Faculty Co-Author {index + 1} Name:
                  </label>
                  <br />
                  <input
                    type="text"
                    name={`facultyCoAuthorName`}
                    id={`facultyCoAuthorName${index + 1}`}
                    value={formData.facultyCoAuthors[index] ? formData.facultyCoAuthors[index].facultyCoAuthorName : ''}
                    onChange={(event) => handleFacultyCoAuthorChange(event, index)}
                    placeholder={`Faculty Co-Author ${index + 1} Name:`}
                  />
                </div>

                <div className="faculty-department-institute-main-container">
                  <div className="faculty-department-container">
                    <label htmlFor={`facultyCoAuthorDepartment${index + 1}`}>
                      Faculty Co-Author {index + 1} Department:
                    </label>
                    <br />
                    <select
                      name={`facultyCoAuthorDepartment`}
                      value={formData.facultyCoAuthors[index] ? formData.facultyCoAuthors[index].facultyCoAuthorDepartment : 'IT'}
                      onChange={(event) => handleFacultyCoAuthorChange(event, index)}
                    >
                      <option value="CE">CE</option>
                      <option value="CS">CS</option>
                      <option value="IT">IT</option>
                    </select>
                  </div>

                  <div className="faculty-Institute">
                    <label htmlFor={`facultyInstitute${index + 1}`}>
                      Faculty Co-Author {index + 1} Institute :
                    </label>
                    <br />
                    <select
                      name={`facultyInstitute`}
                      value={formData.facultyCoAuthors[index] ? formData.facultyCoAuthors[index].facultyInstitute : 'DEPSTAR'}
                      onChange={(event) => handleFacultyCoAuthorChange(event, index)}
                    >
                      <option value="DEPSTAR">Devang Patel</option>
                      <option value="CSPIT">Chandubhai S Patel</option>
                    </select>
                  </div>
                </div>
                <div className="hr"></div>
              </div>
            ))}


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

            
            <div className="form-submit">
              <button type="submit">Updatex</button>
            </div>
          </form>
        </div>
      </div>
        )
      }
    </div>
  );
}

export default EditApplication;
