import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";
import "./App.css";
import bgImage from "./image/bg.jpg";

// 💕 8 photos + 4 videos
const mediaItems = [
  { id: 1, type: "video", src: "/videos/video1.mp4", note: "You are my sunshine❤" },
  { id: 2, type: "photo", src: "/images/photo2.png", note: "Your smile makes my day🧡" },
  { id: 3, type: "photo", src: "/images/photo3.png", note: "You are sooooo cute💛" },
  { id: 4, type: "photo", src: "/images/photo8.jpg", note: "When you walk in, even the stars pause to stare💚" },
  { id: 5, type: "photo", src: "/images/photo4.jpg", note: "You are not just stunnig - you are unforgettable🩵" },
  { id: 6, type: "video", src: "/videos/video2.mp4", note: "Your smile could light up the darkest night💙" },
  { id: 7, type: "video", src: "/videos/video3.mp4", note: "You are not just beautiful- you are magic💜" },
  { id: 8, type: "photo", src: "/images/photo6.jpg", note: "Your laugh is my favourite melody🤎" },
  { id: 9, type: "photo", src: "/images/photo1.png", note: "You look amazing even without trying🩶" },
  { id: 10, type: "photo", src: "/images/photo5.jpg", note: "Your voice feels like sunshine on a cloudy day🧡" },
  { id: 11, type: "photo", src: "/images/photo7.jpg", note: "Loving you feels like breathing🖤"},
  { id: 12, type: "video", src: "/videos/video4.mp4", note: "Your eyes tell stories I could read forever❤" },
];

export default function App() {
  const [stage, setStage] = useState("intro");
  const [flipped, setFlipped] = useState(() => new Set());
  const [showFinalImage, setShowFinalImage] = useState(false);
  const [confettiRunning, setConfettiRunning] = useState(false);
  const [musicOn, setMusicOn] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (musicOn) audioRef.current?.play().catch(() => {});
    else {
      audioRef.current?.pause();
      if (audioRef.current) audioRef.current.currentTime = 0;
    }
  }, [musicOn]);

  useEffect(() => {
    if (flipped.size === mediaItems.length) {
      setTimeout(() => {
        setConfettiRunning(true);
        setShowFinalImage(true);
        setTimeout(() => setStage("final"), 800);
      }, 600);
    }
  }, [flipped]);

  function handleFlip(id) {
    setFlipped((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <div className="container"
     style={{
    backgroundImage: `url(${bgImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    minHeight: "100vh"
  }}>
      <audio ref={audioRef} src="/music/romance.mp3" loop />

      

      <AnimatePresence>{confettiRunning && <Confetti />}</AnimatePresence>

      {/* INTRO */}
      {stage === "intro" && (
        <motion.div
          className="intro"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <h1>Hey  Shine ❤️</h1>
          <button onClick={() => setStage("message")}>Open this</button>
        </motion.div>
      )}

      {/* MESSAGE */}
      {stage === "message" && (
        <motion.div className="message" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <p>
            "I Love You a lot but i don't know how to express it or how to show it" <br></br>
             "I have never given anyone else this  kind of importance or priority" <br></br>
             "You are my first priority"<br></br>
             "Your are special for me"<br></br>
             "I love talking to you"<br></br>
             "I love listening to your voice"<br></br>
             "You are unforgettable in my life"<br></br>
             ❤🧡💛💚🩵💙💜🤎🖤🩶🤍🩷❤

          </p>
          <button onClick={() => setStage("gallery")}>Open</button>
        </motion.div>
      )}

      {/* GALLERY */}
      {stage === "gallery" && (
        <motion.div className="gallery" initial={{ opacity: 0 }} animate={{ opacity: 5 }}>
          <p className="hint"></p>

          <div className="card-grid">
            {mediaItems.map((item) => {
              const isFlipped = flipped.has(item.id);
              return (
                <div key={item.id} className="flip-card" onClick={() => handleFlip(item.id)}>
                  <div className={`flip-card-inner ${isFlipped ? "is-flipped" : ""}`}>
                    <div className="flip-card-front">
                      {item.type === "photo" ? (
                        <img
                          src={item.src}
                          alt={`photo-${item.id}`}
                          onError={(e) => {
                            e.currentTarget.src = `https://picsum.photos/seed/${item.id}/600/400`;
                          }}
                        />
                      ) : (
                        <video
                          src={item.src}
                          autoPlay
                          loop
                          muted
                          playsInline
                          onError={(e) => {
                            e.currentTarget.poster = `https://picsum.photos/seed/${item.id}/600/400`;
                          }}
                        />
                      )}
                    </div>
                    <div className="flip-card-back">
                      <p>{item.note}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <p className="hint"></p>
        </motion.div>
      )}

      {/* FINAL IMAGE */}
      <AnimatePresence>
        {showFinalImage && (
          <motion.div
            className="final-image"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <img
              src="/images/final.jpg"
              alt="final love"
              className="final-photo"
              onError={(e) => {
                e.currentTarget.src = "https://picsum.photos/800/600";
              }}
            />
            <div className="final-buttons">
              <button
                onClick={() => {
                  setConfettiRunning(false);
                  setShowFinalImage(false);
                  setStage("intro");
                  setFlipped(new Set());
                  setMusicOn(false);
                }}
              >
                Replay
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
