
import React from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  ArrowUpRight,
  Navigation,
  Sparkles,
  Building2,
} from "lucide-react";

// ==========================================
// INFORMACIÓN EDITABLE - WEDLY / JET VAN
// ==========================================

const evento = {
  titulo: "Fiesta de Fin de Año 2026",
  lugar: "Salón Coronado",
  zona: "Polanco",
  direccion:
    "Bahía de Santa Bárbara 49, Miguel Hidalgo, C.P. 11300, Ciudad de México",
  ubicacion:
    "https://maps.app.goo.gl/RjxYtcmwrpkx57G16",
};

// ==========================================
// ANIMACIONES
// ==========================================

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 35,
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

export default function Celebracion() {
  return (
    <section
      id="ubicacion"
      className="
        relative
        w-full
        overflow-hidden
        bg-white
        px-5 py-20
        sm:px-8 sm:py-28
      "
      style={{
        fontFamily: "'Montserrat', sans-serif",
      }}
    >
      <div className="relative z-10 mx-auto max-w-5xl">

        {/* =====================================
            ENCABEZADO SOBRE FONDO BLANCO
        ===================================== */}

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mb-12 text-center sm:mb-16"
        >
          {/* ICONO DECORATIVO */}
          <div className="mb-5 flex items-center justify-center gap-4 text-[#C99A46]">
            <span className="h-px w-12 bg-[#D9B56D]" />

            <MapPin
              size={22}
              strokeWidth={1.4}
            />

            <span className="h-px w-12 bg-[#D9B56D]" />
          </div>

          {/* TÍTULO */}
          <h2
            className="
              mt-5
              text-5xl sm:text-6xl md:text-7xl
              font-medium italic
              text-[#07182F]
            "
            style={{
              fontFamily:
                "'Cormorant Garamond', serif",
            }}
          >
            Ubicación
          </h2>

          {/* SEPARADOR DORADO */}
          <div className="mx-auto mt-6 flex items-center justify-center gap-3">
            <span className="h-px w-14 bg-[#D9B56D]" />

            <span
              className="
                h-2 w-2
                rotate-45
                border border-[#D9B56D]
              "
            />

            <span className="h-px w-14 bg-[#D9B56D]" />
          </div>
        </motion.div>

        {/* =====================================
            TARJETA PRINCIPAL AZUL MARINO
        ===================================== */}

        <motion.article
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          whileHover={{ y: -4 }}
          className="
            relative
            mx-auto
            w-full max-w-2xl
            overflow-hidden
            rounded-[2rem]
            border border-[#D9B56D]/50
            bg-[#07182F]
            px-5 py-12
            text-center text-white
            shadow-[0_20px_65px_rgba(0,0,0,0.20)]
            sm:px-12 sm:py-16
          "
        >
          {/* DETALLE DORADO SUPERIOR */}
          <div
            className="
              absolute
              left-1/2 top-0
              h-[3px] w-40
              -translate-x-1/2
              bg-gradient-to-r
              from-transparent
              via-[#E8C67D]
              to-transparent
            "
          />

          {/* DECORACIONES DENTRO DE LA TARJETA */}
          <div
            className="
              pointer-events-none
              absolute -right-16 -top-16
              h-48 w-48
              rounded-full
              border border-[#D9B56D]/15
            "
          />

          <div
            className="
              pointer-events-none
              absolute -right-9 -top-9
              h-32 w-32
              rounded-full
              border border-[#D9B56D]/15
            "
          />

          <div className="relative z-10 flex flex-col items-center">

            {/* ICONO PRINCIPAL */}
            <div
              className="
                mb-7
                flex h-20 w-20
                items-center justify-center
                rounded-full
                border border-[#D9B56D]/60
                bg-[#D9B56D]/10
              "
            >
              <MapPin
                size={38}
                strokeWidth={1.3}
                className="text-[#E8C67D]"
              />
            </div>

            {/* NOMBRE DEL SALÓN */}
            <p
              className="
                mb-3
                text-[11px]
                font-medium
                uppercase
                tracking-[0.35em]
                text-[#D9B56D]
              "
            >
              Te esperamos en
            </p>

            <h3
              className="
                text-4xl sm:text-5xl md:text-6xl
                font-semibold
                leading-tight
                text-white
              "
              style={{
                fontFamily:
                  "'Cormorant Garamond', serif",
              }}
            >
              {evento.lugar}
            </h3>

            <p
              className="
                mt-2
                text-3xl sm:text-4xl
                italic
                text-[#E8C67D]
              "
              style={{
                fontFamily:
                  "'Cormorant Garamond', serif",
              }}
            >
              {evento.zona}
            </p>

            {/* SEPARADOR */}
            <div className="my-9 flex items-center gap-3">
              <span className="h-px w-12 bg-[#D9B56D]/60" />

              <Sparkles
                size={18}
                strokeWidth={1.4}
                className="text-[#D9B56D]"
              />

              <span className="h-px w-12 bg-[#D9B56D]/60" />
            </div>

            {/* DIRECCIÓN */}
            <div className="flex flex-col items-center">

              <Building2
                size={25}
                strokeWidth={1.4}
                className="mb-4 text-[#E8C67D]"
              />

              <p
                className="
                  text-[11px]
                  font-medium
                  uppercase
                  tracking-[0.3em]
                  text-[#D9B56D]
                "
              >
                Dirección
              </p>

              <p
                className="
                  mt-4
                  max-w-md
                  text-sm sm:text-base
                  font-light
                  leading-8
                  text-[#F1E9DA]
                "
              >
                {evento.direccion}
              </p>
            </div>

            {/* =====================================
                BOTÓN GOOGLE MAPS
            ===================================== */}

            <motion.a
              href={evento.ubicacion}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="
                group
                mt-11
                inline-flex
                w-full max-w-xs
                items-center justify-center
                gap-3
                rounded-full
                border border-[#F2D797]
                bg-gradient-to-r
                from-[#C99A46]
                via-[#E8C67D]
                to-[#C99A46]
                px-6 py-4
                text-sm font-semibold
                tracking-wide
                text-[#07182F]
                shadow-[0_8px_30px_rgba(217,181,109,0.2)]
                transition-all duration-300
                hover:shadow-[0_10px_35px_rgba(217,181,109,0.35)]
              "
            >
              <Navigation
                size={19}
                strokeWidth={1.7}
              />

              Ver ubicación

              <ArrowUpRight
                size={18}
                className="
                  transition-transform duration-300
                  group-hover:translate-x-1
                  group-hover:-translate-y-1
                "
              />
            </motion.a>
          </div>

          {/* DETALLE DORADO INFERIOR */}
          <div
            className="
              absolute
              bottom-0 left-1/2
              h-[3px] w-40
              -translate-x-1/2
              bg-gradient-to-r
              from-transparent
              via-[#E8C67D]
              to-transparent
            "
          />
        </motion.article>

        {/* =====================================
            MENSAJE FINAL SOBRE FONDO BLANCO
        ===================================== */}

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="
            mt-12
            text-center
            text-xl sm:text-2xl
            italic
            text-[#07182F]
          "
          style={{
            fontFamily:
              "'Cormorant Garamond', serif",
          }}
        >
          Nos encantará compartir esta celebración contigo.
        </motion.p>

      </div>
    </section>
  );
}
