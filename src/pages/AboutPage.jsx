import React from 'react'
import { Footer, Navbar } from "../components";
const AboutPage = () => {
  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">About Us</h1>
        <hr />
        <p className="lead text-center">
        Coozy Hood didirikan pada tahun 2022 oleh seorang mahasiswa dari Universitas Semarang. Dengan tujuan utama untuk menambah penghasilan selama masa perkuliahan, pendiri Coozy Hood memulai bisnis ini dengan semangat dan dedikasi tinggi. <br /><br />
Berawal dari ketertarikan pada dunia fashion dan melihat peluang pasar untuk produk hoodie yang nyaman dan trendi, Coozy Hood menawarkan berbagai desain unik yang dapat digunakan dalam berbagai kesempatan. Mengusung konsep "cozy and stylish", produk-produk dari Coozy Hood dirancang untuk memberikan kenyamanan maksimal tanpa mengesampingkan gaya.

        </p>

        <h2 className="text-center py-4">Our Products</h2>
        <div className="row justify-content-center">
          <div className="col-md-3 col-sm-6 mb-3 px-3">
            <div className="card h-100">
              <img className="card-img-top img-fluid" src="./assets/produk1.jpg" alt="" height={160} />
              <div className="card-body">
                <h5 className="card-title text-center">Mens's Clothing</h5>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-6 mb-3 px-3">
            <div className="card h-100">
              <img className="card-img-top img-fluid" src="./assets/produk9.jpg" alt="" height={160} />
              <div className="card-body">
                <h5 className="card-title text-center">Women's Clothing</h5>
              </div>
            </div>
          </div>    
        </div>
      </div>
      <Footer />
    </>
  )
}

export default AboutPage