"use client";

import { useState } from "react";
import { supabase } from "@/supabase/client";

import {
  Container,
  Paper,
  Title,
  TextInput,
  Textarea,
  Button,
  Select,
  Group,
} from "@mantine/core";
import { useRouter } from "next/navigation";

export default function RegistrarGasto() {
  const router = useRouter();

  const [fecha, setFecha] = useState("");
  const [tipo, setTipo] = useState<string | null>(null);
  const [valor, setValor] = useState("");
  const [comentario, setComentario] = useState("");

  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (!fecha || !tipo || !valor) {
      alert("Todos los campos obligatorios deben estar completos.");
      return;
    }

    setLoading(true);

    const user = (await supabase.auth.getUser()).data.user;
    if (!user) {
      alert("No se encontró usuario.");
      setLoading(false);
      return;
    }

    const { error } = await supabase.from("gastos").insert({
      fecha: fecha, // ya viene yyyy-mm-dd del input
      tipo,
      valor: Number(valor),
      comentario: comentario || null,
      user_id: user.id,
    });

    setLoading(false);

    if (error) {
      console.error(error);
      alert("Error al guardar el gasto.");
      return;
    }

    alert("Gasto registrado correctamente.");
    router.push("/gasto/registrar");
  }

  return (
    <Container size="sm" mt={40}>
      <Title order={2} mb={20}>Nuevo Gasto o Evento</Title>

      <Paper shadow="xs" radius="md" p="lg">

        {/* Fecha */}
        <TextInput
          type="date"
          label="Fecha "
          placeholder="Selecciona la fecha"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          required
          mb="md"
        />

        {/* Tipo */}
        <Select
          label="Tipo de gasto o evento "
          placeholder="Selecciona el tipo"
          value={tipo}
          onChange={setTipo}
          data={[
            { value: "combustible", label: "Combustible" },
            { value: "mantenimiento", label: "Mantenimiento" },
            { value: "lavado", label: "Lavado" },
            { value: "imprevisto", label: "Imprevisto" },
            { value: "otro", label: "Otro" },
          ]}
          required
          mb="md"
        />

        {/* Valor */}
        <TextInput
          type="number"
          label="Valor (COP)"
          placeholder="50000"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
          required
          mb="md"
        />

        {/* Comentario */}
        <Textarea
          label="Descripción"
          placeholder="Ej: tanque lleno, cambio de aceite..."
          value={comentario}
          onChange={(e) => setComentario(e.target.value)}
          autosize
          mb="md"
        />

        {/* Botón */}
        <Group justify="flex-end">
          <Button
            loading={loading}
            onClick={handleSubmit}
            size="md"
          >
            Guardar Registro
          </Button>
        </Group>

      </Paper>
    </Container>
  );
}
