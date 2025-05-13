import React from "react";
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import ClientsSection from '../components/ClientsSection';
import TalentsSection from '../components/TalentsSection';
import Footer from '../components/Footer';
import ChatWidget from '../components/ChatWidget';

const LandingPage = () => {
  return (
    <>
      <Navbar />
      <HeroSection />
      <ClientsSection />
      <TalentsSection />
      <Footer />
      <ChatWidget />
    </>
  );
};

export default LandingPage;
