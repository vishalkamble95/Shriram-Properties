import React from 'react'
import PropertyHeader from '../components/Header'
import PropertyDetails from '../components/PropertyDetails'
import Amenities from "../components/Amenities";
import Gallary from "../components/Gallary";
import PropertyPriceTable from '../components/PropertyPrice'
import Footer from '../components/Footer'
import ReraInformation from '../components/Rera'
import VideoTour from '../components/VideoTour'
import FAQ from '../components/FAQ'
import Banks from '../components/Banks'
import UnitLayout from '../components/PropertyLayout'
import LocationAdvantages from '../components/LocationAdvantages'
import Blogs from '../components/Blogs'
import ContactUs from '../components/ContactUs'
import Location from '../components/Location'
import Advertisement from '../components/Advertisement'

const HomePage = () => {
  return (
      <>
          <PropertyHeader />
          <ReraInformation />
          <PropertyDetails />
          
          <Amenities />
          <Gallary />
          <VideoTour />
          
          <PropertyPriceTable />
          <Advertisement />
          
          <Banks />
          <UnitLayout />
          <LocationAdvantages />
          <Blogs />
          <ContactUs />


          <FAQ />
          <Location />
          

          {/* <Footer /> */}
      
      </>
  )
}

export default HomePage