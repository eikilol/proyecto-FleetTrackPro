"use client";

import { useState } from "react";
import { supabase } from "@/supabase/client";
import { useRouter } from "next/navigation";
import {
  Button,
  TextInput,
  PasswordInput,
  Paper,
  Container,
  Title,
  Text,
  Group,
  Divider
} from "@mantine/core";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);

    try {
      // 1. LOGIN
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password.trim(),
      });

      if (error) {
        alert("❌ Usuario o contraseña incorrectos: " + error.message);
        setLoading(false);
        return;
      }

      if (!data.user) {
        alert("❌ No se pudo obtener el usuario");
        setLoading(false);
        return;
      }

      console.log("✅ Login exitoso:", data.user.email);

      // 2. Sincronizar cookies
      await supabase.auth.getSession();

      // 3. Verificamos si ya tiene perfil
      const { data: profile } = await supabase
        .from("profiles")
        .select("rol")
        .eq("id", data.user.id)
        .single();

      // 4. Si no existe perfil → crearlo
      if (!profile) {
        await supabase.from("profiles").insert([
          { id: data.user.id, rol: "usuario" }
        ]);
      }

      // 5. Redirigir a una pantalla temporal
      // El middleware decidirá si va a /admin o /usuario
      router.push("/loading");

    } catch (error) {
      console.error("Error durante el login:", error);
      alert("❌ Error durante el inicio de sesión");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      });

      if (error) alert("❌ Error al iniciar sesión con Google: " + error.message);
    } catch (error) {
      console.error(error);
      alert("❌ Error inesperado con Google");
    }
  };

  return (
    <Container size={420} py={80}>
      <Title order={2} ta="center" mb="md">Iniciar Sesión</Title>

      <Paper withBorder shadow="md" p={30} radius="md">
        <form onSubmit={handleSubmit}>
          <TextInput
            label="Correo electrónico"
            placeholder="tu@correo.com"
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
            required
            type="email"
          />

          <PasswordInput
            label="Contraseña"
            placeholder="******"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
            required
            mt="md"
          />

          <Group justify="space-between" mt="md">
            <Text size="sm" c="dimmed">
              ¿No tienes cuenta?{" "}
              <Text
                component="span"
                style={{
                  cursor: "pointer",
                  color: "blue",
                  textDecoration: "underline",
                }}
                onClick={() => router.push("/register")}
              >
                Regístrate
              </Text>
            </Text>
          </Group>

          <Button fullWidth mt="xl" type="submit" loading={loading}>
            {loading ? "Ingresando..." : "Ingresar"}
          </Button>
        </form>

        <Divider my="md" label="O" labelPosition="center" />

        <Button fullWidth variant="outline" onClick={handleGoogleLogin}>
          Iniciar sesión con Google
        </Button>
      </Paper>
    </Container>
  );
}
