export type Category = 'Physics' | 'Chemistry' | 'Biology';

export interface Simulation {
  id: string;
  name: string;
  description: string;
  url: string;
  category: Category;
  tags: string[];
}

export const simulations: Simulation[] = [
  {
    id: 'neuron',
    name: 'Neuron',
    description: 'Stimulate a neuron and watch what happens. Pause, rewind, and move forward in time to observe the ions as they move across the neuron membrane.',
    url: 'https://phet.colorado.edu/sims/html/neuron/latest/neuron_en.html',
    category: 'Biology',
    tags: ['Action Potential', 'Ions', 'Nerve']
  },
  {
    id: 'circuit-construction-kit',
    name: 'Circuit Construction Kit',
    description: 'Explore basic electricity relationships. Build circuits with batteries, resistors, light bulbs, and switches.',
    url: 'https://phet.colorado.edu/sims/html/circuit-construction-kit-dc/latest/circuit-construction-kit-dc_en.html',
    category: 'Physics',
    tags: ['Electricity', 'Circuits', 'Voltage']
  },
  {
    id: 'gravity-and-orbits',
    name: 'Gravity and Orbits',
    description: 'Move the sun, earth, moon and space station to see how it affects their gravitational forces and orbital paths.',
    url: 'https://phet.colorado.edu/sims/html/gravity-and-orbits/latest/gravity-and-orbits_en.html',
    category: 'Physics',
    tags: ['Gravity', 'Force', 'Space']
  },
  {
    id: 'wave-on-a-string',
    name: 'Wave on a String',
    description: 'Explore the wonderful world of waves! Observe a string vibrate in slow motion. Wiggle the end of the string and make waves.',
    url: 'https://phet.colorado.edu/sims/html/wave-on-a-string/latest/wave-on-a-string_en.html',
    category: 'Physics',
    tags: ['Waves', 'Frequency', 'Amplitude']
  },
  {
    id: 'build-an-atom',
    name: 'Build an Atom',
    description: 'Build an atom out of protons, neutrons, and electrons, and see how the element, charge, and mass change.',
    url: 'https://phet.colorado.edu/sims/html/build-an-atom/latest/build-an-atom_en.html',
    category: 'Chemistry',
    tags: ['Atoms', 'Elements', 'Protons']
  },
  {
    id: 'energy-skate-park',
    name: 'Energy Skate Park',
    description: 'Explore the conservation of energy with a skater! Build tracks, ramps and jumps for the skater and view the kinetic energy.',
    url: 'https://phet.colorado.edu/sims/html/energy-skate-park/latest/energy-skate-park_en.html',
    category: 'Physics',
    tags: ['Energy', 'Kinetic', 'Potential']
  },
  {
    id: 'balancing-act',
    name: 'Balancing Act',
    description: 'Play with objects on a teeter totter to learn about balance. Test what you\'ve learned by trying the Balance Challenge game.',
    url: 'https://phet.colorado.edu/sims/html/balancing-act/latest/balancing-act_en.html',
    category: 'Physics',
    tags: ['Torque', 'Mass', 'Balance']
  },
  {
    id: 'color-vision',
    name: 'Color Vision',
    description: 'Make a whole rainbow by mixing red, green, and blue light. Change the wavelength of a monochromatic beam or filter white light.',
    url: 'https://phet.colorado.edu/sims/html/color-vision/latest/color-vision_en.html',
    category: 'Physics',
    tags: ['Light', 'Color', 'Vision']
  },
  {
    id: 'masses-and-springs',
    name: 'Masses and Springs',
    description: 'Hang masses from springs and adjust the spring constant and damping. Transport the lab to different planets.',
    url: 'https://phet.colorado.edu/sims/html/masses-and-springs/latest/masses-and-springs_en.html',
    category: 'Physics',
    tags: ['Springs', 'Hooke\'s Law', 'Force']
  },
  {
    id: 'projectile-motion',
    name: 'Projectile Motion',
    description: 'Blast a car out of a cannon, and challenge yourself to hit a target! Learn about projectile motion by firing various objects.',
    url: 'https://phet.colorado.edu/sims/html/projectile-motion/latest/projectile-motion_en.html',
    category: 'Physics',
    tags: ['Kinematics', 'Velocity', 'Vectors']
  },
  {
    id: 'states-of-matter',
    name: 'States of Matter',
    description: 'Heat, cool and compress atoms and molecules and watch as they change between solid, liquid and gas phases.',
    url: 'https://phet.colorado.edu/sims/html/states-of-matter/latest/states-of-matter_en.html',
    category: 'Chemistry',
    tags: ['Thermodynamics', 'Phase Change']
  },
  {
    id: 'friction',
    name: 'Friction',
    description: 'Observe what happens at the atomic level when you rub two objects together. See how the temperature rises as the atoms move.',
    url: 'https://phet.colorado.edu/sims/html/friction/latest/friction_en.html',
    category: 'Physics',
    tags: ['Heat', 'Thermodynamics']
  }
];
