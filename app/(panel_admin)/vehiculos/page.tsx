"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/supabase/client";
import {
  Container,
  Title,
  Card,
  Table,
  Badge,
  Group,
  Text,
  TextInput,
  Select,
  ActionIcon,
  Stack,
  Paper,
  Button,
  Modal,
  Textarea,
} from "@mantine/core";
import {
  IconSearch,
  IconFilter,
  IconCar,
  IconEdit,
  IconTrash,
  IconRefresh,
  IconPlus,
} from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";

interface Vehiculo {
  id: string;
  placa: string;
  marca: string;
  modelo?: string;
  ano: number;
  estado: string;
  color?: string;
  soat_fecha?: string;
  tecnomecanica_fecha?: string;
  created_at: string;
  observaciones?: string;
}

// Definir el tipo para las actualizaciones
interface UpdateVehiculo {
  estado: string;
  observaciones: string | null;
  soat_fecha?: string | null;
  tecnomecanica_fecha?: string | null;
  updated_at: string;
}

export default function VehiculosPage() {
  const [vehiculos, setVehiculos] = useState<Vehiculo[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [selectedVehiculo, setSelectedVehiculo] = useState<Vehiculo | null>(null);
  const [editForm, setEditForm] = useState({
    soat_fecha: "",
    tecnomecanica_fecha: "",
    estado: "",
    observaciones: ""
  });

  useEffect(() => {
    cargarVehiculos();
  }, []);

  const cargarVehiculos = async () => {
    try {
      setLoading(true);
      console.log("Cargando vehículos...");

      const { data, error } = await supabase
        .from("vehiculos")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error de Supabase:", error);
        throw new Error(`Error al cargar vehículos: ${error.message}`);
      }

      console.log("Vehículos cargados:", data?.length);
      setVehiculos(data || []);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error completo:", error);
        notifications.show({
          title: "Error",
          message: error.message || "No se pudieron cargar los vehículos",
          color: "red",
        });
      } else {
        console.error("Error desconocido", error);
      }
    } finally {
      setLoading(false);
    }
  };

  const abrirModalEdicion = (vehiculo: Vehiculo) => {
    setSelectedVehiculo(vehiculo);
    setEditForm({
      soat_fecha: vehiculo.soat_fecha ? formatDateForInput(vehiculo.soat_fecha) : "",
      tecnomecanica_fecha: vehiculo.tecnomecanica_fecha ? formatDateForInput(vehiculo.tecnomecanica_fecha) : "",
      estado: vehiculo.estado,
      observaciones: vehiculo.observaciones || ""
    });
    setEditModal(true);
  };

  const formatDateForInput = (dateString: string) => {
    try {
      return new Date(dateString).toISOString().split('T')[0];
    } catch {
      return "";
    }
  };

  const guardarCambios = async () => {
    if (!selectedVehiculo) return;

    try {
      setSaving(true);
      console.log("Guardando cambios para vehículo:", selectedVehiculo.id);

      // Preparar datos para actualizar
      const updates: UpdateVehiculo = {
        estado: editForm.estado,
        observaciones: editForm.observaciones || null,
        updated_at: new Date().toISOString(),
        soat_fecha: editForm.soat_fecha ? 
          new Date(editForm.soat_fecha + 'T00:00:00').toISOString() : 
          null,
        tecnomecanica_fecha: editForm.tecnomecanica_fecha ? 
          new Date(editForm.tecnomecanica_fecha + 'T00:00:00').toISOString() : 
          null
      };

      console.log("Datos a actualizar:", updates);

      const { error } = await supabase
        .from("vehiculos")
        .update(updates)
        .eq("id", selectedVehiculo.id);

      if (error) {
        console.error("Error de Supabase:", {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code
        });
        throw new Error(`Error al actualizar: ${error.message}`);
      }

      console.log("Vehículo actualizado exitosamente");

      notifications.show({
        title: "Éxito",
        message: "Vehículo actualizado correctamente",
        color: "green",
      });

      // Recargar los datos
      await cargarVehiculos();
      setEditModal(false);
      setSelectedVehiculo(null);

    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error al guardar:", error);
        notifications.show({
          title: "Error",
          message: error.message || "No se pudo actualizar el vehículo",
          color: "red",
        });
      } else {
        console.error("Error desconocido al guardar", error);
      }
    } finally {
      setSaving(false);
    }
  };

  // Filtrar vehículos
  const filteredVehiculos = vehiculos.filter((vehiculo) => {
    const matchesSearch =
      vehiculo.placa.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehiculo.marca.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (vehiculo.modelo && vehiculo.modelo.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus = statusFilter === "all" || vehiculo.estado === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const eliminarVehiculo = async () => {
    if (!selectedVehiculo) return;

    try {
      console.log("Eliminando vehículo:", selectedVehiculo.id);

      const { error } = await supabase
        .from("vehiculos")
        .delete()
        .eq("id", selectedVehiculo.id);

      if (error) {
        console.error("Error al eliminar:", error);
        throw new Error(`Error al eliminar: ${error.message}`);
      }

      notifications.show({
        title: "Éxito",
        message: "Vehículo eliminado correctamente",
        color: "green",
      });

      await cargarVehiculos();
      setDeleteModal(false);
      setSelectedVehiculo(null);

    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error al eliminar:", error);
        notifications.show({
          title: "Error",
          message: error.message || "No se pudo eliminar el vehículo",
          color: "red",
        });
      } else {
        console.error("Error desconocido al eliminar", error);
      }
    }
  };

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case "disponible":
        return "green";
      case "ocupado":
        return "blue";
      case "mantenimiento":
        return "orange";
      case "inactivo":
        return "red";
      default:
        return "gray";
    }
  };

  const getEstadoTexto = (estado: string) => {
    switch (estado) {
      case "disponible":
        return "Disponible";
      case "ocupado":
        return "En servicio";
      case "mantenimiento":
        return "Mantenimiento";
      case "inactivo":
        return "Inactivo";
      default:
        return estado;
    }
  };

  const formatFecha = (fecha: string) => {
    if (!fecha) return "No registrado";
    try {
      return new Date(fecha).toLocaleDateString("es-ES");
    } catch {
      return "Fecha inválida";
    }
  };

  return (
    <Container size="xl" py="md">
      {/* Header */}
      <Group justify="space-between" mb="xl">
        <div>
          <Title order={2} style={{ color: "#2C2E33" }}>
            Vehículos Registrados
          </Title>
          <Text c="dimmed" size="lg">
            Gestiona toda la flota de vehículos
          </Text>
        </div>
        <Group>
          <Button
            variant="light"
            leftSection={<IconRefresh size={16} />}
            onClick={cargarVehiculos}
            loading={loading}
          >
            Actualizar
          </Button>
          <Button
            leftSection={<IconPlus size={16} />}
            component="a"
            href="/admin/vehiculos/crear"
          >
            Agregar Vehículo
          </Button>
        </Group>
      </Group>

      {/* Filtros y Búsqueda */}
      <Card withBorder shadow="sm" radius="md" mb="md">
        <Group>
          <TextInput
            placeholder="Buscar por placa, marca, modelo..."
            leftSection={<IconSearch size={16} />}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ flex: 1 }}
          />
          <Select
            placeholder="Filtrar por estado"
            leftSection={<IconFilter size={16} />}
            value={statusFilter}
            onChange={(value) => setStatusFilter(value || "all")}
            data={[
              { value: "all", label: "Todos los estados" },
              { value: "disponible", label: "Disponible" },
              { value: "ocupado", label: "En servicio" },
              { value: "mantenimiento", label: "Mantenimiento" },
              { value: "inactivo", label: "Inactivo" },
            ]}
          />
        </Group>
      </Card>

      {/* Tabla de Vehículos */}
      <Card withBorder shadow="sm" radius="md">
        <Table.ScrollContainer minWidth={800}>
          <Table verticalSpacing="md" horizontalSpacing="lg">
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Vehículo</Table.Th>
                <Table.Th>Información</Table.Th>
                <Table.Th>Año</Table.Th>
                <Table.Th>Estado</Table.Th>
                <Table.Th>Documentos</Table.Th>
                <Table.Th>Acciones</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {filteredVehiculos.map((vehiculo) => (
                <Table.Tr key={vehiculo.id}>
                  <Table.Td>
                    <Group gap="sm">
                      <IconCar size={24} color="#228be6" />
                      <div>
                        <Text fw={600} size="lg">
                          {vehiculo.placa}
                        </Text>
                      </div>
                    </Group>
                  </Table.Td>
                  <Table.Td>
                    <div>
                      <Text fw={500}>
                        {vehiculo.marca} {vehiculo.modelo || ""}
                      </Text>
                      <Text size="sm" c="dimmed">
                        {vehiculo.modelo ? vehiculo.marca : "Modelo no especificado"}
                      </Text>
                    </div>
                  </Table.Td>
                  <Table.Td>
                    <Badge variant="light" color="blue">
                      {vehiculo.ano}
                    </Badge>
                  </Table.Td>
                  <Table.Td>
                    <Badge
                      color={getEstadoColor(vehiculo.estado)}
                      variant="filled"
                      size="lg"
                    >
                      {getEstadoTexto(vehiculo.estado)}
                    </Badge>
                  </Table.Td>
                  <Table.Td>
                    <Stack gap={4}>
                      <Text size="sm">
                        SOAT: {formatFecha(vehiculo.soat_fecha || "")}
                      </Text>
                      <Text size="sm">
                        Tecnomecánica: {formatFecha(vehiculo.tecnomecanica_fecha || "")}
                      </Text>
                    </Stack>
                  </Table.Td>
                  <Table.Td>
                    <Group gap={4}>
                      <ActionIcon
                        variant="subtle"
                        color="blue"
                        onClick={() => abrirModalEdicion(vehiculo)}
                      >
                        <IconEdit size={16} />
                      </ActionIcon>
                      <ActionIcon
                        variant="subtle"
                        color="red"
                        onClick={() => {
                          setSelectedVehiculo(vehiculo);
                          setDeleteModal(true);
                        }}
                      >
                        <IconTrash size={16} />
                      </ActionIcon>
                    </Group>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Table.ScrollContainer>

        {/* Estado vacío */}
        {filteredVehiculos.length === 0 && !loading && (
          <Paper p="xl" ta="center" mt="md">
            <IconCar size={48} color="#868e96" style={{ margin: "0 auto" }} />
            <Text c="dimmed" size="lg" mt="md">
              {searchTerm || statusFilter !== "all"
                ? "No se encontraron vehículos con los filtros aplicados"
                : "No hay vehículos registrados"}
            </Text>
            {(searchTerm || statusFilter !== "all") && (
              <Button
                variant="subtle"
                onClick={() => {
                  setSearchTerm("");
                  setStatusFilter("all");
                }}
                mt="md"
              >
                Limpiar filtros
              </Button>
            )}
          </Paper>
        )}

        {/* Loading state */}
        {loading && (
          <Paper p="xl" ta="center">
            <Text c="dimmed">Cargando vehículos...</Text>
          </Paper>
        )}
      </Card>

      {/* Estadísticas */}
      <Group mt="xl">
        <Card withBorder p="md" radius="md" style={{ flex: 1 }}>
          <Text size="sm" c="dimmed" mb={5}>
            Total de Vehículos
          </Text>
          <Text size="xl" fw={700}>
            {vehiculos.length}
          </Text>
        </Card>
        <Card withBorder p="md" radius="md" style={{ flex: 1 }}>
          <Text size="sm" c="dimmed" mb={5}>
            Disponibles
          </Text>
          <Text size="xl" fw={700} c="green">
            {vehiculos.filter((v) => v.estado === "disponible").length}
          </Text>
        </Card>
        <Card withBorder p="md" radius="md" style={{ flex: 1 }}>
          <Text size="sm" c="dimmed" mb={5}>
            En servicio
          </Text>
          <Text size="xl" fw={700} c="blue">
            {vehiculos.filter((v) => v.estado === "ocupado").length}
          </Text>
        </Card>
        <Card withBorder p="md" radius="md" style={{ flex: 1 }}>
          <Text size="sm" c="dimmed" mb={5}>
            En mantenimiento
          </Text>
          <Text size="xl" fw={700} c="orange">
            {vehiculos.filter((v) => v.estado === "mantenimiento").length}
          </Text>
        </Card>
      </Group>

      {/* Modal de edición */}
      <Modal
        opened={editModal}
        onClose={() => setEditModal(false)}
        title={`Editar Vehículo - ${selectedVehiculo?.placa}`}
        centered
        size="lg"
      >
        <Stack>
          <TextInput
            label="SOAT - Fecha de Vencimiento"
            type="date"
            value={editForm.soat_fecha}
            onChange={(e) => setEditForm({ ...editForm, soat_fecha: e.target.value })}
          />
          <TextInput
            label="Tecnomecánica - Fecha de Vencimiento"
            type="date"
            value={editForm.tecnomecanica_fecha}
            onChange={(e) => setEditForm({ ...editForm, tecnomecanica_fecha: e.target.value })}
          />
          <Select
            label="Estado del Vehículo"
            value={editForm.estado}
            onChange={(value) => setEditForm({ ...editForm, estado: value || "" })}
            data={[
              { value: "disponible", label: "Disponible" },
              { value: "ocupado", label: "En servicio" },
              { value: "mantenimiento", label: "Mantenimiento" },
              { value: "inactivo", label: "Inactivo" },
            ]}
            required
          />
          <Textarea
            label="Observaciones"
            placeholder="Notas adicionales sobre el vehículo..."
            value={editForm.observaciones}
            onChange={(e) => setEditForm({ ...editForm, observaciones: e.target.value })}
            rows={3}
          />

          <Group justify="flex-end" mt="md">
            <Button variant="light" onClick={() => setEditModal(false)}>
              Cancelar
            </Button>
            <Button onClick={guardarCambios} loading={saving}>
              Guardar Cambios
            </Button>
          </Group>
        </Stack>
      </Modal>

      {/* Modal de confirmación para eliminar */}
      <Modal
        opened={deleteModal}
        onClose={() => setDeleteModal(false)}
        title="Eliminar Vehículo"
        centered
      >
        <Stack>
          <Text>
            ¿Estás seguro de que quieres eliminar el vehículo con placa{" "}
            <strong>{selectedVehiculo?.placa}</strong>? Esta acción no se puede
            deshacer.
          </Text>
          <Group justify="flex-end" mt="md">
            <Button variant="light" onClick={() => setDeleteModal(false)}>
              Cancelar
            </Button>
            <Button color="red" onClick={eliminarVehiculo}>
              Eliminar
            </Button>
          </Group>
        </Stack>
      </Modal>
    </Container>
  );
}
