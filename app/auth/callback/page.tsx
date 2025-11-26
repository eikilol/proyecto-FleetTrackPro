"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/supabase/client";
import { Container, Paper, Text, Loader, Stack } from "@mantine/core";

export default function CallbackPage() {
const [status, setStatus] = useState("Verificando autenticación...");

useEffect(() => {
const handleAuthCallback = async () => {
try {
// 1. Esperar a que Supabase procese el callback
await new Promise((resolve) => setTimeout(resolve, 1000));


    // 2. Obtener el usuario autenticado
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    if (userError || !user) {
      console.error("Error al obtener usuario:", userError);
      setStatus("Error de autenticación. Redirigiendo...");
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
      return;
    }

    console.log(" Usuario autenticado:", user.email);
    setStatus("Usuario autenticado. Verificando perfil...");

    // 3. Consultar o crear perfil (corrección aquí)
    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    // Perfil que podemos modificar
    let profile = profileData;

    // Si no existe el perfil, crearlo
    if (profileError || !profile) {
      console.log(" Creando perfil para:", user.email);
      setStatus("Creando perfil...");

      const { data: newProfile, error: insertError } = await supabase
        .from("profiles")
        .insert([
          {
            id: user.id,
            name:
              user.user_metadata?.full_name ||
              user.email?.split("@")[0] ||
              "Usuario",
            email: user.email,
            rol: "usuario",
          },
        ])
        .select()
        .single();

      if (insertError) {
        console.error(" Error al crear perfil:", insertError);
        setStatus(
          "Error al crear perfil. Redirigiendo a selección de rol..."
        );
        setTimeout(() => {
          window.location.href = "/seleccionar-rol";
        }, 2000);
        return;
      }

      profile = newProfile;
    }

    console.log(" Perfil encontrado:", profile);

    // 4. Redirigir según el rol
    setStatus("Redirigiendo...");

    await new Promise((resolve) => setTimeout(resolve, 500));

    if (profile.rol === "admin") {
      console.log("🔄 Redirigiendo a Admin");
      window.location.href = "/admin";
    } else if (profile.rol === "usuario") {
      console.log("🔄 Redirigiendo a Usuario");
      window.location.href = "/usuario";
    } else {
      console.log("🔄 Sin rol definido, redirigiendo a selección");
      window.location.href = "/seleccionar-rol";
    }
  } catch (error) {
    console.error(" Error inesperado:", error);
    setStatus("Error inesperado. Redirigiendo al login...");
    setTimeout(() => {
      window.location.href = "/login";
    }, 2000);
  }
};

handleAuthCallback();


}, []);

return ( <Container size={420} py={80}> <Paper withBorder shadow="md" p={50} radius="md"> <Stack align="center" gap="md"> <Loader size="lg" /> <Text size="lg" fw={600} ta="center">
{status} </Text> <Text size="sm" c="dimmed" ta="center">
Esto puede tardar unos segundos </Text> </Stack> </Paper> </Container>
);
}
