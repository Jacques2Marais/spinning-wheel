<script setup lang="ts">
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
</script>

<template>
  <div class="wheel-container">
    <svg width="32" viewBox="0 0 30 30" class="spinner-arrow">
      <polygon points="30,0 0,0 15,30" />
    </svg>

    <svg width="300" height="300" viewBox="-2 -2 204 204">
      <defs>
        <path id="segment" :d="segmentPath" />

        <linearGradient id="segment-gradient-1">
          <stop class="gradient-stop-1" offset="0%" />
          <stop class="gradient-stop-2" offset="100%" />
        </linearGradient>

        <linearGradient id="segment-gradient-2">
          <stop class="gradient-stop-1" offset="0%" />
          <stop class="gradient-stop-2" offset="100%" />
        </linearGradient>

        <linearGradient id="segment-gradient-3">
          <stop class="gradient-stop-1" offset="0%" />
          <stop class="gradient-stop-2" offset="100%" />
        </linearGradient>

        <!-- radial gradient -->
        <radialGradient id="middle-gradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
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
    </svg>
  </div>
</template>

<style scoped>
.wheel-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.spinner-arrow {
  fill: var(--foreground);
  translate: 0 0.75rem;
}

.spinner-text {
  font-size: 14px;
  font-weight: 500;
  fill: var(--foreground);
}

.spinner-segment {
  fill: url(#segment-gradient-1);
  stroke: var(--foreground);
  stroke-width: 2;
  stroke-linejoin: round;

  &.segment-1\/3 {
    fill: url(#segment-gradient-2);
  }

  &.segment-2\/3 {
    fill: url(#segment-gradient-3);
  }
}

.spinner-middle {
  fill: url(#middle-gradient);
  stroke: var(--foreground);
  stroke-width: 2;
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
