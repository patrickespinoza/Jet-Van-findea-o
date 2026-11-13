
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  CalendarCheck,
  UserRound,
  Users,
  MessageSquare,
  CheckCircle2,
  XCircle,
  Send,
  Sparkles,
  Ticket,
  ShieldCheck,
} from "lucide-react";

// ==========================================
// CONFIGURACIÓN - JET VAN / WEDLY
// ==========================================

// IMPORTANTE:
// Esta clave debe ser exactamente igual
// a la utilizada en Generador.jsx.

const CLAVE_INVITACIONES =
  "JETVAN-WEDLY-2026-CAMBIAR-CLAVE-PRIVADA-8F2K9";

// ==========================================
// CONFIGURACIÓN PARA EXCEL
// ==========================================

// Aquí colocaremos posteriormente la URL
// del servicio que guardará las respuestas
// en un archivo Excel.

const EXCEL_API_URL = "";

// Mantener en false hasta configurar
// y probar la conexión con Excel.

const EXCEL_HABILITADO = false;

// ==========================================
// DESCIFRADO DE URL - AES-GCM
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
    {
      name: "AES-GCM",
    },
    false,
    ["decrypt"]
  );
}

function decodificarBase64URL(texto) {
  const base64 = texto
    .replace(/-/g, "+")
    .replace(/_/g, "/");

  const relleno = "=".repeat(
    (4 - (base64.length % 4)) % 4
  );

  const binario = atob(base64 + relleno);

  return Uint8Array.from(
    binario,
    (caracter) => caracter.charCodeAt(0)
  );
}

async function descifrarId(id) {
  const bytes = decodificarBase64URL(id);

  if (bytes.length < 29) {
    throw new Error("Identificador inválido");
  }

  const iv = bytes.slice(0, 12);
  const cifrado = bytes.slice(12);

  const clave = await obtenerClave();

  const resultado = await crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv,
    },
    clave,
    cifrado
  );

  const datos = JSON.parse(
    new TextDecoder().decode(resultado)
  );

  if (
    datos.version !== 1 ||
    typeof datos.nombre !== "string" ||
    !datos.nombre.trim() ||
    datos.nombre.length > 100 ||
    !Number.isInteger(datos.pases) ||
    datos.pases < 1 ||
    datos.pases > 100
  ) {
    throw new Error(
      "Datos de invitación inválidos"
    );
  }

  return datos;
}

// ==========================================
// ANIMACIONES
// ==========================================

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 30,
  },

  visible: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// ==========================================
// COMPONENTE PRINCIPAL
// ==========================================

