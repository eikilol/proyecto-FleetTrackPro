'use client';

import { AppShell, Burger, NavLink, Stack, Group, Title, Button } from "@mantine/core";
import { IconTrendingUp, IconTrendingDown, IconReport, IconDashboard, IconLogout } from "@tabler/icons-react";
import { useDisclosure } from '@mantine/hooks';

export default function PanelLayout({ children }: { children: React.ReactNode }) {
  const [opened, { toggle }] = useDisclosure();

  const handleLogout = () => {
    // Aquí puedes agregar la lógica para cerrar sesión
    console.log("Cerrando sesión...");
    // Por ejemplo: 
    // await supabase.auth.signOut();
    // router.push('/login');
  };

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      {/* HEADER */}
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Group>
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
            <Title order={3} c="blue">
              FleetTrackPro
            </Title>
          </Group>
          
          {/* Botón Salir a la derecha */}
          <Button 
            variant="light" 
            color="red" 
            leftSection={<IconLogout size={16} />}
            onClick={handleLogout}
            size="sm"
          >
            Salir
          </Button>
        </Group>
      </AppShell.Header>

      {/* NAVBAR */}
      <AppShell.Navbar p="md">
        <Stack gap="xs">
          <NavLink
            label="Dashboard"
            description="Vista general"
            leftSection={<IconDashboard size={20} stroke={1.5} />}
            href="/admin"
            component="a"
          />

          <NavLink
            label="crea vehiculos"
            description=" vehiculos"
            leftSection={<IconTrendingUp size={20} stroke={1.5} />}
            href="/vehiculos/crear"
            component="a"
          />

          <NavLink
            label="asignar vehiculos "
            description="asignar"
            leftSection={<IconTrendingDown size={20} stroke={1.5} />}
            href="/vehiculos/asignar"
            component="a"
          />
          
          <NavLink
            label="lista "
            description="asignar"
            leftSection={<IconTrendingDown size={20} stroke={1.5} />}
            href="/vehiculos"
            component="a"
          />
        </Stack>
      </AppShell.Navbar>

      {/* CONTENIDO */}
      <AppShell.Main>
        {children}
      </AppShell.Main>
    </AppShell>
  );
}