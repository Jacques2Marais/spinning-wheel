import router from '@/router'
import type { Ref } from 'vue'
import { useWheelResultStore } from '@/stores/wheelResult'
import { getSegmentDegrees } from '@/utils/wheelUtils'

// a composable that returns functions to help with spinning of the wheel
export const useSpinningWheel = (animationMs: number, wheelElement: Ref<SVGSVGElement | null>) => {
  const wheelResultStore = useWheelResultStore()

  // spin the wheel to the specified segment
  const spin = (segment: number) => {
    // spin 10 extra full circles for visual effect
    const spinEffectDegrees = 360 * 10
    const degrees = getSegmentDegrees(segment) + spinEffectDegrees

    if (wheelElement.value) {
      wheelElement.value.style.transform = `rotate(${degrees}deg)`
      wheelResultStore.result = segment

      // navigate after animation is finished
      setTimeout(() => {
        router.push('/result')
      }, animationMs + 200)
    }
  }

  // spin to a random segment
  const spinRandom = () => {
    const randomSegment = Math.floor(Math.random() * 8) + 1
    spin(randomSegment)
  }

  // spin to the specified predetermined segment
  const spinPredetermined = spin

  return { spin, spinRandom, spinPredetermined }
}
