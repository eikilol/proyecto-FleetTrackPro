'use client';

import { Container, Title, Paper, List, Loader, Center } from "@mantine/core";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/supabase/client";

// ⚠️ Aquí simulo datos, en un caso real vendrían de una base de datos
const gananciasEjemplo = [
  { id: 1, valor: 50000 },
  { id: 2, valor: 40000 },
  { id: 3, valor: 70000 },
];

export default function AdminPage() {
  const [ganancias, setGanancias] = useState<{ id: number; valor: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuthAndRole = async () => {
      try {
        console.log("🔍 Verificando autenticación en admin...");
        
        // Obtener usuario
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        
        if (userError) {
          console.error("Error obteniendo usuario:", userError);
          router.push("/login");
          return;
        }

        if (!user) {
          console.log("❌ No hay usuario, redirigiendo a login");
          router.push("/login");
          return;
        }

        console.log("✅ Usuario autenticado:", user.email);
        
        // Verificar rol
        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("rol")
          .eq("id", user.id)
          .single();

        if (profileError || !profile) {
          console.error("Error obteniendo perfil:", profileError);
          router.push("/login");
          return;
        }

        console.log("📊 Rol del usuario:", profile.rol);

        if (profile.rol !== "admin") {
          console.log("🚫 Usuario no es admin, redirigiendo a /usuario");
          router.push("/usuario");
          return;
        }

        console.log("✅ Acceso autorizado a admin");
        
        // Si pasa todas las verificaciones, cargar los datos
        setGanancias(gananciasEjemplo);
        setLoading(false);

      } catch (error) {
        console.error("Error en verificación:", error);
        router.push("/login");
      }
    };

    checkAuthAndRole();
  }, [router]);

  // Mostrar loading mientras se verifica
  if (loading) {
    return (
      <Center style={{ height: '100vh' }}>
        <Loader size="lg" />
        <div style={{ marginLeft: '10px' }}>Verificando acceso...</div>
      </Center>
    );
  }

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
        
        {/* Botón para cerrar sesión */}
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <button 
            onClick={async () => {
              await supabase.auth.signOut();
              router.push('/login');
            }}
            style={{
              padding: '10px 20px',
              backgroundColor: '#f56565',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Cerrar Sesión
          </button>
        </div>
      </Paper>
    </Container>
  );
}