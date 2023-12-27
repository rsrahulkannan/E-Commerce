import React from 'react'
import Header from '../viewHelpers/Header'
import Sidebar from '../viewHelpers/Sidebar'
import Footer from '../viewHelpers/Footer'

const Dashboard = () => {
  return (
    <>
      <Header />
      <Sidebar />
      <div class="dashboard-wrapper">
        <div class="dashboard-ecommerce">
          <div class="container-fluid dashboard-content ">
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default Dashboard