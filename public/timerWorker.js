let initTime = 0;
let time = 0;
let interval;

self.addEventListener('message', (e) => {
  const { cmd, payload } = e.data;

  if (!cmd) return;

  switch (cmd) {
    case 'timerInit':
      initTime = payload;

      time = initTime;

      return;
    case 'timerStart':
      if (interval) clearInterval(interval);

      self.postMessage({ currentTime: time });

      if (time === 0) {
        return;
      }

      interval = setInterval(() => {
        time -= 1;

        self.postMessage({ currentTime: time });

        if (time === 0) clearInterval(interval);
      }, 1000);

      return;
    case 'timerStop':
      if (interval) clearInterval(interval);

      return;
    case 'timerReset':
      time = initTime;

      self.postMessage({ currentTime: time });

      return;
    default:
      break;
  }
});
