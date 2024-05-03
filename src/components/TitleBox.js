import React from "react";
import PropTypes from "prop-types";

const TitleBox = ({ children }) => {
  const boxStyle = {
    marginBottom: "16px",
    marginTop: "-24px",
    paddingTop: "24px",
    paddingBottom: "24px",
    paddingLeft: "16px",
    paddingRight: "16px",
    opacity: 1,
    background: "linear-gradient(195deg, #A16205, #DFA02F)",
    color: "#344767",
    borderRadius: "0.5rem",
    width: "170vh",
    fontFamily: "Raleway",
    boxShadow:
      "0rem 0.25rem 1.25rem 0rem rgba(0, 0, 0, 0.14), 0rem 0.4375rem 0.625rem -0.3125rem rgba(0, 187, 212, 0.4)",
  };

  return <div style={boxStyle}>{children}</div>;
};

TitleBox.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TitleBox;
