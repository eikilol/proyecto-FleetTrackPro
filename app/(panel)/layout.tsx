'use client';

import { AppShell, Burger, NavLink, Stack, Group, Title, Button } from "@mantine/core";
import { IconTrendingUp, IconTrendingDown, IconDashboard, IconLogout } from "@tabler/icons-react";
import { useDisclosure } from '@mantine/hooks';
import { supabase } from '@/supabase/client';
import { useRouter } from 'next/navigation';

export default function PanelLayout({ children }: { children: React.ReactNode }) {
  const [opened, { toggle }] = useDisclosure();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      // Cerrar sesión en Supabase
      await supabase.auth.signOut();
      // Redirigir a la página de inicio (landing page)
      router.push('/');
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
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
            href="/usuario"
            component="a"
          />

          <NavLink
            label="Registrar Ganancias"
            description="Agrega tus ingresos "
            leftSection={<IconTrendingUp size={20} stroke={1.5} />}
            href="/ganancias/registrar"
            component="a"
          />

          <NavLink
            label="Registrar Gastos"
            description="Agrega tus gastos "
            leftSection={<IconTrendingDown size={20} stroke={1.5} />}
            href="/gasto/registrar"
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