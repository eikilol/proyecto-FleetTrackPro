'use client';

import { Container, Card, Title, Text, Box, Grid, Group, Badge, Progress, Stack, SimpleGrid, ThemeIcon } from "@mantine/core";
import { IconCar, IconTools, IconAlertCircle, IconCurrencyDollar, IconClock, IconAlertTriangle } from '@tabler/icons-react';

export default function RealTimeDashboard() {
  return (
    <Container id="dashboard" size="lg" py="xl" style={{ marginTop: '40px' }}>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Title order={2} mb="md" fw="bolder">
          Dashboard en Tiempo Real
        </Title>
        <Text size="lg" c="dimmed" mb="xl">
          Toda la información que necesitas para tomar decisiones inteligentes sobre tu flota, actualizada en tiempo real.
        </Text>

        <Box
          style={{
            borderTop: '1px solid #e9ecef',
            borderBottom: '1px solid #e9ecef',
            padding: '20px 0',
            marginBottom: '30px'
          }}
        />

        <Grid gutter="xl" mb="xl">
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Card withBorder padding="lg" radius="md">
              <Text fw={700} size="xl" mb="xs">
                Ingresos del Día
              </Text>
              <Text fw={700} size="32px" c="blue.7" mb="md">
                $2,847,500
              </Text>

              <Box mb="sm">
                <Group justify="space-between" mb="xs">
                  <Text size="sm" fw={500}>Meta: $2,500.000</Text>
                  <Badge color="green" variant="light">
                    +13.0% vs. meta
                  </Badge>
                </Group>
                <Progress value={113} color="green" size="lg" />
              </Box>
            </Card>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 6 }}>
            <Card withBorder padding="lg" radius="md">
              <Text fw={700} size="xl" mb="md">
                Estado de Flota
              </Text>

              <Stack gap="md">
                <Group justify="space-between">
                  <Group>
                    <IconCar size={20} color="green" />
                    <Text>Vehículos Activos</Text>
                  </Group>
                  <Badge color="green" variant="light">8</Badge>
                </Group>

                <Group justify="space-between">
                  <Group>
                    <IconTools size={20} color="orange" />
                    <Text>En Taller</Text>
                  </Group>
                  <Badge color="orange" variant="light">2</Badge>
                </Group>

                <Group justify="space-between">
                  <Group>
                    <IconAlertCircle size={20} color="red" />
                    <Text>Pico y Placa</Text>
                  </Group>
                  <Badge color="red" variant="light">3</Badge>
                </Group>
              </Stack>
            </Card>
          </Grid.Col>
        </Grid>

        <SimpleGrid
          cols={{ base: 1, sm: 2, md: 4 }}
          spacing="md"
        >
          <Card withBorder padding="lg" radius="md">
            <Group mb="md">
              <ThemeIcon variant="light" size={40} radius={40} color="blue">
                <IconCurrencyDollar size={18} />
              </ThemeIcon>
              <div>
                <Text fw={700} size="lg">$355,937</Text>
                <Text size="sm" c="dimmed">Promedio por Vehículo</Text>
              </div>
            </Group>
          </Card>

          <Card withBorder padding="lg" radius="md">
            <Group mb="md">
              <ThemeIcon variant="light" size={40} radius={40} color="green">
                <IconCar size={18} />
              </ThemeIcon>
              <div>
                <Text fw={700} size="lg">8</Text>
                <Text size="sm" c="dimmed">Condiciones Activos</Text>
              </div>
            </Group>
          </Card>

          <Card withBorder padding="lg" radius="md">
            <Group mb="md">
              <ThemeIcon variant="light" size={40} radius={40} color="grape">
                <IconClock size={18} />
              </ThemeIcon>
              <div>
                <Text fw={700} size="lg">86h</Text>
                <Text size="sm" c="dimmed">Horas Trabajadas</Text>
              </div>
            </Group>
          </Card>

          <Card withBorder padding="lg" radius="md">
            <Group mb="md">
              <ThemeIcon variant="light" size={40} radius={40} color="red">
                <IconAlertTriangle size={18} />
              </ThemeIcon>
              <div>
                <Text fw={700} size="lg">3</Text>
                <Text size="sm" c="dimmed">Alertas Pendientes</Text>
              </div>
            </Group>
          </Card>
        </SimpleGrid>
      </Card>
    </Container>
  );
}