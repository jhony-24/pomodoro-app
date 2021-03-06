import { combine, createApi, createEvent, createStore } from 'effector';
import { secondsToMinutes } from '@pomodoro/utils';
import alarm from '../../../../assets/alarm.mp3';

const audio = new Audio();

function timer() {
  /* --------------------------------- stores --------------------------------- */

  const $completed = createStore(false);
  const $running = createStore(false);
  const $minutes = createStore({ type: 'normal', value: 1 });
  const $seconds = combine($minutes, (minutes) => {
    return minutes.value * 60;
  });
  const $runningCounter = combine([$running, $seconds]);
  const $formatTime = combine($seconds, secondsToMinutes);
  const $timerMinutes = createStore({
    normal: 1,
    short: 5,
    long: 25,
  });

  const $progressPercentaje = combine(
    $minutes,
    $seconds,
    (minutes, seconds) => {
      return 100 - (seconds * 100) / (minutes.value * 60);
    }
  );

  /* ------------------------------ event actions ----------------------------- */

  const decrement = createEvent();
  const setTotalSeconds = createEvent();
  const resetCounter = createEvent();
  const changeMinutes = createEvent();
  const changeTimerMinutes = createEvent();

  const changeToNewMinutes = (type, value) =>
    changeMinutes({
      type,
      value: Number(value),
    });

  const runningApi = createApi($running, {
    onStart: () => true,
    onPause: () => false,
    onToggleRunning: (value) => !value,
  });

  const completedApi = createApi($completed, {
    onReset: () => false,
    onSuccess: () => true,
  });

  $minutes.on(changeMinutes, (_, payload) => payload);
  $timerMinutes.on(changeTimerMinutes, (timerMinutes, payload) => {
    if (payload.target) {
      const { name: type, value } = payload.target;
      changeToNewMinutes(type, value);

      return {
        ...timerMinutes,
        [type]: Number(value),
      };
    }
    const typeMinuteSelected = $minutes.getState().type;
    changeToNewMinutes(typeMinuteSelected, payload[typeMinuteSelected]);
    return payload;
  });

  $seconds
    .on(setTotalSeconds, (_, payload) => {
      changeMinutes(payload);

      return payload.value * 60;
    })
    .on(decrement, (value) => value - 1)
    .on(resetCounter, () => {
      setTotalSeconds($minutes.getState());
      completedApi.onReset();
    });

  $completed.watch((completed) => {
    if (completed) {
      audio.src = alarm;
      audio.play();
    } else {
      audio.pause();
    }
  });

  let interval;
  $runningCounter.watch(([running, seconds]) => {
    if (seconds > 0 && running) {
      interval = setTimeout(() => {
        decrement();
      }, 1000);
    } else {
      clearTimeout(interval);
    }

    if (seconds === 0 && running) {
      runningApi.onPause();
      completedApi.onSuccess();
    }
  });

  return {
    $running,
    $seconds,
    $formatTime,
    $timerMinutes,
    $progressPercentaje,
    $completed,
    setTotalSeconds,
    changeTimerMinutes,
    resetCounter,
    ...runningApi,
    ...completedApi,
  };
}

export default timer();
