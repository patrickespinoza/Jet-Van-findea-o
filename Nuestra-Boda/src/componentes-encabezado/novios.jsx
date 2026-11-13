import React from "react";
import { motion } from "framer-motion";

const Novios = () => {

  return (
    <div className="w-full bg-[#F7F4ED] py-20 px-6 flex items-center justify-center overflow-hidden">

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        viewport={{ once: true }}
        className="
          max-w-4xl w-full
          bg-white
          rounded-tl-[4rem]
          rounded-br-[4rem]
          rounded-tr-[1rem]
          rounded-bl-[1rem]
          shadow-[0_15px_50px_rgba(0,0,0,0.12)]
          px-8 py-16 sm:px-16
          text-center
          relative
          overflow-hidden
        "
      >

        {/* Glow elegante */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#E7D7B1]/20 via-transparent to-[#B89B5E]/10 pointer-events-none"></div>

        {/* Texto superior */}
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.4em" }}
          whileInView={{ opacity: 1, letterSpacing: "0.2em" }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="
            uppercase
            text-[#B89B5E]
            tracking-[0.2em]
            text-xs sm:text-sm
            font-semibold
          "
        >
          Nuestra Boda
        </motion.p>

        {/* Nombres */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true }}
          className="
            mt-10
            text-4xl sm:text-5xl md:text-6xl
            font-playfair
            text-black
            leading-tight
          "
        >
          Karla Martinez Sanchez
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
          className="
            my-6
            text-4xl sm:text-5xl
            text-[#B89B5E]
            font-[DancingScript]
          "
        >
          &
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          viewport={{ once: true }}
          className="
            text-4xl sm:text-5xl md:text-6xl
            font-playfair
            text-black
            leading-tight
          "
        >
          Mark Hernandez Salazar
        </motion.h1>

        {/* Línea */}
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "7rem" }}
          transition={{ duration: 1, delay: 0.6 }}
          viewport={{ once: true }}
          className="h-[2px] bg-[#B89B5E] mx-auto mt-10"
        />

        {/* Texto bendición */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          viewport={{ once: true }}
          className="
            mt-10
            text-xl sm:text-2xl
            text-black/70
            font-[DancingScript]
            leading-relaxed
          "
        >
          Con la bendición de nuestros padres
        </motion.p>

        {/* Padres */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-14">

          {/* Padres novio */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 1 }}
            viewport={{ once: true }}
            className="
              bg-[#F7F4ED]
              rounded-3xl
              p-8
              shadow-md
            "
          >

            <h2 className="
              text-[#B89B5E]
              uppercase
              tracking-[0.2em]
              text-sm
              mb-6
            ">
              Padres del Novio
            </h2>

            <p className="
              text-2xl
              font-playfair
              text-black
            ">
              Gael Hernandez
            </p>

            <p className="
              mt-3
              text-2xl
              font-playfair
              text-black
            ">
              Marta Salazar
            </p>

          </motion.div>

          {/* Padres novia */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
            viewport={{ once: true }}
            className="
              bg-[#F7F4ED]
              rounded-3xl
              p-8
              shadow-md
            "
          >

            <h2 className="
              text-[#B89B5E]
              uppercase
              tracking-[0.2em]
              text-sm
              mb-6
            ">
              Padres de la Novia
            </h2>

            <p className="
              text-2xl
              font-playfair
              text-black
            ">
              Jose Martinez
            </p>

            <p className="
              mt-3
              text-2xl
              font-playfair
              text-black
            ">
              Karla Sanchez
            </p>

          </motion.div>

        </div>

      </motion.div>
    </div>
  );
};

export default Novios;