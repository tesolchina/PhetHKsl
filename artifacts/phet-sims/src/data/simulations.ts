export type Category = 'Physics' | 'Chemistry' | 'Biology';

export interface GuideStep {
  title: { en: string; zh: string };
  content: { en: string; zh: string };
}

export interface Simulation {
  id: string;
  name: { en: string; zh: string };
  description: { en: string; zh: string };
  url: { en: string; zh: string };
  category: Category;
  tags: { en: string[]; zh: string[] };
  guide: GuideStep[];
  localDev?: boolean;
}

export const simulations: Simulation[] = [
  {
    id: 'neuron',
    name: { en: 'Neuron', zh: '神经元' },
    description: {
      en: 'Stimulate a neuron and watch what happens. Pause, rewind, and move forward in time to observe the ions as they move across the neuron membrane.',
      zh: '刺激一个神经元并观察发生了什么。暂停、倒退和快进，观察离子穿过神经元细胞膜的过程。'
    },
    url: {
      en: '/phet-local/neuron/neuron_en.html',
      zh: '/phet-local/neuron/neuron_en.html?locale=zh_CN'
    },
    category: 'Biology',
    tags: { en: ['Action Potential', 'Ions', 'Nerve'], zh: ['动作电位', '离子', '神经'] },
    localDev: true,
    guide: [
      {
        title: { en: 'What is a Neuron?', zh: '什么是神经元？' },
        content: {
          en: 'A neuron is a nerve cell that transmits electrical signals throughout the body. It has a cell body, dendrites that receive signals, and an axon that sends signals to other cells.',
          zh: '神经元是一种通过全身传输电信号的神经细胞。它有细胞体、接收信号的树突和将信号发送到其他细胞的轴突。'
        }
      },
      {
        title: { en: 'The Action Potential', zh: '动作电位' },
        content: {
          en: 'When a neuron is stimulated, sodium ions (Na+) rush into the cell, making the inside more positive. This creates an electrical pulse called an action potential that travels along the axon.',
          zh: '当神经元被刺激时，钠离子（Na+）涌入细胞内部，使细胞内部变得更加正电。这产生了一个称为动作电位的电脉冲，沿轴突传播。'
        }
      },
      {
        title: { en: 'Ion Channels', zh: '离子通道' },
        content: {
          en: 'The neuron membrane has special protein channels that open and close. Sodium channels open first (depolarization), then potassium channels open (repolarization), restoring the resting potential.',
          zh: '神经元细胞膜上有特殊的蛋白质通道可以打开和关闭。钠通道首先打开（去极化），然后钾通道打开（复极化），恢复静息电位。'
        }
      },
      {
        title: { en: 'Try It!', zh: '试一试！' },
        content: {
          en: 'Click the "Stimulate Neuron" button to trigger an action potential. Watch the ions move across the membrane. Use the playback controls to slow down or pause the animation.',
          zh: '点击"刺激神经元"按钮触发一个动作电位。观察离子穿过细胞膜的过程。使用播放控件来减慢或暂停动画。'
        }
      }
    ]
  },
  {
    id: 'equality-explorer',
    name: { en: 'Equality Explorer', zh: '等式探索' },
    description: {
      en: 'Explore what it means for two expressions to be equal. Use a balance to build equations and solve for unknowns.',
      zh: '探索两个表达式相等的含义。使用天平建立方程并求解未知数。'
    },
    url: {
      en: '/phet-local/equality-explorer/equality-explorer_en.html',
      zh: '/phet-local/equality-explorer/equality-explorer_en.html?locale=zh_CN'
    },
    category: 'Physics',
    tags: { en: ['Algebra', 'Equations', 'Balance'], zh: ['代数', '方程', '天平'] },
    localDev: true,
    guide: [
      {
        title: { en: 'Understanding Equality', zh: '理解等式' },
        content: {
          en: 'An equation shows that two expressions are equal. The balance scale helps you visualize this: when both sides weigh the same, the scale is balanced.',
          zh: '等式表示两个表达式相等。天平帮助你直观理解：当两边重量相同时，天平是平衡的。'
        }
      },
      {
        title: { en: 'Using the Balance', zh: '使用天平' },
        content: {
          en: 'Drag objects onto both sides of the scale. Add the same amount to both sides to keep it balanced. This is the key principle of solving equations.',
          zh: '将物体拖到天平两侧。在两边加上相同的量以保持平衡。这是解方程的关键原则。'
        }
      },
      {
        title: { en: 'Solving Equations', zh: '解方程' },
        content: {
          en: 'To solve, isolate x on one side. Whatever you do to one side, you must do to the other. Try the "Solve It!" screen to practice!',
          zh: '要解方程，需要将x孤立在一边。对一边做的操作必须对另一边也做。试试"解题"页面来练习！'
        }
      }
    ]
  },
  {
    id: 'circuit-construction-kit',
    name: { en: 'Circuit Construction Kit', zh: '电路组建实验' },
    description: {
      en: 'Explore basic electricity relationships. Build circuits with batteries, resistors, light bulbs, and switches.',
      zh: '探索基本的电学关系。用电池、电阻、灯泡和开关搭建电路。'
    },
    url: {
      en: 'https://phet.colorado.edu/sims/html/circuit-construction-kit-dc/latest/circuit-construction-kit-dc_en.html',
      zh: 'https://phet.colorado.edu/sims/html/circuit-construction-kit-dc/latest/circuit-construction-kit-dc_zh_CN.html'
    },
    category: 'Physics',
    tags: { en: ['Electricity', 'Circuits', 'Voltage'], zh: ['电学', '电路', '电压'] },
    localDev: false,
    guide: [
      {
        title: { en: 'What is a Circuit?', zh: '什么是电路？' },
        content: {
          en: 'An electric circuit is a closed loop through which electric current can flow. It needs a power source (like a battery), a load (like a light bulb), and wires to connect them.',
          zh: '电路是电流可以流过的闭合回路。它需要电源（如电池）、负载（如灯泡）和连接它们的导线。'
        }
      },
      {
        title: { en: "Ohm's Law", zh: '欧姆定律' },
        content: {
          en: 'Voltage (V) = Current (I) x Resistance (R). This fundamental law describes how voltage, current, and resistance relate to each other in a circuit.',
          zh: '电压（V）= 电流（I）x 电阻（R）。这个基本定律描述了电路中电压、电流和电阻之间的关系。'
        }
      },
      {
        title: { en: 'Series vs Parallel', zh: '串联与并联' },
        content: {
          en: 'In a series circuit, components are connected end-to-end, sharing the same current. In a parallel circuit, components share the same voltage but current is divided between them.',
          zh: '在串联电路中，元件首尾相连，共享相同的电流。在并联电路中，元件共享相同的电压，但电流在它们之间分配。'
        }
      },
      {
        title: { en: 'Try It!', zh: '试一试！' },
        content: {
          en: 'Drag components from the toolbox to build a circuit. Connect a battery to a light bulb and watch it glow. Try adding resistors to see how brightness changes.',
          zh: '从工具箱中拖动元件来搭建电路。将电池连接到灯泡并观察它发光。试着添加电阻，看看亮度如何变化。'
        }
      }
    ]
  },
  {
    id: 'gravity-and-orbits',
    name: { en: 'Gravity and Orbits', zh: '万有引力与轨道' },
    description: {
      en: 'Move the sun, earth, moon and space station to see how it affects their gravitational forces and orbital paths.',
      zh: '移动太阳、地球、月球和空间站，观察引力和轨道路径如何变化。'
    },
    url: {
      en: 'https://phet.colorado.edu/sims/html/gravity-and-orbits/latest/gravity-and-orbits_en.html',
      zh: 'https://phet.colorado.edu/sims/html/gravity-and-orbits/latest/gravity-and-orbits_zh_CN.html'
    },
    category: 'Physics',
    tags: { en: ['Gravity', 'Force', 'Space'], zh: ['引力', '力', '太空'] },
    guide: [
      {
        title: { en: 'Universal Gravitation', zh: '万有引力' },
        content: {
          en: 'Every object with mass attracts every other object with mass. The force depends on both masses and the distance between them: F = G(m1 x m2)/r^2.',
          zh: '每个有质量的物体都会吸引其他有质量的物体。引力取决于两个物体的质量和它们之间的距离：F = G(m1 x m2)/r^2。'
        }
      },
      {
        title: { en: 'Orbital Motion', zh: '轨道运动' },
        content: {
          en: 'Objects in orbit are constantly falling toward the larger body but moving sideways fast enough to keep missing it. This balance between gravity and velocity creates a stable orbit.',
          zh: '轨道上的物体不断地向更大的天体坠落，但横向移动速度足够快，不断"错过"它。这种引力和速度之间的平衡创造了稳定的轨道。'
        }
      },
      {
        title: { en: 'Try It!', zh: '试一试！' },
        content: {
          en: 'Try changing the mass of the Earth or Sun. See what happens to the orbit when you increase the velocity. Can you make the Moon escape Earth\'s gravity?',
          zh: '试着改变地球或太阳的质量。看看当你增加速度时轨道会发生什么变化。你能让月球逃离地球的引力吗？'
        }
      }
    ]
  },
  {
    id: 'wave-on-a-string',
    name: { en: 'Wave on a String', zh: '绳波' },
    description: {
      en: 'Explore the wonderful world of waves! Observe a string vibrate in slow motion. Wiggle the end of the string and make waves.',
      zh: '探索奇妙的波动世界！以慢动作观察绳子的振动。摆动绳子的一端来制造波。'
    },
    url: {
      en: 'https://phet.colorado.edu/sims/html/wave-on-a-string/latest/wave-on-a-string_en.html',
      zh: 'https://phet.colorado.edu/sims/html/wave-on-a-string/latest/wave-on-a-string_zh_CN.html'
    },
    category: 'Physics',
    tags: { en: ['Waves', 'Frequency', 'Amplitude'], zh: ['波', '频率', '振幅'] },
    guide: [
      {
        title: { en: 'What is a Wave?', zh: '什么是波？' },
        content: {
          en: 'A wave is a disturbance that transfers energy from one place to another without transferring matter. Waves have properties like amplitude (height), frequency (repetitions per second), and wavelength.',
          zh: '波是一种将能量从一个地方传递到另一个地方而不传递物质的扰动。波具有振幅（高度）、频率（每秒重复次数）和波长等属性。'
        }
      },
      {
        title: { en: 'Amplitude & Frequency', zh: '振幅与频率' },
        content: {
          en: 'Amplitude determines how much energy a wave carries - larger amplitude means more energy. Frequency tells you how often the wave repeats - higher frequency means more waves per second.',
          zh: '振幅决定了波携带多少能量——振幅越大意味着能量越多。频率告诉你波重复的频率——频率越高意味着每秒有更多的波。'
        }
      },
      {
        title: { en: 'Try It!', zh: '试一试！' },
        content: {
          en: 'Use the slider to change the frequency and amplitude. Switch between manual, oscillate, and pulse modes. Try different end conditions (fixed, loose, no end) and observe the reflections.',
          zh: '使用滑块来改变频率和振幅。在手动、振荡和脉冲模式之间切换。尝试不同的端部条件（固定端、自由端、无端）并观察反射。'
        }
      }
    ]
  },
  {
    id: 'build-an-atom',
    name: { en: 'Build an Atom', zh: '原子构建' },
    description: {
      en: 'Build an atom out of protons, neutrons, and electrons, and see how the element, charge, and mass change.',
      zh: '用质子、中子和电子构建一个原子，观察元素、电荷和质量如何变化。'
    },
    url: {
      en: 'https://phet.colorado.edu/sims/html/build-an-atom/latest/build-an-atom_en.html',
      zh: 'https://phet.colorado.edu/sims/html/build-an-atom/latest/build-an-atom_zh_CN.html'
    },
    category: 'Chemistry',
    tags: { en: ['Atoms', 'Elements', 'Protons'], zh: ['原子', '元素', '质子'] },
    guide: [
      {
        title: { en: 'Atomic Structure', zh: '原子结构' },
        content: {
          en: 'Atoms are made of three subatomic particles: protons (positive charge), neutrons (no charge), and electrons (negative charge). Protons and neutrons form the nucleus, while electrons orbit around it.',
          zh: '原子由三种亚原子粒子组成：质子（正电荷）、中子（无电荷）和电子（负电荷）。质子和中子构成原子核，而电子在其周围运行。'
        }
      },
      {
        title: { en: 'Elements & Isotopes', zh: '元素与同位素' },
        content: {
          en: 'The number of protons determines which element an atom is. Atoms of the same element with different numbers of neutrons are called isotopes. Adding or removing electrons creates ions.',
          zh: '质子的数量决定了原子是哪种元素。同一元素中具有不同中子数量的原子称为同位素。添加或移除电子会产生离子。'
        }
      },
      {
        title: { en: 'Try It!', zh: '试一试！' },
        content: {
          en: 'Drag protons, neutrons, and electrons into the atom. Watch how the element name, charge, and mass number change. Can you build a stable carbon atom?',
          zh: '将质子、中子和电子拖到原子中。观察元素名称、电荷和质量数如何变化。你能构建一个稳定的碳原子吗？'
        }
      }
    ]
  },
  {
    id: 'energy-skate-park',
    name: { en: 'Energy Skate Park', zh: '能量滑板公园' },
    description: {
      en: 'Explore the conservation of energy with a skater! Build tracks, ramps and jumps for the skater and view the kinetic energy.',
      zh: '与滑板选手一起探索能量守恒！建造轨道、坡道和跳台，查看动能的变化。'
    },
    url: {
      en: 'https://phet.colorado.edu/sims/html/energy-skate-park/latest/energy-skate-park_en.html',
      zh: 'https://phet.colorado.edu/sims/html/energy-skate-park/latest/energy-skate-park_zh_CN.html'
    },
    category: 'Physics',
    tags: { en: ['Energy', 'Kinetic', 'Potential'], zh: ['能量', '动能', '势能'] },
    guide: [
      {
        title: { en: 'Conservation of Energy', zh: '能量守恒' },
        content: {
          en: 'Energy cannot be created or destroyed, only transformed from one form to another. In this simulation, potential energy (height) converts to kinetic energy (motion) and back.',
          zh: '能量不能被创造或消灭，只能从一种形式转变为另一种形式。在这个模拟中，势能（高度）转化为动能（运动），然后又转变回来。'
        }
      },
      {
        title: { en: 'Kinetic vs Potential', zh: '动能与势能' },
        content: {
          en: 'Kinetic energy is the energy of motion (KE = 1/2 mv^2). Potential energy is stored energy due to position (PE = mgh). At the highest point, PE is maximum; at the lowest point, KE is maximum.',
          zh: '动能是运动的能量（KE = 1/2 mv^2）。势能是由于位置而储存的能量（PE = mgh）。在最高点，势能最大；在最低点，动能最大。'
        }
      },
      {
        title: { en: 'Try It!', zh: '试一试！' },
        content: {
          en: 'Place the skater at different heights and release. Watch the energy bar graph change. Try turning on friction - where does the energy go?',
          zh: '将滑板选手放在不同的高度然后释放。观察能量柱状图的变化。试着打开摩擦力——能量去了哪里？'
        }
      }
    ]
  },
  {
    id: 'balancing-act',
    name: { en: 'Balancing Act', zh: '平衡探秘' },
    description: {
      en: 'Play with objects on a teeter totter to learn about balance. Test what you\'ve learned by trying the Balance Challenge game.',
      zh: '在跷跷板上放置物体来学习平衡。通过平衡挑战游戏测试你学到的知识。'
    },
    url: {
      en: 'https://phet.colorado.edu/sims/html/balancing-act/latest/balancing-act_en.html',
      zh: 'https://phet.colorado.edu/sims/html/balancing-act/latest/balancing-act_zh_CN.html'
    },
    category: 'Physics',
    tags: { en: ['Torque', 'Mass', 'Balance'], zh: ['力矩', '质量', '平衡'] },
    guide: [
      {
        title: { en: 'Torque & Balance', zh: '力矩与平衡' },
        content: {
          en: 'Torque = Force x Distance from the pivot. For a seesaw to balance, the torques on both sides must be equal. A heavier object closer to the center can balance a lighter object farther away.',
          zh: '力矩 = 力 x 到支点的距离。要使跷跷板平衡，两边的力矩必须相等。靠近中心的重物可以平衡远离中心的轻物。'
        }
      },
      {
        title: { en: 'Try It!', zh: '试一试！' },
        content: {
          en: 'Place different masses on the balance. Try the game mode to test your understanding. Can you predict where to place objects to achieve balance?',
          zh: '在天平上放置不同的质量。尝试游戏模式来测试你的理解。你能预测将物体放在哪里才能实现平衡吗？'
        }
      }
    ]
  },
  {
    id: 'color-vision',
    name: { en: 'Color Vision', zh: '彩色视觉' },
    description: {
      en: 'Make a whole rainbow by mixing red, green, and blue light. Change the wavelength of a monochromatic beam or filter white light.',
      zh: '通过混合红、绿、蓝光制造彩虹。改变单色光束的波长或过滤白光。'
    },
    url: {
      en: 'https://phet.colorado.edu/sims/html/color-vision/latest/color-vision_en.html',
      zh: 'https://phet.colorado.edu/sims/html/color-vision/latest/color-vision_zh_CN.html'
    },
    category: 'Physics',
    tags: { en: ['Light', 'Color', 'Vision'], zh: ['光', '颜色', '视觉'] },
    guide: [
      {
        title: { en: 'How We See Color', zh: '我们如何看到颜色' },
        content: {
          en: 'Our eyes have three types of cone cells sensitive to red, green, and blue light. The brain combines signals from all three to produce the colors we perceive. This is called trichromatic vision.',
          zh: '我们的眼睛有三种类型的锥状细胞，分别对红光、绿光和蓝光敏感。大脑将三者的信号组合在一起，产生我们所感知的颜色。这叫做三色视觉。'
        }
      },
      {
        title: { en: 'Additive Color Mixing', zh: '加色混合' },
        content: {
          en: 'When mixing light (additive mixing): Red + Green = Yellow, Red + Blue = Magenta, Green + Blue = Cyan, Red + Green + Blue = White. This is different from mixing paints!',
          zh: '混合光（加色混合）：红 + 绿 = 黄，红 + 蓝 = 品红，绿 + 蓝 = 青，红 + 绿 + 蓝 = 白。这与混合颜料不同！'
        }
      },
      {
        title: { en: 'Try It!', zh: '试一试！' },
        content: {
          en: 'Adjust the RGB sliders to mix different colors of light. Try making yellow, cyan, and white. Switch to single-bulb mode and change the wavelength to explore the visible spectrum.',
          zh: '调整RGB滑块来混合不同颜色的光。尝试制作黄色、青色和白色。切换到单灯泡模式并改变波长来探索可见光谱。'
        }
      }
    ]
  },
  {
    id: 'masses-and-springs',
    name: { en: 'Masses and Springs', zh: '质量与弹簧' },
    description: {
      en: 'Hang masses from springs and adjust the spring constant and damping. Transport the lab to different planets.',
      zh: '在弹簧上悬挂质量块，调节弹簧常数和阻尼。将实验室传送到不同的星球。'
    },
    url: {
      en: 'https://phet.colorado.edu/sims/html/masses-and-springs/latest/masses-and-springs_en.html',
      zh: 'https://phet.colorado.edu/sims/html/masses-and-springs/latest/masses-and-springs_zh_CN.html'
    },
    category: 'Physics',
    tags: { en: ['Springs', 'Hooke\'s Law', 'Force'], zh: ['弹簧', '胡克定律', '力'] },
    guide: [
      {
        title: { en: "Hooke's Law", zh: '胡克定律' },
        content: {
          en: 'The force exerted by a spring is proportional to how far it is stretched or compressed: F = -kx, where k is the spring constant and x is the displacement from equilibrium.',
          zh: '弹簧施加的力与其拉伸或压缩的距离成正比：F = -kx，其中k是弹簧常数，x是偏离平衡位置的位移。'
        }
      },
      {
        title: { en: 'Try It!', zh: '试一试！' },
        content: {
          en: 'Hang different masses on the springs. Change the spring constant and observe how stiffness affects the oscillation. Try the same experiment on Jupiter or the Moon!',
          zh: '在弹簧上悬挂不同的质量。改变弹簧常数，观察刚度如何影响振荡。试试在木星或月球上做同样的实验！'
        }
      }
    ]
  },
  {
    id: 'projectile-motion',
    name: { en: 'Projectile Motion', zh: '抛体运动' },
    description: {
      en: 'Blast a car out of a cannon, and challenge yourself to hit a target! Learn about projectile motion by firing various objects.',
      zh: '用大炮发射汽车，挑战自己击中目标！通过发射各种物体来学习抛体运动。'
    },
    url: {
      en: 'https://phet.colorado.edu/sims/html/projectile-motion/latest/projectile-motion_en.html',
      zh: 'https://phet.colorado.edu/sims/html/projectile-motion/latest/projectile-motion_zh_CN.html'
    },
    category: 'Physics',
    tags: { en: ['Kinematics', 'Velocity', 'Vectors'], zh: ['运动学', '速度', '矢量'] },
    guide: [
      {
        title: { en: 'Projectile Motion', zh: '抛体运动' },
        content: {
          en: 'A projectile moves in two independent directions: horizontally (constant speed) and vertically (accelerated by gravity). The combination creates a parabolic path.',
          zh: '抛体在两个独立方向上运动：水平方向（匀速）和竖直方向（受重力加速）。两者的组合形成抛物线轨迹。'
        }
      },
      {
        title: { en: 'Launch Angle', zh: '发射角度' },
        content: {
          en: 'The optimal angle for maximum range (on flat ground, no air resistance) is 45 degrees. Angles above and below 45 degrees produce shorter ranges, with complementary angles giving the same range.',
          zh: '在平地上且无空气阻力的情况下，获得最大射程的最佳角度是45度。高于和低于45度的角度会产生较短的射程，互补角会产生相同的射程。'
        }
      },
      {
        title: { en: 'Try It!', zh: '试一试！' },
        content: {
          en: 'Change the angle and initial speed. Try enabling air resistance and compare with the ideal case. Fire different objects and see how mass and drag affect the trajectory.',
          zh: '改变角度和初始速度。尝试启用空气阻力并与理想情况进行比较。发射不同的物体，看看质量和阻力如何影响轨迹。'
        }
      }
    ]
  },
  {
    id: 'states-of-matter',
    name: { en: 'States of Matter', zh: '物质状态' },
    description: {
      en: 'Heat, cool and compress atoms and molecules and watch as they change between solid, liquid and gas phases.',
      zh: '加热、冷却和压缩原子与分子，观察它们在固态、液态和气态之间的变化。'
    },
    url: {
      en: 'https://phet.colorado.edu/sims/html/states-of-matter/latest/states-of-matter_en.html',
      zh: 'https://phet.colorado.edu/sims/html/states-of-matter/latest/states-of-matter_zh_CN.html'
    },
    category: 'Chemistry',
    tags: { en: ['Thermodynamics', 'Phase Change'], zh: ['热力学', '相变'] },
    guide: [
      {
        title: { en: 'Three States of Matter', zh: '物质的三种状态' },
        content: {
          en: 'Solid: particles vibrate in fixed positions. Liquid: particles move freely but stay close together. Gas: particles move rapidly in all directions with large spaces between them.',
          zh: '固态：粒子在固定位置振动。液态：粒子自由移动但保持紧密。气态：粒子快速向各方向运动，彼此间距很大。'
        }
      },
      {
        title: { en: 'Phase Transitions', zh: '相变' },
        content: {
          en: 'Adding heat causes melting (solid to liquid) and evaporation (liquid to gas). Removing heat causes condensation (gas to liquid) and freezing (liquid to solid). These transitions happen at specific temperatures.',
          zh: '加热导致熔化（固态变液态）和蒸发（液态变气态）。冷却导致凝结（气态变液态）和凝固（液态变固态）。这些转变发生在特定温度下。'
        }
      },
      {
        title: { en: 'Try It!', zh: '试一试！' },
        content: {
          en: 'Use the heat/cool buttons to change the temperature. Watch how the particles behave differently in each state. Try different substances like water, oxygen, and neon.',
          zh: '使用加热/冷却按钮来改变温度。观察粒子在每种状态下的不同行为。试试不同的物质，如水、氧气和氖气。'
        }
      }
    ]
  },
  {
    id: 'friction',
    name: { en: 'Friction', zh: '摩擦力' },
    description: {
      en: 'Observe what happens at the atomic level when you rub two objects together. See how the temperature rises as the atoms move.',
      zh: '观察两个物体摩擦时在原子层面发生了什么。看看原子运动时温度如何上升。'
    },
    url: {
      en: 'https://phet.colorado.edu/sims/html/friction/latest/friction_en.html',
      zh: 'https://phet.colorado.edu/sims/html/friction/latest/friction_zh_CN.html'
    },
    category: 'Physics',
    tags: { en: ['Heat', 'Thermodynamics'], zh: ['热量', '热力学'] },
    guide: [
      {
        title: { en: 'What is Friction?', zh: '什么是摩擦力？' },
        content: {
          en: 'Friction is a force that opposes the relative motion of surfaces in contact. At the atomic level, friction arises from interactions between the atoms on the surfaces of the two objects.',
          zh: '摩擦力是一种阻碍接触表面相对运动的力。在原子层面上，摩擦力来自两个物体表面原子之间的相互作用。'
        }
      },
      {
        title: { en: 'Friction & Heat', zh: '摩擦与热量' },
        content: {
          en: 'When objects rub together, kinetic energy is converted to thermal energy (heat). The faster you rub, the more heat is generated. This is why rubbing your hands together warms them up!',
          zh: '当物体互相摩擦时，动能转化为热能（热量）。摩擦越快，产生的热量越多。这就是为什么搓手可以让手变暖！'
        }
      },
      {
        title: { en: 'Try It!', zh: '试一试！' },
        content: {
          en: 'Drag the top book back and forth to create friction. Watch the atoms jiggle more as they heat up. Rub fast enough and the atoms will break free!',
          zh: '来回拖动上面的书来产生摩擦力。观察原子随着温度升高而抖动得更厉害。摩擦得足够快，原子就会挣脱束缚！'
        }
      }
    ]
  }
];
