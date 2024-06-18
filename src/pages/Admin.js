import React from 'react'
import Navbar from '../components/Navbar'
import AdminDashboard from '../components/admin/AdminDashboard'
import ProductForm from '../components/admin/ProductForm'

const Admin = () => {
  return (
    <>
      <Navbar />
      <AdminDashboard/>
      <ProductForm/>
    </>
  )
}

export default Admin