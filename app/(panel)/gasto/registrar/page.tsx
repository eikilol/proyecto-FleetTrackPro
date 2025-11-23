"use client";

import { useState } from "react";
import { supabase } from "@/supabase/client";
import {
  TextInput,
  Button,
  Title,
  Textarea,
  Select,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useRouter } from "next/navigation";

export default function RegistrarGasto() {
  const router = useRouter();

  const [fecha, setFecha] = useState<Date | null>(null);
  const [tipo, setTipo] = useState<string | null>(null);
  const [valor, setValor] = useState<string>("");
  const [comentario, setComentario] = useState<string>("");

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
      return;
    }

    const { error } = await supabase.from("gastos").insert({
      fecha: fecha.toISOString().slice(0, 10),
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
    router.push("/panel"); // o a la ruta que quieras
  }

  return (
    <div className="w-full p-6 md:p-10">
      <div className="bg-white p-6 rounded-xl shadow-md max-w-2xl mx-auto">

        <Title order={2} className="mb-2 flex items-center gap-2">
          Nuevo Gasto o Evento
        </Title>
        <p className="text-gray-500 mb-5">
          Completa el formulario para registrar gastos o días especiales
        </p>

        {/* Fecha */}
        <DatePickerInput
          label="Fecha *"
          placeholder="Selecciona una fecha"
          value={fecha}
        onChange={(value) => setFecha(new Date(value || ''))}
          className="mb-4"
          required
        />

        {/* Tipo */}
        <Select
          label="Tipo de gasto o evento *"
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
          className="mb-4"
          required
        />

        {/* Valor */}
        <TextInput
          label="Valor (COP)"
          placeholder="$00,000"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
          className="mb-4"
          required
        />

        {/* Descripción */}
        <Textarea
          label="Descripción"
          placeholder="Ej: llenado de tanque completo, cambio de aceite..."
          value={comentario}
          onChange={(e) => setComentario(e.target.value)}
          className="mb-6"
        />

        {/* Botón */}
        <Button
          fullWidth
          onClick={handleSubmit}
          loading={loading}
          className="bg-blue-600 text-white mt-2"
        >
          Guardar Registro
        </Button>
      </div>
    </div>
  );
}
