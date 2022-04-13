const cardAnimations: {
  [key: string]: {
    frames: number;
    frame: number;
    resolve: (frame: number) => string;
    speed?: number;
  };
} = {
  default: {
    frame: 0,
    frames: 1,
    resolve: (frame) => `/assets/card/default${frame}.png`,
  },
  unturn: {
    frame: 0,
    frames: 6,
    resolve: (frame) => `/assets/card/unturn${frame}.png`,
  },
  explosion: {
    frame: 0,
    frames: 19,
    resolve: (frame) => `/assets/card/explosion${frame}.png`,
  },
  future: {
    frame: 0,
    frames: 10,
    resolve: (frame) => `/assets/card/future${frame}.png`,
    speed: 50,
  },
  skip: {
    frame: 0,
    frames: 4,
    resolve: (frame) => `/assets/card/skip${frame}.png`,
  },
};

export default cardAnimations;