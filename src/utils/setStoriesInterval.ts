import React, { useEffect } from "react";

export const setStoriesInterval = (
  activeUser: number,
  setActiveUser: React.Dispatch<React.SetStateAction<number | null>>,
  time: number,
  displayed: number,
  passedTime: number,
  setPassedTime: React.Dispatch<React.SetStateAction<number>>,
  storiesLength: number,
  setDisplayed: React.Dispatch<React.SetStateAction<number>>,
  initialMount: React.MutableRefObject<boolean>,
  nextActiveUser: number,
  isPaused: boolean,
) => {
  let interval;
  let timeout;

  useEffect(() => {
    if (initialMount) {
      initialMount.current = false;
    } else {
      setDisplayed(0);
    }
    clearTimeout(timeout);
  }, [activeUser]);

  useEffect(() => {
    setPassedTime(0);
    clearTimeout(timeout);
  }, [displayed, activeUser]);

  useEffect(() => {
    let myTime = passedTime;
    clearTimeout(timeout);
    if (activeUser != null && !isPaused) {
      interval = setInterval(() => {
        myTime += 50;
        setPassedTime(myTime + 50);
        if (myTime >= time) {
          clearInterval(interval);
        }
      }, 50);
      timeout = setTimeout(() => {
        if (storiesLength-1 > displayed) {
          setDisplayed(displayed + 1);
          setPassedTime(0);
         }else{
          setPassedTime(0);
          setDisplayed(0);
          setActiveUser(nextActiveUser);
         }
      }, time-passedTime);
    }
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [displayed, activeUser, isPaused, passedTime]);
};
