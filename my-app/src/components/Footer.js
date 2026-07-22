// src/components/Footer.js
import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const companyInfo = {
  name: "Petal Palette",
  address: "Mumbai, Maharashtra, India",
  phone: "+91 98765 43210",
  email: "hello@petalpalette.com",
  hours: "Mon - Sat : 9:00 AM - 7:00 PM",
};

export default function Footer() {
  return (
    <footer style={styles.footer}>
      {/* Footer Grid */}
      <div style={styles.grid}>
        {/* Shop */}
        <div>
          <h4 style={styles.heading}>Shop</h4>
          <ul style={styles.list}>
            <li style={styles.item}>
              <Link to="/premade-bouquets" style={styles.link}>
                Premade Bouquets
              </Link>
            </li>
            <li style={styles.item}>
              <Link to="/custom-bouquet" style={styles.link}>
                Custom Bouquets
              </Link>
            </li>
            <li style={styles.item}>
              <Link to="/subscription" style={styles.link}>
                Bouquet Subscription
              </Link>
            </li>
            <li style={styles.item}>
              <Link to="/events" style={styles.link}>
                Weddings & Events
              </Link>
            </li>
          </ul>
        </div>

        {/* Customer Care */}
        <div>
          <h4 style={styles.heading}>Customer Care</h4>
          <ul style={styles.list}>
            <li style={styles.item}>
              <Link to="/track-order" style={styles.link}>
                Track Order
              </Link>
            </li>
            <li style={styles.item}>
              <Link to="/flower-care" style={styles.link}>
                Flower Care
              </Link>
            </li>
            <li style={styles.item}>
              <Link to="/reminders" style={styles.link}>
                Occasion Reminders
              </Link>
            </li>
            <li style={styles.item}>
              <Link to="/contact" style={styles.link}>
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 style={styles.heading}>Company</h4>
          <ul style={styles.list}>
            <li style={styles.item}>
              <Link to="/about" style={styles.link}>
                About Us
              </Link>
            </li>
            <li style={styles.item}>
              <Link to="/gallery" style={styles.link}>
                Gallery
              </Link>
            </li>
            <li style={styles.item}>
              <Link to="/reviews" style={styles.link}>
                Customer Reviews
              </Link>
            </li>
            <li style={styles.item}>
              <Link to="/shopping" style={styles.link}>
                Shop Now
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 style={styles.heading}>Get In Touch</h4>
          <ul style={styles.list}>
            <li style={styles.item}>
              <strong>Address:</strong>
              <br />
              {companyInfo.address}
            </li>
            <li style={styles.item}>
              <strong>Phone:</strong>
              <br />
              {companyInfo.phone}
            </li>
            <li style={styles.item}>
              <strong>Email:</strong>
              <br />
              {companyInfo.email}
            </li>
            <li style={styles.item}>
              <strong>Working Hours:</strong>
              <br />
              {companyInfo.hours}
            </li>
          </ul>
        </div>
      </div>

      {/* Social Icons */}
      <div style={styles.social}>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={styles.socialLink}>
          <FaFacebookF />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={styles.socialLink}>
          <FaXTwitter />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={styles.socialLink}>
          <FaInstagram />
        </a>
        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" style={styles.socialLink}>
          <FaYoutube />
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={styles.socialLink}>
          <FaLinkedinIn />
        </a>
      </div>

      {/* Bottom Section */}
      <div style={styles.bottom}>
        <div style={styles.legalLinks}>
          <Link to="/legal-pages" style={styles.link}>Privacy Policy</Link>
          <Link to="/legal-pages" style={styles.link}>Terms & Conditions</Link>
          <Link to="/legal-pages" style={styles.link}>Refund Policy</Link>
          <Link to="/legal-pages" style={styles.link}>Shipping Policy</Link>
        </div>
        <p style={styles.copyright}>
          © {new Date().getFullYear()} {companyInfo.name}. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}

const styles = {
  footer: { backgroundColor: "#faf7f8", color: "#444", padding: "55px 40px 20px", borderTop: "1px solid #e6e6e6", marginTop: "60px", width: "100%", boxSizing: "border-box", fontFamily: "Arial, sans-serif" },
  grid: { maxWidth: "1200px", margin: "0 auto 40px", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: "40px" },
  heading: { fontSize: "15px", fontWeight: "700", marginBottom: "18px", color: "#222", textTransform: "uppercase", letterSpacing: "1px" },
  list: { listStyle: "none", padding: 0, margin: 0 },
  item: { marginBottom: "12px", fontSize: "14px", lineHeight: "22px" },
  link: { textDecoration: "none", color: "#555" },
  social: { display: "flex", justifyContent: "center", gap: "25px", fontSize: "22px", marginBottom: "35px" },
  socialLink: { color: "#555", textDecoration: "none" },
  bottom: { maxWidth: "1200px", margin: "0 auto", paddingTop: "20px", borderTop: "1px solid #ddd", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "20px", fontSize: "13px", color: "#777" },
  legalLinks: { display: "flex", gap: "20px", flexWrap: "wrap" },
  copyright: { margin: 0 }
};