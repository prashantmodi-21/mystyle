import React from 'react'
import Cards from '../components/Cards'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import Tables from '../components/Tables'
const Dashboard = () => {
  return (
     <div>
      <Navbar/>
      <div className='flex'>
        <Sidebar/>
        <div className='w-full'>
          <Cards/>
          <Tables/>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
