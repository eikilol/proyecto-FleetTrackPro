"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/supabase/client";
import { Button, Select, Container, Paper, Title } from "@mantine/core";

interface Vehiculo {
  id: string;
  placa: string;
}

interface Usuario {
  id: string;
  nombre: string;
  rol: string;
}

export default function AsignarVehiculo() {
  const [vehiculos, setVehiculos] = useState<Vehiculo[]>([]);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [vehiculoId, setVehiculoId] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data: cars } = await supabase.from("vehiculos").select("*");

      const { data: users } = await supabase
        .from("profiles")
        .select("id, nombre, rol")
        .eq("rol", "usuario"); // 👈 Solo taxistas

      setVehiculos(cars || []);
      setUsuarios(users || []);
    };

    fetchData();
  }, []);

  const handleAssign = async () => {
    if (!vehiculoId || !userId) {
      alert("Debe seleccionar vehículo y conductor");
      return;
    }

    const { error } = await supabase.from("asignaciones").insert([
      {
        vehiculo_id: vehiculoId,
        user_id: userId
      }
    ]);

    if (error) {
      alert("Error asignando: " + error.message);
      return;
    }

    alert("Vehículo asignado correctamente");
  };

  return (
    <Container size={500} py={40}>
      <Title order={2} mb={20}>Asignar Vehículo</Title>

      <Paper p={30} withBorder shadow="md">
        <Select
          label="Vehículo"
          data={vehiculos.map((v) => ({ value: v.id, label: v.placa }))}
          onChange={setVehiculoId}
          required
        />

        <Select
          mt="md"
          label="Conductor "
          data={usuarios.map((u) => ({ value: u.id, label: u.nombre }))}
          onChange={setUserId}
          required
        />

        <Button fullWidth mt="lg" onClick={handleAssign}>
          Asignar
        </Button>
      </Paper>
    </Container>
  );
}
