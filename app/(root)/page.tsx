'use server'

import RightSidebar from '@/components/RightSidebar'
import HeaderBox from '@/components/ui/HeaderBox'
import TotalBalanceBox from '@/components/ui/TotalBalanceBox'
import { getLoggedInUser } from '@/lib/actions/user.actions'
import { redirect } from 'next/navigation'
import React from 'react'

const Home = async () => {
  
  const loggedIn = await getLoggedInUser();
  console.log(loggedIn);
  

  if (!loggedIn) redirect("/sign-in")

  return (
    <section className='home'>
      <div className="home-content">
        <header className="home-header">
          <HeaderBox 
            type="greeting"
            title = "Welcome"
            user= { loggedIn? loggedIn?.name : "Guest"}
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