import React from 'react'
import Sidebar from '../../components/admin/Sidebar'

const Admin = ({ children }) => {
 return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-content">
        {children}
      </div>
    </div>
  );
}

export default Admin