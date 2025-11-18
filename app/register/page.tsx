"use client";

import { useState } from "react";
import { supabase } from "@/supabase/client";
import { useRouter } from "next/navigation";
import { Button, TextInput, PasswordInput, Paper, Container, Title, Divider } from "@mantine/core";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nombre, setNombre] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1️⃣ CREAR EL USUARIO EN SUPABASE AUTH
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: email.trim(),
        password: password.trim(),
        options: {
          data: {
            nombre: nombre.trim(),
          }
        }
      });

      if (signUpError) {
        alert("❌ Error al registrar usuario: " + signUpError.message);
        return;
      }

      const user = signUpData.user;
             console.log("user", user)
      if (!user) {
        alert("⚠️ No se pudo crear el usuario.");
        return;
      }

      // 2️⃣ INSERTAR PERFIL EN LA TABLA PROFILES
      const { error: profileError } = await supabase.from("profiles").insert([
        {
          id: user.id,
          nombre: nombre.trim(),
          email: email.trim(),
          rol: "usuario", // rol predeterminado
        },
      ]);

      if (profileError) {
        alert("❌ Error al crear perfil: " + profileError.message);
        return;
      }

      alert("✅ Registro exitoso. Revisa tu correo para confirmar tu cuenta.");
      router.push("/login");
    } catch (error) {
      console.error("Error durante el registro:", error);
      alert("❌ Error inesperado durante el registro.");
    } finally {
      setLoading(false);
    }
  };

  // INICIO CON GOOGLE
  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { 
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          }
        },
      });

      if (error) {
        alert("❌ Error al iniciar sesión con Google: " + error.message);
      }
      // El resto del flujo se maneja en /auth/callback
    } catch (error) {
      console.error("Error con Google login:", error);
      alert("❌ Error inesperado con Google.");
    }
  };

  return (
    <Container size={420} py={80}>
      <Title order={2} ta="center" mb="md">Crear Cuenta</Title>

      <Paper withBorder shadow="md" p={30} radius="md">
        <form onSubmit={handleRegister}>
          <TextInput
            label="Nombre"
            placeholder="Tu nombre"
            value={nombre}
            type="nombre"
            onChange={(e) => setNombre(e.currentTarget.value)}
            required
          />

          <TextInput
            label="Correo"
            placeholder="tu@correo.com"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
            required
            mt="md"
          />

          <PasswordInput
            label="Contraseña"
            placeholder="******"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
            required
            mt="md"
          />

          <Button fullWidth mt="xl" type="submit" loading={loading}>
            Registrarse
          </Button>
        </form>

        <Divider my="md" label="O" labelPosition="center" />

        <Button
          fullWidth
          variant="outline"
          onClick={handleGoogleLogin}
        >
          Registrarse con Google
        </Button>
      </Paper>
    </Container>
  );
}