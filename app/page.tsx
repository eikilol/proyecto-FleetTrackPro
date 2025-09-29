'use client';

import { AppShell, Box } from "@mantine/core";
import Header from './components/Header';
import Footer from './components/Footer';
import HeroSection from './components/HeroSection';
import FeaturesGrid from './components/FeaturesGrid';
import RealTimeDashboard from './components/RealTimeDashboard';
import ComprehensiveFooter from './components/ComprehensiveFooter';

export default function HomePage() {
  return (
    <AppShell 
      padding="md" 
      footer={{ height: 60 }}
      styles={{
        main: {
          minHeight: 'calc(100vh - 120px)', // Ajusta para que el contenido ocupe el espacio disponible
        }
      }}
    >
      <AppShell.Header h={60}>
        <Header />
      </AppShell.Header>

      <AppShell.Main>
        <Box style={{ flex: 1 }}>
          <HeroSection />
          <FeaturesGrid />
          <RealTimeDashboard />
        </Box>
        <ComprehensiveFooter />
      </AppShell.Main>
      <AppShell.Footer h={60} style={{ padding: '10px' }}>
        <Footer />
      </AppShell.Footer>
      
    </AppShell>
    
  );
}