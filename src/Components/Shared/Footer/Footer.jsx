import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaPhoneAlt,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { MdEmail, MdLocationOn } from "react-icons/md";
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const Footer = () => {
  useEffect(() => {
    Aos.init({ duration: 500 });
  }, []);

  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center lg:text-left">
        {/* Logo & About */}
        <div>
          <h2 data-aos="fade-right" className="text-3xl font-bold text-primary">
            FitForge
          </h2>
          <p data-aos="fade-right" className="mt-3 text-sm">
            Unleash your potential with FitForge. Train hard, recover smart, and
            stay motivated.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 data-aos="fade-up" className="text-xl font-semibold text-white">
            Quick Links
          </h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li data-aos="fade-up">
              <a href="/" className="hover:text-primary">
                Home
              </a>
            </li>
            <li data-aos="fade-up">
              <a href="/trainers" className="hover:text-primary">
                Trainers
              </a>
            </li>
            <li data-aos="fade-up">
              <a href="/classes" className="hover:text-primary">
                Classes
              </a>
            </li>
            <li data-aos="fade-up">
              <a href="/community" className="hover:text-primary">
                Community
              </a>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 data-aos="fade-up" className="text-xl font-semibold text-white">
            Contact
          </h3>
          <div className="mt-3 space-y-3 text-sm">
            <div
              data-aos="fade-up"
              className="flex items-center justify-center lg:justify-start space-x-2"
            >
              <MdLocationOn className="text-primary w-5 h-5" />
              <span>Khulna University, Khulna</span>
            </div>
            <div
              data-aos="fade-up"
              className="flex items-center justify-center lg:justify-start space-x-2"
            >
              <FaPhoneAlt className="text-primary w-5 h-5" />
              <span>+8801719430433</span>
            </div>
            <div
              data-aos="fade-up"
              className="flex items-center justify-center lg:justify-start space-x-2"
            >
              <MdEmail className="text-primary w-5 h-5" />
              <span>support@fitforge.com</span>
            </div>
          </div>
        </div>

        {/* Follow Us */}
        <div>
          <h3 data-aos="fade-left" className="text-xl font-semibold text-white">
            Follow Us
          </h3>
          <p data-aos="fade-left" className="mt-3 text-sm">
            Join our community and stay motivated. Follow us for fitness tips,
            workouts, and exclusive content!
          </p>
          <div className="mt-5 flex justify-center lg:justify-start space-x-4">
            <a
              data-aos="fade-up"
              href="https://www.facebook.com/share/15kKdfwbrL/"
              target="_blank"
              className="text-gray-400 hover:text-primary text-2xl"
            >
              <FaFacebook />
            </a>
            <a
              data-aos="fade-up"
              target="_blank"
              href="https://www.instagram.com/sarafat.karim?igsh=MWtzMmt1azlxZWw3MQ=="
              className="text-gray-400 hover:text-primary text-2xl"
            >
              <FaInstagram />
            </a>
            <a
              data-aos="fade-up"
              target="_blank"
              href="https://x.com/sarafat_karim"
              className="text-gray-400 hover:text-primary text-2xl"
            >
              <FaTwitter />
            </a>
            <a
              data-aos="fade-up"
              href="https://www.youtube.com/"
              target="_blank"
              className="text-gray-400 hover:text-primary text-2xl"
            >
              <FaYoutube />
            </a>
            <a
              data-aos="fade-up"
              target="_blank"
              href="https://www.linkedin.com/in/sarafat-karim/"
              className="text-gray-400 hover:text-primary text-2xl"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div
        data-aos="fade-up"
        className="border-t border-gray-700 mt-10 pt-6 text-center text-sm"
      >
        <p>&copy; {new Date().getFullYear()} FitForge. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
