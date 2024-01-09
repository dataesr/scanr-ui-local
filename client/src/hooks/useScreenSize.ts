import { useState, useEffect, useCallback } from 'react'

export default function useScreenSize() {
  const isClient = typeof window === 'object'

  const getSize = useCallback(() => {
    return {
      width: isClient ? window.innerWidth : 0,
      height: isClient ? window.innerHeight : 0,
      screen: "sm"
    }
  }, [isClient])

  const [screenSize, setScreenSize] = useState(getSize)

  useEffect(() => {
    if (!isClient) return

    function handleResize() {
      setScreenSize(getSize())
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [getSize, isClient])

  if (screenSize.width < 576) {
    screenSize.screen = "xs"
  } else if (screenSize.width >= 576 && screenSize.width < 768) {
    screenSize.screen = "sm"
  } else if (screenSize.width >= 768 && screenSize.width < 992) {
    screenSize.screen = "mg"
  } else if (screenSize.width >= 992 && screenSize.width < 1200) {
    screenSize.screen = "lg"
  } else {
    screenSize.screen = "xl"
  }

  return screenSize
}