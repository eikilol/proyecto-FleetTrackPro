'use client';

import { Container, Box, Text, Title, SimpleGrid, ThemeIcon } from "@mantine/core";
import {
  IconDashboard,
  IconChartBar,
  IconAlertTriangle,
  IconFileText,
  IconCalendar,
} from '@tabler/icons-react';
// Define FeatureProps type locally
type FeatureProps = {
  icon: React.FC<{ size?: number; stroke?: number }>;
  title: string;
  description: string;
};

const MOCKDATA: FeatureProps[] = [
  {
    icon: IconDashboard,
    title: 'Dashboard Ejecutivo',
    description: 'Visualiza ingresos diarios vs. metas, vehículos activos/inactivos y alertas críticas en tiempo real.',
  },
  {
    icon: IconChartBar,
    title: 'Control de Rentabilidad',
    description: 'Reportes automáticos mensuales de ingresos, gastos y utilidad por vehículo en PDF.',
  },
  {
    icon: IconAlertTriangle,
    title: 'Gestión de Novedades',
    description: 'Registro sistemático de Pico y Placa, averías, accidentes y otras incidencias.',
  },
  {
    icon: IconFileText,
    title: 'Documentación Inteligente',
    description: 'Alertas automáticas de vencimiento de documentos para evitar multas y sanciones.',
  },
  {
    icon: IconCalendar,
    title: 'Calendario Pico y Placa',
    description: 'Calendario automático con restricciones vehiculares por placa para planificación semanal.',
  },
];

function Feature({ icon: Icon, title, description }: FeatureProps) {
  return (
    <Box>
      <ThemeIcon variant="light" size={40} radius={40}>
        <Icon size={18} stroke={1.5} />
      </ThemeIcon>
      <Text mt="sm" mb={7} fw={500} size="lg">
        {title}
      </Text>
      <Text size="sm" c="dimmed" lh={1.6}>
        {description}
      </Text>
    </Box>
  );
}

export default function FeaturesGrid() {
  const features = MOCKDATA.map((feature, index) => <Feature {...feature} key={index} />);

  return (
    <Container id="caracteristicas" size="lg" py="xl">
      <Title order={2} ta="center" fw="bolder" mb="md">
        Funcionalidades Completas para tu Flota
      </Title>

      <Container size={560} p={0}>
        <Text size="sm" ta="center" c="dimmed">
          Herramientas que necesitas en un solo lugar.
        </Text>
      </Container>

      <SimpleGrid
        mt={60}
        cols={{ base: 1, sm: 2, md: 3 }}
        spacing={{ base: 'xl', md: 50 }}
        verticalSpacing={{ base: 'xl', md: 50 }}
      >
        {features}
      </SimpleGrid>
    </Container>
  );
}