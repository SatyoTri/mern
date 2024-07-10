import React from "react";
import "./main.css"

const Footer = () => (
  <footer className="bg-light page-footer font-small blue pt-4">
  <div className="container-fluid text-center text-md-left">
    <div className="row">
      <div className="col-md-4 mt-md-0 mt-3">
        <h5 className="text-uppercase">Cooozy Hood</h5>
        <p>Here you can use rows and columns to organize your footer content.</p>
        <ul className="list-unstyled mb-0">
          <li><i className="fas fa-map-marker-alt mr-2"></i> Alamat: Jl. Contoh No. 123, Jakarta</li>
          <li><i className="fas fa-phone mr-2"></i> WhatsApp: +62 812 3456 7890</li>
          <li><i className="fas fa-envelope mr-2"></i> Email: info@coozyhood.com</li>
        </ul>
      </div>

      <hr className="clearfix w-100 d-md-none pb-0" />

      <div className="col-md-4 mb-md-0 mb-3">
        <h5 className="text-uppercase">Quick Links</h5>
        <ul className="list-unstyled">
          <li className="mb-3"><a href="/product" className="text-dark text-decoration-none">Product</a></li>
          <li className="mb-3"><a href="/about" className="text-dark text-decoration-none">About Us</a></li>
          <li className="mb-3"><a href="/contact" className="text-dark text-decoration-none">Contact</a></li>
        </ul>
      </div>

      <div className="col-md-4 mb-md-0 mb-3">
        <h5 className="text-uppercase">Resources</h5>
        <ul className="list-unstyled">
          <li><a href="#!">Link 1</a></li>
          <li><a href="#!">Link 2</a></li>
          <li><a href="#!">Link 3</a></li>
          <li><a href="#!">Link 4</a></li>
        </ul>
      </div>
    </div>
  </div>

  <div className="footer-copyright text-center py-3">
    <p>© 2024 Copyright:</p>
    <a href="https://www.linkedin.com/in/satyo-tri-hanggoro-a46a88227/" className="text-decoration-none"> Satyo Tri Hanggoro</a>
  </div>
</footer>
);

export default Footer;
