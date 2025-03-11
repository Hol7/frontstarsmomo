// pages/index.js
'use client'

import { useEffect, useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';

export default function Home() {
  const [loading, setLoading] = useState(0);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setLoading(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 1;
      });
    }, 30);
    
    return () => clearInterval(timer);
  }, []);
  
  // Animation variants for floating elements
  const floatAnimation = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse"
      }
    }
  };
  
  const coinVariants = {
    initial: { opacity: 0, x: -100, y: 100 },
    animate: (i) => ({
      opacity: 1,
      x: "calc(100vw + 100px)",
      y: -100,
      transition: {
        x: { duration: 10, repeat: Infinity, repeatType: "loop", delay: i * 0.8 },
        y: { duration: 10, repeat: Infinity, repeatType: "loop", delay: i * 0.8 },
      }
    })
  };
  
  const starVariants = {
    initial: { opacity: 0, x: -100, y: -100 },
    animate: (i) => ({
      opacity: 1,
      x: "calc(100vw + 100px)",
      y: 100,
      rotate: 360,
      transition: {
        x: { duration: 12, repeat: Infinity, repeatType: "loop", delay: i * 0.5 },
        y: { duration: 12, repeat: Infinity, repeatType: "loop", delay: i * 0.5 },
        rotate: { duration: 6, repeat: Infinity, ease: "linear" }
      }
    })
  };
  
  // Generate floating elements
  const coins = Array.from({ length: 5 }, (_, i) => (
    <motion.div
      key={`coin-${i}`}
      className="absolute"
      style={{ left: `-50px`, top: `${Math.random() * 70 + 10}%` }}
      variants={coinVariants}
      initial="initial"
      animate="animate"
      custom={i}
    >
      <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
        <div className="w-10 h-10 bg-yellow-300 rounded-full flex items-center justify-center text-yellow-600 font-bold">$</div>
      </div>
    </motion.div>
  ));
  
  const stars = Array.from({ length: 5 }, (_, i) => (
    <motion.div
      key={`star-${i}`}
      className="absolute"
      style={{ left: `-50px`, top: `${Math.random() * 70 + 10}%` }}
      variants={starVariants}
      initial="initial"
      animate="animate"
      custom={i}
    >
      <div className="text-4xl text-pink-400">★</div>
    </motion.div>
  ));
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      <Head>
        <title>STARS MOMO</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      {/* Background with grid effect */}
      <div className="absolute inset-0 bg-purple-900 bg-opacity-90">
        <div className="absolute inset-0" style={{
          backgroundImage: "linear-gradient(to right, rgba(126, 34, 206, 0.3) 1px, transparent 1px), linear-gradient(to bottom, rgba(126, 34, 206, 0.3) 1px, transparent 1px)",
          backgroundSize: "50px 50px"
        }}></div>
        
        {/* Electric sparks effect */}
        <div className="absolute inset-0">
          {Array.from({ length: 20 }).map((_, i) => (
            <div 
              key={i}
              className="absolute bg-purple-300 opacity-50 blur-sm"
              style={{
                width: `${Math.random() * 4 + 1}px`,
                height: `${Math.random() * 100 + 20}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                transform: `rotate(${Math.random() * 360}deg)`,
                animation: `spark ${Math.random() * 3 + 2}s infinite alternate ${Math.random() * 2}s`
              }}
            ></div>
          ))}
        </div>
      </div>
      
      {/* Floating elements */}
      {coins}
      {stars}
      
      {/* Main content */}
      <motion.div 
        className="z-10 flex flex-col items-center justify-center text-center px-4"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Logo */}
        <div className="relative mb-8">
          <motion.div 
            variants={floatAnimation}
            animate="animate"
            className="text-7xl md:text-9xl font-bold tracking-tighter drop-shadow-xl"
          >
            <span className="text-red-500 relative">
              STARS
              <motion.span 
                className="absolute -top-6 -right-4 text-4xl text-yellow-400"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                ★
              </motion.span>
              <motion.span 
                className="absolute -top-8 -left-4 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center shadow-md"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
              >
                <span className="text-yellow-600 text-sm font-bold">$</span>
              </motion.span>
            </span>
            <br />
            <span className="text-sky-500 relative">
              MOMO
              <motion.div 
                className="absolute -top-2 right-0 w-10 h-10 bg-pink-300 rounded-full"
                animate={{ y: [0, -7, 0] }}
                transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
              >
                <div className="w-4 h-12 bg-red-400 absolute left-3 -top-8 rounded-t-full"></div>
                <div className="w-8 h-3 bg-white absolute top-1 left-1 rounded-full"></div>
              </motion.div>
            </span>
          </motion.div>
        </div>
        
        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-white text-xl mb-12 max-w-md"
        >
          The sweet way to earn rewards on Telegram
        </motion.p>
      </motion.div>
      
      {/* Progress bar at bottom */}
      <div className="fixed bottom-12 left-0 right-0 flex flex-col items-center px-6 z-20">
        <div className="text-white text-lg mb-2 font-medium">Loading..</div>
        <div className="w-full max-w-md h-4 bg-purple-800 rounded-full overflow-hidden relative">
          <motion.div 
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
            initial={{ width: "0%" }}
            animate={{ width: `${loading}%` }}
            transition={{ duration: 0.5 }}
          ></motion.div>
        </div>
        <div className="text-white text-sm mt-2 opacity-60">Please wait a few seconds</div>
      </div>
      
      {/* Get Started Button */}
      <motion.button
        initial={{ opacity: 0, y: 50 }}
        animate={{ 
          opacity: loading === 100 ? 1 : 0,
          y: loading === 100 ? 0 : 50 
        }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="fixed bottom-24 bg-gradient-to-r from-yellow-500 to-pink-500 text-white font-bold py-3 px-8 rounded-full shadow-lg z-20 text-lg"
      >
        <a href='https://t.me/+22965986714' >
        Get Started
        </a>
       
      </motion.button>
      
      {/* Global styles */}
      <style jsx global>{`
        @keyframes spark {
          0% { opacity: 0.2; }
          50% { opacity: 0.8; }
          100% { opacity: 0.2; }
        }
        
        body {
          margin: 0;
          padding: 0;
          overflow: hidden;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
      `}</style>
    </div>
  );
}