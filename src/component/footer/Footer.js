import React from "react";
import { FaFacebookSquare } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
function Footer() {
  return (
    <div className="bg-slate-600  md:pt-5 md:pb-5 flex-col md:flex-row md:justify-center justify-center text-center md:p-0 text-slate-200">
      <div className="">
        <ul className="flex flex-col md:flex-row md:justify-center">
          <li className="p-2 px-10  font-5xl">About</li>
          <li className="p-2 px-10">Help</li>
          <li className="p-2 px-10">Consumer Policy</li>
          <li className="p-2 px-10">Mail Us:shoppersekart@mail.com</li>
        </ul>
      </div>

      <div className="flex-col md:flex-row md:pt-3 flex p-2 justify-evenly">
        <p>@2007-2023 Shopper's Ekart</p>
        <ul className="flex pt-5 md:pt-0 justify-center">
          <li className="px-2">
            <FaFacebookSquare size={25} />
          </li>
          <li className="px-2">
            <FaXTwitter size={25} />
          </li>
          <li className="px-2">
            <FaSquareInstagram size={25} />
          </li>
          <li className="px-2">
            <FaLinkedin size={25} />
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Footer;
