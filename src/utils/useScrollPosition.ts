import {  useLayoutEffect } from 'react'
import { isServer } from './isServer'

export function useScrollPosition(deps: any[], condition: boolean, effect: () => void) {
  useLayoutEffect(() => {
    const handleScroll = () => {
        const pos = document.body.getBoundingClientRect()   
        if(condition){
            if(-pos.y >= pos.height/2){
                effect();
            }
        }
    }

    if(!isServer){
        window.addEventListener('scroll', handleScroll)       
    }
    return () => window.removeEventListener('scroll', handleScroll)
  }, deps)
}