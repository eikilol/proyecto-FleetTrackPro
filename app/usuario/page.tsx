'use client';

import { useState } from "react";
import { Container, Title, Paper, TextInput, Button } from "@mantine/core";

export default function UsuarioPage() {
  const [ganancia, setGanancia] = useState("");
  const [mensajes, setMensajes] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (ganancia.trim() === "") return;
    setMensajes([...mensajes, `💰 Ganancia registrada: $${ganancia}`]);
    setGanancia("");
  };

  return (
    <Container size={500} py={50}>
      <Title order={2} ta="center" mb="lg">
        Ingresar Ganancia
      </Title>
      <Paper withBorder shadow="md" p={30} radius="md">
        <form onSubmit={handleSubmit}>
          <TextInput
            label="Ganancia"
            placeholder="Ej: 50000"
            value={ganancia}
            onChange={(e) => setGanancia(e.currentTarget.value)}
            required
          />
          <Button type="submit" fullWidth mt="md">
            Guardar
          </Button>
        </form>
      </Paper>

      <div style={{ marginTop: "20px" }}>
        {mensajes.map((m, i) => (
          <p key={i}>{m}</p>
        ))}
      </div>
    </Container>
  );
}
