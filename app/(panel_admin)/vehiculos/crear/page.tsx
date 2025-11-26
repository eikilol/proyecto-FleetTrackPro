'use client';

import { useState } from "react";
import { supabase } from "@/supabase/client";
import { 
  Container, 
  Title, 
  TextInput, 
  Button, 
  NumberInput,
  Grid,
  Group,
  Card,
  Text,
  Stack,
  Select,
  Divider,
  Badge
} from "@mantine/core";
import { useRouter } from "next/navigation";
import { 
  IconCar, 
  IconCheck, 
 
  IconCalendar,
  IconDeviceFloppy
} from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";


// Definir interfaz para el formulario
interface VehiculoForm {
  placa: string;
  marca: string;
  modelo: string;
  ano: string;
  soat: string;
  tecno: string;
  estado: string;
}

export default function CrearVehiculoPage() {
  const router = useRouter();

  const [form, setForm] = useState<VehiculoForm>({
    placa: "",
    marca: "",
    modelo: "",
    ano: "",
    soat: "",
    tecno: "",
    estado: "disponible"
  });

  const [loading, setLoading] = useState(false);

  const marcasVehiculos = [
    "Toyota", "Nissan", "Ford", "Chevrolet", "Hyundai", "Kia",
    "Mazda", "Honda", "Volkswagen", "BMW", "Mercedes-Benz", "Audi",
    "Renault", "Peugeot", "Citroën", "Mitsubishi", "Subaru", "Suzuki",
    "Volvo", "Jeep", "Fiat", "Dodge", "Chrysler", "Lexus", "Acura"
  ];

  const estadosVehiculo = [
    { value: "disponible", label: "Disponible", color: "green" },
    { value: "ocupado", label: "En servicio", color: "blue" },
    { value: "mantenimiento", label: "Mantenimiento", color: "orange" },
    { value: "inactivo", label: "Inactivo", color: "red" }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.from("vehiculos").insert([{
        placa: form.placa.trim().toUpperCase(),
        marca: form.marca.trim(),
        modelo: form.modelo.trim() || null,
        ano: form.ano ? Number(form.ano) : null,
        soat_fecha: form.soat ? new Date(form.soat).toISOString() : null,
        tecnomecanica_fecha: form.tecno ? new Date(form.tecno).toISOString() : null,
        estado: form.estado,
      }]);

      if (error) throw error;

      // Mostrar notificación de éxito
      notifications.show({
        title: "✅ Vehículo creado",
        message: `El vehículo ${form.placa.toUpperCase()} ha sido registrado exitosamente.`,
        color: "green",
        icon: <IconCheck size={18} />,
      });

      // Redirigir después de un breve delay
      setTimeout(() => {
        router.push("/admin");
      }, 1500);

    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "No se pudo crear el vehículo";
      notifications.show({
        title: "❌ Error",
        message: errorMessage,
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  };

  const getCurrentYear = () => new Date().getFullYear();

  return (
    <Container size={800} py="md">
      {/* Header */}
      <Group justify="space-between" mb="xl">
        <div>
         
          <Title order={2} style={{ color: "#2C2E33" }}>
            Registrar Nuevo Vehículo
          </Title>
          <Text c="dimmed" size="lg">
            Completa la información del vehículo para agregarlo a la flota
          </Text>
        </div>
        <IconCar size={48} color="#228be6" />
      </Group>

      <Grid>
        <Grid.Col span={{ base: 12, lg: 8 }}>
          <Card withBorder shadow="sm" radius="md">
            <Card.Section withBorder p="lg" bg="blue.0">
              <Group>
                <IconCar size={24} color="#228be6" />
                <div>
                  <Text fw={600} size="lg">
                    Información del Vehículo
                  </Text>
                  <Text size="sm" c="dimmed">
                    Datos básicos del vehículo
                  </Text>
                </div>
              </Group>
            </Card.Section>

            <form onSubmit={handleSubmit}>
              <Stack p="lg">
                <Grid>
                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <TextInput
                      label="Placa"
                      placeholder="ABC-123"
                      value={form.placa}
                      onChange={(e) => setForm({ ...form, placa: e.currentTarget.value })}
                      required
                      withAsterisk
                      description="Número de placa del vehículo"
                    />
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <Select
                      label="Marca"
                      placeholder="Selecciona una marca"
                      data={marcasVehiculos}
                      value={form.marca}
                      onChange={(value) => setForm({ ...form, marca: value || "" })}
                      required
                      withAsterisk
                      searchable
                    />
                  </Grid.Col>
                </Grid>

                <Grid>
                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <TextInput
                      label="Modelo"
                      placeholder="Corolla, Civic, etc."
                      value={form.modelo}
                      onChange={(e) => setForm({ ...form, modelo: e.currentTarget.value })}
                      description="Modelo del vehículo (opcional)"
                    />
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <NumberInput
                      label="Año"
                      placeholder="2023"
                      value={form.ano ? Number(form.ano) : undefined}
                      onChange={(value) => setForm({ ...form, ano: String(value ?? "") })}
                      min={1900}
                      max={getCurrentYear() + 1}
                      description="Año de fabricación"
                    />
                  </Grid.Col>
                </Grid>

                <Grid>
                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <Select
                      label="Estado"
                      placeholder="Selecciona un estado"
                      data={estadosVehiculo.map(estado => ({
                        value: estado.value,
                        label: estado.label
                      }))}
                      value={form.estado}
                      onChange={(value) => setForm({ ...form, estado: value || "disponible" })}
                      required
                    />
                  </Grid.Col>
                  {/* Se eliminó el Grid.Col del color */}
                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    {/* Espacio vacío o puedes agregar otro campo aquí si lo necesitas */}
                  </Grid.Col>
                </Grid>

                <Divider my="sm" />

                {/* Sección de Documentos */}
                <Card.Section withBorder p="lg" bg="gray.0">
                  <Group>
                    <IconCalendar size={20} color="#868e96" />
                    <div>
                      <Text fw={600}>Documentos del Vehículo</Text>
                      <Text size="sm" c="dimmed">
                        Fechas de vencimiento de documentos
                      </Text>
                    </div>
                  </Group>
                </Card.Section>

                <Grid>
                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <TextInput
                      label="SOAT - Fecha de Vencimiento"
                      type="date"
                      value={form.soat}
                      onChange={(e) => setForm({ ...form, soat: e.currentTarget.value })}
                      description="Fecha de vencimiento del SOAT"
                    />
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <TextInput
                      label="Tecnomecánica - Fecha de Vencimiento"
                      type="date"
                      value={form.tecno}
                      onChange={(e) => setForm({ ...form, tecno: e.currentTarget.value })}
                      description="Fecha de vencimiento de la revisión tecnomecánica"
                    />
                  </Grid.Col>
                </Grid>

                <Button 
                  fullWidth 
                  size="lg" 
                  type="submit" 
                  loading={loading}
                  leftSection={<IconDeviceFloppy size={20} />}
                  mt="xl"
                >
                  {loading ? "Guardando..." : "Registrar Vehículo"}
                </Button>
              </Stack>
            </form>
          </Card>
        </Grid.Col>

        {/* Panel Lateral de Información */}
        <Grid.Col span={{ base: 12, lg: 4 }}>
          <Stack>
            <Card withBorder shadow="sm" radius="md">
              <Card.Section withBorder p="lg" bg="green.0">
                <Text fw={600}>Resumen</Text>
              </Card.Section>
              <Stack p="lg" gap="sm">
                <Group justify="space-between">
                  <Text size="sm" c="dimmed">Placa:</Text>
                  <Text fw={500}>{form.placa || "—"}</Text>
                </Group>
                <Group justify="space-between">
                  <Text size="sm" c="dimmed">Marca:</Text>
                  <Text fw={500}>{form.marca || "—"}</Text>
                </Group>
                <Group justify="space-between">
                  <Text size="sm" c="dimmed">Modelo:</Text>
                  <Text fw={500}>{form.modelo || "—"}</Text>
                </Group>
                <Group justify="space-between">
                  <Text size="sm" c="dimmed">Año:</Text>
                  <Text fw={500}>{form.ano || "—"}</Text>
                </Group>

                <Group justify="space-between">
                  <Text size="sm" c="dimmed">Estado:</Text>
                  <Badge 
                    color={estadosVehiculo.find(e => e.value === form.estado)?.color || "gray"}
                    size="sm"
                  >
                    {estadosVehiculo.find(e => e.value === form.estado)?.label || "Disponible"}
                  </Badge>
                </Group>
              </Stack>
            </Card>

            
          </Stack>
        </Grid.Col>
      </Grid>
    </Container>
  );
}
