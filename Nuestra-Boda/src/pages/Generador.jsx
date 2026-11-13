
import React, { useState } from "react";
import {
  Link2,
  Copy,
  Check,
  Users,
  UserRound,
  ShieldCheck,
  CalendarDays,
} from "lucide-react";

// ==========================================
// CONFIGURACIÓN - JET VAN / WEDLY
// ==========================================

// IMPORTANTE:
// Esta clave debe ser IDÉNTICA en Generador.jsx
// y ConfirmacionAsistencia.jsx.
// Cambia este valor por una frase aleatoria larga
// antes de generar las invitaciones definitivas.
// No la cambies después de distribuir enlaces.
const CLAVE_INVITACIONES =
  "JETVAN-WEDLY-2026-CAMBIAR-CLAVE-PRIVADA-8F2K9";

const COLORES = {
  azul: "#07182F",
  azulClaro: "#0A203B",
  dorado: "#D9B56D",
  doradoClaro: "#E8C67D",
  blanco: "#FFFFFF",
};

// ==========================================
// CIFRADO AES-GCM
// ==========================================

async function obtenerClave() {
  const bytes = new TextEncoder().encode(
    CLAVE_INVITACIONES
  );

  const hash = await crypto.subtle.digest(
    "SHA-256",
    bytes
  );

  return crypto.subtle.importKey(
    "raw",
    hash,
    { name: "AES-GCM" },
    false,
    ["encrypt"]
  );
}

function convertirBase64URL(bytes) {
  let binario = "";

  bytes.forEach((byte) => {
    binario += String.fromCharCode(byte);
  });

  return btoa(binario)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

async function crearId(nombre, pases) {
  const datos = {
    nombre,
    pases,
    version: 1,
  };

  const clave = await obtenerClave();

  const iv = crypto.getRandomValues(
    new Uint8Array(12)
  );

  const texto = new TextEncoder().encode(
    JSON.stringify(datos)
  );

  const cifrado = await crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv,
    },
    clave,
    texto
  );

  const resultado = new Uint8Array(
    iv.length + cifrado.byteLength
  );

  resultado.set(iv, 0);
  resultado.set(
    new Uint8Array(cifrado),
    iv.length
  );

  return convertirBase64URL(resultado);
}

// ==========================================
// COMPONENTE PRINCIPAL
// ==========================================

