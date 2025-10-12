'use client';

import { useRouter } from 'next/navigation';
import {
  Container,
  Group,
  Text,
  Button,
  Title,
  SimpleGrid,
  Card,
} from "@mantine/core";
import {
  IconCar,
  IconChartBar,
  IconClock,
  IconShield,
} from '@tabler/icons-react';

export default function HomePage() {
  const router = useRouter(); // ✅ para navegación sin usar window

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #f8fbff 0%, #fffdf6 100%)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header */}
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '20px 60px',
        }}
      >
        <Group gap="xs">
          <div
            style={{
              backgroundColor: '#e7f0ff',
              padding: '6px',
              borderRadius: '10px',
            }}
          >
            <IconCar size={24} color="#228be6" />
          </div>
          <Text fw={700} size="lg">
            FleetTrackPro
          </Text>
        </Group>
      </header>

      {/* Hero Section */}
      <main style={{ textAlign: 'center', flexGrow: 1 }}>
        <Container size="sm" mt={70}>
          <Title
            order={1}
            style={{
              fontSize: '48px',
              fontWeight: 800,
              lineHeight: 1.2,
              color: '#000',
            }}
          >
            Gestión Inteligente para{" "}
            <span style={{ color: '#3b82f6', fontWeight: 500 }}>
              flotas de taxis
            </span>
          </Title>

          <Text
            c="dimmed"
            mt="sm"
            style={{
              fontSize: '18px',
              color: '#6b7280',
            }}
          >
            Sistema profesional para el control financiero y operativo de tu negocio de transporte
          </Text>

          <Group justify="center" mt="xl">
            {/* ✅ Botón Iniciar Sesión */}
           <Button  
           size="md"
          color="blue"
          radius="md"
          style={{
         fontWeight: 600,
          padding: '10px 24px',
            }}
  variant="filled"
 onClick={() => router.push('/login/login')}
>
  Iniciar Sesión
</Button>

            {/* ✅ Botón Registrarse */}
            <Button
              size="md"
              variant="outline"
              radius="md"
              style={{
                padding: '10px 24px',
              }}
              onClick={() => router.push('/register')} // redirige al registro
            >
              Registrarse
            </Button>
          </Group>
        </Container>

        {/* Features */}
        <Container size="lg" mt={80} mb={60}>
          <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="xl">
            {/* Tarjeta 1 */}
            <Card radius="md" shadow="xs" withBorder p="xl">
              <Group justify="center" mb="md">
                <IconChartBar size={32} color="#3b82f6" />
              </Group>
              <Text fw={600} ta="center">
                Reportes en Tiempo Real
              </Text>
              <Text c="dimmed" ta="center" mt="xs">
                Visualiza tus ganancias, gastos y balance de forma instantánea con gráficos detallados
              </Text>
            </Card>

            {/* Tarjeta 2 */}
            <Card radius="md" shadow="xs" withBorder p="xl">
              <Group justify="center" mb="md">
                <IconClock size={32} color="#f7c948" />
              </Group>
              <Text fw={600} ta="center">
                Gestión Simplificada
              </Text>
              <Text c="dimmed" ta="center" mt="xs">
                Registra ganancias, gastos y días especiales en segundos desde cualquier dispositivo
              </Text>
            </Card>

            {/* Tarjeta 3 */}
            <Card radius="md" shadow="xs" withBorder p="xl">
              <Group justify="center" mb="md">
                <IconShield size={32} color="#4dabf7" />
              </Group>
              <Text fw={600} ta="center">
                Control Administrativo
              </Text>
              <Text c="dimmed" ta="center" mt="xs">
                Dashboard completo para administradores con estadísticas y gestión de toda la flota
              </Text>
            </Card>
          </SimpleGrid>
        </Container>
      </main>
    </div>
  );
}
