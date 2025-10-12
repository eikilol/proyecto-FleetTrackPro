"use client";

import { useState } from "react";
import {
  Container,
  Paper,
  TextInput,
  PasswordInput,
  Button,
  Title,
  Radio,
  Group,
  Stack,
} from "@mantine/core";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rol, setRol] = useState("taxista");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!nombre.trim() || !email.trim() || !password.trim()) {
      alert("Por favor completa todos los campos");
      return;
    }

    alert(`✅ Usuario registrado:
Nombre: ${nombre}
Email: ${email}
Rol: ${rol}`);

    router.push("/"); // Vuelve al inicio
  };

  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
      <Button
        variant="filled"
        color="blue"
        radius="md"
        style={{
          backgroundColor: "#1d8ef2",
          color: "white",
          fontWeight: "bold",
          borderRadius: "8px",
          padding: "8px 20px",
          position: "absolute",
          top: "20px",
          left: "20px",
        }}
        onClick={() => router.push("/")}
      >
        Volver al menú principal
      </Button>

      <Container size={420} py={80}>
        <Title order={2} ta="center" mb="md">
          Registrarse
        </Title>

        <Paper withBorder shadow="md" p={30} radius="md">
          <form onSubmit={handleSubmit}>
            <Stack>
              <TextInput
                label="Nombre Completo"
                placeholder="Juan Pérez"
                value={nombre}
                onChange={(e) => setNombre(e.currentTarget.value)}
                required
              />
              <TextInput
                label="Email"
                placeholder="tu@email.com"
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
              />
              <Radio.Group value={rol} onChange={setRol}>
                <Stack>
                  <Radio value="taxista" label="Taxista" />
                  <Radio value="administrador" label="Administrador" />
                </Stack>
              </Radio.Group>

              <Button
                type="submit"
                fullWidth
                mt="md"
                style={{
                  backgroundColor: "#1d8ef2",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                Crear cuenta
              </Button>
            </Stack>
          </form>
        </Paper>
      </Container>
    </div>
  );
}