export default function Generador() {
  const [nombre, setNombre] = useState("");
  const [pases, setPases] = useState("1");

  const [link, setLink] = useState("");
  const [mensaje, setMensaje] = useState("");

  const [copiado, setCopiado] = useState("");
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  // ==========================================
  // GENERAR INVITACIÓN
  // ==========================================

  const generarLink = async () => {
    const nombreLimpio = nombre.trim();
    const numeroPases = Number(pases);

    setError("");
    setLink("");
    setMensaje("");

    if (!nombreLimpio) {
      setError("Escribe el nombre del colaborador.");
      return;
    }

    if (
      !Number.isInteger(numeroPases) ||
      numeroPases < 1 ||
      numeroPases > 100
    ) {
      setError(
        "Ingresa una cantidad de pases entre 1 y 100."
      );
      return;
    }

    setCargando(true);

    try {
      const id = await crearId(
        nombreLimpio,
        numeroPases
      );

      const url = new URL(
        "/",
        window.location.origin
      );

      url.searchParams.set("id", id);

      const enlace = url.toString();

      const textoPases =
        numeroPases === 1
          ? "1 pase"
          : `${numeroPases} pases`;

      const mensajeWhatsApp = [
        "🎉 *JET VAN | FIESTA DE FIN DE AÑO 2026*",
        "",
        `Estimado(a) ${nombreLimpio}:`,
        "",
        "Nos complace invitarte a nuestra celebración de fin de año, un espacio para reconocer el compromiso y los logros que hemos alcanzado juntos.",
        "",
        "📅 *Fecha:* Viernes 4 de diciembre de 2026",
        "🕑 *Hora:* 14:00 hrs.",
        "📍 *Lugar:* Salón Coronado, Polanco",
        "",
        `🎟️ *Pases asignados:* ${textoPases}`,
        "",
        "Consulta los detalles y confirma tu asistencia en el siguiente enlace:",
        "",
        enlace,
        "",
        "Será un gusto contar con tu presencia.",
        "",
        "*Jet Van · 2026*",
      ].join("\n");

      setLink(enlace);
      setMensaje(mensajeWhatsApp);
      setCopiado("");
    } catch (err) {
      console.error(err);
      setError(
        "No fue posible generar el enlace. Utiliza HTTPS o localhost."
      );
    } finally {
      setCargando(false);
    }
  };

  // ==========================================
  // COPIAR CONTENIDO
  // ==========================================

  const copiarTexto = async (texto, tipo) => {
    try {
      await navigator.clipboard.writeText(texto);
      setCopiado(tipo);
    } catch {
      setError(
        "No se pudo copiar automáticamente. Selecciona el texto y cópialo manualmente."
      );
    }
  };

  const limpiarResultado = () => {
    setLink("");
    setMensaje("");
    setCopiado("");
    setError("");
  };

  const inputClass =
    "w-full rounded-xl border border-[#D9B56D]/35 bg-[#06172E] px-5 py-4 text-white outline-none transition-colors placeholder:text-white/40 focus:border-[#E8C67D]";

  return (
    <main
      className="min-h-screen w-full bg-white px-5 py-12 sm:px-8 sm:py-20"
      style={{
        fontFamily: "'Montserrat', sans-serif",
      }}
    >
      <div className="mx-auto max-w-6xl">

        {/* ENCABEZADO */}
        <div className="mb-12 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#A48654]">
            Wedly · Jet Van 2026
          </p>

          <h1
            className="mt-5 text-4xl text-[#07182F] sm:text-6xl"
            style={{
              fontFamily:
                "'Cormorant Garamond', serif",
            }}
          >
            Generador de invitaciones
          </h1>

          <div className="mx-auto mt-6 h-px w-24 bg-[#D9B56D]" />

          <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-[#35404B]">
            Personaliza los enlaces de los colaboradores
            y asigna la cantidad de pases autorizados
            para la Fiesta de Fin de Año 2026.
          </p>
        </div>

        {/* CONTENIDO */}
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2">

          {/* FORMULARIO */}
          <section className="overflow-hidden rounded-[2rem] border border-[#D9B56D]/50 bg-[#07182F] p-6 text-white shadow-[0_20px_60px_rgba(0,0,0,0.15)] sm:p-10">

            <div className="mb-8 flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#D9B56D]/50 bg-[#D9B56D]/10">
                <ShieldCheck
                  size={26}
                  className="text-[#E8C67D]"
                />
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-[#E8C67D]">
                  Administración
                </p>
                <h2 className="mt-1 text-xl font-semibold">
                  Crear invitación
                </h2>
              </div>
            </div>

            {/* NOMBRE */}
            <div className="mb-6">
              <label
                htmlFor="generador-nombre"
                className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.15em] text-[#E8C67D]"
              >
                <UserRound size={17} />
                Nombre del colaborador
              </label>

              <input
                id="generador-nombre"
                type="text"
                maxLength={100}
                placeholder="Ej. Juan Pérez"
                value={nombre}
                onChange={(e) => {
                  setNombre(e.target.value);
                  limpiarResultado();
                }}
                className={inputClass}
              />
            </div>

            {/* PASES */}
            <div className="mb-7">
              <label
                htmlFor="generador-pases"
                className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.15em] text-[#E8C67D]"
              >
                <Users size={17} />
                Número de pases
              </label>

              <input
                id="generador-pases"
                type="number"
                min="1"
                max="100"
                step="1"
                value={pases}
                onChange={(e) => {
                  setPases(e.target.value);
                  limpiarResultado();
                }}
                className={inputClass}
              />

              <p className="mt-3 text-xs leading-5 text-white/60">
                Este será el máximo de personas que el
                colaborador podrá confirmar.
              </p>
            </div>

            {/* GENERAR */}
            <button
              type="button"
              onClick={generarLink}
              disabled={cargando}
              className="flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-[#C99A46] via-[#E8C67D] to-[#C99A46] px-5 py-4 font-semibold text-[#07182F] transition-transform hover:scale-[1.01] disabled:opacity-60"
            >
              <Link2 size={19} />
              {cargando
                ? "Generando enlace..."
                : "Generar invitación"}
            </button>

            {error && (
              <p
                role="alert"
                className="mt-5 text-sm text-[#F2D797]"
              >
                {error}
              </p>
            )}

            {/* RESULTADO */}
            {link && (
              <div className="mt-9 border-t border-[#D9B56D]/30 pt-8">

                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#E8C67D]">
                  Enlace personalizado
                </p>

                <div className="break-all rounded-xl border border-[#D9B56D]/25 bg-[#06172E] p-4 text-xs leading-6 text-white/80">
                  {link}
                </div>

                <button
                  type="button"
                  onClick={() =>
                    copiarTexto(link, "link")
                  }
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-[#D9B56D]/60 px-5 py-3 text-sm text-[#E8C67D] transition-colors hover:bg-[#D9B56D]/10"
                >
                  {copiado === "link" ? (
                    <Check size={18} />
                  ) : (
                    <Copy size={18} />
                  )}

                  {copiado === "link"
                    ? "Enlace copiado"
                    : "Copiar enlace"}
                </button>

                {/* MENSAJE */}
                <div className="mt-9">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#E8C67D]">
                    Mensaje para WhatsApp
                  </p>

                  <textarea
                    value={mensaje}
                    onChange={(e) => {
                      setMensaje(e.target.value);
                      setCopiado("");
                    }}
                    rows={14}
                    className="w-full resize-y rounded-xl border border-[#D9B56D]/35 bg-[#06172E] p-4 text-sm leading-6 text-white outline-none focus:border-[#E8C67D]"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      copiarTexto(mensaje, "mensaje")
                    }
                    className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-[#D9B56D] px-5 py-4 text-sm font-semibold text-[#07182F]"
                  >
                    {copiado === "mensaje" ? (
                      <Check size={18} />
                    ) : (
                      <Copy size={18} />
                    )}

                    {copiado === "mensaje"
                      ? "Mensaje copiado"
                      : "Copiar mensaje para WhatsApp"}
                  </button>
                </div>
              </div>
            )}
          </section>

          {/* VISTA PREVIA */}
          <section className="flex flex-col items-center">

            <div className="mb-6 text-center">
              <CalendarDays
                size={25}
                className="mx-auto text-[#A48654]"
              />


              <p className="mt-2 text-xs uppercase tracking-[0.2em] text-[#A48654]">
                Fiesta de Fin de Año 2026
              </p>
            </div>

            {/* PORTADA DEL PROYECTO */}
            <div className="w-full max-w-[440px] overflow-hidden rounded-[2rem] border border-[#D9B56D]/40 bg-[#07182F] p-2 shadow-[0_20px_60px_rgba(0,0,0,0.15)]">
              <img
                src="/LOGO.jpg"
                alt="Portada de la invitación corporativa Jet Van"
                className="block h-auto w-full rounded-[1.5rem] object-contain"
              />
            </div>

            {/* VISTA PREVIA WHATSAPP */}
            {link && (
              <div className="mt-9 w-full max-w-[440px]">
                <p className="mb-4 text-center text-xs uppercase tracking-[0.2em] text-[#A48654]">
                  Vista previa del mensaje
                </p>

                <div className="rounded-2xl bg-[#EFEAE2] p-5 shadow-lg">
                  <div className="ml-auto max-w-[95%] rounded-xl rounded-tr-sm bg-[#D9FDD3] p-4">
                    <p className="whitespace-pre-wrap break-words text-sm leading-6 text-[#1D2733]">
                      {mensaje}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
