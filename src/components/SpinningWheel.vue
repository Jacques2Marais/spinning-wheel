<script setup lang="ts">
// given the segment's index, calculate its CSS transformation property (i.e. rotation)
const calculateSegmentTransformation = (index: number) => {
  const rotation = (index - 1) * 45

  return `rotate(${rotation})`
}

// given the segment's index, get its fill color
const getSegmentFill = (index: number) => {
  return index % 2 === 0 ? '#ccc' : '#eee'
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
    <svg width="50" height="30" viewBox="0 0 50 30">
      <polygon points="50,0 0,0 25,30" fill="black" />
    </svg>

    <svg width="300" height="300" viewBox="0 0 200 200">
      <defs>
        <path id="segment" :d="segmentPath" />
      </defs>

      <g transform="translate(100,100)">
        <use
          xlink:href="#segment"
          v-for="i in 8"
          :key="i"
          :fill="getSegmentFill(i)"
          :transform="calculateSegmentTransformation(i)"
        />

        <text
          v-for="i in 8"
          :key="i"
          :transform="calculateTextTransformation(i)"
          text-anchor="middle"
          alignment-baseline="middle"
          fill="black"
          font-size="12"
        >
          {{ i }}
        </text>
      </g>
    </svg>
  </div>
</template>
