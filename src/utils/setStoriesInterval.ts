import React, { useEffect } from "react";

export const setStoriesInterval = (
  activeUser: number,
  setActiveUser: React.Dispatch<React.SetStateAction<number | null>>,
  time: number,
  displayed: number,
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
    let myTime = 0;
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
         }else{
          setDisplayed(0);
          setActiveUser(nextActiveUser);
         }
      }, time);
    }
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [displayed, activeUser, /*isPaused*/]);

  // useEffect(()=>{
  //   if(isPaused){
  //     console.log("clear")
  //     clearInterval(interval);
  //   }
  // }, [isPaused])
};
