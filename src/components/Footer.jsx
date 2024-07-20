import React from "react";
import "./main.css"

const Footer = () => (
  <footer className="bg-light py-5">
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 mb-3">
          <h5 className="text-uppercase">Coozy Hood</h5>
          <p className="text-secondary">You Can Contact us on bellow</p>
          <ul className="list-unstyled mb-0">
            <li><i className="fas fa-map-marker-alt mr-2"></i> Adress: Jl. Menteri Supeno, Semarang</li>
            <li><i className="fas fa-phone mr-2"></i> WhatsApp: +62 812 3456 7890</li>
            <li><i className="fas fa-envelope mr-2"></i> Email: zidananwar@gmail.com</li>
          </ul>
        </div>

        <div className="col-md-3 mb-3">
          <h5 className="text-uppercase">Quick Links</h5>
          <ul className="list-unstyled">
            <li className="mb-3"><a href="/product" className="text-secondary text-decoration-none">Product</a></li>
            <li className="mb-3"><a href="/about" className="text-secondary text-decoration-none">About Us</a></li>
            <li className="mb-3"><a href="/contact" className="text-secondary text-decoration-none">Contact</a></li>
          </ul>
        </div>

        <div className="col-md-3 mb-3">
          <h5 className="text-uppercase">Follow Us</h5>
          <ul className="list-unstyled">
            <li className="mb-3"><a href="#" className="text-secondary text-decoration-none"><i className="fab fa-instagram mr-2"></i> Instagram</a></li>
          </ul>
        </div>

        <div className="col-md-3 mb-3">
          <h5 className="text-uppercase">Newsletter</h5>
          <p className="text-secondary">Stay updated with our latest news and promotions.</p>
          <form>
            <input type="email" className="form-control" placeholder="Enter your email" />
            <button type="submit" className="btn btn-primary">Subscribe</button>
          </form>
        </div>
      </div>

      <div className="footer-copyright text-center py-3">
        <p>© 2024 Copyright:</p>
        <a href="https://www.linkedin.com/in/satyo-tri-hanggoro-a46a88227/" className="text-secondary text-decoration-none"> Satyo Tri Hanggoro</a>
      </div>
    </div>
  </footer>
);

export default Footer;