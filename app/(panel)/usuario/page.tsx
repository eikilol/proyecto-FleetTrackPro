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
  Table,
} from "@mantine/core";

import {
  IconTrendingUp,
  IconTrendingDown,
  IconCalendar,
  IconActivity,
} from "@tabler/icons-react";

import { supabase } from "@/supabase/client";

// ---------- TIPOS ----------
type ActividadItem = {
  tipo: "ganancia" | "gasto";
  fecha: string;
  valor: number;
  comentario: string | null;
};

type Asignaciones = {
  nombre: string;
  placa: string;
};

export default function DashboardPage() {
  const [gananciasMes, setGananciasMes] = useState(0);
  const [gastosMes, setGastosMes] = useState(0);
  const [balance, setBalance] = useState(0);
  const [diasTrabajados, setDiasTrabajados] = useState(0);
  const [actividad, setActividad] = useState<ActividadItem[]>([]);
  const [asignacion, setAsignacion] = useState<Asignaciones | null>(null);

  useEffect(() => {
    cargarDatos();
  }, []);

  async function cargarDatos() {
    const user = (await supabase.auth.getUser()).data.user;
    if (!user) return;

    const hoy = new Date();
    const primerDia = new Date(hoy.getFullYear(), hoy.getMonth(), 1)
      .toISOString()
      .split("T")[0];
    const ultimoDia = new Date(hoy.getFullYear(), hoy.getMonth() + 1, 0)
      .toISOString()
      .split("T")[0];

    // ========= GANANCIAS =========
    const { data: gananciasData } = await supabase
      .from("ganancias")
      .select("*")
      .eq("user_id", user.id)
      .gte("fecha", primerDia)
      .lte("fecha", ultimoDia);

    const totalGanancias = gananciasData?.reduce((s, g) => s + g.valor, 0) ?? 0;
    setGananciasMes(totalGanancias);

    // ========= GASTOS =========
    const { data: gastosData } = await supabase
      .from("gastos")
      .select("*")
      .eq("user_id", user.id)
      .gte("fecha", primerDia)
      .lte("fecha", ultimoDia);

    const totalGastos = gastosData?.reduce((s, g) => s + g.valor, 0) ?? 0;
    setGastosMes(totalGastos);

    setBalance(totalGanancias - totalGastos);

    // ========= DIAS TRABAJADOS =========
    const dias = new Set([
      ...(gananciasData ?? []).map((g) => g.fecha),
      ...(gastosData ?? []).map((g) => g.fecha),
    ]).size;
    setDiasTrabajados(dias);

    // ========= ACTIVIDAD RECIENTE =========
    const actividadFinal: ActividadItem[] = [
      ...(gananciasData ?? []).map((g) => ({
        tipo: "ganancia" as const,
        fecha: g.fecha,
        valor: g.valor,
        comentario: g.comentario,
      })),
      ...(gastosData ?? []).map((g) => ({
        tipo: "gasto" as const,
        fecha: g.fecha,
        valor: g.valor,
        comentario: g.comentario,
      })),
    ]
      .sort((a, b) => (a.fecha < b.fecha ? 1 : -1))
      .slice(0, 10);

    setActividad(actividadFinal);

    // ========= ASIGNACIÓN - NUEVO ENFOQUE =========
    try {
      // Cargar perfil del usuario
      const { data: profileData } = await supabase
        .from("profiles")
        .select("nombre")
        .eq("id", user.id)
        .single();

      // Cargar asignación sin usar .single() para evitar problemas
      const { data: asignacionData, error: asignacionError } = await supabase
        .from("asignaciones")
        .select(`
          id,
          vehiculo_id,
          fecha_asignacion,
          vehiculos ( placa )
        `)
        .eq("user_id", user.id)
        .order("fecha_asignacion", { ascending: false })
        .limit(1);

      console.log("Perfil:", profileData);
      console.log("Asignación completa:", asignacionData);
      console.log("Error asignación:", asignacionError);

      // Si hay asignaciones y la primera tiene vehículo
      if (asignacionData && asignacionData.length > 0 && asignacionData[0].vehiculos) {
        const primeraAsignacion = asignacionData[0];
        // Acceder al primer vehículo del array
        const vehiculo = Array.isArray(primeraAsignacion.vehiculos) 
          ? primeraAsignacion.vehiculos[0] 
          : primeraAsignacion.vehiculos;
        
        setAsignacion({
          nombre: profileData?.nombre || "Sin nombre",
          placa: vehiculo?.placa || "Sin placa",
        });
      } else if (profileData) {
        // Si solo hay perfil pero no asignación
        setAsignacion({
          nombre: profileData.nombre || "Sin nombre",
          placa: "Sin vehículo asignado",
        });
      } else {
        // Si no hay nada
        setAsignacion({
          nombre: "Sin nombre",
          placa: "Sin vehículo asignado",
        });
      }
    } catch (error) {
      console.error("Error cargando datos:", error);
      // Fallback básico
      setAsignacion({
        nombre: "Sin nombre",
        placa: "Sin vehículo asignado",
      });
    }
  }

  return (
    <Container size="lg" py={10} px={5} style={{ width: "100%" }}>
      <Title order={2} mb={10}>
        Dashboard
      </Title>

      <Text size="lg" mb={30} style={{ color: "#868e96" }}>
        Resumen de las actividades del mes
      </Text>

      {/* TABLA CON MÉTRICAS E INFORMACIÓN DEL CONDUCTOR */}
      <Table withRowBorders={false} verticalSpacing="md" mb={40}>
        <Table.Tbody>
          <Table.Tr>
            {/* GANANCIAS DEL MES */}
            <Table.Td style={{ width: '33%', verticalAlign: 'top' }}>
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Group justify="space-between" mb="xs">
                  <Text fw={500}>Ganancias del Mes</Text>
                  <IconTrendingUp size={20} color="green" />
                </Group>
                <Text size="xl" fw={700} style={{ color: "#40c057" }}>
                  ${gananciasMes.toLocaleString()}
                </Text>
              </Card>
            </Table.Td>

            {/* GASTOS DEL MES */}
            <Table.Td style={{ width: '33%', verticalAlign: 'top' }}>
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Group justify="space-between" mb="xs">
                  <Text fw={500}>Gastos del Mes</Text>
                  <IconTrendingDown size={20} color="red" />
                </Group>
                <Text size="xl" fw={700} style={{ color: "#fa5252" }}>
                  ${gastosMes.toLocaleString()}
                </Text>
              </Card>
            </Table.Td>

            {/* INFORMACIÓN DEL CONDUCTOR */}
            <Table.Td style={{ width: '34%', verticalAlign: 'top' }} rowSpan={2}>
              <Card shadow="sm" padding="lg" radius="md" withBorder style={{ height: '100%' }}>
                <Text fw={700} mb={20}>
                  Información del Conductor
                </Text>
                
                {asignacion ? (
                  <Stack gap="md">
                    <div>
                      <Text fw={600} mb={5}>Nombre</Text>
                      <Text>{asignacion.nombre}</Text>
                    </div>
                    <div>
                      <Text fw={600} mb={5}>Vehículo Asignado</Text>
                      <Text style={{ 
                        color: asignacion.placa === "Sin vehículo asignado" ? "#fa5252" : "#40c057" 
                      }}>
                        {asignacion.placa}
                      </Text>
                    </div>
                  </Stack>
                ) : (
                  <Text c="dimmed">Cargando información...</Text>
                )}
              </Card>
            </Table.Td>
          </Table.Tr>

          <Table.Tr>
            {/* BALANCE NETO */}
            <Table.Td style={{ width: '33%', verticalAlign: 'top' }}>
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Group justify="space-between" mb="xs">
                  <Text fw={500}>Balance Neto</Text>
                  <IconActivity size={20} color="blue" />
                </Group>
                <Text size="xl" fw={700} style={{ color: "#228be6" }}>
                  ${balance.toLocaleString()}
                </Text>
              </Card>
            </Table.Td>

            {/* DÍAS TRABAJADOS */}
            <Table.Td style={{ width: '33%', verticalAlign: 'top' }}>
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Group justify="space-between" mb="xs">
                  <Text fw={500}>Días Trabajados</Text>
                  <IconCalendar size={20} color="orange" />
                </Group>
                <Text size="xl" fw={700} style={{ color: "#fd7e14" }}>
                  {diasTrabajados}
                </Text>
              </Card>
            </Table.Td>
          </Table.Tr>
        </Table.Tbody>
      </Table>

      {/* SEPARADOR */}
      <div
        style={{
          borderBottom: "1px solid #dee2e6",
          marginBottom: 30,
        }}
      />

      <Title order={3} mb={20}>
        Actividad Reciente
      </Title>

      {/* LISTA ACTIVIDAD */}
      <Grid>
        <Grid.Col span={12}>
          <Stack gap="md">
            {actividad.map((item, i) => (
              <Paper key={i} withBorder p="md" radius="md">
                <Group justify="space-between" align="flex-start">
                  <Stack gap={5} style={{ flex: 1 }}>
                    <Text fw={500} size="lg">
                      {item.tipo === "ganancia" ? "Ganancia" : "Gasto"}
                    </Text>
                    <Text size="sm" c="dimmed">
                      {item.comentario || "Sin descripción"}
                    </Text>
                    <Text
                      fw={700}
                      style={{
                        color: item.tipo === "ganancia" ? "#40c057" : "#fa5252",
                      }}
                    >
                      {item.tipo === "ganancia" ? "+ " : "- "}
                      ${item.valor.toLocaleString()}
                    </Text>
                  </Stack>

                  <Badge
                    color={item.tipo === "ganancia" ? "green" : "red"}
                    variant="light"
                    size="lg"
                  >
                    {item.fecha}
                  </Badge>
                </Group>
              </Paper>
            ))}
          </Stack>
        </Grid.Col>
      </Grid>
    </Container>
  );
}