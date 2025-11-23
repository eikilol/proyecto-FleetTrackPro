'use client';

import { useState } from "react";
import { supabase } from "@/supabase/client";
import { 
  Container, 
  Paper, 
  Title, 
  TextInput,
  Textarea,
  Button,
  Group,
} from "@mantine/core";

export default function RegistrarGananciaPage() {

  const [fecha, setFecha] = useState("");
  const [valor, setValor] = useState("");
  const [comentario, setComentario] = useState("");
  const [loading, setLoading] = useState(false);

  const registrarGanancia = async () => {
    setLoading(true);

    // Obtener sesión
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    if (sessionError || !session) {
      alert("No hay usuario autenticado.");
      setLoading(false);
      return;
    }

    const user = session.user;

    // Insertar en tabla ganancias
    const { error } = await supabase.from("ganancias").insert({
      fecha: fecha,
      valor: Number(valor),
      comentario: comentario,
      user_id: user.id
    });

    setLoading(false);

    if (error) {
      console.error(error);
      alert("Error al registrar la ganancia.");
    } else {
      alert("¡Ganancia registrada con éxito!");
      setFecha("");
      setValor("");
      setComentario("");
    }
  };

  return (
    <Container size="sm" mt={40}>
      <Title order={2} mb={20}>Registrar Ganancia</Title>

      <Paper shadow="xs" radius="md" p="lg">

        <TextInput
          type="date"
          label="Fecha"
          placeholder="Selecciona una fecha"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          required
          mb="md"
        />

        <TextInput
          type="number"
          label="Valor de la ganancia (COP)"
          placeholder="150000"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
          required
          mb="md"
        />

        <Textarea
          label="Comentario (opcional)"
          placeholder="Ej: día con buena demanda…"
          value={comentario}
          onChange={(e) => setComentario(e.target.value)}
          autosize
          mb="md"
        />

        <Group justify="flex-end">
          <Button
            loading={loading}
            onClick={registrarGanancia}
            color="blue"
            size="md"
          >
            Guardar Ganancia
          </Button>
        </Group>

      </Paper>
    </Container>
  );
}
