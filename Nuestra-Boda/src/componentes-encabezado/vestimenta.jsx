
import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Award } from "lucide-react";

// ==========================================
// MENSAJE CORPORATIVO - JET VAN
// ==========================================

const mensaje = {
  encabezado: "Un momento para reconocer",
  titulo: "Un año de logros",
  destacado: "compartidos",

  parrafo1:
    "Cada logro alcanzado durante este año ha sido posible gracias al compromiso, la dedicación y el esfuerzo de quienes forman parte de Jet Van.",

  parrafo2:
    "Hoy queremos reconocer el trabajo que nos impulsa a seguir creciendo y agradecer a cada integrante de nuestro equipo por ser parte fundamental de este camino.",

  parrafo3:
    "Los invitamos a compartir un momento especial para celebrar lo que hemos construido juntos y mirar con entusiasmo hacia nuevos desafíos.",

  cierre:
    "Porque nuestro mayor impulso es nuestra gente.",
};

// ==========================================
// ANIMACIONES
// ==========================================

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 35,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.85,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// ==========================================
// COMPONENTE PRINCIPAL
// ==========================================

const Vestimenta = () => {
  return (
    <section
      id="mensaje-corporativo"
      className="
        relative
        flex w-full
        items-center justify-center
        overflow-hidden
        bg-white
        px-5 py-20
        sm:px-8 sm:py-28
      "
      style={{
        fontFamily: "'Montserrat', sans-serif",
      }}
    >
      {/* =====================================
          TARJETA PRINCIPAL AZUL MARINO
      ===================================== */}

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        className="
          relative z-10
          grid w-full max-w-6xl
          grid-cols-1 lg:grid-cols-2
          overflow-hidden
          rounded-[2rem]
          border border-[#D9B56D]/40
          bg-[#07182F]
          shadow-[0_20px_70px_rgba(0,0,0,0.20)]
        "
      >
        {/* =====================================
            COLUMNA IZQUIERDA - IMAGEN
        ===================================== */}

        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
          className="
            relative
            min-h-[330px]
            overflow-hidden
            sm:min-h-[440px]
            lg:min-h-full
          "
        >
          {/* FOTOGRAFÍA GRUPAL */}
          <img
            src="/grupal.png"
            alt="Imagen ilustrativa de un equipo corporativo Jet Van"
            className="
              absolute inset-0
              h-full w-full
              object-cover object-center
            "
          />

          {/* OVERLAY AZUL MARINO */}
          <div
            className="
              absolute inset-0
              bg-gradient-to-t
              from-[#06172E]
              via-[#06172E]/30
              to-transparent
            "
          />

          {/* MARCO DECORATIVO */}
          <div
            className="
              absolute inset-5
              rounded-xl
              border border-[#E8C67D]/40
              sm:inset-8
            "
          />

          {/* DECORACIÓN SUPERIOR */}
          <div
            className="
              absolute
              left-1/2 top-10
              flex -translate-x-1/2
              items-center gap-3
              text-[#E8C67D]
            "
          >
            <span className="h-px w-10 bg-[#E8C67D]/70" />

            <Sparkles
              size={19}
              strokeWidth={1.4}
            />

            <span className="h-px w-10 bg-[#E8C67D]/70" />
          </div>

          {/* TEXTO SOBRE LA IMAGEN */}
          <div
            className="
              absolute
              bottom-12 left-8 right-8
              text-center
              sm:bottom-16
            "
          >
            <p
              className="
                text-xs font-medium
                uppercase
                tracking-[0.35em]
                text-[#E8C67D]
              "
            >
              Jet Van
            </p>

            <h3
              className="
                mt-3
                text-4xl sm:text-5xl
                font-medium italic
                text-white
              "
              style={{
                fontFamily:
                  "'Cormorant Garamond', serif",
              }}
            >
              Celebramos juntos
            </h3>

            <p
              className="
                mt-3
                text-xs sm:text-sm
                tracking-[0.2em]
                text-[#F1E9DA]
              "
            >
              FIESTA DE FIN DE AÑO 2026
            </p>
          </div>
        </motion.div>

        {/* =====================================
            COLUMNA DERECHA - MENSAJE
        ===================================== */}

        <div
          className="
            relative
            flex flex-col
            items-center justify-center
            bg-[#07182F]
            px-7 py-14
            text-center
            sm:px-12 sm:py-16
            lg:px-14 lg:py-20
          "
        >
          {/* LÍNEA DORADA SUPERIOR */}
          <div
            className="
              absolute
              left-1/2 top-0
              h-[3px] w-32
              -translate-x-1/2
              bg-gradient-to-r
              from-transparent
              via-[#E8C67D]
              to-transparent
            "
          />

          {/* ICONO */}
          <motion.div
            variants={fadeUp}
            className="
              mb-6
              flex h-16 w-16
              items-center justify-center
              rounded-full
              border border-[#D9B56D]/50
              bg-[#D9B56D]/10
            "
          >
            <Award
              size={29}
              strokeWidth={1.3}
              className="text-[#E8C67D]"
            />
          </motion.div>

          {/* ENCABEZADO */}
          <motion.p
            variants={fadeUp}
            className="
              text-[10px] sm:text-xs
              font-semibold
              uppercase
              tracking-[0.25em]
              text-[#E8C67D]
            "
          >
            {mensaje.encabezado}
          </motion.p>

          {/* TÍTULO */}
          <motion.div
            variants={fadeUp}
            className="mt-5"
            style={{
              fontFamily:
                "'Cormorant Garamond', serif",
            }}
          >
            <h2
              className="
                text-4xl sm:text-5xl lg:text-6xl
                font-medium
                leading-[1.05]
                text-white
              "
            >
              {mensaje.titulo}
            </h2>

            <p
              className="
                mt-1
                text-4xl sm:text-5xl lg:text-6xl
                font-medium italic
                leading-tight
                text-[#E8C67D]
              "
            >
              {mensaje.destacado}
            </p>
          </motion.div>

          {/* DIVISOR */}
          <motion.div
            variants={fadeUp}
            className="my-8 flex items-center gap-3"
          >
            <span className="h-px w-12 bg-[#D9B56D]/70" />

            <span
              className="
                h-2 w-2
                rotate-45
                border border-[#D9B56D]
              "
            />

            <span className="h-px w-12 bg-[#D9B56D]/70" />
          </motion.div>

          {/* PÁRRAFOS */}
          <motion.div
            variants={fadeUp}
            className="
              flex max-w-md
              flex-col gap-5
              text-sm sm:text-[15px]
              font-light
              leading-7 sm:leading-8
              text-[#EDE6D9]
            "
          >
            <p>{mensaje.parrafo1}</p>
            <p>{mensaje.parrafo2}</p>
            <p>{mensaje.parrafo3}</p>
          </motion.div>

          {/* MENSAJE FINAL */}
          <motion.div
            variants={fadeUp}
            className="
              mt-9
              w-full max-w-md
              border-t border-[#D9B56D]/35
              pt-8
            "
          >
            <p
              className="
                text-2xl sm:text-3xl
                font-medium italic
                leading-relaxed
                text-[#E8C67D]
              "
              style={{
                fontFamily:
                  "'Cormorant Garamond', serif",
              }}
            >
              {mensaje.cierre}
            </p>
          </motion.div>

          {/* FIRMA */}
          <motion.div
            variants={fadeUp}
            className="mt-9 flex items-center gap-3"
          >
            <span className="h-px w-8 bg-[#D9B56D]/70" />

            <span
              className="
                text-[11px]
                font-semibold
                uppercase
                tracking-[0.25em]
                text-[#E8C67D]
              "
            >
              Jet Van · 2026
            </span>

            <span className="h-px w-8 bg-[#D9B56D]/70" />
          </motion.div>

          {/* LÍNEA DORADA INFERIOR */}
          <div
            className="
              absolute
              bottom-0 left-1/2
              h-[3px] w-32
              -translate-x-1/2
              bg-gradient-to-r
              from-transparent
              via-[#E8C67D]
              to-transparent
            "
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Vestimenta;
