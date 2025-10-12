'use client';

import { useState } from 'react';
import { 
  Container, 
  Title, 
  Paper, 
  Grid, 
  Text, 
  Card, 
  Group, 
  Stack, 
  Badge,
  AppShell,
  NavLink,
  Burger,
  useMantineTheme
} from "@mantine/core";
import { 
  IconTrendingUp, 
  IconTrendingDown, 
  IconCalendar, 
  IconActivity,
  IconDashboard,
  IconCar,
  IconGasStation,
  IconSettings,
  IconReport,
  IconUsers
} from "@tabler/icons-react";
import { useDisclosure } from '@mantine/hooks';

export default function DashboardPage() {
  const theme = useMantineTheme();
  const [opened, { toggle }] = useDisclosure();
  const [active, setActive] = useState(0);

  const menuItems = [
    { icon: IconDashboard, label: 'Dashboard', description: 'Vista general' },
    { icon: IconCar, label: 'Vehículos', description: 'Gestión de flota' },
    { icon: IconGasStation, label: 'Combustible', description: 'Registro y control' },
    { icon: IconReport, label: 'Reportes', description: 'Informes y análisis' },
    { icon: IconUsers, label: 'Clientes', description: 'Gestión de clientes' },
    { icon: IconSettings, label: 'Configuración', description: 'Ajustes del sistema' },
  ];

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
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
            />
            <Title order={3} style={{ color: '#228be6' }}>
              FleetTrackPro
            </Title>
          </Group>
          <Text size="sm" c="dimmed">
           
          </Text>
        </Group>
      </AppShell.Header>

      {/* Navigation Menu */}
      <AppShell.Navbar p="md">
        <Stack gap="xs">
          {menuItems.map((item, index) => (
            <NavLink
              key={item.label}
              active={index === active}
              label={item.label}
              description={item.description}
              leftSection={<item.icon size={20} stroke={1.5} />}
              onClick={() => setActive(index)}
              variant="filled"
              style={{ borderRadius: '8px' }}
            />
          ))}
        </Stack>
      </AppShell.Navbar>

      {/* Main Content */}
      <AppShell.Main>
        <Container size="xl" py={20}>
          {/* Dashboard Section */}
          <Title order={2} mb={20}>Dashboard</Title>
          <Text size="lg" mb={30} style={{ color: '#868e96' }}>
            Resumen de las actividades del mes
          </Text>

          {/* Metrics Grid */}
          <Grid gutter="lg" mb={40}>
            <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Group justify="space-between" mb="xs">
                  <Text fw={500}>Ganancias del Mes</Text>
                  <IconTrendingUp size={20} color="green" />
                </Group>
                <Text size="xl" fw={700} style={{ color: '#40c057' }}>
                  $ 2.450.000
                </Text>
                <Text size="sm" c="dimmed">
                  +25% vs mes anterior
                </Text>
              </Card>
            </Grid.Col>

            <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Group justify="space-between" mb="xs">
                  <Text fw={500}>Gastos del Mes</Text>
                  <IconTrendingDown size={20} color="red" />
                </Group>
                <Text size="xl" fw={700} style={{ color: '#fa5252' }}>
                  $ 850.000
                </Text>
                <Text size="sm" c="dimmed">
                  -5% vs mes anterior
                </Text>
              </Card>
            </Grid.Col>

            <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Group justify="space-between" mb="xs">
                  <Text fw={500}>Balance Neto</Text>
                  <IconActivity size={20} color="blue" />
                </Group>
                <Text size="xl" fw={700} style={{ color: '#228be6' }}>
                  $ 1.600.000
                </Text>
                <Text size="sm" c="dimmed">
                  Ganancias - Gastos
                </Text>
              </Card>
            </Grid.Col>

            <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Group justify="space-between" mb="xs">
                  <Text fw={500}>Días Trabajados</Text>
                  <IconCalendar size={20} color="orange" />
                </Group>
                <Text size="xl" fw={700} style={{ color: '#fd7e14' }}>
                  22
                </Text>
                <Text size="sm" c="dimmed">
                  Este mes
                </Text>
              </Card>
            </Grid.Col>
          </Grid>

          {/* Divider */}
          <div style={{ borderBottom: '1px solid #dee2e6', marginBottom: 30 }} />

          {/* Recent Activity */}
          <Title order={3} mb={20}>Actividad Reciente</Title>
          
          <Grid>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Stack gap="md">
                <Paper withBorder p="md" radius="md">
                  <Group justify="space-between">
                    <Stack gap={0}>
                      <Text fw={500}>Día con buena demanda</Text>
                      <Text size="sm" c="dimmed">Ingresos elevados</Text>
                    </Stack>
                    <Badge color="green" variant="light">2025-01-15</Badge>
                  </Group>
                  <Text fw={700} mt="sm" style={{ color: '#40c057' }}>
                    + $ 120.000
                  </Text>
                </Paper>

                <Paper withBorder p="md" radius="md">
                  <Group justify="space-between">
                    <Stack gap={0}>
                      <Text fw={500}>Combustible</Text>
                      <Text size="sm" c="dimmed">Recarga de flota</Text>
                    </Stack>
                    <Badge color="blue" variant="light">2025-01-14</Badge>
                  </Group>
                  <Text fw={700} mt="sm" style={{ color: '#fa5252' }}>
                    - $ 50.000
                  </Text>
                </Paper>

                <Paper withBorder p="md" radius="md">
                  <Group justify="space-between">
                    <Stack gap={0}>
                      <Text fw={500}>Carreras largas</Text>
                      <Text size="sm" c="dimmed">Viajes interurbanos</Text>
                    </Stack>
                    <Badge color="violet" variant="light">2025-01-14</Badge>
                  </Group>
                  <Text fw={700} mt="sm" style={{ color: '#40c057' }}>
                    + $ 150.000
                  </Text>
                </Paper>

                <Paper withBorder p="md" radius="md">
                  <Group justify="space-between">
                    <Stack gap={0}>
                      <Text fw={500}>Mantenimiento</Text>
                      <Text size="sm" c="dimmed">Servicio preventivo</Text>
                    </Stack>
                    <Badge color="orange" variant="light">2025-01-13</Badge>
                  </Group>
                  <Text fw={700} mt="sm" style={{ color: '#fa5252' }}>
                    - $ 80.000
                  </Text>
                </Paper>
              </Stack>
            </Grid.Col>
          </Grid>
        </Container>
      </AppShell.Main>
    </AppShell>
  );
}