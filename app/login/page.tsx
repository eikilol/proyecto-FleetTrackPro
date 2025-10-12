'use client';

import { useState } from "react";
import { Container, Paper, TextInput, PasswordInput, Button, Title, Text, Group } from "@mantine/core";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Normalizamos el correo (quita espacios y pasa a minúsculas)
    const correo = email.trim().toLowerCase();
    const clave = password.trim();

    if (correo === "admin@test.com" && clave === "123456") {
      router.push("/admin");
    } 
    else if (correo === "user@test.com" && clave === "123456") {
      router.push("/usuario");
    } 
    else {
      alert("❌ Usuario o contraseña incorrectos");
    }
  };

  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
    <Button
  variant="filled"
  color="blue"
  radius="md"
  style={{
    backgroundColor: "#1d8ef2", // azul brillante
    color: "white",
    fontWeight: "bold",
    borderRadius: "8px",
    padding: "8px 20px",
    position: "absolute",
    top: "20px",
    left: "20px",
  }}
  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#1479d6")} // hover
  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#1d8ef2")}
  onClick={() => router.push("/")}
>
  Volver al menú principal
</Button>


      <Container size={420} py={80}>
        <Title order={2} ta="center" mb="md">
          Iniciar Sesión
        </Title>
        
        <Paper withBorder shadow="md" p={30} radius="md">
          <form onSubmit={handleSubmit}>
            <TextInput
              label="Correo electrónico"
              placeholder="tu@correo.com"
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
              required
            />
            <PasswordInput
              label="Contraseña"
              placeholder="******"
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
              required
              mt="md"
            />
            <Group justify="space-between" mt="md" mb="xs">
              <Text size="sm" c="dimmed">
                ¿No tienes cuenta? <a href="#"  onClick={() => router.push('/register')}>Regístrate</a>
              </Text>
            </Group>
            <Button fullWidth mt="xl" type="submit">
              Ingresar
            </Button>
          </form>
        </Paper>
      </Container>
    </div>
  );
}
