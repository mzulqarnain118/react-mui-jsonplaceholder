import { keyframes } from "@mui/material/styles";
import { ANIMATIONS } from "../constants";

// Keyframe animations
export const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-20px);
  }
`;

export const slideInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const slideInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const slideInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(100%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const slideInDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-100%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const scaleIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

export const scaleOut = keyframes`
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0.8);
  }
`;

export const bounce = keyframes`
  0%, 20%, 53%, 80%, 100% {
    transform: translate3d(0, 0, 0);
  }
  40%, 43% {
    transform: translate3d(0, -30px, 0);
  }
  70% {
    transform: translate3d(0, -15px, 0);
  }
  90% {
    transform: translate3d(0, -4px, 0);
  }
`;

export const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

export const shake = keyframes`
  0%, 100% {
    transform: translateX(0);
  }
  10%, 30%, 50%, 70%, 90% {
    transform: translateX(-10px);
  }
  20%, 40%, 60%, 80% {
    transform: translateX(10px);
  }
`;

export const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

// Animation configurations
export const animationConfigs = {
  fadeIn: {
    animation: `${fadeIn} ${ANIMATIONS.DURATION.NORMAL}ms ${ANIMATIONS.EASING.EASE_OUT}`,
  },
  fadeOut: {
    animation: `${fadeOut} ${ANIMATIONS.DURATION.NORMAL}ms ${ANIMATIONS.EASING.EASE_IN}`,
  },
  slideInLeft: {
    animation: `${slideInLeft} ${ANIMATIONS.DURATION.NORMAL}ms ${ANIMATIONS.EASING.EASE_OUT}`,
  },
  slideInRight: {
    animation: `${slideInRight} ${ANIMATIONS.DURATION.NORMAL}ms ${ANIMATIONS.EASING.EASE_OUT}`,
  },
  slideInUp: {
    animation: `${slideInUp} ${ANIMATIONS.DURATION.NORMAL}ms ${ANIMATIONS.EASING.EASE_OUT}`,
  },
  slideInDown: {
    animation: `${slideInDown} ${ANIMATIONS.DURATION.NORMAL}ms ${ANIMATIONS.EASING.EASE_OUT}`,
  },
  scaleIn: {
    animation: `${scaleIn} ${ANIMATIONS.DURATION.NORMAL}ms ${ANIMATIONS.EASING.EASE_OUT}`,
  },
  scaleOut: {
    animation: `${scaleOut} ${ANIMATIONS.DURATION.NORMAL}ms ${ANIMATIONS.EASING.EASE_IN}`,
  },
  bounce: {
    animation: `${bounce} ${ANIMATIONS.DURATION.SLOW}ms ${ANIMATIONS.EASING.EASE_OUT}`,
  },
  pulse: {
    animation: `${pulse} ${ANIMATIONS.DURATION.SLOW}ms ${ANIMATIONS.EASING.EASE_IN_OUT} infinite`,
  },
  shake: {
    animation: `${shake} ${ANIMATIONS.DURATION.SLOW}ms ${ANIMATIONS.EASING.EASE_IN_OUT}`,
  },
  spin: {
    animation: `${spin} 1s linear infinite`,
  },
};

// Transition configurations
export const transitionConfigs = {
  smooth: {
    transition: `all ${ANIMATIONS.DURATION.NORMAL}ms ${ANIMATIONS.EASING.EASE_IN_OUT}`,
  },
  fast: {
    transition: `all ${ANIMATIONS.DURATION.FAST}ms ${ANIMATIONS.EASING.EASE_OUT}`,
  },
  slow: {
    transition: `all ${ANIMATIONS.DURATION.SLOW}ms ${ANIMATIONS.EASING.EASE_IN_OUT}`,
  },
  hover: {
    transition: `transform ${ANIMATIONS.DURATION.FAST}ms ${ANIMATIONS.EASING.EASE_OUT}`,
    "&:hover": {
      transform: "translateY(-2px)",
    },
  },
  scale: {
    transition: `transform ${ANIMATIONS.DURATION.FAST}ms ${ANIMATIONS.EASING.EASE_OUT}`,
    "&:hover": {
      transform: "scale(1.02)",
    },
  },
  glow: {
    transition: `box-shadow ${ANIMATIONS.DURATION.NORMAL}ms ${ANIMATIONS.EASING.EASE_OUT}`,
    "&:hover": {
      boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15)",
    },
  },
};

// Stagger animation helper
export const staggerChildren = (delay: number = 100) => ({
  "& > *": {
    animation: `${fadeIn} ${ANIMATIONS.DURATION.NORMAL}ms ${ANIMATIONS.EASING.EASE_OUT}`,
    animationFillMode: "both",
  },
  "& > *:nth-of-type(1)": { animationDelay: `${delay * 0}ms` },
  "& > *:nth-of-type(2)": { animationDelay: `${delay * 1}ms` },
  "& > *:nth-of-type(3)": { animationDelay: `${delay * 2}ms` },
  "& > *:nth-of-type(4)": { animationDelay: `${delay * 3}ms` },
  "& > *:nth-of-type(5)": { animationDelay: `${delay * 4}ms` },
  "& > *:nth-of-type(6)": { animationDelay: `${delay * 5}ms` },
});

// Loading animation for skeletons
export const skeletonPulse = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;

export const skeletonAnimation = {
  background: "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",
  backgroundSize: "200px 100%",
  animation: `${skeletonPulse} 1.5s ease-in-out infinite`,
};
