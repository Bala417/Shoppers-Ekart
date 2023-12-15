import React from "react";
import "./Footer.css";
import { FaFacebookSquare } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
function Footer() {
  return (
    <div className="footer">
      <div className="footer-about">
        <ul>
          <li>About</li>
          <li>Help</li>
          <li>Consumer Policy</li>
          <li>Mail Us:shoppersekart@mail.com</li>
        </ul>
      </div>
      <div className="footer-social">
        <p>@2007-2023 Shopper's Ekart</p>
        <ul>
          <li>
            <FaFacebookSquare size={25} />
          </li>
          <li>
            <FaXTwitter size={25} />
          </li>
          <li>
            <FaSquareInstagram size={25} />
          </li>
          <li>
            <FaLinkedin size={25} />
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Footer;
