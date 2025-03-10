// useAnimatedWords.js
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const useAnimatedWords = (text, speed = 750) => {
    const [animatedWords, setAnimatedWords] = useState([]);
    const words = text.split(" ");

    useEffect(() => {
        const animationInterval = setInterval(() => {
            setAnimatedWords((prevAnimatedWords) => {
                const nextIndex = (prevAnimatedWords.length === 0) ? 0 : words.indexOf(prevAnimatedWords[prevAnimatedWords.length - 1]) + 1;

                if (nextIndex < words.length) {
                    return words.slice(0, nextIndex + 1);
                } else {
                    clearInterval(animationInterval); // Stop when all words have appeared
                    return words;  // Keep all words visible at the end
                }
            });
        }, speed);  // Adjust the timing here

        return () => clearInterval(animationInterval);
    }, [text, words, speed]);

    const wordVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.3, ease: "easeOut" }, // Reduced duration for faster animation
        },
        exit: { opacity: 0, y: -20, transition: { duration: 0.2, ease: "easeIn" } }, // Reduced duration for faster exit
    };

    return { animatedWords, wordVariants };
};

export default useAnimatedWords;