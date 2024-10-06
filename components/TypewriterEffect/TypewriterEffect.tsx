"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const phrases = ["Convesations", "Dialogues", "Scripts"];

export const TypewriterEffect = () => {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [speed, setSpeed] = useState(100);

  useEffect(() => {
    const handleTyping = () => {
      const currentPhrase = phrases[currentPhraseIndex];

      if (isDeleting) {
        setDisplayedText((prev) => prev.slice(0, -1)); // Supprimer une lettre
        setSpeed(80); // Vitesse plus rapide pour la suppression
      } else {
        setDisplayedText((prev) => currentPhrase.slice(0, prev.length + 1)); // Ajouter une lettre
        setSpeed(150); // Vitesse plus lente pour l'écriture
      }

      // Si la phrase est complète et on commence à supprimer
      if (!isDeleting && displayedText === currentPhrase) {
        setTimeout(() => setIsDeleting(true), 3000); // Pause avant de commencer à supprimer
      }

      // Si la suppression est terminée
      if (isDeleting && displayedText === "") {
        setIsDeleting(false); // Arrêter de supprimer
        setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length); // Passer à la phrase suivante
      }
    };

    const timer = setTimeout(handleTyping, speed);
    return () => clearTimeout(timer); // Nettoyer le timer
  }, [displayedText, isDeleting, currentPhraseIndex, speed]);

  return (
    <motion.div animate={{ opacity: [0, 1] }} transition={{ duration: 0.5 }}>
      <h1 className="scroll-m-20 text-4xl text-center font-extrabold tracking-tight lg:text-5xl font-caption">
        Generate <br /> Real-life{" "}
        <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-300">
          {displayedText}
        </span>
        <br />
        to Learn a New Language
      </h1>
    </motion.div>
  );
};

export default TypewriterEffect;
