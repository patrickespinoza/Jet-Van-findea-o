import React from "react";
import { motion } from "framer-motion";

const Vestimenta = () => {

  const fadeUp = {
    hidden: {
      opacity: 0,
      y: 40,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
      },
    },
  };

  return (
    <div className="w-full bg-[#F7F4ED] py-2 px-0 flex items-center justify-center overflow-hidden">

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="
          relative max-w-6xl w-full
          bg-white
          rounded-tl-[3rem] sm:rounded-tl-[4rem]
          rounded-br-[3rem] sm:rounded-br-[4rem]
          rounded-tr-[1rem]
          rounded-bl-[1rem]
          shadow-[0_15px_50px_rgba(0,0,0,0.12)]
          overflow-hidden
          grid grid-cols-1 lg:grid-cols-2
        "
      >

        {/* IMAGEN */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="
            relative
            h-[280px]
            sm:h-[420px]
            md:h-[500px]
            lg:h-full
            min-h-[300px]
          "
        >

          <img
            src="/dress-code2.png"
            alt="Vestimenta"
            className="
              w-full h-full
              object-cover
              object-center
            "
          />

          {/* Overlay elegante */}
          <div className="absolute inset-0 bg-black/10"></div>

        </motion.div>

        {/* TEXTO */}
        <div
          className="
            flex flex-col items-center justify-center
            text-center
            p-8
            sm:p-12
            lg:p-16
          "
        >

          <motion.p
            initial={{ opacity: 0, letterSpacing: "0.5em" }}
            whileInView={{ opacity: 1, letterSpacing: "0.2em" }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="
              uppercase
              text-[11px]
              sm:text-sm
              tracking-[0.2em]
              text-[#B89B5E]
              font-semibold
            "
          >
            Código de Vestimenta
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
            className="
              text-3xl
              sm:text-4xl
              md:text-5xl
              lg:text-6xl
              font-playfair
              text-black
              mt-5
              leading-tight
            "
          >
            Vestimenta Formal
          </motion.h1>

          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "6rem" }}
            transition={{ duration: 1, delay: 0.4 }}
            viewport={{ once: true }}
            className="h-[2px] bg-[#B89B5E] mt-6"
          />

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            viewport={{ once: true }}
            className="
              mt-6 sm:mt-8
              text-base
              sm:text-lg
              md:text-xl
              text-black/70
              leading-relaxed
              max-w-md
              font-[DancingScript]
            "
          >
            Queremos compartir contigo una noche elegante y especial.
            Te invitamos a asistir con vestimenta formal para celebrar
            juntos este momento inolvidable.
          </motion.p>

          {/* FRASE */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            viewport={{ once: true }}
            className="
              mt-8 sm:mt-10
              text-[#B89B5E]
              text-xs sm:text-sm
              tracking-[0.2em]
              text-center
            "
          >
            ✦ Elegancia • Glamour • Celebración ✦
          </motion.div>

        </div>

      </motion.div>
    </div>
  );
};

export default Vestimenta;