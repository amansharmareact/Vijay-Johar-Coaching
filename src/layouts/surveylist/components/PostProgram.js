import BasicLayout from "layouts/authentication/components/BasicLayout";
import React, { useState } from "react";
import "./PreProgramForm.css";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify"; // Import toast and ToastContainer from react-toastify

import logo from "../../../assets/images/PROGROWTH.png";
const PostProgram = () => {
  const [responses, setResponses] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [questions, setQuestions] = useState([
    {
      question: "I'm really excited about the vision and purpose of our company.",
      questionhindi: "मैं हमारी कंपनी के दृष्टिकोण और उद्देश्य को लेकर वास्तव में उत्साहित हूं।",
      answer: "",
    },
    {
      question: " At work, I clearly understand what is expected of me.",
      answer: "",
      questionhindi: "काम पर, मैं स्पष्ट रूप से समझता हूं कि मुझसे क्या अपेक्षा की जाती है।",
    },
    {
      question: "My team and I operate in alignment with common beliefs.",
      answer: "",
      questionhindi: "मैं और मेरी टीम आम धारणाओं के अनुरूप काम करते हैं।",
    },
    {
      question: "I have the chance to use my strengths every day at work.",
      answer: "",
      questionhindi: "मुझे काम पर हर दिन अपनी काबिलियत/क्षमताओं का उपयोग करने का मौका मिलता है।",
    },
    {
      question: "My teammates have my back.",
      answer: "",
      questionhindi: "मेरे टीम के साथी मेरा समर्थन करते हैं।",
    },
    {
      question: "I know I will be recognized for excellent work.",
      answer: "",
      questionhindi: "मुझे पता है कि मुझे उत्कृष्ट कार्य के लिए पहचाना जाएगा।",
    },
    {
      question: "I have great confidence in my company's future.",
      answer: "",
      questionhindi: "मुझे अपनी कंपनी के भविष्य पर पूरा भरोसा है।",
    },
    {
      question: "In my work I am always challenged to grow.",
      answer: "",
      questionhindi: "अपने काम में मुझे हमेशा आगे बढ़ने की चुनौती मिलती है।",
    },
    {
      question: "I would happily recommend others to work at this business",
      answer: "",
      questionhindi: "मैं खुशी-खुशी दूसरों को इस व्यवसाय में काम करने की सलाह दूंगा",
    },
    {
      question: "Overall, how satisfied are you regarding the facilitation of the program?",
      answer: "",
      questionhindi: "कुल मिलाकर, आप इस कार्यक्रम की सुविधा में कितने संतुष्ट हैं?",
    },
  ]);
  const [suggestion, setSuggestion] = useState("");
  const [suggestion2, setSuggestion2] = useState("");

  const [customerDetails, setCustomerDetails] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleOptionChange = (index, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].answer = value;
    setQuestions(updatedQuestions);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const filteredQuestions = questions.filter(
      (question) => question.question && question.questionhindi && question.answer
    );
    if (
      filteredQuestions.length !== questions.length ||
      !suggestion ||
      !suggestion2 ||
      !customerDetails.name ||
      !customerDetails.email ||
      !customerDetails.phone
    ) {
      toast.error("Please fill all the fields");
    } else {
      const formdata = {
        name: customerDetails.name,
        email: customerDetails.email,
        mobile_no: customerDetails.phone,
        questions: questions.map((question) => ({
          question: question.question,
          questionhindi: question.questionhindi,
          answer: question.answer,
        })),
        suggestion: suggestion,
        suggestion2: suggestion2,
      };
      try {
        const response = await fetch("http://13.126.178.112:3000/postSurveyQuestions", {
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
        // Reset form state if needed
        setResponses({});
      } catch (error) {
        console.error("Error submitting form:", error.message);
      }
    }
  };

  const handleClear = () => {
    const resetQuestions = questions.map((question) => ({
      ...question,
      answer: "",
    }));
    setQuestions(resetQuestions);
    setSuggestion("");
    setSuggestion2("");

    setCustomerDetails({
      name: "",
      email: "",
      phone: "",
    });
  };

  return (
    <div
      style={{ fontFamily: "Arial, sans-serif", width: "100%", margin: "0 auto" }}
      className="form-section"
    >
      <ToastContainer />
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span className="heading">Post Program Survey Form</span>
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

        {questions.map((q, index) => (
          <div key={index} style={{ marginBottom: "20px" }} className="question-section">
            <p className="question-english">{`Q${index + 1}: ${q.question}`}</p>
            <p className="question-hindi">{`Q${index + 1}: ${q.questionhindi}`}</p>

            <div className="checkboxes">
              <input
                type="radio"
                id={`q${index + 1}_strongly_agree`}
                name={`q${index + 1}`}
                value="Strongly Agree"
                checked={q.answer === "Strongly Agree"}
                onChange={() => handleOptionChange(index, "Strongly Agree")}
              />
              <label className="checkbox-label" htmlFor={`q${index + 1}_strongly_agree`}>
                Strongly Agree (&quot;पूरी तरह से सहमत हूँ&quot;)
              </label>
            </div>
            <div className="checkboxes">
              <input
                type="radio"
                id={`q${index + 1}_strongly_agree`}
                name={`q${index + 1}`}
                value="Agree"
                checked={q.answer === "Agree"}
                onChange={() => handleOptionChange(index, "Agree")}
              />
              <label className="checkbox-label" htmlFor={`q${index + 1}_strongly_agree`}>
                Agree (&quot;सहमत हूँ&quot;)
              </label>
            </div>
            <div className="checkboxes">
              <input
                type="radio"
                id={`q${index + 1}_strongly_agree`}
                name={`q${index + 1}`}
                value="Neither disagree nor agree"
                checked={q.answer === "Neither disagree nor agree"}
                onChange={() => handleOptionChange(index, "Neither disagree nor agree")}
              />
              <label className="checkbox-label" htmlFor={`q${index + 1}_strongly_agree`}>
                Neither disagree nor agree (&quot;न तो असहमत हूँ और न सहमत हूँ&quot;)
              </label>
            </div>
            <div className="checkboxes">
              <input
                type="radio"
                id={`q${index + 1}_strongly_agree`}
                name={`q${index + 1}`}
                value="Disagree"
                checked={q.answer === "Disagree"}
                onChange={() => handleOptionChange(index, "Disagree")}
              />
              <label className="checkbox-label" htmlFor={`q${index + 1}_strongly_agree`}>
                Disagree (&quot;असहमत हूँ&quot;)
              </label>
            </div>
            <div className="checkboxes">
              <input
                type="radio"
                id={`q${index + 1}_strongly_agree`}
                name={`q${index + 1}`}
                value="Strongly disagree"
                checked={q.answer === "Strongly disagree"}
                onChange={() => handleOptionChange(index, "Strongly disagree")}
              />
              {/* {console.log(q.question)} */}
              <label className="checkbox-label" htmlFor={`q${index + 1}_strongly_agree`}>
                Strongly disagree (&quot;पूरी तरह से असहमत हूँ&quot;)
              </label>
            </div>
          </div>
        ))}
        <div style={{ marginBottom: "20px" }} className="question-section">
          <p className="question-english">Q11: Do you have anything else you would like to add?</p>
          <p className="question-hindi">
            Q11: क्या आपके पास कोई और सुझाव है जिसे आप जोड़ना चाहेंगे?
          </p>
          <input
            type="input"
            value={suggestion}
            placeholder="Your Answer"
            className="suggestion"
            onChange={(e) => setSuggestion(e.target.value)}
          />
        </div>
        <div style={{ marginBottom: "20px" }} className="question-section">
          <p className="question-english">
            Q12: How do we now ensure that the Team Engagement program legacy continues to advance
            the organization going forward?
          </p>
          <p className="question-hindi">
            Q12: अब हम कैसे सुनिश्चित करें कि टीम एनगेजमेंट प्रोग्राम की विरासत संगठन को आगे बढ़ाते
            हुए बनी रहे?
          </p>
          <input
            type="input"
            value={suggestion2}
            placeholder="Your Answer"
            className="suggestion"
            onChange={(e) => setSuggestion2(e.target.value)}
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

export default PostProgram;
