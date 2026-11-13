
import React, { useEffect, useState } from "react";
import { CalendarDays, Clock3, Sparkles } from "lucide-react";

// Fecha del evento en horario de Ciudad de México
const FECHA_EVENTO = new Date(
  "2026-12-04T14:00:00-06:00"
).getTime();

function calcularTiempo() {
  const diferencia = Math.max(
    0,
    FECHA_EVENTO - Date.now()
  );

  return {
    dias: Math.floor(diferencia / 86400000),
    horas: Math.floor((diferencia / 3600000) % 24),
    minutos: Math.floor((diferencia / 60000) % 60),
    segundos: Math.floor((diferencia / 1000) % 60),
  };
}

export default function Portada() {
  const [tiempo, setTiempo] = useState(calcularTiempo);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setTiempo(calcularTiempo());
    }, 1000);

    return () => clearInterval(intervalo);
  }, []);

  const cuentaRegresiva = [
    { valor: tiempo.dias, etiqueta: "DÍAS" },
    { valor: tiempo.horas, etiqueta: "HORAS" },
    { valor: tiempo.minutos, etiqueta: "MINUTOS" },
    { valor: tiempo.segundos, etiqueta: "SEGUNDOS" },
  ];

  return (
    <section
      id="inicio"
      className="relative isolate flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-4 py-16 text-white sm:px-8 md:py-24"
      style={{
        fontFamily: "'Montserrat', sans-serif",
        background:
          "radial-gradient(ellipse at 50% 42%, #123152 0%, #071B34 55%, #020B18 100%)",
      }}
    >
      {/* FONDO Y LUCES */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `
              radial-gradient(circle at 10% 20%, #E9BB66 1px, transparent 4px),
              radial-gradient(circle at 85% 14%, #F8D998 2px, transparent 7px),
              radial-gradient(circle at 70% 80%, #D2A354 2px, transparent 8px)
            `,
            backgroundSize: "180px 210px",
          }}
        />

        {/* Cintas doradas */}
        <div className="absolute -left-28 -top-24 h-72 w-96 rotate-[-30deg] rounded-full border-[3px] border-[#D9B56D]/70" />

        <div className="absolute -right-32 -bottom-24 h-80 w-[500px] rotate-[-25deg] rounded-full border-[3px] border-[#D9B56D]/70" />

        {/* Resplandores */}
        <div className="absolute -left-20 bottom-10 h-64 w-64 rounded-full bg-[#D4A85B]/10 blur-[80px]" />
        <div className="absolute -right-20 top-10 h-64 w-64 rounded-full bg-[#E3BB72]/10 blur-[80px]" />
      </div>

      {/* CONTENIDO */}
      <div className="relative z-10 flex w-full max-w-5xl flex-col items-center text-center">

        {/* LOGOTIPO */}
        <div className="mb-9 rounded-2xl bg-white px-6 py-4 shadow-[0_12px_45px_rgba(0,0,0,0.3)]">
          <img
            src="/LOGO.jpg"
            alt="Jet Van"
            className="h-auto w-44 object-contain sm:w-56 md:w-64"
          />
        </div>

        {/* ENCABEZADO */}
        <div className="mb-6 flex items-center justify-center gap-3 text-[#E8C67D]">
          <span className="h-px w-8 bg-[#D9B56D] sm:w-16" />
          <Sparkles size={17} strokeWidth={1.5} />
          <span className="text-[10px] uppercase tracking-[0.24em] sm:text-sm">
            Celebremos juntos
          </span>
          <Sparkles size={17} strokeWidth={1.5} />
          <span className="h-px w-8 bg-[#D9B56D] sm:w-16" />
        </div>

        {/* TÍTULO PRINCIPAL */}
        <div
          className="w-full"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
          }}
        >
          <h1 className="text-[clamp(4rem,12vw,8.5rem)] font-medium italic leading-[0.85] tracking-tight text-white">
            Fiesta de
          </h1>

          <h2
            className="mt-2 text-[clamp(4.3rem,13vw,9.5rem)] font-semibold italic leading-[0.9] tracking-tight"
            style={{
              background:
                "linear-gradient(120deg, #C99A46 0%, #FFE4A0 42%, #D4A657 75%, #F5D78E 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Fin de Año
          </h2>

          <div className="mt-4 flex items-center justify-center gap-5">
            <span className="h-px w-14 bg-[#D8B56C] sm:w-28" />
            <span className="text-5xl font-medium tracking-[0.18em] text-white sm:text-7xl md:text-8xl">
              2026
            </span>
            <span className="h-px w-14 bg-[#D8B56C] sm:w-28" />
          </div>
        </div>

        {/* FRASE */}
        <p className="mt-8 max-w-2xl px-3 text-sm font-light leading-relaxed tracking-wide text-[#F0E9DC] sm:text-lg md:text-xl">
          Un año de retos, logros y caminos recorridos juntos.
          <br className="hidden sm:block" />
          {" "}Es momento de celebrar.
        </p>

        {/* DIVISOR */}
        <div className="my-9 flex items-center gap-4 text-[#E4BF75]">
          <span className="h-px w-16 bg-gradient-to-r from-transparent to-[#D9B56D]" />
          <Sparkles size={18} strokeWidth={1.4} />
          <span className="h-px w-16 bg-gradient-to-l from-transparent to-[#D9B56D]" />
        </div>

        {/* FECHA Y HORA */}
        <div className="flex w-full max-w-2xl flex-col items-center justify-center gap-6 sm:flex-row sm:gap-10">

          <div className="flex items-center gap-4">
            <CalendarDays
              size={34}
              strokeWidth={1.5}
              className="shrink-0 text-[#E7C47B]"
            />

            <div className="text-left">
              <p className="text-[10px] uppercase tracking-[0.25em] text-[#DDBB76]">
                Viernes
              </p>
              <p className="text-lg font-semibold sm:text-xl">
                04 de diciembre
              </p>
            </div>
          </div>

          <span className="hidden h-12 w-px bg-[#D9B56D]/60 sm:block" />

          <div className="flex items-center gap-4">
            <Clock3
              size={36}
              strokeWidth={1.5}
              className="shrink-0 text-[#E7C47B]"
            />

            <div className="text-left">
              <p className="text-[10px] uppercase tracking-[0.25em] text-[#DDBB76]">
                Hora del evento
              </p>
              <p className="text-lg font-semibold sm:text-xl">
                14:00 hrs.
              </p>
            </div>
          </div>
        </div>

        {/* CUENTA REGRESIVA */}
        <div className="mt-12 w-full max-w-2xl">
          <div className="mb-6 flex items-center justify-center gap-4">
            <span className="h-px w-10 bg-[#D9B56D] sm:w-20" />
            <p className="text-xs font-medium uppercase tracking-[0.4em] text-[#E7C47B] sm:text-sm">
              Falta
            </p>
            <span className="h-px w-10 bg-[#D9B56D] sm:w-20" />
          </div>

          <div className="grid grid-cols-4 gap-2 sm:gap-4">
            {cuentaRegresiva.map((item) => (
              <div
                key={item.etiqueta}
                className="flex min-w-0 flex-col items-center justify-center rounded-xl border border-[#D8B56C]/75 bg-[#06182E]/55 px-1 py-4 shadow-[0_8px_25px_rgba(0,0,0,0.18)] sm:rounded-2xl sm:py-6"
              >
                <span
                  className="text-3xl font-medium leading-none text-white sm:text-5xl md:text-6xl"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {String(item.valor).padStart(2, "0")}
                </span>

                <span className="mt-2 text-[8px] font-medium tracking-[0.08em] text-[#E8C67D] sm:text-xs sm:tracking-[0.15em]">
                  {item.etiqueta}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* CIERRE DECORATIVO */}
        <div className="mt-12 flex items-center gap-4 opacity-80">
          <span className="h-px w-16 bg-[#D9B56D]" />
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#E7C47B]">
            Jet Van
          </span>
          <span className="h-px w-16 bg-[#D9B56D]" />
        </div>
      </div>
    </section>
  );
}
