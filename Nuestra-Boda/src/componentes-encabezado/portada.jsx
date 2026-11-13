import React, { useRef, useState } from 'react';


export default function Portada() {
  const audioRef = useRef(null);
  const [isMuted, setIsMuted] = useState(false); 

  const handlePlayMusic = () => {
    if (audioRef.current) {
      audioRef.current.play().catch((error) => {
        console.error("Error al intentar reproducir el audio:", error);
      });
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted; 
      setIsMuted(!isMuted); 
    }
  };

  return (
    <div>
      <section className="relative w-full h-[calc(110vh-160px)] md:h-screen flex flex-col items-center justify-center text-white">
        <img
          src="/portada.png"
          alt="Fondo"
          className="absolute w-full h-full object-cover"
        />

        <div className="relative bg-opacity-50 rounded-lg w-full h-full justify-center items-center flex flex-col p-4 gap-4">
          <h1 className="roboto-black p-12 text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-serif">
            Nuestra Boda
          </h1>
          <p className="font-serif text-2xl sm:text-2xl md:text-3xl lg:text-4xl" >11 |
             06 | 2026
          </p>
          <p className="font-serif text-lg sm:text-2xl md:text-3xl lg:text-4xl">Karla & Mark</p>
        </div>
      </section>
    </div>
    
  );
}


