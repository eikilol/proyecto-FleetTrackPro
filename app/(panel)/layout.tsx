'use client';

import { AppShell, Burger, NavLink, Stack, Group, Title } from "@mantine/core";
import { IconTrendingUp, IconTrendingDown, IconReport, IconDashboard } from "@tabler/icons-react";
import { useDisclosure } from '@mantine/hooks';

export default function PanelLayout({ children }: { children: React.ReactNode }) {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !opened }
      }}
      padding="md"
    >
      {/* Header */}
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Group>
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
            <Title order={3} style={{ color: '#228be6' }}>FleetTrackPro</Title>
          </Group>
        </Group>
      </AppShell.Header>

      {/* MENU LATERAL */}
      <AppShell.Navbar p="md">
        <Stack gap="xs">

          <NavLink
            label="Dashboard"
            description="Vista general"
            leftSection={<IconDashboard size={20} stroke={1.5} />}
            component="a"
            href="/usuario"
          />

          <NavLink
            label="Registrar Ganancias"
            description="Agrega tus ingresos del día"
            leftSection={<IconTrendingUp size={20} stroke={1.5} />}
            component="a"
            href="/ganancias/registrar"
          />

          <NavLink
            label="Registrar Gastos"
            description="Agrega tus gastos del día"
            leftSection={<IconTrendingDown size={20} stroke={1.5} />}
            component="a"
            href="/gastos/registrar"
          />

          <NavLink
            label="Historial"
            description="Todos los movimientos"
            leftSection={<IconReport size={20} stroke={1.5} />}
            component="a"
            href="/historial"
          />

        </Stack>
      </AppShell.Navbar>

      <AppShell.Main>
        {children}
      </AppShell.Main>

    </AppShell>
  );
}
