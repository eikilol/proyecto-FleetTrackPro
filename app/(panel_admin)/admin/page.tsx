"use client";

import { useEffect, useState } from "react";
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
} from "@mantine/core";
import {
  IconTrendingUp,
  IconTrendingDown,
  IconUsers,
  IconClipboard,
  IconCar,
} from "@tabler/icons-react";
import { supabase } from "@/supabase/client";

// ---------- TIPOS DE DATOS ----------
interface VehiculoAlerta {
  id: string;
  placa: string;
  soat_fecha: string | null;
  tecnomecanica_fecha: string | null;
}

export default function DashboardPage() {
  // ESTADOS
  const [alertas, setAlertas] = useState<VehiculoAlerta[]>([]);
  const [conductoresActivos, setConductoresActivos] = useState<number>(0);
  const [gananciasMes, setGananciasMes] = useState(0);
  const [gastosMes, setGastosMes] = useState(0);
  const [balance, setBalance] = useState(0);

  // Cargar las alertas
  useEffect(() => {
    async function fetchAlertas() {
      const { data } = await supabase
        .from("vehiculos")
        .select("id, placa, soat_fecha, tecnomecanica_fecha");

      setAlertas((data as VehiculoAlerta[]) || []);
    }
    fetchAlertas();
  }, []);

  // Cargar datos generales
  useEffect(() => {
    async function cargarDatosGenerales() {
      // Cargar conductores activos
      const { data: conductoresData } = await supabase
        .from("profiles")
        .select("*");
      setConductoresActivos(conductoresData?.length || 0);

      // Calcular fechas del mes actual
      const hoy = new Date();
      const primerDia = new Date(hoy.getFullYear(), hoy.getMonth(), 1)
        .toISOString()
        .split("T")[0];
      const ultimoDia = new Date(hoy.getFullYear(), hoy.getMonth() + 1, 0)
        .toISOString()
        .split("T")[0];

      // Cargar ganancias del mes
      const { data: gananciasData } = await supabase
        .from("ganancias")
        .select("*")
        .gte("fecha", primerDia)
        .lte("fecha", ultimoDia);
      const totalGanancias =
        gananciasData?.reduce((sum, item) => sum + item.valor, 0) || 0;
      setGananciasMes(totalGanancias);

      // Cargar gastos del mes
      const { data: gastosData } = await supabase
        .from("gastos")
        .select("*")
        .gte("fecha", primerDia)
        .lte("fecha", ultimoDia);
      const totalGastos =
        gastosData?.reduce((sum, item) => sum + item.valor, 0) || 0;
      setGastosMes(totalGastos);

      // Calcular balance
      setBalance(totalGanancias - totalGastos);
    }

    cargarDatosGenerales();
  }, []);

  const formatFechaCorta = (fecha: string) => {
    if (!fecha) return "No reg.";
    try {
      return new Date(fecha).toLocaleDateString("es-ES", {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    } catch {
      return "Inválida";
    }
  };

  const getEstadoDocumento = (fecha: string | null) => {
    if (!fecha) return { color: "red", texto: "Vencido" };
    
    const hoy = new Date();
    const fechaDoc = new Date(fecha);
    const diffTime = fechaDoc.getTime() - hoy.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return { color: "red", texto: "Vencido" };
    if (diffDays <= 30) return { color: "orange", texto: "Próximo" };
    return { color: "green", texto: "Vigente" };
  };

  return (
    <Container size="lg" py={10} px={5} style={{ width: "100%" }}>
      <Title order={2} mb={10}>
        Panel de Control
      </Title>

      <Text size="lg" mb={30} style={{ color: "#868e96" }}>
        Resumen general del sistema de transporte
      </Text>

      {/* MÉTRICAS PRINCIPALES */}
      <Grid gutter="lg" mb={30}>
        {/* 🟢 Conductores Activos */}
        <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
          <Card shadow="sm" padding="md" radius="md" withBorder style={{ height: "100%" }}>
            <Group justify="space-between" mb={5}>
              <Text fw={500} size="sm">Conductores</Text>
              <IconUsers size={18} color="green" />
            </Group>
            <Text size="xl" fw={700} style={{ color: "#40c057" }}>
              {conductoresActivos}
            </Text>
          </Card>
        </Grid.Col>

        {/* 💰 Ganancias del Mes */}
        <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
          <Card shadow="sm" padding="md" radius="md" withBorder style={{ height: "100%" }}>
            <Group justify="space-between" mb={5}>
              <Text fw={500} size="sm">Ganancias</Text>
              <IconTrendingUp size={18} color="green" />
            </Group>
            <Text size="xl" fw={700} style={{ color: "#40c057" }}>
              ${gananciasMes.toLocaleString()}
            </Text>
          </Card>
        </Grid.Col>

        {/* 🔴 Gastos del Mes */}
        <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
          <Card shadow="sm" padding="md" radius="md" withBorder style={{ height: "100%" }}>
            <Group justify="space-between" mb={5}>
              <Text fw={500} size="sm">Gastos</Text>
              <IconTrendingDown size={18} color="red" />
            </Group>
            <Text size="xl" fw={700} style={{ color: "#fa5252" }}>
              ${gastosMes.toLocaleString()}
            </Text>
          </Card>
        </Grid.Col>

        {/* 💵 Balance General */}
        <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
          <Card shadow="sm" padding="md" radius="md" withBorder style={{ height: "100%" }}>
            <Group justify="space-between" mb={5}>
              <Text fw={500} size="sm">Balance</Text>
              <IconClipboard size={18} color="blue" />
            </Group>
            <Text size="xl" fw={700} style={{ color: "#228be6" }}>
              ${balance.toLocaleString()}
            </Text>
          </Card>
        </Grid.Col>
      </Grid>

      {/* ALERTAS DE VEHÍCULOS COMPACTAS */}
      <Card shadow="sm" padding="md" radius="md" withBorder>
        <Group justify="space-between" mb="md">
          <Group gap="sm">
            <IconCar size={20} color="#228be6" />
            <Title order={4}>Alertas de Vehículos</Title>
          </Group>
          <Badge variant="light" color="blue">
            {alertas.length} vehículos
          </Badge>
        </Group>
        
        <Grid gutter="xs">
          {alertas.slice(0, 6).map((vehiculo, i) => {
            const estadoSOAT = getEstadoDocumento(vehiculo.soat_fecha);
            const estadoTecno = getEstadoDocumento(vehiculo.tecnomecanica_fecha);
            
            return (
              <Grid.Col key={i} span={{ base: 12, sm: 6, md: 4 }}>
                <Paper p="sm" withBorder style={{ height: "100%" }}>
                  <Group justify="space-between" mb={5}>
                    <Text fw={600} size="sm">{vehiculo.placa}</Text>
                    <Group gap={4}>
                      <Badge size="xs" color={estadoSOAT.color}>SOAT</Badge>
                      <Badge size="xs" color={estadoTecno.color}>TECNO</Badge>
                    </Group>
                  </Group>
                  
                  <Stack gap={2}>
                    <Group justify="space-between">
                      <Text size="xs" c="dimmed">SOAT:</Text>
                      <Text size="xs" fw={500}>
                        {vehiculo.soat_fecha ? formatFechaCorta(vehiculo.soat_fecha) : "No reg."}
                      </Text>
                    </Group>
                    <Group justify="space-between">
                      <Text size="xs" c="dimmed">Tecnom.:</Text>
                      <Text size="xs" fw={500}>
                        {vehiculo.tecnomecanica_fecha ? formatFechaCorta(vehiculo.tecnomecanica_fecha) : "No reg."}
                      </Text>
                    </Group>
                  </Stack>
                </Paper>
              </Grid.Col>
            );
          })}
        </Grid>

        {alertas.length === 0 && (
          <Text size="sm" c="dimmed" ta="center" py="md">
            No hay alertas de vehículos
          </Text>
        )}
      </Card>
    </Container>
  );
}