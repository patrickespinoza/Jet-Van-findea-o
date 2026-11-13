
import React from "react";
import { motion } from "framer-motion";
import {
  Camera,
  UtensilsCrossed,
  Music2,
  HeartHandshake,
  Cake,
} from "lucide-react";

// ==========================================
// INFORMACIÓN EDITABLE - WEDLY
// ==========================================

const eventosIzquierda = [
  {
    titulo: "Fotografías",
    icono: Camera,
    hora: "4:00 pm - 4:30 pm",
  },
  {
    titulo: "Comida",
    icono: UtensilsCrossed,
    hora: "5:00 pm - 6:00 pm",
  },
  {
    titulo: "Baile",
    icono: Music2,
    hora: "6:30 pm - 11:30 pm",
  },
];

const eventosDerecha = [
  {
    titulo: "Llegada de Novios",
    icono: HeartHandshake,
    hora: "4:30 pm - 5:00 pm",
  },
  {
    titulo: "Pastel",
    icono: Cake,
    hora: "6:00 pm - 6:30 pm",
  },
];

// ==========================================
// ANIMACIONES
// ==========================================

const containerFade = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const cardFade = {
  hidden: {
    opacity: 0,
    y: 35,
    scale: 0.96,
    filter: "blur(6px)",
  },
  show: (index) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.75,
      delay: index * 0.14,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

// ==========================================
// TARJETA REUTILIZABLE
// ==========================================

const TarjetaItinerario = ({ evento, index }) => {
  const Icono = evento.icono;

  return (
    <motion.div
      custom={index}
      variants={cardFade}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.35 }}
      whileHover={{
        y: -6,
        scale: 1.015,
        transition: { duration: 0.25 },
      }}
      className="
        bg-[#F7F4ED]
        rounded-3xl
        p-8
        shadow-[0_12px_35px_rgba(0,0,0,0.15)]
        border border-[#D8CFBF]
        text-center
        flex flex-col items-center
      "
    >
      {/* ICONO */}
      <div
        className="
          w-20 h-20
          rounded-full
          bg-[#5E6650]/10
          border border-[#B89B5E]/40
          flex items-center justify-center
        "
      >
        <Icono
          size={38}
          strokeWidth={1.4}
          className="text-[#B89B5E]"
        />
      </div>

      {/* NOMBRE DEL EVENTO */}
      <h2 className="mt-6 text-2xl font-playfair text-black">
        {evento.titulo}
      </h2>

      {/* HORARIO */}
      <p className="mt-3 text-[#B89B5E] font-[DancingScript] text-xl">
        {evento.hora}
      </p>
    </motion.div>
  );
};

// ==========================================
// COMPONENTE PRINCIPAL
// ==========================================

const Itinerario2 = () => {
  return (
    <section
      className="
        w-full
        bg-[#5E6650]
        py-20
        px-6
        flex items-center justify-center
        overflow-hidden
      "
    >
      <motion.div
        variants={containerFade}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="
          w-full max-w-6xl mx-auto
          rounded-tl-[4rem]
          rounded-br-[4rem]
          rounded-tr-[1rem]
          rounded-bl-[1rem]
          p-6 sm:p-12
        "
      >
        {/* ENCABEZADO */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p
            className="
              uppercase tracking-[0.25em]
              text-[#E7D7B1]
              text-sm font-semibold
            "
          >
            Nuestro Día
          </p>

          <h1
            className="
              text-4xl sm:text-5xl md:text-6xl
              font-playfair
              text-[#F7F4ED]
              mt-4
            "
          >
            Itinerario
          </h1>

          <div className="w-24 h-[2px] bg-[#B89B5E] mx-auto mt-6"></div>
        </motion.div>

        {/* CONTENEDOR DEL ITINERARIO */}
        <div className="relative mt-20">

          {/* LÍNEA CENTRAL */}
          <div
            className="
              hidden md:block
              absolute left-1/2 top-0
              h-full w-[3px]
              bg-[#E7D7B1]/40
              -translate-x-1/2
            "
          ></div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-14">

            {/* COLUMNA IZQUIERDA */}
            <div className="flex flex-col gap-14">
              {eventosIzquierda.map((evento, index) => (
                <TarjetaItinerario
                  key={index}
                  evento={evento}
                  index={index}
                />
              ))}
            </div>

            {/* COLUMNA DERECHA */}
            <div className="flex flex-col gap-14 md:mt-20">
              {eventosDerecha.map((evento, index) => (
                <TarjetaItinerario
                  key={index}
                  evento={evento}
                  index={index + eventosIzquierda.length}
                />
              ))}
            </div>

          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Itinerario2;
