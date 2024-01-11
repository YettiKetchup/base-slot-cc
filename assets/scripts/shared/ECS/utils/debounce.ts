type Callback = (...args: any[]) => void;

export const debounce = (callback: Callback, delay: number = 0): Callback => {
  let timer: ReturnType<typeof setTimeout>;

  return (...args: any[]) => {
    if (timer) clearTimeout(timer);

    timer = setTimeout(() => {
      callback(...args);
    }, delay);
  };
};
