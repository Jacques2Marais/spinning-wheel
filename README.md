# Spin the wheel

This is a simple implementation of the spin-the-wheel game. It consists of three pages: a welcome page, a spin page and a result page.

The welcome page welcomes the user and has a link button to the spin page. On the spin page, the user can either choose to spin to a random segment or to a pre-determined (the 3rd in this case) segment. The wheel then spins using CSS transitions (and some JavaScript background logic), and upon completion the user is directed to the results page. On the results page, the number of the segment that the spin landed on is displayed, and the user can click back to the welcome page.

## Implementation

Vue was used to implement the web app, with Vue Router for routing, Pinia for global state management and vanilla Vue, TypeScript, CSS and HTML for the rest. A small additional library was used to display a confetti effect on the results page ([canvas-confetti](https://github.com/catdad/canvas-confetti?tab=readme-ov-file)).

To keep things modular, different files were created for utils, composables, and CSS variables were used for colours. This allows for quick theme customization. The spinner wheel was also implemented using custom SVG and CSS.

For the spinning animation, 10 initial spins are done to give off a visual spinning effect, and the rest of the spin's angle in degrees is calculated according to the segment number. The JavaScript `Math.random` is used to calculate the segment number for a random spin.