export default function ConfirmacionAsistencia() {
  // DATOS DE LA INVITACIÓN
  const [invitacion, setInvitacion] = useState(null);

  const [cargando, setCargando] = useState(true);

  const [errorEnlace, setErrorEnlace] = useState("");

  // FORMULARIO
  const [asistencia, setAsistencia] = useState("");

  const [invitados, setInvitados] = useState("1");

  const [mensaje, setMensaje] = useState("");

  // ESTADO DEL REGISTRO
  const [confirmacion, setConfirmacion] = useState("");

  const [enviando, setEnviando] = useState(false);

  const [registroExitoso, setRegistroExitoso] =
    useState(false);

  // ==========================================
  // LEER ENLACE CIFRADO
  // ==========================================

  useEffect(() => {
    let activo = true;

    const cargarInvitacion = async () => {
      setCargando(true);

      const parametros = new URLSearchParams(
        window.location.search
      );

      const id = parametros.get("id");

      if (!id) {
        if (activo) {
          setErrorEnlace(
            "Esta invitación requiere un enlace personalizado. Solicítalo al organizador."
          );

          setCargando(false);
        }

        return;
      }

      try {
        const datos = await descifrarId(id);

        if (!activo) return;

        setInvitacion(datos);
        setErrorEnlace("");
      } catch (error) {
        console.error(
          "Error al validar invitación:",
          error
        );

        if (activo) {
          setErrorEnlace(
            "El enlace no es válido o no se pudo descifrar. Solicita uno nuevo al organizador."
          );
        }
      } finally {
        if (activo) {
          setCargando(false);
        }
      }
    };

    cargarInvitacion();

    return () => {
      activo = false;
    };
  }, []);

  // ==========================================
  // ENVIAR CONFIRMACIÓN A EXCEL
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (enviando || registroExitoso) return;

    setConfirmacion("");

    if (!invitacion) {
      setConfirmacion(
        "No se encontró una invitación válida."
      );
      return;
    }

    if (!asistencia) {
      setConfirmacion(
        "Por favor, selecciona si asistirás."
      );
      return;
    }

    const cantidad =
      asistencia === "Sí asistiré"
        ? Number(invitados)
        : 0;

    if (
      asistencia === "Sí asistiré" &&
      (
        !Number.isInteger(cantidad) ||
        cantidad < 1 ||
        cantidad > invitacion.pases
      )
    ) {
      setConfirmacion(
        `Puedes confirmar entre 1 y ${invitacion.pases} asistentes.`
      );

      return;
    }

    // ==========================================
    // DATOS PREPARADOS PARA EXCEL
    // ==========================================

    const parametros = new URLSearchParams(
      window.location.search
    );

    const registro = {
      idInvitacion: parametros.get("id"),

      nombre: invitacion.nombre,

      pasesAsignados: invitacion.pases,

      asistencia: asistencia,

      asistentesConfirmados: cantidad,

      mensaje: mensaje.trim(),

      fechaRegistro: new Date().toISOString(),

      evento: "Jet Van - Fiesta de Fin de Año 2026",
    };

    // ==========================================
    // ESPACIO RESERVADO PARA EXCEL
    // ==========================================

    if (!EXCEL_HABILITADO || !EXCEL_API_URL) {
      console.log(
        "REGISTRO PREPARADO PARA EXCEL:",
        registro
      );

      setConfirmacion(
        "La conexión con Excel está pendiente. Tu respuesta todavía no ha sido registrada."
      );

      return;
    }

    // ==========================================
    // ENVÍO AL SERVICIO DE EXCEL
    // ==========================================

    setEnviando(true);

    try {
      const respuesta = await fetch(
        EXCEL_API_URL,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(registro),
        }
      );

      if (!respuesta.ok) {
        throw new Error(
          "No fue posible guardar la confirmación."
        );
      }

      // El servicio debe responder con JSON:
      // { ok: true }
      // solamente después de guardar el registro.

      const resultado = await respuesta.json();

      if (resultado.ok !== true) {
        throw new Error(
          "El servicio no confirmó que se guardó el registro."
        );
      }

      setRegistroExitoso(true);

      setConfirmacion(
        "¡Tu asistencia ha sido registrada correctamente!"
      );
    } catch (error) {
      console.error(
        "Error al registrar asistencia:",
        error
      );

      setConfirmacion(
        "No fue posible registrar tu asistencia. Por favor, intenta nuevamente."
      );
    } finally {
      setEnviando(false);
    }
  };

  // ==========================================
  // ESTILOS REUTILIZABLES
  // ==========================================

  const campoClass = `
    w-full
    rounded-xl
    border border-[#D9B56D]/35
    bg-[#06172E]
    px-5 py-4
    text-sm sm:text-base
    text-white
    outline-none
    transition-colors
    placeholder:text-white/40
    focus:border-[#E8C67D]
  `;

  // ==========================================
  // DISEÑO
  // ==========================================

  return (
    <section
      id="confirmacion"
      className="
        relative isolate
        w-full overflow-hidden
        px-5 py-20
        text-white
        sm:px-8 sm:py-28
      "
      style={{
        background:
          "radial-gradient(ellipse at 50% 30%, #123152 0%, #071B34 55%, #020B18 100%)",

        fontFamily: "'Montserrat', sans-serif",
      }}
    >
      {/* =====================================
          DECORACIONES DEL FONDO
      ===================================== */}

      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-32 -top-20 h-80 w-96 rotate-[-25deg] rounded-full border-2 border-[#D9B56D]/25" />

        <div className="absolute -right-32 -bottom-20 h-80 w-[450px] rotate-[-25deg] rounded-full border-2 border-[#D9B56D]/25" />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl">

        {/* =====================================
            ENCABEZADO
        ===================================== */}

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          {/* ICONO */}
          <div className="mb-6 flex items-center justify-center gap-4 text-[#E8C67D]">
            <span className="h-px w-12 bg-[#D9B56D]/70" />

            <CalendarCheck
              size={24}
              strokeWidth={1.4}
            />

            <span className="h-px w-12 bg-[#D9B56D]/70" />
          </div>

          {/* MARCA */}
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#E8C67D]">
            Jet Van · 2026
          </p>

          {/* TÍTULO */}
          <h2
            className="
              mt-5
              text-5xl sm:text-6xl md:text-7xl
              font-medium italic
              leading-tight
              text-white
            "
            style={{
              fontFamily:
                "'Cormorant Garamond', serif",
            }}
          >
            Confirma tu

            <span className="block text-[#E8C67D]">
              asistencia
            </span>
          </h2>

          {/* DIVISOR */}
          <div className="mx-auto mt-6 flex items-center justify-center gap-3">
            <span className="h-px w-14 bg-[#D9B56D]" />

            <Sparkles
              size={17}
              className="text-[#E8C67D]"
            />

            <span className="h-px w-14 bg-[#D9B56D]" />
          </div>

          {/* DESCRIPCIÓN */}
          <p className="mx-auto mt-7 max-w-lg text-sm font-light leading-7 text-[#F1E9DA] sm:text-base">
            Será un gusto contar con tu presencia
            en nuestra Fiesta de Fin de Año 2026.
            Por favor, confirma tu participación.
          </p>
        </motion.div>

        {/* =====================================
            TARJETA PRINCIPAL
        ===================================== */}

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="
            relative
            overflow-hidden
            rounded-[2rem]
            border border-[#D9B56D]/50
            bg-[#0A203B]
            px-5 py-10
            shadow-[0_20px_65px_rgba(0,0,0,0.35)]
            sm:px-12 sm:py-14
          "
        >
          {/* BORDE SUPERIOR */}
          <div className="absolute left-1/2 top-0 h-[3px] w-40 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#E8C67D] to-transparent" />

          {/* BORDE INFERIOR */}
          <div className="absolute bottom-0 left-1/2 h-[3px] w-40 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#E8C67D] to-transparent" />

          {/* ICONO CENTRAL */}
          <div className="mb-9 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#D9B56D]/50 bg-[#D9B56D]/10">
              <CalendarCheck
                size={30}
                strokeWidth={1.4}
                className="text-[#E8C67D]"
              />
            </div>
          </div>

          {/* =====================================
              ESTADO DE CARGA
          ===================================== */}

          {cargando && (
            <div className="py-10 text-center">
              <p className="text-sm text-[#E8C67D]">
                Verificando invitación...
              </p>
            </div>
          )}

          {/* =====================================
              ERROR DE INVITACIÓN
          ===================================== */}

          {!cargando && errorEnlace && (
            <div
              role="alert"
              className="rounded-xl border border-[#D9B56D]/40 bg-[#06172E] p-6 text-center"
            >
              <ShieldCheck
                size={32}
                className="mx-auto mb-4 text-[#E8C67D]"
              />

              <p className="text-sm leading-7 text-white">
                {errorEnlace}
              </p>
            </div>
          )}

          {/* =====================================
              FORMULARIO PERSONALIZADO
          ===================================== */}

          {!cargando && invitacion && (
            <form
              onSubmit={handleSubmit}
              className="space-y-7"
            >
              {/* =====================================
                  NOMBRE DEL COLABORADOR
              ===================================== */}

              <div>
                <p className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.15em] text-[#E8C67D]">
                  <UserRound size={17} />

                  Invitación para
                </p>

                <div className="rounded-xl border border-[#D9B56D]/35 bg-[#06172E] px-5 py-5 text-center">
                  <p
                    className="break-words text-3xl text-white sm:text-4xl"
                    style={{
                      fontFamily:
                        "'Cormorant Garamond', serif",
                    }}
                  >
                    {invitacion.nombre}
                  </p>
                </div>
              </div>

              {/* =====================================
                  PASES ASIGNADOS
              ===================================== */}

              <div className="rounded-xl border border-[#D9B56D]/40 bg-[#D9B56D]/10 p-5 text-center">
                <Ticket
                  size={27}
                  className="mx-auto mb-3 text-[#E8C67D]"
                />

                <p className="text-xs uppercase tracking-[0.2em] text-[#E8C67D]">
                  Pases asignados
                </p>

                <p className="mt-3 text-4xl font-semibold text-white">
                  {invitacion.pases}
                </p>

                <p className="mt-2 text-xs text-white/70">
                  {invitacion.pases === 1
                    ? "Tienes 1 lugar reservado"
                    : `Tienes hasta ${invitacion.pases} lugares disponibles`}
                </p>
              </div>

              {/* =====================================
                  SELECCIÓN DE ASISTENCIA
              ===================================== */}

              <div>
                <p className="mb-4 text-xs font-medium uppercase tracking-[0.15em] text-[#E8C67D]">
                  ¿Contaremos con tu presencia?
                </p>

                <div className="grid grid-cols-2 gap-3 sm:gap-4">

                  {/* SÍ ASISTIRÉ */}
                  <button
                    type="button"
                    disabled={registroExitoso || enviando}
                    onClick={() => {
                      setAsistencia("Sí asistiré");
                      setConfirmacion("");
                    }}
                    aria-pressed={
                      asistencia === "Sí asistiré"
                    }
                    className={`flex min-h-[65px] items-center justify-center gap-2 rounded-xl border px-2 py-4 text-xs font-medium transition-all sm:text-sm disabled:cursor-not-allowed disabled:opacity-60 ${
                      asistencia === "Sí asistiré"
                        ? "border-[#F2D797] bg-[#D9B56D] text-[#07182F]"
                        : "border-[#D9B56D]/35 bg-[#06172E] text-white hover:border-[#D9B56D]"
                    }`}
                  >
                    <CheckCircle2 size={19} />

                    Sí asistiré
                  </button>

                  {/* NO ASISTIRÉ */}
                  <button
                    type="button"
                    disabled={registroExitoso || enviando}
                    onClick={() => {
                      setAsistencia("No asistiré");
                      setConfirmacion("");
                    }}
                    aria-pressed={
                      asistencia === "No asistiré"
                    }
                    className={`flex min-h-[65px] items-center justify-center gap-2 rounded-xl border px-2 py-4 text-xs font-medium transition-all sm:text-sm disabled:cursor-not-allowed disabled:opacity-60 ${
                      asistencia === "No asistiré"
                        ? "border-[#F2D797] bg-[#D9B56D] text-[#07182F]"
                        : "border-[#D9B56D]/35 bg-[#06172E] text-white hover:border-[#D9B56D]"
                    }`}
                  >
                    <XCircle size={19} />

                    No asistiré
                  </button>
                </div>
              </div>

              {/* =====================================
                  CANTIDAD DE ASISTENTES
              ===================================== */}

              {asistencia === "Sí asistiré" && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 12,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.3,
                  }}
                >
                  <label
                    htmlFor="asistentes-jetvan"
                    className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.15em] text-[#E8C67D]"
                  >
                    <Users size={17} />

                    Personas que asistirán
                  </label>

                  <select
                    id="asistentes-jetvan"
                    value={invitados}
                    onChange={(e) =>
                      setInvitados(e.target.value)
                    }
                    disabled={registroExitoso || enviando}
                    className={campoClass}
                    required
                  >
                    {Array.from(
                      {
                        length: invitacion.pases,
                      },
                      (_, i) => i + 1
                    ).map((cantidad) => (
                      <option
                        key={cantidad}
                        value={cantidad}
                        className="bg-[#06172E]"
                      >
                        {cantidad}{" "}
                        {cantidad === 1
                          ? "persona"
                          : "personas"}
                      </option>
                    ))}
                  </select>

                  <p className="mt-3 text-xs leading-5 text-white/60">
                    Puedes confirmar hasta{" "}
                    {invitacion.pases}{" "}
                    {invitacion.pases === 1
                      ? "persona"
                      : "personas"},
                    incluyéndote.
                  </p>
                </motion.div>
              )}

              {/* =====================================
                  MENSAJE ADICIONAL
              ===================================== */}

              <div>
                <label
                  htmlFor="mensaje-jetvan"
                  className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.15em] text-[#E8C67D]"
                >
                  <MessageSquare size={17} />

                  Mensaje adicional (opcional)
                </label>

                <textarea
                  id="mensaje-jetvan"
                  placeholder="¿Deseas agregar algún comentario?"
                  value={mensaje}
                  onChange={(e) =>
                    setMensaje(e.target.value)
                  }
                  disabled={registroExitoso || enviando}
                  rows={4}
                  maxLength={500}
                  className={`${campoClass} resize-none`}
                />
              </div>

              {/* =====================================
                  BOTÓN DE CONFIRMACIÓN
              ===================================== */}

              <motion.button
                type="submit"
                disabled={enviando || registroExitoso}
                whileHover={
                  enviando || registroExitoso
                    ? {}
                    : { scale: 1.02 }
                }
                whileTap={
                  enviando || registroExitoso
                    ? {}
                    : { scale: 0.98 }
                }
                className="
                  flex w-full
                  items-center justify-center
                  gap-3
                  rounded-xl
                  border border-[#F2D797]
                  bg-gradient-to-r
                  from-[#C99A46]
                  via-[#E8C67D]
                  to-[#C99A46]
                  px-5 py-4
                  text-sm sm:text-base
                  font-semibold
                  tracking-wide
                  text-[#07182F]
                  shadow-[0_8px_30px_rgba(217,181,109,0.2)]
                  transition-all
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              >
                {registroExitoso ? (
                  <CheckCircle2 size={20} />
                ) : (
                  <Send size={19} />
                )}

                {enviando
                  ? "Registrando asistencia..."
                  : registroExitoso
                  ? "Asistencia registrada"
                  : "Confirmar asistencia"}
              </motion.button>

              {/* =====================================
                  MENSAJE DE ESTADO
              ===================================== */}

              {confirmacion && (
                <p
                  role="status"
                  aria-live="polite"
                  className="rounded-xl border border-[#D9B56D]/30 bg-[#06172E] p-4 text-center text-sm font-medium leading-6 text-[#F2D797]"
                >
                  {confirmacion}
                </p>
              )}

              {/* =====================================
                  NOTA INFORMATIVA
              ===================================== */}

              <p className="text-center text-xs leading-relaxed text-[#F1E9DA]/60">
                {EXCEL_HABILITADO && EXCEL_API_URL
                  ? "Tu confirmación se enviará al registro de asistencia del evento."
                  : "El registro de asistencia estará disponible próximamente."}
              </p>
            </form>
          )}
        </motion.div>

        {/* =====================================
            MENSAJE FINAL
        ===================================== */}

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-12 text-center text-2xl italic text-[#E8C67D] sm:text-3xl"
          style={{
            fontFamily:
              "'Cormorant Garamond', serif",
          }}
        >
          Será un placer celebrar juntos.
        </motion.p>

        {/* =====================================
            FIRMA
        ===================================== */}

        <div className="mt-8 flex items-center justify-center gap-4">
          <span className="h-px w-10 bg-[#D9B56D]/60" />

          <span className="text-xs font-medium uppercase tracking-[0.25em] text-[#E8C67D]">
            Jet Van · 2026
          </span>

          <span className="h-px w-10 bg-[#D9B56D]/60" />
        </div>
      </div>
    </section>
  );
}
