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
  IconCalendar,
  IconActivity,
} from "@tabler/icons-react";


import { supabase } from "@/supabase/client";

// ---------- TIPO PARA ACTIVIDAD ----------
type ActividadItem = {
  tipo: "ganancia" | "gasto";
  fecha: string;
  valor: number;
  comentario: string | null;
};

export default function DashboardPage() {
  

  // ESTADOS
  const [gananciasMes, setGananciasMes] = useState(0);
  const [gastosMes, setGastosMes] = useState(0);
  const [balance, setBalance] = useState(0);
  const [diasTrabajados, setDiasTrabajados] = useState(0);
  const [actividad, setActividad] = useState<ActividadItem[]>([]);

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
        fecha: g.fecha as string,
        valor: g.valor as number,
        comentario: g.comentario as string | null,
      })),
      ...(gastosData ?? []).map((g) => ({
        tipo: "gasto" as const,
        fecha: g.fecha as string,
        valor: g.valor as number,
        comentario: g.comentario as string | null,
      })),
    ]
      .sort((a, b) => (a.fecha < b.fecha ? 1 : -1))
      .slice(0, 10);

    setActividad(actividadFinal);
  }

  return (
   
          <Container size="lg" py={10} px={5} style={{ width: "100%" }}>
            <Title order={2} mb={10}>
              Dashboard
            </Title>

            <Text size="lg" mb={30} style={{ color: "#868e96" }}>
              Resumen de las actividades del mes
            </Text>

            {/* MÉTRICAS */}
            <Grid gutter="lg" mb={40}>
              <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                <Card shadow="sm" padding="lg" radius="md" withBorder>
                  <Group justify="space-between" mb="xs">
                    <Text fw={500}>Ganancias del Mes</Text>
                    <IconTrendingUp size={20} color="green" />
                  </Group>
                  <Text size="xl" fw={700} style={{ color: "#40c057" }}>
                    ${gananciasMes.toLocaleString()}
                  </Text>
                </Card>
              </Grid.Col>

              <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                <Card shadow="sm" padding="lg" radius="md" withBorder>
                  <Group justify="space-between" mb="xs">
                    <Text fw={500}>Gastos del Mes</Text>
                    <IconTrendingDown size={20} color="red" />
                  </Group>
                  <Text size="xl" fw={700} style={{ color: "#fa5252" }}>
                    ${gastosMes.toLocaleString()}
                  </Text>
                </Card>
              </Grid.Col>

              <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                <Card shadow="sm" padding="lg" radius="md" withBorder>
                  <Group justify="space-between" mb="xs">
                    <Text fw={500}>Balance Neto</Text>
                    <IconActivity size={20} color="blue" />
                  </Group>
                  <Text size="xl" fw={700} style={{ color: "#228be6" }}>
                    ${balance.toLocaleString()}
                  </Text>
                </Card>
              </Grid.Col>

              <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                <Card shadow="sm" padding="lg" radius="md" withBorder>
                  <Group justify="space-between" mb="xs">
                    <Text fw={500}>Días Trabajados</Text>
                    <IconCalendar size={20} color="orange" />
                  </Group>
                  <Text size="xl" fw={700} style={{ color: "#fd7e14" }}>
                    {diasTrabajados}
                  </Text>
                </Card>
              </Grid.Col>
            </Grid>

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

            {/* LISTA DE ACTIVIDAD */}
            <Grid>
              <Grid.Col span={{ base: 12, md: 8 }}>
                <Stack gap="md">
                  {actividad.map((item, i) => (
                    <Paper key={i} withBorder p="md" radius="md">
                      <Group justify="space-between">
                        <Stack gap={0}>
                          <Text fw={500}>
                            {item.tipo === "ganancia" ? "Ganancia" : "Gasto"}
                          </Text>
                          <Text size="sm" c="dimmed">
                            {item.comentario || "Sin descripción"}
                          </Text>
                        </Stack>

                        <Badge
                          color={
                            item.tipo === "ganancia" ? "green" : "red"
                          }
                          variant="light"
                        >
                          {item.fecha}
                        </Badge>
                      </Group>

                      <Text
                        fw={700}
                        mt="sm"
                        style={{
                          color:
                            item.tipo === "ganancia"
                              ? "#40c057"
                              : "#fa5252",
                        }}
                      >
                        {item.tipo === "ganancia" ? "+ " : "- "}
                        ${item.valor.toLocaleString()}
                      </Text>
                    </Paper>
                  ))}
                </Stack>
              </Grid.Col>
            </Grid>
          </Container>
      
  );
}
