// UserDashboardPage.js

import React from 'react';
import Past from './past';
import Navbar from './Navbar';
import Upcoming from './Upcomming'; // Corrected typo from 'Upcomming'
import Hero from './Hero';
import Tech from './Tech';
import Footer from './Footer';
import Electromazine from './Electromazine'; // The component with the 4-item preview
import OurEvents from './OurEvents';
import Numbers from './Numbers';
const UserDashboardPage = () => {
  return (
    <div>
    
      <Navbar /> 
      <Hero />
      <Upcoming />
      
      <Tech />
       <Past />
      <Electromazine /> <br/><br/>
       <Numbers/>
      <Footer />
    </div>
  );
};

export default UserDashboardPage;