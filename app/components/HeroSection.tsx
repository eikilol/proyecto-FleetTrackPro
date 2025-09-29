'use client';

import { Container, Flex, Box, Title, Text, Paper, Image } from "@mantine/core";
import { IconCurrencyDollar, IconUsers } from '@tabler/icons-react';

export default function HeroSection() {
  return (
    <Container size="lg" style={{ marginTop: '80px' }}>
      <Flex
        gap="md"
        justify="space-between"
        align="flex-start"
        direction="row"
        wrap="wrap"
      >
        <Box w={{ base: '100%', md: '48%' }}>
          <Title size="42px" c="#000" fw="bolder" mb="md">
            Gestiona tu flota de{' '}
            <Text
              span
              size="42px"
              variant="gradient"
              gradient={{ from: '#085ba2', to: '#0da250', deg: 90 }}
              fw="bold"
            >
              taxis profesionalmente
            </Text>
          </Title>
          <Text c="#667b99" size="xl" mb="xl">
            Sistema completo para el control de rentabilidad, seguimiento de conductores y gestión inteligente de documentación. Para Sr. Humberto Vargas Campos.
          </Text>

          <Flex gap="md" mb="xl">
            <Paper shadow="xs" p="sm" flex={1}>
              <Flex align="center" gap="sm">
                <IconCurrencyDollar size={28} color="#0da250" />
                <div>
                  <Text fw={700} size="md">6 Ingresos Diarios</Text>
                  <Text size="xs" c="dimmed">Control automático</Text>
                </div>
              </Flex>
            </Paper>

            <Paper shadow="xs" p="sm" flex={1}>
              <Flex align="center" gap="sm">
                <IconUsers size={28} color="#085ba2" />
                <div>
                  <Text fw={700} size="md">10 Conductores</Text>
                  <Text size="xs" c="dimmed">Gestión completa</Text>
                </div>
              </Flex>
            </Paper>
          </Flex>
        </Box>

        <Box w={{ base: '100%', md: '50%' }}>
          <Image
            w="100%"
            radius="md"
            src="/images/grafico.jpg"
            alt="Dashboard gráfico"
          />
        </Box>
      </Flex>
    </Container>
  );
}