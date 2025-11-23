'use client';

import { AppShell } from "@mantine/core";
import Header from './components/HomePage';


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

      
   
    </AppShell>
  );
}
