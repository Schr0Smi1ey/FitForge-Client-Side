import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaPhoneAlt,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { IoIosMailUnread } from "react-icons/io";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="container mx-auto mt-5 px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo & About */}
        <div>
          <h2 className="text-3xl font-bold text-primary">FitForge</h2>
          <p className="mt-3 text-sm">
            Unleash your potential with FitForge. Train hard, recover smart, and
            stay motivated.
          </p>
        </div>
        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold text-white">Quick Links</h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <a href="/trainers" className="hover:text-primary">
                Trainers
              </a>
            </li>
            <li>
              <a href="/classes" className="hover:text-primary">
                Classes
              </a>
            </li>
            <li>
              <a href="/community" className="hover:text-primary">
                Community
              </a>
            </li>
            {/* <li>
              <a href="/contact" className="hover:text-primary">
                Contact
              </a>
            </li> */}
          </ul>
        </div>
        {/* Contact */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Contact</h3>

          <div className="flex items-center space-x-2 text-sm mt-3">
            <MdLocationOn className="text-primary text-lg" />
            <span>Khulna University, Khulna</span>
          </div>

          <div className="flex items-center space-x-2 text-sm mt-2">
            <FaPhoneAlt className="text-primary text-lg" />
            <span>(123) 456-7890</span>
          </div>

          <div className="flex items-center space-x-2 text-sm mt-2">
            <IoIosMailUnread className="text-primary text-lg" />
            <span>support@fitforge.com</span>
          </div>
        </div>
        {/* Follow Us & Social Media */}
        <div>
          <h3 className="text-xl font-semibold text-white">Follow Us</h3>
          <p className="mt-3 text-sm">
            Join our community and stay motivated. Follow us for fitness tips,
            workouts, and exclusive content!
          </p>

          {/* Social Media Icons */}
          <div className="mt-5 flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-primary text-2xl">
              <FaFacebook />
            </a>
            <a href="#" className="text-gray-400 hover:text-primary text-2xl">
              <FaInstagram />
            </a>
            <a href="#" className="text-gray-400 hover:text-primary text-2xl">
              <FaTwitter />
            </a>
            <a href="#" className="text-gray-400 hover:text-primary text-2xl">
              <FaYoutube />
            </a>
            <a href="#" className="text-gray-400 hover:text-primary text-2xl">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} FitForge. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
