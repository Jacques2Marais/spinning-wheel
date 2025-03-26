<script setup lang="ts">
import { useTemplateRef } from 'vue'
import { useSpinningWheel } from '@/composables/useSpinningWheel'
import {
  calculateSegmentTransformation,
  calculateSegmentColourClassName,
  calculateTextTransformation,
  segmentPath,
} from '@/utils/wheelUtils'

const wheel = useTemplateRef('spinner-wheel')

const { spinRandom, spinPredetermined } = useSpinningWheel(5000, wheel)
</script>

<template>
  <div class="wheel-container">
    <svg viewBox="0 0 30 30" class="spinner-arrow">
      <polygon points="28,2 2,2 15,28" />
    </svg>

    <svg viewBox="-2 -2 204 204" class="spinner-wheel" ref="spinner-wheel">
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

        <linearGradient id="arrow-gradient" gradientTransform="rotate(30)">
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
          :class="`spinner-segment ${calculateSegmentColourClassName(i)}`"
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
    <button class="button button-secondary" @click="spinPredetermined(3)">
      Predetermined spin
    </button>
    <button class="button button-primary" @click="spinRandom">Random spin</button>
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

  width: 300px;
  height: 300px;
}

.spinner-arrow {
  fill: url(#arrow-gradient);
  translate: 0 0.75rem;
  stroke: var(--background);
  stroke-width: 2;
  stroke-linejoin: round;

  z-index: 1;
  width: 40px;
}

.spinner-text {
  font-size: 14px;
  font-weight: 700;
  fill: var(--background);
}

.spinner-segment {
  fill: url(#segment-gradient-1);
  stroke: var(--background);
  stroke-width: 2;
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
  stroke-width: 2;
  stroke-linejoin: round;
}

#middle-gradient {
  .gradient-stop-1 {
    stop-color: #5747c2;
  }

  .gradient-stop-2 {
    stop-color: #351f78;
  }
}

#arrow-gradient {
  .gradient-stop-1 {
    stop-color: #3c3a3a;
  }

  .gradient-stop-2 {
    stop-color: #181717;
  }
}

#segment-gradient-1 {
  .gradient-stop-1 {
    stop-color: #5846c8;
  }

  .gradient-stop-2 {
    stop-color: #382082;
  }
}

#segment-gradient-2 {
  .gradient-stop-1 {
    stop-color: #df9f29;
  }

  .gradient-stop-2 {
    stop-color: #a26c16;
  }
}

#segment-gradient-3 {
  .gradient-stop-1 {
    stop-color: #e03246;
  }

  .gradient-stop-2 {
    stop-color: #941a28;
  }
}
</style>
