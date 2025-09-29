'use client';

import { Group, Text, Anchor, Button, Container } from "@mantine/core";
import { IconCar } from '@tabler/icons-react';

const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    const headerHeight = 60;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};

export default function Header() {
  const handleNavigationClick = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();
    scrollToSection(sectionId);
  };

  return (
    <Container h="100%" fluid size="lg">
      <Group h="100%" justify="space-between">
        <Group>
          <IconCar size={28} style={{ color: '#228be6' }} />
          <Text fw={700} size="lg">
            FleetTrackPro
          </Text>
        </Group>
        <Group justify="center" gap="xl">
          <Anchor 
            href="#caracteristicas" 
            underline="hover" 
            c="#000"
            onClick={(e) => handleNavigationClick(e, 'caracteristicas')}
          >
            Características
          </Anchor>
          <Anchor 
            href="#dashboard" 
            underline="hover" 
            c="#000"
            onClick={(e) => handleNavigationClick(e, 'dashboard')}
          >
            Dashboard
          </Anchor>
          <Anchor 
            href="#contacto" 
            underline="hover" 
            c="#000"
            onClick={(e) => handleNavigationClick(e, 'contacto')}
          >
            Contacto
          </Anchor>
        </Group>
        <Group>
          <Button variant="filled" onClick={() => window.location.href = "/login"}>
            Iniciar sesión
          </Button>
        </Group>
      </Group>
    </Container>
  );
}