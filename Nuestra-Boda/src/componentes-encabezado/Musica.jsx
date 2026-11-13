
import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Music2, Volume2, VolumeX, Sparkles } from "lucide-react";

// ==========================================
// CONFIGURACIÓN EDITABLE - WEDLY
// ==========================================

const CONFIG = {
  cancion: "/musica.mp3",
  volumen: 0.45,
  titulo: "Una melodía para nuestro amor",
  descripcion:
    "Hemos elegido una canción especial para acompañarte durante esta invitación.",
};

// ==========================================
// COMPONENTE MÚSICA
// ==========================================

const Musica = () => {
  const audioRef = useRef(null);

  const [mostrarVentana, setMostrarVentana] = useState(true);
  const [reproduciendo, setReproduciendo] = useState(false);

  // ==========================================
  // CONFIGURAR AUDIO
  // ==========================================

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = CONFIG.volumen;
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  // ==========================================
  // INICIAR MÚSICA
  // ==========================================

  const iniciarMusica = async () => {
    const audio = audioRef.current;

    if (!audio) return;

    try {
      await audio.play();
      setReproduciendo(true);
      setMostrarVentana(false);
    } catch (error) {
      console.warn("No se pudo reproducir la música:", error);
      setReproduciendo(false);
      setMostrarVentana(false);
    }
  };

  // ==========================================
  // CONTINUAR SIN MÚSICA
  // ==========================================

  const continuarSinMusica = () => {
    setReproduciendo(false);
    setMostrarVentana(false);
  };

  // ==========================================
  // ACTIVAR / DESACTIVAR MÚSICA
  // ==========================================

  const alternarMusica = async () => {
    const audio = audioRef.current;

    if (!audio) return;

    if (reproduciendo) {
      audio.pause();
      setReproduciendo(false);
    } else {
      try {
        await audio.play();
        setReproduciendo(true);
      } catch (error) {
        console.warn("No se pudo reproducir la música:", error);
      }
    }
  };

  return (
    <>
      {/* ======================================
          AUDIO
      ====================================== */}

      <audio ref={audioRef} loop preload="none">
        <source src={CONFIG.cancion} type="audio/mpeg" />
      </audio>

      {/* ======================================
          VENTANA EMERGENTE
      ====================================== */}

      <AnimatePresence>
        {mostrarVentana && (
          <motion.div
            key="modal-musica"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="
              fixed
              inset-0
              z-[9999]
              flex
              items-center
              justify-center
              overflow-y-auto
              bg-black/65
              px-5
              py-8
            "
          >
            {/* TARJETA */}

            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="titulo-musica"
              initial={{
                opacity: 0,
                y: 45,
                scale: 0.94,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: 25,
                scale: 0.96,
              }}
              transition={{
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                relative
                my-auto
                w-full
                max-w-md
                overflow-hidden
                rounded-tl-[4rem]
                rounded-br-[4rem]
                rounded-tr-[1rem]
                rounded-bl-[1rem]
                border
                border-[#E7D7B1]
                bg-[#F7F4ED]
                px-7
                py-12
                text-center
                shadow-[0_20px_60px_rgba(0,0,0,0.22)]
                sm:px-10
                sm:py-14
              "
            >
              {/* MARCO DECORATIVO */}

              <div
                className="
                  pointer-events-none
                  absolute
                  inset-3
                  rounded-tl-[3.4rem]
                  rounded-br-[3.4rem]
                  rounded-tr-[0.7rem]
                  rounded-bl-[0.7rem]
                  border
                  border-[#B89B5E]/40
                "
              />

              <div className="relative z-10">

                {/* ORNAMENTO SUPERIOR */}

                <div
                  className="
                    mb-8
                    flex
                    items-center
                    justify-center
                    gap-4
                  "
                >
                  <span className="h-px w-10 bg-[#B89B5E]" />

                  <Sparkles
                    size={19}
                    strokeWidth={1.2}
                    className="text-[#B89B5E]"
                  />

                  <span className="h-px w-10 bg-[#B89B5E]" />
                </div>

                {/* ÍCONO MUSICAL */}

                <motion.div
                  animate={{
                    y: [0, -5, 0],
                  }}
                  transition={{
                    duration: 3.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="
                    mx-auto
                    mb-7
                    flex
                    h-20
                    w-20
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-[#B89B5E]
                    bg-white
                    text-[#B89B5E]
                  "
                >
                  <Music2
                    size={36}
                    strokeWidth={1.2}
                  />
                </motion.div>

                {/* ETIQUETA */}

                <p
                  className="
                    mb-4
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.3em]
                    text-[#B89B5E]
                    sm:text-xs
                  "
                >
                  Nuestra Boda
                </p>

                {/* TÍTULO */}

                <h2
                  id="titulo-musica"
                  className="
                    font-playfair
                    text-3xl
                    font-normal
                    leading-tight
                    text-[#29241E]
                    sm:text-4xl
                  "
                >
                  {CONFIG.titulo}
                </h2>

                {/* DIVISOR */}

                <div
                  className="
                    mx-auto
                    my-7
                    h-px
                    w-20
                    bg-[#B89B5E]
                  "
                />

                {/* DESCRIPCIÓN */}

                <p
                  className="
                    mx-auto
                    max-w-xs
                    font-playfair
                    text-sm
                    leading-[1.9]
                    text-[#5B544A]
                    sm:text-base
                  "
                >
                  {CONFIG.descripcion}
                </p>

                <p
                  className="
                    mt-5
                    text-sm
                    italic
                    text-[#8A754C]
                  "
                >
                  ¿Deseas escucharla?
                </p>

                {/* BOTONES */}

                <div
                  className="
                    mt-9
                    flex
                    flex-col
                    gap-3
                  "
                >
                  {/* SÍ, ESCUCHAR */}

                  <motion.button
                    type="button"
                    onClick={iniciarMusica}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="
                      flex
                      w-full
                      items-center
                      justify-center
                      gap-3
                      rounded-full
                      bg-[#B89B5E]
                      px-6
                      py-4
                      text-sm
                      font-medium
                      tracking-wide
                      text-white
                      transition-colors
                      hover:bg-[#A58A50]
                    "
                  >
                    <Volume2 size={19} />
                    Sí, escuchar música
                  </motion.button>

                  {/* NO, CONTINUAR */}

                  <motion.button
                    type="button"
                    onClick={continuarSinMusica}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="
                      flex
                      w-full
                      items-center
                      justify-center
                      gap-3
                      rounded-full
                      border
                      border-[#B89B5E]/60
                      bg-white
                      px-6
                      py-4
                      text-sm
                      font-medium
                      tracking-wide
                      text-[#7B6744]
                      transition-colors
                      hover:bg-[#F0E8D9]
                    "
                  >
                    <VolumeX size={19} />
                    Continuar sin música
                  </motion.button>
                </div>

                {/* ORNAMENTO FINAL */}

                <div
                  className="
                    mt-9
                    flex
                    items-center
                    justify-center
                    gap-4
                  "
                >
                  <span className="h-px w-10 bg-[#B89B5E]/60" />

                  <span className="text-[#B89B5E]">
                    ✦
                  </span>

                  <span className="h-px w-10 bg-[#B89B5E]/60" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ======================================
          BOTÓN FLOTANTE DE MÚSICA
      ====================================== */}

      {!mostrarVentana && (
        <motion.button
          type="button"
          onClick={alternarMusica}
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          aria-label={
            reproduciendo
              ? "Pausar música"
              : "Reproducir música"
          }
          title={
            reproduciendo
              ? "Pausar música"
              : "Reproducir música"
          }
          className="
            fixed
            bottom-6
            right-5
            z-[9998]
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-full
            border-2
            border-[#E7D7B1]
            bg-[#B89B5E]
            text-white
            shadow-[0_8px_25px_rgba(0,0,0,0.18)]
            transition-colors
            hover:bg-[#A58A50]
            sm:bottom-8
            sm:right-8
          "
        >
          {reproduciendo ? (
            <Volume2 size={24} strokeWidth={1.7} />
          ) : (
            <VolumeX size={24} strokeWidth={1.7} />
          )}
        </motion.button>
      )}
    </>
  );
};

export default Musica;
