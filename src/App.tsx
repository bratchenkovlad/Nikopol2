import React, { useState, useRef, useEffect } from "react";

const steamUrl = "https://steamcommunity.com/profiles/76561199510696270";
const instaUrl = "https://www.instagram.com/stofi_xd/";
const discordNick = "storfulleye06";

export default function App(): JSX.Element {
  const audioSrc =
    "https://www.dropbox.com/scl/fi/5h2jidpmv4xo9syofz0rp/Imported_20161216-231024.mp3?rlkey=8l5ahukcuscwiwgvwptpnmyey&st=gbqy5cnx&raw=1";

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [playing, setPlaying] = useState<boolean>(false);
  const [overlayVisible, setOverlayVisible] = useState<boolean>(true);
  const [fadeIn, setFadeIn] = useState<boolean>(false);
  const [themeDark, setThemeDark] = useState<boolean>(true);

  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [volume, setVolume] = useState<number>(1);
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    if (!overlayVisible) {
      setFadeIn(true);

      if (audioRef.current) {
        audioRef.current.volume = volume;
        audioRef.current
          .play()
          .then(() => setPlaying(true))
          .catch(() => setPlaying(false));
      }
    }
  }, [overlayVisible]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onDurationChange = () => setDuration(audio.duration);

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onDurationChange);

    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onDurationChange);
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play();
      setPlaying(true);
    }
  };

  const toggleTheme = () => {
    setThemeDark((prev) => !prev);
  };

  const handleOverlayClick = () => {
    setOverlayVisible(false);
  };

  const openLink = (url: string) => {
    const win = window.open(url, "_blank", "noopener,noreferrer");
    if (win) win.opener = null;
  };

  const copyDiscordNick = () => {
    navigator.clipboard.writeText(discordNick);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSocialClick = (name: string) => {
    if (name === "Discord") {
      copyDiscordNick();
    } else if (name === "Steam") {
      openLink(steamUrl);
    } else if (name === "Instagram") {
      openLink(instaUrl);
    }
  };

  const formatRemainingTime = (): string => {
    const remaining = duration - currentTime;

    if (isNaN(remaining) || remaining < 0) return "- 0:00";

    const m = Math.floor(remaining / 60);
    const s = Math.floor(remaining % 60)
      .toString()
      .padStart(2, "0");

    return `- ${m}:${s}`;
  };

  const buttonBg = themeDark ? "#000" : "#fff";
  const buttonTextColor = themeDark ? "#00ffff" : "#00bfae";

  return (
    <>
      {overlayVisible && (
        <div
          onClick={handleOverlayClick}
          style={{
            position: "fixed",
            inset: 0,
            background: themeDark
              ? "rgba(0, 0, 0, 0.95)"
              : "rgba(255, 255, 255, 0.95)",
            color: buttonTextColor,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontFamily: "'Poppins', sans-serif",
            fontSize: "3rem",
            letterSpacing: "0.1em",
            cursor: "pointer",
            userSelect: "none",
            zIndex: 9999,
            transition: "background-color 0.3s ease, color 0.3s ease",
          }}
        >
          Click me pls
        </div>
      )}

      <div
        className={fadeIn ? "fade-in" : ""}
        style={{
          filter: overlayVisible ? "blur(8px)" : "none",
          pointerEvents: overlayVisible ? "none" : "auto",
          position: "relative",
          minHeight: "100vh",
          margin: 0,
          padding: 40,
          backgroundImage: "url('https://i.redd.it/bwvo43iecmha1.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center center",
          color: themeDark ? "#f2f2f2" : "#222",
          fontFamily: "'Poppins', sans-serif",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          userSelect: "none",
          overflow: "hidden",
          height: "100vh",
          boxSizing: "border-box",
          transition: "color 0.3s ease",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.7)",
            zIndex: 0,
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "relative",
            zIndex: 1,
            maxWidth: 700,
            width: "100%",
          }}
        >
          <h1
            style={{
              backgroundColor: buttonBg,
              color: buttonTextColor,
              padding: "0.2em 0.6em",
              borderRadius: 8,
              boxShadow: `0 0 15px ${buttonTextColor}`,
              fontWeight: "700",
              fontSize: "3rem",
              marginBottom: 10,
              letterSpacing: "0.08em",
              userSelect: "text",
              display: "inline-block",
            }}
          >
            Hello brother from another mothe
          </h1>

          <p
            style={{
              backgroundColor: buttonBg,
              color: buttonTextColor,
              padding: "0.1em 0.5em",
              borderRadius: 6,
              boxShadow: `0 0 12px ${buttonTextColor}`,
              fontWeight: "600",
              fontSize: "1.2rem",
              marginBottom: 30,
              letterSpacing: "0.06em",
              fontFamily: "'Roboto', sans-serif",
              display: "inline-block",
              userSelect: "text",
            }}
          >
            Трек «Nikopol» — Gurren Lagann OST
          </p>

          <div
            style={{
              color: buttonTextColor,
              fontSize: "1rem",
              marginBottom: 30,
              letterSpacing: "0.1em",
              textShadow: "0 0 10px #00ffff",
              fontFamily: "'Roboto', sans-serif",
              userSelect: "none",
            }}
          >
            {formatRemainingTime()}
          </div>

          <button
            onClick={togglePlay}
            style={{
              backgroundColor: buttonBg,
              border: `2px solid ${buttonTextColor}`,
              padding: "16px 60px",
              borderRadius: 60,
              fontSize: "1.3rem",
              color: buttonTextColor,
              cursor: "pointer",
              boxShadow: playing
                ? `0 0 30px ${buttonTextColor}`
                : `0 0 12px ${themeDark ? "#005555" : "#009688"}`,
              transition: "all 0.3s ease",
              fontWeight: 600,
              letterSpacing: "0.1em",
              outline: "none",
              userSelect: "none",
              marginBottom: 40,
              minWidth: 150,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = buttonBg;
              e.currentTarget.style.boxShadow = `0 0 50px ${buttonTextColor}`;
              e.currentTarget.style.color = themeDark ? "#ccffff" : "#a6fff9";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = buttonBg;
              e.currentTarget.style.boxShadow = playing
                ? `0 0 30px ${buttonTextColor}`
                : `0 0 12px ${themeDark ? "#005555" : "#009688"}`;
              e.currentTarget.style.color = buttonTextColor;
            }}
            onMouseDown={(e) => {
              e.currentTarget.style.transform = "scale(0.95)";
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            {playing ? "Пауза" : "Воспроизвести"}
          </button>

          <audio ref={audioRef} src={audioSrc} loop />

          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={1}
            disabled
            style={{ display: "none" }} // скрываем слайдер громкости
          />

          <button
            onClick={() => setThemeDark(!themeDark)}
            style={{
              padding: "8px 20px",
              marginBottom: 40,
              borderRadius: 30,
              cursor: "pointer",
              border: `2px solid ${buttonTextColor}`,
              backgroundColor: themeDark ? "#000" : "#fff",
              color: buttonTextColor,
              fontWeight: 600,
              fontSize: "1rem",
              userSelect: "none",
              transition: "all 0.3s ease",
              minWidth: 140,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = themeDark
                ? "#00ffff22"
                : "#00968822";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = themeDark
                ? "#000"
                : "#fff";
            }}
          >
            Тема: {themeDark ? "Тёмная" : "Светлая"}
          </button>

          <div style={{ display: "flex", gap: 20, justifyContent: "center" }}>
            {["Steam", "Instagram", "Discord"].map((name) => (
              <button
                key={name}
                onClick={() => handleSocialClick(name)}
                style={{
                  padding: "10px 25px",
                  borderRadius: 20,
                  border: `2px solid ${buttonTextColor}`,
                  backgroundColor: themeDark ? "#000" : "#fff",
                  color: buttonTextColor,
                  fontWeight: 600,
                  cursor: "pointer",
                  userSelect: "none",
                  transition: "all 0.3s ease",
                  minWidth: 120,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = themeDark
                    ? "#00ffff22"
                    : "#00968822";
                  e.currentTarget.style.boxShadow = `0 0 15px ${buttonTextColor}`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = themeDark
                    ? "#000"
                    : "#fff";
                  e.currentTarget.style.boxShadow = "none";
                }}
                aria-label={name}
                title={
                  name === "Discord"
                    ? "Копировать Discord ник"
                    : `Перейти на ${name}`
                }
              >
                {name}
              </button>
            ))}
          </div>

          {copied && (
            <div
              style={{
                marginTop: 15,
                color: "#99ffff",
                textShadow: `0 0 12px ${buttonTextColor}`,
                fontFamily: "'Roboto', sans-serif",
                transition: "opacity 0.5s",
              }}
            >
              Ник Discord скопирован!
            </div>
          )}
        </div>
      </div>

      <style>{`
        .fade-in {
          animation: fadeIn 1s ease forwards;
        }
        @keyframes fadeIn {
          from {opacity: 0}
          to {opacity: 1}
        }
        html, body, #root {
          margin: 0;
          padding: 0;
          height: 100%;
          overflow-x: hidden;
        }
      `}</style>
    </>
  );
}
