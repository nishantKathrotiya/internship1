import React from "react";
import "../stylesheets/Form.css";
import { useState } from "react";

const Form = () => {

  const [show, setShow] = useState(false);
  const ShowAuthorDetail = () => {
    if (show === false) {
      setShow(true);
    }
  };

  const HideAuthorDetail = () => {
    if (show === true) {
      setShow(false);
    }
  };

  return (
    <div className="parentAdjuster">
      
    <div className="application-form-container">
      <div className="main-text">
        Application form for Financial Support for Research Paper
      </div>
      <div>
        <form className="actualContainer">
          <div className="name-main-container">
            <div className="fname-container">
              <label htmlFor="fname">First name</label>
              <br />
              <input
                className="name-input"
                type="text"
                name="fname"
                id="fname"
                placeholder="Enter First Name"
              />
            </div>
            <div className="mname-container">
              <label htmlFor="mname">Middle name</label>
              <br />
              <input
                className="name-input"
                type="text"
                name="fname"
                id="fname"
                placeholder="Enter First Name"
              />
            </div>
            <div className="lname-container">
              <label htmlFor="lname">Last name </label>
              <br />
              <input
                className="name-input"
                type="text"
                name="fname"
                id="fname"
                placeholder="Enter First Name"
              />
            </div>
          </div>
          <div className="student-mobile-main-container">
            <div className="student-ID-container">
              <label htmlFor="student-ID">Student ID</label>
              <br />
              <input
                className="student-ID-Input"
                type="text"
                name="student-ID"
                id="student-ID"
                placeholder="Enter ID"
              />
            </div>
            <div className="mobile-number-container">
              <label htmlFor="mobile-number">Mobile Number</label>
              <br />
              <input
                className="mobile-number-Input"
                type="tel"
                name="mobile-number"
                id="mobile-number"
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
                  <input type="radio" name="department" />
                </div>
                <div>
                  <label htmlFor="CS">CS</label>
                  <input type="radio" name="department" />
                </div>
                <div>
                  <label htmlFor="IT">IT</label>
                  <input type="radio" name="department" />
                </div>
              </div>
            </div>
            <div className="pg-ug-container">
              <label htmlFor="pg-ug">Post Graduate / Under Graduate</label>
              <br />
              <div className="pg-ug-radio">
                <div>
                  <label htmlFor="PG">PG</label>
                  <input type="radio" name="pg-ug" />
                </div>
                <div>
                  <label htmlFor="UG">UG</label>
                  <input type="radio" name="pg-ug" />
                </div>
              </div>
            </div>
          </div>

          <div className="Institute-Attendence-main-container">
            <div className="Institute">
              <label htmlFor="Institute">Institute</label>
              <br />
              <select name="Institute" id="">
                <option value="DEPSTAR">Devang Patel</option>
                <option value="CSPIT">Chandubhai S Patel</option>
              </select>
            </div>
            <div className="Attendence">
              <label htmlFor="Attendence">Attendence</label>
              <br />
              <input
                type="number"
                min={"0"}
                max={"100"}
                placeholder="Enter your Attendence in %"
              />
            </div>
          </div>

          <div className="paper-publisher-main-container">
            <div className="paper-title">
              <label htmlFor="paper-title">Paper Title</label> <br />
              <input
                type="text"
                name="paper-title-input"
                id=""
                placeholder="Enter Paper Title"
              />
            </div>
            <div className="publisher-detail">
              <label htmlFor="publisher-detail">Publisher Detail</label>
              <br />
              <input
                type="text"
                name="publisher-detail-input"
                placeholder="Enter Publisher Detail"
                id=""
              />
            </div>
          </div>
          <div className="conference-main-container">
            <div className="conference-name">
              <label htmlFor="conference-name">Conference Name</label> <br />
              <input
                type="text"
                name="conference-name-input"
                id=""
                placeholder="Enter Conference name"
              />
            </div>
            <div className="conference-website">
              <label htmlFor="conference-website">Conference Title</label>
              <br />
              <input
                type="text"
                name="conference-website-input"
                id=""
                placeholder="Enter Conference Website "
              />
            </div>
          </div>
          <div className="fees-indexing-main-container">
            <div className="reg-fees">
              <label htmlFor="reg-fees">Registration Fees</label>
              <br />
              <input type="number" placeholder="Enter Registration Fees" />
            </div>

            <div className="scopus-web-radio">
              <label htmlFor="Indexing">Indexing</label>
              <br />
              <div className="Indexing">
                <div className="scopus-radio">
                  <label htmlFor="scopus-radio">Scopus</label>
                  <input type="radio" name="Scopus" id="" />
                </div>
                <div className="web-science-radio">
                  <label htmlFor="web-science-radio">Web Science</label>
                  <input type="radio" name="web-science-radio" id="" />
                </div>
              </div>
            </div>
          </div>

          <div className="Author">
            <div className="first-author">
              <label htmlFor="">Are you the First Author?</label>
              <div className="radio-input">
                <div className="radio">
                  <label htmlFor="">Yes</label>
                  <input
                    onClick={HideAuthorDetail}
                    type="radio"
                    name="first-author"
                  />
                </div>
                <div className="radio">
                  <label htmlFor="">No</label>
                  <input
                    onClick={ShowAuthorDetail}
                    type="radio"
                    name="first-author"
                  />
                </div>
              </div>
            </div>

            {show && (
              <div className="author-detail">
                <div className="author-name">
                  <label htmlFor="">Author Full Name</label>
                  <br />
                  <input type="text" placeholder="Enter Author Full Name" />
                </div>
                <div className="roll-no">
                  <label htmlFor="">Author's Roll No.</label>
                  <br />
                  <input type="text" placeholder="Enter Author's Roll No." />
                </div>
              </div>
            )}
          </div>

          <div className="Faculty">
            <div className="faculty-co-author">
              <label htmlFor="co-author">Faculty Co-Author Name</label>
              <br />
              <input type="text" placeholder="Enter Faculty Co-Author Name" />
            </div>

            <div className="faculty-department-institute-main-container">
              <div className="faculty-department-container">
                <label htmlFor="department">Faculty Co-Author Department</label>
                <br />
                <div className="faculty-department-radio">
                  <div>
                    <label htmlFor="CE">CE</label>
                    <input type="radio" name="department" />
                  </div>
                  <div>
                    <label htmlFor="CS">CS</label>
                    <input type="radio" name="department" />
                  </div>
                  <div>
                    <label htmlFor="IT">IT</label>
                    <input type="radio" name="department" />
                  </div>
                </div>
              </div>

              <div className="Institute">
                <label htmlFor="Institute">Faculty Co-Author Institute</label>
                <br />
                <select name="Institute" id="">
                  <option value="DEPSTAR">Devang Patel</option>
                  <option value="CSPIT">Chandubhai S Patel</option>
                </select>
              </div>
            </div>
          </div>

          <div className="confirmation">
            <input type="checkbox" />
            <label htmlFor="confirmation">
              I hereby affirm, explicitly and with full transparency, that
              throughout my tenure, there has not been a single instance where
              disciplinary action has been taken against me.
            </label>
          </div>

          <div className="attechments">
            <div className="conference-acceptence">
              <label for="myfile">1. Conference Acceptance Letter</label>
              <input type="file" id="myfile" name="myfile"></input>
            </div>
            <div className="reg-fees-proof">
              <label for="myfile">2. Proof of Registration Fees</label>
              <input type="file" id="myfile" name="myfile"></input>
            </div>
            <div className="indexing-proof">
              <label for="myfile">
                3. Indexing Proof (Scopus AND/OR Web of Science)
              </label>
              <input type="file" id="myfile" name="myfile"></input>
            </div>
          </div>
        </form>

        <div className="submit">
          <button>Submit</button>
        </div>
      </div>
    </div>

    </div>
    );
};

export default Form;
