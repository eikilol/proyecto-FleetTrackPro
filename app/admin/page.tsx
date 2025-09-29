'use client';

import { Container, Title, Paper, List } from "@mantine/core";
import { useState, useEffect } from "react";

// ⚠️ Aquí simulo datos, en un caso real vendrían de una base de datos
const gananciasEjemplo = [
  { id: 1, valor: 50000 },
  { id: 2, valor: 40000 },
  { id: 3, valor: 70000 },
];

export default function AdminPage() {
  const [ganancias, setGanancias] = useState<{ id: number; valor: number }[]>([]);

  useEffect(() => {
    // Simulamos que cargamos las ganancias
    setGanancias(gananciasEjemplo);
  }, []);

  return (
    <Container size={600} py={50}>
      <Title order={2} ta="center" mb="lg">
        Panel de Administrador
      </Title>
      <Paper withBorder shadow="md" p={30} radius="md">
        <h3>Ganancias registradas:</h3>
        <List spacing="sm" size="sm" center>
          {ganancias.map((g) => (
            <List.Item key={g.id}>💰 ${g.valor}</List.Item>
          ))}
        </List>
      </Paper>
    </Container>
  );
}
