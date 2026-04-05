export type Category = 'Physics' | 'Chemistry' | 'Biology';
export type GradeLevel = 'elementary' | 'middle';

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
  gradeLevel: GradeLevel;
  tags: { en: string[]; zh: string[] };
  guide: GuideStep[];
  localDev?: boolean;
  customRoute?: string;
}

export const simulations: Simulation[] = [
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
    gradeLevel: 'elementary',
    tags: { en: ['Light', 'Color', 'Mixing'], zh: ['光', '颜色', '混合'] },
    guide: [
      {
        title: { en: 'How Do We See Colors?', zh: '我们怎么看到颜色的？' },
        content: {
          en: 'Our eyes can see three main colors of light: red, green, and blue. When these colors mix together, they make all the other colors we see every day!',
          zh: '我们的眼睛能看到三种主要的光色：红色、绿色和蓝色。当这些颜色混合在一起时，就会变出我们每天看到的所有颜色！'
        }
      },
      {
        title: { en: 'Mixing Light is Like Magic!', zh: '混合光就像变魔术！' },
        content: {
          en: 'When you mix red light and green light, you get yellow! Red and blue make pink (magenta). Green and blue make light blue (cyan). And all three together make white light!',
          zh: '当你把红光和绿光混在一起，就会变成黄色！红色和蓝色变成粉色。绿色和蓝色变成浅蓝色。三种光全部混在一起就变成白光！'
        }
      },
      {
        title: { en: 'Try It!', zh: '试一试！' },
        content: {
          en: 'Move the color sliders to mix different lights. Can you make your favorite color? Try making white light by turning all three colors to maximum!',
          zh: '移动颜色滑块来混合不同的光。你能调出你最喜欢的颜色吗？试试把三种颜色都调到最大，看看会变成什么！'
        }
      }
    ]
  },
  {
    id: 'friction',
    name: { en: 'Friction Lab', zh: '摩擦力实验室' },
    description: {
      en: 'An original interactive experience: explore how friction creates heat through story, prediction, simulation, and hands-on challenges!',
      zh: '原创互动体验：通过故事、预测、模拟和动手挑战，探索摩擦力如何产生热量！'
    },
    url: {
      en: 'https://phet.colorado.edu/sims/html/friction/latest/friction_en.html',
      zh: 'https://phet.colorado.edu/sims/html/friction/latest/friction_zh_CN.html'
    },
    customRoute: '/friction-lab',
    category: 'Physics',
    gradeLevel: 'elementary',
    tags: { en: ['Friction', 'Heat', 'Atoms', 'Original'], zh: ['摩擦力', '热量', '原子', '原创'] },
    guide: [
      {
        title: { en: 'What is Friction?', zh: '什么是摩擦力？' },
        content: {
          en: 'Friction is what happens when two things rub together. Try rubbing your hands together quickly - do you feel them getting warm? That warmth comes from friction!',
          zh: '摩擦力就是两个东西互相摩擦时产生的力。试着快速搓搓你的双手——感觉到变暖了吗？那个热量就是摩擦产生的！'
        }
      },
      {
        title: { en: 'Tiny Atoms Are Shaking!', zh: '小小的原子在抖动！' },
        content: {
          en: 'Everything around us is made of tiny tiny particles called atoms. When you rub things together, the atoms start shaking faster and faster. That shaking is what we feel as heat!',
          zh: '我们周围的一切都是由叫做"原子"的超小粒子组成的。当你摩擦东西时，原子会越抖越快。我们感觉到的热量就是原子在抖动！'
        }
      },
      {
        title: { en: 'Try It!', zh: '试一试！' },
        content: {
          en: 'Drag the top book back and forth. Watch the little atoms jiggle! Rub really fast and see what happens - can you make the atoms break free?',
          zh: '来回拖动上面的书。看看那些小原子在抖动！使劲快速摩擦，看看会发生什么——你能让原子挣脱出来吗？'
        }
      }
    ]
  },
  {
    id: 'states-of-matter',
    name: { en: 'States of Matter', zh: '物质状态' },
    description: {
      en: 'Heat up or cool down atoms and watch them change between solid, liquid, and gas - just like ice, water, and steam!',
      zh: '给原子加热或冷却，观察它们在固态、液态和气态之间变化——就像冰、水和蒸气一样！'
    },
    url: {
      en: 'https://phet.colorado.edu/sims/html/states-of-matter/latest/states-of-matter_en.html',
      zh: 'https://phet.colorado.edu/sims/html/states-of-matter/latest/states-of-matter_zh_CN.html'
    },
    category: 'Chemistry',
    gradeLevel: 'elementary',
    tags: { en: ['Solid', 'Liquid', 'Gas'], zh: ['固体', '液体', '气体'] },
    guide: [
      {
        title: { en: 'Three Forms of Stuff', zh: '东西的三种形态' },
        content: {
          en: 'Everything around us can be a solid (like ice), a liquid (like water), or a gas (like steam). The tiny atoms inside behave differently in each form!',
          zh: '我们周围的一切都可以是固体（像冰）、液体（像水）或气体（像蒸气）。里面的小原子在每种形态下的表现都不一样！'
        }
      },
      {
        title: { en: 'Heat Makes Things Move!', zh: '加热让东西动起来！' },
        content: {
          en: 'In a solid, atoms stay in place and just wiggle a little. Add heat and they start moving more - that is melting! Add even more heat and they fly around everywhere - that is boiling!',
          zh: '在固体中，原子待在原地只是轻轻晃动。加热后它们开始移动更多——这就是融化！再加更多热量，它们就到处飞——这就是沸腾！'
        }
      },
      {
        title: { en: 'Try It!', zh: '试一试！' },
        content: {
          en: 'Press the heat button to warm things up. Watch the atoms start moving faster! Then cool it down and watch them slow down and freeze. Try different materials like water or oxygen!',
          zh: '按加热按钮让东西变暖。看原子动得越来越快！然后冷却它们，看它们慢下来并冻住。试试不同的材料，比如水或氧气！'
        }
      }
    ]
  },
  {
    id: 'balancing-act',
    name: { en: 'Balancing Act', zh: '平衡探秘' },
    description: {
      en: 'Play with objects on a seesaw to learn about balance! Can you figure out how to keep it level?',
      zh: '在跷跷板上放置物体来学习平衡！你能想出怎么让它保持水平吗？'
    },
    url: {
      en: 'https://phet.colorado.edu/sims/html/balancing-act/latest/balancing-act_en.html',
      zh: 'https://phet.colorado.edu/sims/html/balancing-act/latest/balancing-act_zh_CN.html'
    },
    category: 'Physics',
    gradeLevel: 'elementary',
    tags: { en: ['Balance', 'Seesaw', 'Weight'], zh: ['平衡', '跷跷板', '重量'] },
    guide: [
      {
        title: { en: 'The Seesaw Rule', zh: '跷跷板的秘密' },
        content: {
          en: 'On a seesaw, a heavy person sitting close to the middle can balance a lighter person sitting farther away. It is all about weight AND distance from the center!',
          zh: '在跷跷板上，一个重的人坐得离中间近，可以和一个轻的人坐得远的一边平衡。关键是重量和离中心的距离！'
        }
      },
      {
        title: { en: 'Try It!', zh: '试一试！' },
        content: {
          en: 'Put different objects on each side of the seesaw. Can you make it balance? Try the game mode and see if you can guess where to put things!',
          zh: '在跷跷板的两边放不同的东西。你能让它平衡吗？试试游戏模式，看看你能不能猜对该把东西放在哪里！'
        }
      }
    ]
  },
  {
    id: 'equality-explorer',
    name: { en: 'Equality Explorer', zh: '等式探索' },
    description: {
      en: 'Use a balance scale to understand what "equal" really means. Put things on both sides and keep the scale level!',
      zh: '用天平来理解"相等"到底是什么意思。在两边放东西，保持天平平衡！'
    },
    url: {
      en: '/phet-local/equality-explorer/equality-explorer_en.html',
      zh: '/phet-local/equality-explorer/equality-explorer_en.html?locale=zh_CN'
    },
    category: 'Physics',
    gradeLevel: 'elementary',
    tags: { en: ['Equality', 'Balance', 'Math'], zh: ['等式', '天平', '数学'] },
    localDev: true,
    guide: [
      {
        title: { en: 'What Does "Equal" Mean?', zh: '"相等"是什么意思？' },
        content: {
          en: 'When a balance scale is perfectly level, both sides have the same weight. That is what "equal" means - the two sides are the same!',
          zh: '当天平完全水平时，两边的重量一样。这就是"相等"的意思——两边是一样的！'
        }
      },
      {
        title: { en: 'Keep It Balanced!', zh: '保持平衡！' },
        content: {
          en: 'If you add something to one side, you need to add the same thing to the other side to keep it balanced. This is the most important rule!',
          zh: '如果你在一边加了东西，你也需要在另一边加上一样的东西来保持平衡。这是最重要的规则！'
        }
      },
      {
        title: { en: 'Try It!', zh: '试一试！' },
        content: {
          en: 'Drag objects onto both sides of the scale. Can you keep it balanced? Try the "Solve It!" game to practice finding the mystery number!',
          zh: '把物体拖到天平的两边。你能保持平衡吗？试试"解题"游戏来练习找出神秘数字！'
        }
      }
    ]
  },
  {
    id: 'energy-skate-park',
    name: { en: 'Energy Skate Park', zh: '能量滑板公园' },
    description: {
      en: 'Watch a skater zoom up and down on tracks! See how speed and height are connected through energy.',
      zh: '看滑板选手在轨道上飞驰！了解速度和高度是怎么通过能量联系在一起的。'
    },
    url: {
      en: 'https://phet.colorado.edu/sims/html/energy-skate-park/latest/energy-skate-park_en.html',
      zh: 'https://phet.colorado.edu/sims/html/energy-skate-park/latest/energy-skate-park_zh_CN.html'
    },
    category: 'Physics',
    gradeLevel: 'elementary',
    tags: { en: ['Energy', 'Speed', 'Height'], zh: ['能量', '速度', '高度'] },
    guide: [
      {
        title: { en: 'Energy is Like a Superpower!', zh: '能量就像超能力！' },
        content: {
          en: 'When the skater is high up, they have stored energy (like a stretched rubber band). As they roll down, that stored energy turns into speed energy. Higher up means faster at the bottom!',
          zh: '当滑板选手在高处时，他有储存的能量（就像拉伸的橡皮筋）。当他往下滑时，储存的能量变成了速度能量。起点越高，到底部就越快！'
        }
      },
      {
        title: { en: 'Energy Never Disappears!', zh: '能量不会消失！' },
        content: {
          en: 'Energy cannot just vanish! It changes form: height energy becomes speed energy, and speed energy becomes height energy. Watch the colored bars to see this happen!',
          zh: '能量不会凭空消失！它会变换形式：高度能量变成速度能量，速度能量又变回高度能量。看看彩色的柱状图就能看到这个过程！'
        }
      },
      {
        title: { en: 'Try It!', zh: '试一试！' },
        content: {
          en: 'Put the skater at the top of the ramp and let go. Watch the energy bars change! Try turning on friction - where does the energy go then?',
          zh: '把滑板选手放在坡道顶部然后放手。看看能量柱状图的变化！试试打开摩擦力——那能量去哪里了呢？'
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
    gradeLevel: 'middle',
    tags: { en: ['Electricity', 'Circuits', 'Voltage'], zh: ['电学', '电路', '电压'] },
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
    gradeLevel: 'middle',
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
    gradeLevel: 'middle',
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
    gradeLevel: 'middle',
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
    gradeLevel: 'middle',
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
    gradeLevel: 'middle',
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
    gradeLevel: 'middle',
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
  }
];
