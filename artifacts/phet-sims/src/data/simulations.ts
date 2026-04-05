export type Category = 'Physics' | 'Chemistry' | 'Biology';

export interface Simulation {
  id: string;
  name: { en: string; zh: string };
  description: { en: string; zh: string };
  url: string;
  category: Category;
  tags: { en: string[]; zh: string[] };
}

export const simulations: Simulation[] = [
  {
    id: 'neuron',
    name: { en: 'Neuron', zh: '神经元' },
    description: {
      en: 'Stimulate a neuron and watch what happens. Pause, rewind, and move forward in time to observe the ions as they move across the neuron membrane.',
      zh: '刺激一个神经元并观察发生了什么。暂停、倒退和快进，观察离子穿过神经元细胞膜的过程。'
    },
    url: 'https://phet.colorado.edu/sims/html/neuron/latest/neuron_en.html',
    category: 'Biology',
    tags: { en: ['Action Potential', 'Ions', 'Nerve'], zh: ['动作电位', '离子', '神经'] }
  },
  {
    id: 'circuit-construction-kit',
    name: { en: 'Circuit Construction Kit', zh: '电路组建实验' },
    description: {
      en: 'Explore basic electricity relationships. Build circuits with batteries, resistors, light bulbs, and switches.',
      zh: '探索基本的电学关系。用电池、电阻、灯泡和开关搭建电路。'
    },
    url: 'https://phet.colorado.edu/sims/html/circuit-construction-kit-dc/latest/circuit-construction-kit-dc_en.html',
    category: 'Physics',
    tags: { en: ['Electricity', 'Circuits', 'Voltage'], zh: ['电学', '电路', '电压'] }
  },
  {
    id: 'gravity-and-orbits',
    name: { en: 'Gravity and Orbits', zh: '万有引力与轨道' },
    description: {
      en: 'Move the sun, earth, moon and space station to see how it affects their gravitational forces and orbital paths.',
      zh: '移动太阳、地球、月球和空间站，观察引力和轨道路径如何变化。'
    },
    url: 'https://phet.colorado.edu/sims/html/gravity-and-orbits/latest/gravity-and-orbits_en.html',
    category: 'Physics',
    tags: { en: ['Gravity', 'Force', 'Space'], zh: ['引力', '力', '太空'] }
  },
  {
    id: 'wave-on-a-string',
    name: { en: 'Wave on a String', zh: '绳波' },
    description: {
      en: 'Explore the wonderful world of waves! Observe a string vibrate in slow motion. Wiggle the end of the string and make waves.',
      zh: '探索奇妙的波动世界！以慢动作观察绳子的振动。摆动绳子的一端来制造波。'
    },
    url: 'https://phet.colorado.edu/sims/html/wave-on-a-string/latest/wave-on-a-string_en.html',
    category: 'Physics',
    tags: { en: ['Waves', 'Frequency', 'Amplitude'], zh: ['波', '频率', '振幅'] }
  },
  {
    id: 'build-an-atom',
    name: { en: 'Build an Atom', zh: '原子构建' },
    description: {
      en: 'Build an atom out of protons, neutrons, and electrons, and see how the element, charge, and mass change.',
      zh: '用质子、中子和电子构建一个原子，观察元素、电荷和质量如何变化。'
    },
    url: 'https://phet.colorado.edu/sims/html/build-an-atom/latest/build-an-atom_en.html',
    category: 'Chemistry',
    tags: { en: ['Atoms', 'Elements', 'Protons'], zh: ['原子', '元素', '质子'] }
  },
  {
    id: 'energy-skate-park',
    name: { en: 'Energy Skate Park', zh: '能量滑板公园' },
    description: {
      en: 'Explore the conservation of energy with a skater! Build tracks, ramps and jumps for the skater and view the kinetic energy.',
      zh: '与滑板选手一起探索能量守恒！建造轨道、坡道和跳台，查看动能的变化。'
    },
    url: 'https://phet.colorado.edu/sims/html/energy-skate-park/latest/energy-skate-park_en.html',
    category: 'Physics',
    tags: { en: ['Energy', 'Kinetic', 'Potential'], zh: ['能量', '动能', '势能'] }
  },
  {
    id: 'balancing-act',
    name: { en: 'Balancing Act', zh: '平衡探秘' },
    description: {
      en: 'Play with objects on a teeter totter to learn about balance. Test what you\'ve learned by trying the Balance Challenge game.',
      zh: '在跷跷板上放置物体来学习平衡。通过平衡挑战游戏测试你学到的知识。'
    },
    url: 'https://phet.colorado.edu/sims/html/balancing-act/latest/balancing-act_en.html',
    category: 'Physics',
    tags: { en: ['Torque', 'Mass', 'Balance'], zh: ['力矩', '质量', '平衡'] }
  },
  {
    id: 'color-vision',
    name: { en: 'Color Vision', zh: '彩色视觉' },
    description: {
      en: 'Make a whole rainbow by mixing red, green, and blue light. Change the wavelength of a monochromatic beam or filter white light.',
      zh: '通过混合红、绿、蓝光制造彩虹。改变单色光束的波长或过滤白光。'
    },
    url: 'https://phet.colorado.edu/sims/html/color-vision/latest/color-vision_en.html',
    category: 'Physics',
    tags: { en: ['Light', 'Color', 'Vision'], zh: ['光', '颜色', '视觉'] }
  },
  {
    id: 'masses-and-springs',
    name: { en: 'Masses and Springs', zh: '质量与弹簧' },
    description: {
      en: 'Hang masses from springs and adjust the spring constant and damping. Transport the lab to different planets.',
      zh: '在弹簧上悬挂质量块，调节弹簧常数和阻尼。将实验室传送到不同的星球。'
    },
    url: 'https://phet.colorado.edu/sims/html/masses-and-springs/latest/masses-and-springs_en.html',
    category: 'Physics',
    tags: { en: ['Springs', 'Hooke\'s Law', 'Force'], zh: ['弹簧', '胡克定律', '力'] }
  },
  {
    id: 'projectile-motion',
    name: { en: 'Projectile Motion', zh: '抛体运动' },
    description: {
      en: 'Blast a car out of a cannon, and challenge yourself to hit a target! Learn about projectile motion by firing various objects.',
      zh: '用大炮发射汽车，挑战自己击中目标！通过发射各种物体来学习抛体运动。'
    },
    url: 'https://phet.colorado.edu/sims/html/projectile-motion/latest/projectile-motion_en.html',
    category: 'Physics',
    tags: { en: ['Kinematics', 'Velocity', 'Vectors'], zh: ['运动学', '速度', '矢量'] }
  },
  {
    id: 'states-of-matter',
    name: { en: 'States of Matter', zh: '物质状态' },
    description: {
      en: 'Heat, cool and compress atoms and molecules and watch as they change between solid, liquid and gas phases.',
      zh: '加热、冷却和压缩原子与分子，观察它们在固态、液态和气态之间的变化。'
    },
    url: 'https://phet.colorado.edu/sims/html/states-of-matter/latest/states-of-matter_en.html',
    category: 'Chemistry',
    tags: { en: ['Thermodynamics', 'Phase Change'], zh: ['热力学', '相变'] }
  },
  {
    id: 'friction',
    name: { en: 'Friction', zh: '摩擦力' },
    description: {
      en: 'Observe what happens at the atomic level when you rub two objects together. See how the temperature rises as the atoms move.',
      zh: '观察两个物体摩擦时在原子层面发生了什么。看看原子运动时温度如何上升。'
    },
    url: 'https://phet.colorado.edu/sims/html/friction/latest/friction_en.html',
    category: 'Physics',
    tags: { en: ['Heat', 'Thermodynamics'], zh: ['热量', '热力学'] }
  }
];
