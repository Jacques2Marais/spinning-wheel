// calculate the degrees (to the center point) around the wheel of a segment, given its number
export const calculateWheelRotationToSegment = (segment: number) => {
  return 360 + 22.5 - segment * 45
}

// given a wheel segment's index, calculate its CSS transformation property (i.e. rotation)
export const calculateSegmentTransformation = (index: number) => {
  const rotation = (index - 1) * 45
  return `rotate(${rotation})`
}

// given a wheel segment's index, get its class name
export const calculateSegmentColourClassName = (index: number) => {
  const segmentColourClass = (index % 3) + 1
  return `segment-${segmentColourClass}/3`
}

// given a wheel segment's index, calculate the text's CSS transformation property value
export const calculateTextTransformation = (index: number) => {
  const rotation = (index - 1) * 45 + 22.5

  return `rotate(${rotation}) translate(0, -70) rotate(-${rotation})`
}

// calculate the segment's SVG path commands
// it starts at (0,0), creates a line, short arc, and then a line back to (0,0)
const segmentLength = 100
const segmentArcAngleRadians = (45 * Math.PI) / 180
const segmentArcEndX = segmentLength * Math.cos(segmentArcAngleRadians)
const segmentArcEndY = segmentLength * Math.sin(segmentArcAngleRadians)

export const segmentPath = `M 0,0
  L ${segmentLength},0
  A ${segmentLength},${segmentLength} 0 0,1 ${segmentArcEndX},${segmentArcEndY}
Z`
