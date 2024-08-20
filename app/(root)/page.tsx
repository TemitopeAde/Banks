import RightSidebar from '@/components/RightSidebar'
import HeaderBox from '@/components/ui/HeaderBox'
import TotalBalanceBox from '@/components/ui/TotalBalanceBox'
import React from 'react'

const Home = () => {
  const loggedIn = {
    firstName: "Temitope",
    lastName: "Adesiyan",
    email: "adesiyantope2014@gmail.com"
  }
  return (
    <section className='home'>
      <div className="home-content">
        <header className="home-header">
          <HeaderBox 
            type="greeting"
            title = "Welcome"
            user= { loggedIn? loggedIn?.firstName : "Guest"}
            subtext = "Access and manage your account and transactions efficiently"
          />
          <TotalBalanceBox
            accounts = {[]}
            totalBanks = {1}
            totalCurrentBalance = {1250.59}
          />
        </header>
      </div>

      <RightSidebar
        user={loggedIn}
        transactions ={[]}
        banks={[{ currentBalance: 230.56}, {currentBalance: 200.56}]}
      />
    </section>
  )
}

export default Home