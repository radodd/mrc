"use client";
import { motion } from "framer-motion";
import styles from "../components/scss/HeroAnimation.module.scss";
import { useEffect, useRef, useState } from "react";

enum SliderPosition {
  Open = "open",
  Midway = "midway",
  Closed = "closed",
}

export default function SliderAnimation() {
  const [rotate, setRotate] = useState(false);
  const [position, setPosition] = useState<SliderPosition>(SliderPosition.Open);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotate((prev) => !prev);
    }, 2000); // Change every 2 seconds

    return () => clearInterval(interval);
  }, []);

  //   useEffect(() => {
  //     const interval = setInterval(() => {
  //       setIsOpen((prev) => !prev);
  //     }, 4000); // Change every 4 seconds

  //     return () => clearInterval(interval);
  //   }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition((prev) => {
        switch (prev) {
          case SliderPosition.Open:
            return SliderPosition.Midway;
          case SliderPosition.Midway:
            return SliderPosition.Closed;
          case SliderPosition.Closed:
          default:
            return SliderPosition.Open;
        }
      });
    }, 2000); // Change every 4 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.button}>
      <motion.div
        className={`${styles.slider} ${styles[position]}`}
        transition={{ duration: 0.5, type: "tween", ease: [0.76, 0, 0.24, 1] }}
      >
        <div
          className={`${styles.el} ${rotate ? styles.rotate : ""}`}
          onClick={() => {}}
        >
          <PerspectiveText label="Stoneyard" />
        </div>
        <div
          className={`${styles.el} ${rotate ? styles.rotate : ""}`}
          onClick={() => {}}
        >
          <PerspectiveText label="MRC Rock & Sand" />
        </div>
        <div
          className={`${styles.el} ${rotate ? styles.rotate : ""}`}
          onClick={() => {}}
        >
          <PerspectiveText label="Santa Paula Materials" />
        </div>
      </motion.div>
    </div>
  );
}

type PerspectiveTextProps = {
  label: string;
};

function PerspectiveText({ label }: PerspectiveTextProps) {
  return (
    <div className={styles.perspectiveText}>
      <p>{label}</p>
      <p>{label}</p>
      <p>{label}</p>
    </div>
  );
}
