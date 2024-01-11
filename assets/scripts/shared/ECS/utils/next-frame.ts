export const nextFrame = () =>
  new Promise((resolve, reject) => {
    requestAnimationFrame(() => resolve(null));
  });
