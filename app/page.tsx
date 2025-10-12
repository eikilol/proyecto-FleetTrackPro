'use client';

import { AppShell, Box } from "@mantine/core";
import Header from './components/HomePage';
import Footer from './components/Footer';

export default function Home() {
  return (
    <AppShell 
      padding="md" 
      footer={{ height: 60 }}
      styles={{
        main: {
          minHeight: 'calc(100vh - 120px)',
        }
      }}
    >
      <AppShell.Header h={60}>
        <Header />
      </AppShell.Header>

      
      <AppShell.Footer h={60} style={{ padding: '10px' }}>
        <Footer />
      </AppShell.Footer>
    </AppShell>
  );
}
