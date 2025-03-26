<script setup lang="ts">
import { useTemplateRef } from 'vue'

// given the segment's index, calculate its CSS transformation property (i.e. rotation)
const calculateSegmentTransformation = (index: number) => {
  const rotation = (index - 1) * 45

  return `rotate(${rotation})`
}

// given the segment's index, get its fill color
const getSegmentClass = (index: number) => {
  const segmentColorClass = (index % 3) + 1

  return `spinner-segment segment-${segmentColorClass}/3`
}

// given the segment's index, calculate the text's CSS transformation property value
const calculateTextTransformation = (index: number) => {
  const rotation = (index - 1) * 45 + 22.5

  return `rotate(${rotation}) translate(0, -70) rotate(-${rotation})`
}

// calculate the segment's path:
// it starts at (0,0), creates a line, an short arc, and then a line back to (0,0)
const segmentLength = 100
const segmentArcAngleRadians = (45 * Math.PI) / 180
const segmentArcEndX = segmentLength * Math.cos(segmentArcAngleRadians)
const segmentArcEndY = segmentLength * Math.sin(segmentArcAngleRadians)
const segmentPath = `M 0,0
  L ${segmentLength},0
  A ${segmentLength},${segmentLength} 0 0,1 ${segmentArcEndX},${segmentArcEndY}
Z`

const wheel = useTemplateRef('spinner-wheel')

// always spin 10 full circles to create a "spinning effect"
const spinEffectDegrees = 360 * 10

const getRandomSpinDegrees = () => {
  const randomNumber = Math.random()
  const randomSegment = Math.floor(randomNumber * 8) + 1
  const randomRotationDegrees = spinEffectDegrees + (randomSegment - 1) * 45 + 22.5

  return randomRotationDegrees
}

const getPredeterminedSpinDegrees = () => {
  const predeterminedSegment = 3
  const predeterminedRotationDegrees = spinEffectDegrees + (360 + 22.5 - predeterminedSegment * 45)

  return predeterminedRotationDegrees
}

const spin = (degrees: number) => {
  if (wheel.value) {
    wheel.value.style.transform = `rotate(${degrees}deg)`
  }
}
</script>

<template>
  <div class="wheel-container">
    <svg width="40" viewBox="0 0 30 30" class="spinner-arrow">
      <polygon points="28,2 2,2 15,28" />
    </svg>

    <svg width="300" height="300" viewBox="-2 -2 204 204" class="spinner-wheel" ref="spinner-wheel">
      <defs>
        <path id="segment" :d="segmentPath" />

        <linearGradient id="segment-gradient-1" gradientTransform="rotate(60)">
          <stop class="gradient-stop-1" offset="0%" />
          <stop class="gradient-stop-2" offset="100%" />
        </linearGradient>

        <linearGradient id="segment-gradient-2" gradientTransform="rotate(90)">
          <stop class="gradient-stop-1" offset="0%" />
          <stop class="gradient-stop-2" offset="100%" />
        </linearGradient>

        <linearGradient id="segment-gradient-3" gradientTransform="rotate(30)">
          <stop class="gradient-stop-1" offset="0%" />
          <stop class="gradient-stop-2" offset="100%" />
        </linearGradient>

        <radialGradient id="middle-gradient">
          <stop class="gradient-stop-1" offset="0%" />
          <stop class="gradient-stop-2" offset="100%" />
        </radialGradient>
      </defs>

      <g transform="translate(100,100)">
        <use
          xlink:href="#segment"
          v-for="i in 8"
          :key="i"
          :class="getSegmentClass(i)"
          :transform="calculateSegmentTransformation(i)"
        />

        <text
          v-for="i in 8"
          :key="i"
          :transform="calculateTextTransformation(i)"
          text-anchor="middle"
          alignment-baseline="middle"
          class="spinner-text"
        >
          {{ i }}
        </text>
      </g>

      <circle cx="100" cy="100" r="16" class="spinner-middle" />
      <circle cx="100" cy="100" r="100" class="spinner-edge" />
    </svg>
  </div>
  <div class="button-group">
    <button class="button button-secondary" @click="spin(getPredeterminedSpinDegrees())">
      Predetermined spin
    </button>
    <button class="button button-primary" @click="spin(getRandomSpinDegrees())">Random spin</button>
  </div>
</template>

<style scoped>
.wheel-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.spinner-wheel {
  transition: transform 5s cubic-bezier(0.3, 0.1, 0.25, 1);
  transform-origin: 50% 50%;
  transform: rotate(0);
}

.spinner-arrow {
  fill: var(--foreground);
  translate: 0 0.75rem;
  stroke: var(--foreground);
  stroke-width: 4;
  stroke-linejoin: round;

  z-index: 1;
}

.spinner-text {
  font-size: 14px;
  font-weight: 800;
  fill: var(--background);
}

.spinner-segment {
  fill: url(#segment-gradient-1);
  stroke: var(--background);
  stroke-width: 4;
  stroke-linejoin: round;

  &.segment-1\/3 {
    fill: url(#segment-gradient-2);
  }

  &.segment-2\/3 {
    fill: url(#segment-gradient-3);
  }
}

.spinner-edge {
  fill: none;
  stroke: var(--background);
  stroke-width: 4;
}

.spinner-middle {
  fill: url(#middle-gradient);
  stroke: var(--background);
  stroke-width: 4;
  stroke-linejoin: round;
}

#middle-gradient {
  .gradient-stop-1 {
    stop-color: rgb(238, 184, 85);
  }

  .gradient-stop-2 {
    stop-color: rgb(255, 217, 0);
  }
}

#segment-gradient-1 {
  .gradient-stop-1 {
    stop-color: #e56;
  }

  .gradient-stop-2 {
    stop-color: #f90;
  }
}

#segment-gradient-2 {
  .gradient-stop-1 {
    stop-color: #56e;
  }

  .gradient-stop-2 {
    stop-color: #0f9;
  }
}

#segment-gradient-3 {
  .gradient-stop-1 {
    stop-color: #6e5;
  }

  .gradient-stop-2 {
    stop-color: #90f;
  }
}
</style>
