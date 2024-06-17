import BasicLayout from "layouts/authentication/components/BasicLayout";
import React, { useState } from "react";
import "./PreProgramForm.css";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify"; // Import toast and ToastContainer from react-toastify

import logo from "../../../assets/images/PROGROWTH.png";
const MidProgram = () => {
  const [responses, setResponses] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [customerDetails, setCustomerDetails] = useState({
    name: "",
    email: "",
    phone: "",
    positive_changes: "",
    engaged_program: "",
    program_success: "",
    program_facilitator: "",
    rate_facilitator: "",
    recommend: "",
  });

  const handleSubmit = async (e) => {
    if (
      customerDetails.name === "" ||
      customerDetails.email === "" ||
      customerDetails.phone === "" ||
      customerDetails.positive_changes === "" ||
      customerDetails.engaged_program === "" ||
      customerDetails.program_success === "" ||
      customerDetails.program_facilitator === "" ||
      customerDetails.program_facilitator === ""
    ) {
      toast.error("Please fill all the fields");
      return;
    } else {
      e.preventDefault();
      setIsLoading(true);
      const formdata = {
        name: customerDetails.name,
        email: customerDetails.email,
        mobile_no: customerDetails.phone,
        questions: [
          {
            question:
              "Thus far, what positive changes have you seen take place since the program started?",
            questionhindi:
              "अब तक, कार्यक्रम शुरू होने के बाद से आपने क्या सकारात्मक बदलाव होते देखे हैं?",
            answer: customerDetails.positive_changes,
          },
          {
            question: "Do you feel engaged with the program?",
            questionhindi: "क्या आप कार्यक्रम से जुड़ाव महसूस करते हैं?",
            answer: customerDetails.engaged_program,
          },
          {
            question: "What area/s need further attention to make the program a bigger success?",
            questionhindi:
              "कार्यक्रम को अधिक सफल बनाने के लिए किन क्षेत्रों पर अधिक ध्यान देने की आवश्यकता है?",
            answer: customerDetails.program_success,
          },
          {
            question: "Overall, how satisfied are you with your program facilitator?",
            questionhindi: "कुल मिलाकर, आप प्रोग्राम फैसिलिटेटर से कितने संतुष्ट हैं?",
            answer: customerDetails.program_facilitator,
          },
          {
            question: "Please rate the following about your facilitator",
            questionhindi: "कृपया अपने फैसिलिटेटर के बारे में निम्नलिखित को रेटिंग दें?",
            answer: customerDetails.rate_facilitator,
          },
          {
            question: "Overall, how satisfied are you with your program facilitator?",
            questionhindi: " कुल मिलाकर, आप प्रोग्राम फैसिलिटेटर से कितने संतुष्ट हैं?",
            answer: customerDetails.recommend,
          },
        ],
      };
      try {
        const response = await fetch("http://13.126.178.112:3000/midSurveyQuestions ", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formdata),
        });

        if (!response.ok) {
          throw new Error("Failed to submit form");
        }
        toast.success("Form submitted successfully");
        console.log("form");
        // Reset form state if needed
        setResponses({});
      } catch (error) {
        console.error("Error submitting form:", error.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleClear = () => {
    setCustomerDetails({
      name: "",
      email: "",
      phone: "",
      positive_changes: "",
      engaged_program: "",
      program_success: "",
      program_facilitator: "",
      rate_facilitator: "",
      recommend: "",
    });
  };

  return (
    <div
      style={{ fontFamily: "Arial, sans-serif", width: "100%", margin: "0 auto" }}
      className="form-section"
    >
      <ToastContainer />
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span className="heading">Mid Program Survey Form</span>
        <img src={logo} width="100px" />
      </div>
      <div className="question-section customer-details">
        <div style={{ marginRight: "5px" }}>
          <p className="question-english" style={{ textAlign: "justify", margin: "5px" }}>
            Name:
          </p>
          <input
            type="input"
            value={customerDetails.name}
            placeholder="Name"
            className="customer-input"
            onChange={(e) =>
              setCustomerDetails((prevState) => ({
                ...prevState,
                name: e.target.value,
              }))
            }
          />
        </div>
        <div>
          <p className="question-english" style={{ textAlign: "justify", margin: "5px" }}>
            Email:
          </p>
          <input
            type="input"
            value={customerDetails.email}
            placeholder="Email Address"
            className="customer-input"
            onChange={(e) =>
              setCustomerDetails((prevState) => ({
                ...prevState,
                email: e.target.value,
              }))
            }
          />
        </div>
        <div>
          <p className="question-english" style={{ textAlign: "justify", margin: "5px" }}>
            Phone:
          </p>
          <input
            type="input"
            value={customerDetails.phone}
            placeholder="Phone Number"
            className="customer-input"
            onChange={(e) =>
              setCustomerDetails((prevState) => ({
                ...prevState,
                phone: e.target.value,
              }))
            }
          />
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        {/* Question 1 */}

        <div style={{ marginBottom: "20px" }} className="question-section">
          <p className="question-english">
            Q1: Thus far, what positive changes have you seen take place since the program started?
          </p>
          <p className="question-hindi">
            Q1: अब तक, कार्यक्रम शुरू होने के बाद से आपने क्या सकारात्मक बदलाव होते देखे हैं?
          </p>
          <input
            type="input"
            value={customerDetails.positive_changes}
            placeholder="Your Answer"
            className="suggestion"
            onChange={(e) =>
              setCustomerDetails((prevState) => ({
                ...prevState,
                positive_changes: e.target.value,
              }))
            }
          />
        </div>
        <div style={{ marginBottom: "20px" }} className="question-section">
          <p className="question-english">Q2: Do you feel engaged with the program?</p>
          <p className="question-hindi">Q2: क्या आप कार्यक्रम से जुड़ाव महसूस करते हैं?</p>
          <div className="checkboxes">
            <input
              type="radio"
              id={`engaged_program_yes`}
              name={`engaged_program`}
              value="Yes"
              checked={customerDetails.engaged_program === "Yes"}
              onChange={() =>
                setCustomerDetails((prevState) => ({
                  ...prevState,
                  engaged_program: "Yes",
                }))
              }
            />
            <label className="checkbox-label" htmlFor={`Yes`}>
              Yes (हाँ)
            </label>
          </div>
          <div className="checkboxes">
            <input
              type="radio"
              id={`engaged_program_no`}
              name={`engaged_program`}
              value="No"
              checked={customerDetails.engaged_program === "No"}
              onChange={() =>
                setCustomerDetails((prevState) => ({
                  ...prevState,
                  engaged_program: "No",
                }))
              }
            />
            {/* {console.log(q.question)} */}
            <label className="checkbox-label" htmlFor={`no`}>
              No (नहीं)
            </label>
          </div>
        </div>
        <div style={{ marginBottom: "20px" }} className="question-section">
          <p className="question-english">
            Q3: What area/s need further attention to make the program a bigger success?
          </p>
          <p className="question-hindi">
            Q3: कार्यक्रम को अधिक सफल बनाने के लिए किन क्षेत्रों पर अधिक ध्यान देने की आवश्यकता है?
          </p>
          <input
            type="input"
            value={customerDetails.program_success}
            placeholder="Your Answer"
            className="suggestion"
            onChange={(e) =>
              setCustomerDetails((prevState) => ({
                ...prevState,
                program_success: e.target.value,
              }))
            }
          />
        </div>
        <div style={{ marginBottom: "20px" }} className="question-section">
          <p className="question-english">
            Q4: Overall, how satisfied are you with your program facilitator?
          </p>
          <p className="question-hindi">
            Q4: कुल मिलाकर, आप प्रोग्राम फैसिलिटेटर से कितने संतुष्ट हैं?
          </p>
          <div className="checkboxes">
            <input
              type="radio"
              id={`strongly_agree`}
              name={`not_satisfied`}
              value="Strongly Agree"
              checked={customerDetails.program_facilitator === "Strongly Agree"}
              onChange={() =>
                setCustomerDetails((prevState) => ({
                  ...prevState,
                  program_facilitator: "Strongly Agree",
                }))
              }
            />
            <label className="checkbox-label" htmlFor={`not_satisfied`}>
              Extremely Satisfied (&quot;पूर्ण रूप से संतुष्ट&quot;)
            </label>
          </div>
          <div className="checkboxes">
            <input
              type="radio"
              id={`not_satisfied`}
              name={`not_satisfied`}
              value="Agree"
              checked={customerDetails.program_facilitator === "Agree"}
              onChange={() =>
                setCustomerDetails((prevState) => ({
                  ...prevState,
                  program_facilitator: "Agree",
                }))
              }
            />
            <label className="checkbox-label" htmlFor={`not_satisfied`}>
              Very Satisfied (&quot;बहुत संतुष्ट&quot;)
            </label>
          </div>
          <div className="checkboxes">
            <input
              type="radio"
              id={`not_satisfied`}
              name={`not_satisfied`}
              value="Neither disagree nor agree"
              checked={customerDetails.program_facilitator === "Neither disagree nor agree"}
              onChange={() =>
                setCustomerDetails((prevState) => ({
                  ...prevState,
                  program_facilitator: "Neither disagree nor agree",
                }))
              }
            />
            <label className="checkbox-label" htmlFor={`not_satisfied`}>
              Satisfied (&quot;संतुष्ट&quot;)
            </label>
          </div>
          <div className="checkboxes">
            <input
              type="radio"
              id={`not_satisfied`}
              name={`not_satisfied`}
              value="Disagree"
              checked={customerDetails.program_facilitator === "Disagree"}
              onChange={() =>
                setCustomerDetails((prevState) => ({
                  ...prevState,
                  program_facilitator: "Disagree",
                }))
              }
            />
            <label className="checkbox-label" htmlFor={`not_satisfied`}>
              Not Satisfied (&quot;संतुष्ट नहीं&quot;)
            </label>
          </div>
        </div>
        <div style={{ marginBottom: "20px" }} className="question-section">
          <p className="question-english">Q5: Please rate the following about your facilitator</p>
          <p className="question-hindi">
            Q5: कृपया अपने फैसिलिटेटर के बारे में निम्नलिखित को रेटिंग दें?
          </p>
          <div className="checkboxes">
            <input
              type="radio"
              id={`satisfied`}
              name={`satisfied`}
              value="Strongly Agree"
              checked={customerDetails.rate_facilitator === "Strongly Agree"}
              onChange={() =>
                setCustomerDetails((prevState) => ({
                  ...prevState,
                  rate_facilitator: "Strongly Agree",
                }))
              }
            />
            <label className="checkbox-label" htmlFor={`not_satisfied`}>
              Extremely Satisfied (&quot;पूर्ण रूप से संतुष्ट&quot;)
            </label>
          </div>
          <div className="checkboxes">
            <input
              type="radio"
              id={`satisfied`}
              name={`satisfied`}
              value="Agree"
              checked={customerDetails.rate_facilitator === "Agree"}
              onChange={() =>
                setCustomerDetails((prevState) => ({
                  ...prevState,
                  rate_facilitator: "Agree",
                }))
              }
            />
            <label className="checkbox-label" htmlFor={`not_satisfied`}>
              Very Satisfied (&quot;बहुत संतुष्ट&quot;)
            </label>
          </div>
          <div className="checkboxes">
            <input
              type="radio"
              id={`satisfied`}
              name={`satisfied`}
              value="Neither disagree nor agree"
              checked={customerDetails.rate_facilitator === "Neither disagree nor agree"}
              onChange={() =>
                setCustomerDetails((prevState) => ({
                  ...prevState,
                  rate_facilitator: "Neither disagree nor agree",
                }))
              }
            />
            <label className="checkbox-label" htmlFor={`not_satisfied`}>
              Satisfied (&quot;संतुष्ट&quot;)
            </label>
          </div>
          <div className="checkboxes">
            <input
              type="radio"
              id={`satisfied`}
              name={`satisfied`}
              value="Disagree"
              checked={customerDetails.rate_facilitator === "Disagree"}
              onChange={() =>
                setCustomerDetails((prevState) => ({
                  ...prevState,
                  rate_facilitator: "Disagree",
                }))
              }
            />
            <label className="checkbox-label" htmlFor={`not_satisfied`}>
              Not Satisfied (&quot;संतुष्ट नहीं&quot;)
            </label>
          </div>
        </div>
        <div style={{ marginBottom: "20px" }} className="question-section">
          <p className="question-english">
            Q6: Overall, how satisfied are you with your program facilitator?
          </p>
          <p className="question-hindi">
            Q6: कुल मिलाकर, आप प्रोग्राम फैसिलिटेटर से कितने संतुष्ट हैं?
          </p>
          <input
            type="input"
            value={customerDetails.recommend}
            placeholder="Your Answer"
            className="suggestion"
            onChange={(e) =>
              setCustomerDetails((prevState) => ({
                ...prevState,
                recommend: e.target.value,
              }))
            }
          />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button type="submit" className="button">
            Submit
          </button>
          <button
            style={{
              "--c": "#E95A49",
            }}
            type="button"
            className="button"
            onClick={handleClear}
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};

export default MidProgram;
