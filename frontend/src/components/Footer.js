import React from "react";

const Footer = ({ brand = "Cine Craft" }) => {
  return (
    <div className="footer">
      <p>Copyright &copy; Cine Craft {new Date().getFullYear()} </p>
    </div>
  );
};

export default Footer;
