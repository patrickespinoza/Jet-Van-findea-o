
import React from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Clock3,
  Church,
  Wine,
  ArrowUpRight,
  CalendarDays,
} from "lucide-react";

// ==========================================
// INFORMACIÓN EDITABLE - WEDLY
// ==========================================

// FECHA DE LA CELEBRACIÓN
const fechaCelebracion = {
  dia: "Jueves",
  fecha: "11",
  mesAnio: "Junio 2026",
};

// CEREMONIA
const ceremonia = {
  titulo: "Ceremonia",
  hora: "4:30 PM",
  lugar: "Salón Event Center",
  direccion: "Puebla, Puebla",
  ubicacion: "https://maps.app.goo.gl/TsSDUBKAractwi8F8",
  icono: Church,
};

// RECEPCIÓN
const recepcion = {
  titulo: "Recepción",
  hora: "8:00 PM",
  lugar: "Jardín Magnolia",
  direccion: "Atlixco, Puebla",
  ubicacion: "https://maps.app.goo.gl/TsSDUBKAractwi8F8",
  icono: Wine,
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
// TARJETA REUTILIZABLE
// ==========================================

const TarjetaEvento = ({
  titulo,
  hora,
  lugar,
  direccion,
  ubicacion,
  icono: Icono,
}) => {
  return (
    <motion.article
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      whileHover={{ y: -5 }}
      className="
        relative
        w-full max-w-xl
        bg-[#F7F4ED]
        border border-[#D8CFBF]
        rounded-tl-[4rem]
        rounded-br-[4rem]
        rounded-tr-[1rem]
        rounded-bl-[1rem]
        shadow-[0_20px_60px_rgba(0,0,0,0.18)]
        px-7 py-12
        sm:px-12 sm:py-14
        overflow-hidden
      "
    >
      {/* DETALLE DECORATIVO SUPERIOR */}
      <div
        className="
          absolute top-0 left-1/2
          -translate-x-1/2
          w-32 h-[3px]
          bg-[#B89B5E]
        "
      />

      {/* DECORACIÓN DE FONDO */}
      <div
        className="
          absolute -top-16 -right-16
          w-48 h-48
          rounded-full
          border border-[#B89B5E]/15
          pointer-events-none
        "
      />

      <div
        className="
          absolute -top-9 -right-9
          w-32 h-32
          rounded-full
          border border-[#B89B5E]/15
          pointer-events-none
        "
      />

      <div className="relative z-10 flex flex-col items-center text-center">

        {/* ICONO PRINCIPAL */}
        <div
          className="
            w-20 h-20
            rounded-full
            border border-[#B89B5E]/40
            bg-[#5E6650]/5
            flex items-center justify-center
            mb-6
          "
        >
          <Icono
            size={36}
            strokeWidth={1.3}
            className="text-[#B89B5E]"
          />
        </div>

        {/* TÍTULO */}
        <h2
          className="
            text-3xl sm:text-4xl
            font-playfair
            text-[#343A2D]
            tracking-wide
          "
        >
          {titulo}
        </h2>

        <div className="flex items-center gap-3 mt-6 mb-9">
          <div className="w-12 h-[1px] bg-[#B89B5E]/70" />
          <div className="w-2 h-2 rotate-45 border border-[#B89B5E]" />
          <div className="w-12 h-[1px] bg-[#B89B5E]/70" />
        </div>

        {/* HORA */}
        <div className="flex flex-col items-center">
          <Clock3
            size={21}
            strokeWidth={1.5}
            className="text-[#B89B5E] mb-3"
          />

          <p className="uppercase tracking-[0.3em] text-xs font-semibold text-[#8C774D]">
            Hora del evento
          </p>

          <p className="text-2xl sm:text-3xl font-playfair text-[#343A2D] mt-3">
            {hora}
          </p>
        </div>

        {/* SEPARADOR */}
        <div className="w-16 h-[1px] bg-[#D8CFBF] my-9" />

        {/* LUGAR */}
        <div className="flex flex-col items-center">
          <MapPin
            size={22}
            strokeWidth={1.5}
            className="text-[#B89B5E] mb-3"
          />

          <p className="uppercase tracking-[0.3em] text-xs font-semibold text-[#8C774D]">
            Lugar
          </p>

          <h3 className="text-2xl sm:text-3xl font-playfair text-[#343A2D] mt-3">
            {lugar}
          </h3>

          <p className="text-[#5E6650]/80 mt-4 leading-relaxed text-sm sm:text-base max-w-sm">
            {direccion}
          </p>
        </div>

        {/* BOTÓN GOOGLE MAPS */}
        <motion.a
          href={ubicacion}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="
            group
            mt-10
            inline-flex items-center justify-center gap-3
            bg-[#5E6650]
            hover:bg-[#4B5340]
            text-white
            px-8 py-4
            rounded-full
            shadow-[0_8px_25px_rgba(94,102,80,0.25)]
            transition-colors duration-300
            text-sm font-medium tracking-wide
          "
        >
          <MapPin size={18} strokeWidth={1.7} />

          Ver ubicación

          <ArrowUpRight
            size={17}
            className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
          />
        </motion.a>
      </div>

      {/* DETALLE DECORATIVO INFERIOR */}
      <div
        className="
          absolute bottom-0 left-1/2
          -translate-x-1/2
          w-32 h-[3px]
          bg-[#B89B5E]
        "
      />
    </motion.article>
  );
};

// ==========================================
// COMPONENTE PRINCIPAL
// ==========================================

const Celebracion = () => {
  return (
    <section
      className="
        relative
        w-full
        bg-[#5E6650]
        py-20 sm:py-28
        px-5 sm:px-8
        overflow-hidden
      "
    >
      {/* DECORACIÓN DE FONDO */}
      <div
        className="
          absolute top-20 -left-32
          w-80 h-80
          rounded-full
          border border-[#E7D7B1]/10
          pointer-events-none
        "
      />

      <div
        className="
          absolute bottom-20 -right-32
          w-80 h-80
          rounded-full
          border border-[#E7D7B1]/10
          pointer-events-none
        "
      />

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* ENCABEZADO */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-10 h-[1px] bg-[#E7D7B1]/60" />

            <CalendarDays
              size={19}
              strokeWidth={1.4}
              className="text-[#E7D7B1]"
            />

            <div className="w-10 h-[1px] bg-[#E7D7B1]/60" />
          </div>

          <p className="uppercase tracking-[0.4em] text-[#E7D7B1] text-xs sm:text-sm font-semibold">
            Nuestra celebración
          </p>

          <h2 className="text-4xl sm:text-5xl font-playfair text-[#F7F4ED] mt-5">
            Un día inolvidable
          </h2>

          {/* FECHA */}
          <div className="mt-12 flex flex-col items-center">

            <p className="text-[#E7D7B1] tracking-[0.35em] uppercase text-sm sm:text-base font-semibold">
              {fechaCelebracion.dia}
            </p>

            <h3
              className="
                text-7xl sm:text-8xl md:text-9xl
                font-playfair
                text-[#F7F4ED]
                leading-none
                mt-4
                drop-shadow-lg
              "
            >
              {fechaCelebracion.fecha}
            </h3>

            <p className="text-[#E7D7B1] text-xl sm:text-2xl tracking-[0.2em] mt-5">
              {fechaCelebracion.mesAnio}
            </p>

          </div>
        </motion.div>

        {/* TARJETAS */}
        <div
          className="
            grid grid-cols-1 lg:grid-cols-2
            gap-10 lg:gap-8
            items-stretch
            justify-items-center
          "
        >
          <TarjetaEvento {...ceremonia} />
          <TarjetaEvento {...recepcion} />
        </div>

        {/* MENSAJE FINAL */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="
            text-center
            text-[#E7D7B1]
            font-playfair italic
            text-lg sm:text-xl
            mt-16
          "
        >
          Cada momento será más especial con tu presencia.
        </motion.p>

      </div>
    </section>
  );
};

export default Celebracion;
