'use client';

import { Box, Container, SimpleGrid, Group, Text, Title, Stack } from "@mantine/core";
import {
  IconCar,
  IconDashboard,
  IconChartBar,
  IconFileText,
  IconCalendar,
  IconBook,
  IconUsersGroup,
  IconHeadset,
  IconRefresh,
  IconMail,
  IconPhone,
  IconMapPin,
} from '@tabler/icons-react';

export default function ComprehensiveFooter() {
  return (
    <Box
      id="contacto"
      component="footer"
      py="xl"
      mt="xl"
      c="white"
      style={{
        background: "linear-gradient(90deg, #004c97 0%, #005bac 100%)",
        width: '100%',
        marginLeft: 0,
        marginRight: 0
      }}
    >
      <Container size="100%" px={0}>
        <Container size="lg">
          <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl">
            <Box>
              <Group mb="md">
                <IconCar size={28} color="#228be6" />
                <Text fw={700} size="lg">FleetTrackPro</Text>
              </Group>
              <Text size="sm" mb="md">
                Sistema integral de gestión de flota de taxis diseñado para maximizar la rentabilidad y optimizar las operaciones.
              </Text>
              <Text size="xs" c="dimmed">
                Sistema desarrollado especialmente para Sr. Humberto Vargas Campos.
              </Text>
            </Box>

            <Box>
              <SimpleGrid cols={2} spacing="xl">
                <Box>
                  <Title order={4} mb="md" size="h5">Características</Title>
                  <Stack gap="xs">
                    <Group gap="xs">
                      <IconDashboard size={16} />
                      <Text size="sm">Dashboard Ejecutivo</Text>
                    </Group>
                    <Group gap="xs">
                      <IconChartBar size={16} />
                      <Text size="sm">Reportes de Rentabilidad</Text>
                    </Group>
                    <Group gap="xs">
                      <IconFileText size={16} />
                      <Text size="sm">Gestión de Documentos</Text>
                    </Group>
                    <Group gap="xs">
                      <IconCalendar size={16} />
                      <Text size="sm">Calendario Pico y Placa</Text>
                    </Group>
                  </Stack>
                </Box>

                <Box>
                  <Title order={4} mb="md" size="h5">Soporte</Title>
                  <Stack gap="xs">
                    <Group gap="xs">
                      <IconBook size={16} />
                      <Text size="sm">Documentación</Text>
                    </Group>
                    <Group gap="xs">
                      <IconUsersGroup size={16} />
                      <Text size="sm">Capacitación</Text>
                    </Group>
                    <Group gap="xs">
                      <IconHeadset size={16} />
                      <Text size="sm">Soporte Técnico 24/7</Text>
                    </Group>
                    <Group gap="xs">
                      <IconRefresh size={16} />
                      <Text size="sm">Actualizaciones</Text>
                    </Group>
                    <Group gap="xs">
                      <IconUsersGroup size={16} />
                      <Text size="sm">Comunidad</Text>
                    </Group>
                  </Stack>
                </Box>
              </SimpleGrid>
            </Box>

            <Box>
              <Title order={4} mb="md" size="h5">Contacto</Title>
              <Stack gap="md">
                <Group gap="xs">
                  <IconMail size={16} />
                  <Text size="sm">info@fleettrackpro.com</Text>
                </Group>
                <Group gap="xs">
                  <IconPhone size={16} />
                  <Text size="sm">+57 300 123 4567</Text>
                </Group>
                <Group gap="xs">
                  <IconMapPin size={16} />
                  <Text size="sm">Bogotá, Colombia</Text>
                </Group>
              </Stack>
            </Box>
          </SimpleGrid>

          <Box
            style={{
              borderTop: '1px solid rgba(255,255,255,0.3)',
              margin: '30px 0 20px 0',
              paddingTop: '20px'
            }}
          />

          <Group justify="space-between" align="flex-start">
            <Box style={{ flex: 1 }}>
              <Text size="sm" c="dimmed" mb={4}>
                © 2024 FleetTrackPro. Todos los derechos reservados.
              </Text>
              <Text size="xs" c="dimmed">
                Sistema desarrollado especialmente para Sr. Humberto Vargas Campos.
              </Text>
            </Box>
            
            
          </Group>
        </Container>
      </Container>
    </Box>
  );
}