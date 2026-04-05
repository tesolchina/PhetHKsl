import pg from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "@workspace/db/schema";

const PHET_API_URL = "https://phet.colorado.edu/services/metadata/1.3/simulations?format=json&type=html";

const existingSimulations = [
  {
    slug: "color-vision",
    nameEn: "Color Vision",
    nameZh: "彩色视觉",
    descriptionEn: "Make a whole rainbow by mixing red, green, and blue light. Change the wavelength of a monochromatic beam or filter white light.",
    descriptionZh: "通过混合红、绿、蓝光制造彩虹。改变单色光束的波长或过滤白光。",
    category: "Physics",
    gradeLevel: "elementary",
    tagsEn: ["Light", "Color", "Mixing"],
    tagsZh: ["光", "颜色", "混合"],
    urlEn: "https://phet.colorado.edu/sims/html/color-vision/latest/color-vision_en.html",
    urlZh: "https://phet.colorado.edu/sims/html/color-vision/latest/color-vision_zh_CN.html",
    guide: [
      { title: { en: "How Do We See Colors?", zh: "我们怎么看到颜色的？" }, content: { en: "Our eyes can see three main colors of light: red, green, and blue. When these colors mix together, they make all the other colors we see every day!", zh: "我们的眼睛能看到三种主要的光色：红色、绿色和蓝色。当这些颜色混合在一起时，就会变出我们每天看到的所有颜色！" } },
      { title: { en: "Mixing Light is Like Magic!", zh: "混合光就像变魔术！" }, content: { en: "When you mix red light and green light, you get yellow! Red and blue make pink (magenta). Green and blue make light blue (cyan). And all three together make white light!", zh: "当你把红光和绿光混在一起，就会变成黄色！红色和蓝色变成粉色。绿色和蓝色变成浅蓝色。三种光全部混在一起就变成白光！" } },
      { title: { en: "Try It!", zh: "试一试！" }, content: { en: "Move the color sliders to mix different lights. Can you make your favorite color? Try making white light by turning all three colors to maximum!", zh: "移动颜色滑块来混合不同的光。你能调出你最喜欢的颜色吗？试试把三种颜色都调到最大，看看会变成什么！" } },
    ],
  },
  {
    slug: "friction",
    nameEn: "Friction Lab",
    nameZh: "摩擦力实验室",
    descriptionEn: "An original interactive experience: explore how friction creates heat through story, prediction, simulation, and hands-on challenges!",
    descriptionZh: "原创互动体验：通过故事、预测、模拟和动手挑战，探索摩擦力如何产生热量！",
    category: "Physics",
    gradeLevel: "elementary",
    tagsEn: ["Friction", "Heat", "Atoms", "Original"],
    tagsZh: ["摩擦力", "热量", "原子", "原创"],
    urlEn: "https://phet.colorado.edu/sims/html/friction/latest/friction_en.html",
    urlZh: "https://phet.colorado.edu/sims/html/friction/latest/friction_zh_CN.html",
    customRoute: "/friction-lab",
    guide: [
      { title: { en: "What is Friction?", zh: "什么是摩擦力？" }, content: { en: "Friction is what happens when two things rub together. Try rubbing your hands together quickly - do you feel them getting warm? That warmth comes from friction!", zh: "摩擦力就是两个东西互相摩擦时产生的力。试着快速搓搓你的双手——感觉到变暖了吗？那个热量就是摩擦产生的！" } },
      { title: { en: "Tiny Atoms Are Shaking!", zh: "小小的原子在抖动！" }, content: { en: "Everything around us is made of tiny tiny particles called atoms. When you rub things together, the atoms start shaking faster and faster. That shaking is what we feel as heat!", zh: "我们周围的一切都是由叫做\"原子\"的超小粒子组成的。当你摩擦东西时，原子会越抖越快。我们感觉到的热量就是原子在抖动！" } },
      { title: { en: "Try It!", zh: "试一试！" }, content: { en: "Drag the top book back and forth. Watch the little atoms jiggle! Rub really fast and see what happens - can you make the atoms break free?", zh: "来回拖动上面的书。看看那些小原子在抖动！使劲快速摩擦，看看会发生什么——你能让原子挣脱出来吗？" } },
    ],
  },
  {
    slug: "states-of-matter",
    nameEn: "States of Matter",
    nameZh: "物质状态",
    descriptionEn: "Heat up or cool down atoms and watch them change between solid, liquid, and gas - just like ice, water, and steam!",
    descriptionZh: "给原子加热或冷却，观察它们在固态、液态和气态之间变化——就像冰、水和蒸气一样！",
    category: "Chemistry",
    gradeLevel: "elementary",
    tagsEn: ["Solid", "Liquid", "Gas"],
    tagsZh: ["固体", "液体", "气体"],
    urlEn: "https://phet.colorado.edu/sims/html/states-of-matter/latest/states-of-matter_en.html",
    urlZh: "https://phet.colorado.edu/sims/html/states-of-matter/latest/states-of-matter_zh_CN.html",
    guide: [
      { title: { en: "Three Forms of Stuff", zh: "东西的三种形态" }, content: { en: "Everything around us can be a solid (like ice), a liquid (like water), or a gas (like steam). The tiny atoms inside behave differently in each form!", zh: "我们周围的一切都可以是固体（像冰）、液体（像水）或气体（像蒸气）。里面的小原子在每种形态下的表现都不一样！" } },
      { title: { en: "Heat Makes Things Move!", zh: "加热让东西动起来！" }, content: { en: "In a solid, atoms stay in place and just wiggle a little. Add heat and they start moving more - that is melting! Add even more heat and they fly around everywhere - that is boiling!", zh: "在固体中，原子待在原地只是轻轻晃动。加热后它们开始移动更多——这就是融化！再加更多热量，它们就到处飞——这就是沸腾！" } },
      { title: { en: "Try It!", zh: "试一试！" }, content: { en: "Press the heat button to warm things up. Watch the atoms start moving faster! Then cool it down and watch them slow down and freeze. Try different materials like water or oxygen!", zh: "按加热按钮让东西变暖。看原子动得越来越快！然后冷却它们，看它们慢下来并冻住。试试不同的材料，比如水或氧气！" } },
    ],
  },
  {
    slug: "balancing-act",
    nameEn: "Balancing Act",
    nameZh: "平衡探秘",
    descriptionEn: "Play with objects on a seesaw to learn about balance! Can you figure out how to keep it level?",
    descriptionZh: "在跷跷板上放置物体来学习平衡！你能想出怎么让它保持水平吗？",
    category: "Physics",
    gradeLevel: "elementary",
    tagsEn: ["Balance", "Seesaw", "Weight"],
    tagsZh: ["平衡", "跷跷板", "重量"],
    urlEn: "https://phet.colorado.edu/sims/html/balancing-act/latest/balancing-act_en.html",
    urlZh: "https://phet.colorado.edu/sims/html/balancing-act/latest/balancing-act_zh_CN.html",
    guide: [
      { title: { en: "The Seesaw Rule", zh: "跷跷板的秘密" }, content: { en: "On a seesaw, a heavy person sitting close to the middle can balance a lighter person sitting farther away. It is all about weight AND distance from the center!", zh: "在跷跷板上，一个重的人坐得离中间近，可以和一个轻的人坐得远的一边平衡。关键是重量和离中心的距离！" } },
      { title: { en: "Try It!", zh: "试一试！" }, content: { en: "Put different objects on each side of the seesaw. Can you make it balance? Try the game mode and see if you can guess where to put things!", zh: "在跷跷板的两边放不同的东西。你能让它平衡吗？试试游戏模式，看看你能不能猜对该把东西放在哪里！" } },
    ],
  },
  {
    slug: "equality-explorer",
    nameEn: "Equality Explorer",
    nameZh: "等式探索",
    descriptionEn: "Use a balance scale to understand what \"equal\" really means. Put things on both sides and keep the scale level!",
    descriptionZh: "用天平来理解\"相等\"的到底是什么意思。在两边放东西，保持天平平衡！",
    category: "Physics",
    gradeLevel: "elementary",
    tagsEn: ["Equality", "Balance", "Math"],
    tagsZh: ["等式", "天平", "数学"],
    urlEn: "/phet-local/equality-explorer/equality-explorer_en.html",
    urlZh: "/phet-local/equality-explorer/equality-explorer_en.html?locale=zh_CN",
    localDev: true,
    guide: [
      { title: { en: "What Does \"Equal\" Mean?", zh: "\"相等\"是什么意思？" }, content: { en: "When a balance scale is perfectly level, both sides have the same weight. That is what \"equal\" means - the two sides are the same!", zh: "当天平完全水平时，两边的重量一样。这就是\"相等\"的意思——两边是一样的！" } },
      { title: { en: "Keep It Balanced!", zh: "保持平衡！" }, content: { en: "If you add something to one side, you need to add the same thing to the other side to keep it balanced. This is the most important rule!", zh: "如果你在一边加了东西，你也需要在另一边加上一样的东西来保持平衡。这是最重要的规则！" } },
      { title: { en: "Try It!", zh: "试一试！" }, content: { en: "Drag objects onto both sides of the scale. Can you keep it balanced? Try the \"Solve It!\" game to practice finding the mystery number!", zh: "把物体拖到天平的两边。你能保持平衡吗？试试\"解题\"游戏来练习找出神秘数字！" } },
    ],
  },
  {
    slug: "energy-skate-park",
    nameEn: "Energy Skate Park",
    nameZh: "能量滑板公园",
    descriptionEn: "Watch a skater zoom up and down on tracks! See how speed and height are connected through energy.",
    descriptionZh: "看滑板选手在轨道上飞驰！了解速度和高度是怎么通过能量联系在一起的。",
    category: "Physics",
    gradeLevel: "elementary",
    tagsEn: ["Energy", "Speed", "Height"],
    tagsZh: ["能量", "速度", "高度"],
    urlEn: "https://phet.colorado.edu/sims/html/energy-skate-park/latest/energy-skate-park_en.html",
    urlZh: "https://phet.colorado.edu/sims/html/energy-skate-park/latest/energy-skate-park_zh_CN.html",
    guide: [
      { title: { en: "Energy is Like a Superpower!", zh: "能量就像超能力！" }, content: { en: "When the skater is high up, they have stored energy (like a stretched rubber band). As they roll down, that stored energy turns into speed energy. Higher up means faster at the bottom!", zh: "当滑板选手在高处时，他有储存的能量（就像拉伸的橡皮筋）。当他往下滑时，储存的能量变成了速度能量。起点越高，到底部就越快！" } },
      { title: { en: "Energy Never Disappears!", zh: "能量不会消失！" }, content: { en: "Energy cannot just vanish! It changes form: height energy becomes speed energy, and speed energy becomes height energy. Watch the colored bars to see this happen!", zh: "能量不会凭空消失！它会变换形式：高度能量变成速度能量，速度能量又变回高度能量。看看彩色的柱状图就能看到这个过程！" } },
      { title: { en: "Try It!", zh: "试一试！" }, content: { en: "Put the skater at the top of the ramp and let go. Watch the energy bars change! Try turning on friction - where does the energy go then?", zh: "把滑板选手放在坡道顶部然后放手。看看能量柱状图的变化！试试打开摩擦力——那能量去哪里了呢？" } },
    ],
  },
  {
    slug: "circuit-construction-kit-dc",
    nameEn: "Circuit Construction Kit",
    nameZh: "电路组建实验",
    descriptionEn: "Explore basic electricity relationships. Build circuits with batteries, resistors, light bulbs, and switches.",
    descriptionZh: "探索基本的电学关系。用电池、电阻、灯泡和开关搭建电路。",
    category: "Physics",
    gradeLevel: "middle",
    tagsEn: ["Electricity", "Circuits", "Voltage"],
    tagsZh: ["电学", "电路", "电压"],
    urlEn: "https://phet.colorado.edu/sims/html/circuit-construction-kit-dc/latest/circuit-construction-kit-dc_en.html",
    urlZh: "https://phet.colorado.edu/sims/html/circuit-construction-kit-dc/latest/circuit-construction-kit-dc_zh_CN.html",
    guide: [
      { title: { en: "What is a Circuit?", zh: "什么是电路？" }, content: { en: "An electric circuit is a closed loop through which electric current can flow. It needs a power source (like a battery), a load (like a light bulb), and wires to connect them.", zh: "电路是电流可以流过的闭合回路。它需要电源（如电池）、负载（如灯泡）和连接它们的导线。" } },
      { title: { en: "Ohm's Law", zh: "欧姆定律" }, content: { en: "Voltage (V) = Current (I) x Resistance (R). This fundamental law describes how voltage, current, and resistance relate to each other in a circuit.", zh: "电压（V）= 电流（I）x 电阻（R）。这个基本定律描述了电路中电压、电流和电阻之间的关系。" } },
      { title: { en: "Series vs Parallel", zh: "串联与并联" }, content: { en: "In a series circuit, components are connected end-to-end, sharing the same current. In a parallel circuit, components share the same voltage but current is divided between them.", zh: "在串联电路中，元件首尾相连，共享相同的电流。在并联电路中，元件共享相同的电压，但电流在它们之间分配。" } },
      { title: { en: "Try It!", zh: "试一试！" }, content: { en: "Drag components from the toolbox to build a circuit. Connect a battery to a light bulb and watch it glow. Try adding resistors to see how brightness changes.", zh: "从工具箱中拖动元件来搭建电路。将电池连接到灯泡并观察它发光。试着添加电阻，看看亮度如何变化。" } },
    ],
  },
  {
    slug: "gravity-and-orbits",
    nameEn: "Gravity and Orbits",
    nameZh: "万有引力与轨道",
    descriptionEn: "Move the sun, earth, moon and space station to see how it affects their gravitational forces and orbital paths.",
    descriptionZh: "移动太阳、地球、月球和空间站，观察引力和轨道路径如何变化。",
    category: "Physics",
    gradeLevel: "middle",
    tagsEn: ["Gravity", "Force", "Space"],
    tagsZh: ["引力", "力", "太空"],
    urlEn: "https://phet.colorado.edu/sims/html/gravity-and-orbits/latest/gravity-and-orbits_en.html",
    urlZh: "https://phet.colorado.edu/sims/html/gravity-and-orbits/latest/gravity-and-orbits_zh_CN.html",
    guide: [
      { title: { en: "Universal Gravitation", zh: "万有引力" }, content: { en: "Every object with mass attracts every other object with mass. The force depends on both masses and the distance between them: F = G(m1 x m2)/r^2.", zh: "每个有质量的物体都会吸引其他有质量的物体。引力取决于两个物体的质量和它们之间的距离：F = G(m1 x m2)/r^2。" } },
      { title: { en: "Orbital Motion", zh: "轨道运动" }, content: { en: "Objects in orbit are constantly falling toward the larger body but moving sideways fast enough to keep missing it. This balance between gravity and velocity creates a stable orbit.", zh: "轨道上的物体不断地向更大的天体坠落，但横向移动速度足够快，不断\"错过\"它。这种引力和速度之间的平衡创造了稳定的轨道。" } },
      { title: { en: "Try It!", zh: "试一试！" }, content: { en: "Try changing the mass of the Earth or Sun. See what happens to the orbit when you increase the velocity. Can you make the Moon escape Earth's gravity?", zh: "试着改变地球或太阳的质量。看看当你增加速度时轨道会发生什么变化。你能让月球逃离地球的引力吗？" } },
    ],
  },
  {
    slug: "wave-on-a-string",
    nameEn: "Wave on a String",
    nameZh: "绳波",
    descriptionEn: "Explore the wonderful world of waves! Observe a string vibrate in slow motion. Wiggle the end of the string and make waves.",
    descriptionZh: "探索奇妙的波动世界！以慢动作观察绳子的振动。摆动绳子的一端来制造波。",
    category: "Physics",
    gradeLevel: "middle",
    tagsEn: ["Waves", "Frequency", "Amplitude"],
    tagsZh: ["波", "频率", "振幅"],
    urlEn: "https://phet.colorado.edu/sims/html/wave-on-a-string/latest/wave-on-a-string_en.html",
    urlZh: "https://phet.colorado.edu/sims/html/wave-on-a-string/latest/wave-on-a-string_zh_CN.html",
    guide: [
      { title: { en: "What is a Wave?", zh: "什么是波？" }, content: { en: "A wave is a disturbance that transfers energy from one place to another without transferring matter. Waves have properties like amplitude (height), frequency (repetitions per second), and wavelength.", zh: "波是一种将能量从一个地方传递到另一个地方而不传递物质的扰动。波具有振幅（高度）、频率（每秒重复次数）和波长等属性。" } },
      { title: { en: "Amplitude & Frequency", zh: "振幅与频率" }, content: { en: "Amplitude determines how much energy a wave carries - larger amplitude means more energy. Frequency tells you how often the wave repeats - higher frequency means more waves per second.", zh: "振幅决定了波携带多少能量——振幅越大意味着能量越多。频率告诉你波重复的频率——频率越高意味着每秒有更多的波。" } },
      { title: { en: "Try It!", zh: "试一试！" }, content: { en: "Use the slider to change the frequency and amplitude. Switch between manual, oscillate, and pulse modes. Try different end conditions (fixed, loose, no end) and observe the reflections.", zh: "使用滑块来改变频率和振幅。在手动、振荡和脉冲模式之间切换。尝试不同的端部条件（固定端、自由端、无端）并观察反射。" } },
    ],
  },
  {
    slug: "build-an-atom",
    nameEn: "Build an Atom",
    nameZh: "原子构建",
    descriptionEn: "Build an atom out of protons, neutrons, and electrons, and see how the element, charge, and mass change.",
    descriptionZh: "用质子、中子和电子构建一个原子，观察元素、电荷和质量如何变化。",
    category: "Chemistry",
    gradeLevel: "middle",
    tagsEn: ["Atoms", "Elements", "Protons"],
    tagsZh: ["原子", "元素", "质子"],
    urlEn: "https://phet.colorado.edu/sims/html/build-an-atom/latest/build-an-atom_en.html",
    urlZh: "https://phet.colorado.edu/sims/html/build-an-atom/latest/build-an-atom_zh_CN.html",
    guide: [
      { title: { en: "Atomic Structure", zh: "原子结构" }, content: { en: "Atoms are made of three subatomic particles: protons (positive charge), neutrons (no charge), and electrons (negative charge). Protons and neutrons form the nucleus, while electrons orbit around it.", zh: "原子由三种亚原子粒子组成：质子（正电荷）、中子（无电荷）和电子（负电荷）。质子和中子构成原子核，而电子在其周围运行。" } },
      { title: { en: "Elements & Isotopes", zh: "元素与同位素" }, content: { en: "The number of protons determines which element an atom is. Atoms of the same element with different numbers of neutrons are called isotopes. Adding or removing electrons creates ions.", zh: "质子的数量决定了原子是哪种元素。同一元素中具有不同中子数量的原子称为同位素。添加或移除电子会产生离子。" } },
      { title: { en: "Try It!", zh: "试一试！" }, content: { en: "Drag protons, neutrons, and electrons into the atom. Watch how the element name, charge, and mass number change. Can you build a stable carbon atom?", zh: "将质子、中子和电子拖到原子中。观察元素名称、电荷和质量数如何变化。你能构建一个稳定的碳原子吗？" } },
    ],
  },
  {
    slug: "masses-and-springs",
    nameEn: "Masses and Springs",
    nameZh: "质量与弹簧",
    descriptionEn: "Hang masses from springs and adjust the spring constant and damping. Transport the lab to different planets.",
    descriptionZh: "在弹簧上悬挂质量块，调节弹簧常数和阻尼。将实验室传送到不同的星球。",
    category: "Physics",
    gradeLevel: "middle",
    tagsEn: ["Springs", "Hooke's Law", "Force"],
    tagsZh: ["弹簧", "胡克定律", "力"],
    urlEn: "https://phet.colorado.edu/sims/html/masses-and-springs/latest/masses-and-springs_en.html",
    urlZh: "https://phet.colorado.edu/sims/html/masses-and-springs/latest/masses-and-springs_zh_CN.html",
    guide: [
      { title: { en: "Hooke's Law", zh: "胡克定律" }, content: { en: "The force exerted by a spring is proportional to how far it is stretched or compressed: F = -kx, where k is the spring constant and x is the displacement from equilibrium.", zh: "弹簧施加的力与其拉伸或压缩的距离成正比：F = -kx，其中k是弹簧常数，x是偏离平衡位置的位移。" } },
      { title: { en: "Try It!", zh: "试一试！" }, content: { en: "Hang different masses on the springs. Change the spring constant and observe how stiffness affects the oscillation. Try the same experiment on Jupiter or the Moon!", zh: "在弹簧上悬挂不同的质量。改变弹簧常数，观察刚度如何影响振荡。试试在木星或月球上做同样的实验！" } },
    ],
  },
  {
    slug: "projectile-motion",
    nameEn: "Projectile Motion",
    nameZh: "抛体运动",
    descriptionEn: "Blast a car out of a cannon, and challenge yourself to hit a target! Learn about projectile motion by firing various objects.",
    descriptionZh: "用大炮发射汽车，挑战自己击中目标！通过发射各种物体来学习抛体运动。",
    category: "Physics",
    gradeLevel: "middle",
    tagsEn: ["Kinematics", "Velocity", "Vectors"],
    tagsZh: ["运动学", "速度", "矢量"],
    urlEn: "https://phet.colorado.edu/sims/html/projectile-motion/latest/projectile-motion_en.html",
    urlZh: "https://phet.colorado.edu/sims/html/projectile-motion/latest/projectile-motion_zh_CN.html",
    guide: [
      { title: { en: "Projectile Motion", zh: "抛体运动" }, content: { en: "A projectile moves in two independent directions: horizontally (constant speed) and vertically (accelerated by gravity). The combination creates a parabolic path.", zh: "抛体在两个独立方向上运动：水平方向（匀速）和竖直方向（受重力加速）。两者的组合形成抛物线轨迹。" } },
      { title: { en: "Launch Angle", zh: "发射角度" }, content: { en: "The optimal angle for maximum range (on flat ground, no air resistance) is 45 degrees. Angles above and below 45 degrees produce shorter ranges, with complementary angles giving the same range.", zh: "在平地上且无空气阻力的情况下，获得最大射程的最佳角度是45度。高于和低于45度的角度会产生较短的射程，互补角会产生相同的射程。" } },
      { title: { en: "Try It!", zh: "试一试！" }, content: { en: "Change the angle and initial speed. Try enabling air resistance and compare with the ideal case. Fire different objects and see how mass and drag affect the trajectory.", zh: "改变角度和初始速度。尝试启用空气阻力并与理想情况进行比较。发射不同的物体，看看质量和阻力如何影响轨迹。" } },
    ],
  },
  {
    slug: "neuron",
    nameEn: "Neuron",
    nameZh: "神经元",
    descriptionEn: "Stimulate a neuron and watch what happens. Pause, rewind, and move forward in time to observe the ions as they move across the neuron membrane.",
    descriptionZh: "刺激一个神经元并观察发生了什么。暂停、倒退和快进，观察离子穿过神经元细胞膜的过程。",
    category: "Biology",
    gradeLevel: "middle",
    tagsEn: ["Action Potential", "Ions", "Nerve"],
    tagsZh: ["动作电位", "离子", "神经"],
    urlEn: "/phet-local/neuron/neuron_en.html",
    urlZh: "/phet-local/neuron/neuron_en.html?locale=zh_CN",
    localDev: true,
    guide: [
      { title: { en: "What is a Neuron?", zh: "什么是神经元？" }, content: { en: "A neuron is a nerve cell that transmits electrical signals throughout the body. It has a cell body, dendrites that receive signals, and an axon that sends signals to other cells.", zh: "神经元是一种通过全身传输电信号的神经细胞。它有细胞体、接收信号的树突和将信号发送到其他细胞的轴突。" } },
      { title: { en: "The Action Potential", zh: "动作电位" }, content: { en: "When a neuron is stimulated, sodium ions (Na+) rush into the cell, making the inside more positive. This creates an electrical pulse called an action potential that travels along the axon.", zh: "当神经元被刺激时，钠离子（Na+）涌入细胞内部，使细胞内部变得更加正电。这产生了一个称为动作电位的电脉冲，沿轴突传播。" } },
      { title: { en: "Ion Channels", zh: "离子通道" }, content: { en: "The neuron membrane has special protein channels that open and close. Sodium channels open first (depolarization), then potassium channels open (repolarization), restoring the resting potential.", zh: "神经元细胞膜上有特殊的蛋白质通道可以打开和关闭。钠通道首先打开（去极化），然后钾通道打开（复极化），恢复静息电位。" } },
      { title: { en: "Try It!", zh: "试一试！" }, content: { en: "Click the \"Stimulate Neuron\" button to trigger an action potential. Watch the ions move across the membrane. Use the playback controls to slow down or pause the animation.", zh: "点击\"刺激神经元\"按钮触发一个动作电位。观察离子穿过细胞膜的过程。使用播放控件来减慢或暂停动画。" } },
    ],
  },
  {
    slug: "natural-selection",
    nameEn: "Natural Selection",
    nameZh: "自然选择",
    descriptionEn: "Explore natural selection by controlling the environment and observing how populations of bunnies evolve over time.",
    descriptionZh: "通过控制环境来探索自然选择，观察兔子种群如何随时间演化。",
    category: "Biology",
    gradeLevel: "middle",
    tagsEn: ["Evolution", "Genetics", "Adaptation"],
    tagsZh: ["进化", "遗传", "适应"],
    urlEn: "https://phet.colorado.edu/sims/html/natural-selection/latest/natural-selection_en.html",
    urlZh: "https://phet.colorado.edu/sims/html/natural-selection/latest/natural-selection_zh_CN.html",
    guide: [
      { title: { en: "Natural Selection", zh: "自然选择" }, content: { en: "Natural selection is the process where organisms with traits better suited to their environment survive and reproduce more. Over generations, these helpful traits become more common.", zh: "自然选择是指具有更适应环境特征的生物能够更好地生存和繁殖的过程。经过几代，这些有利的特征变得更加普遍。" } },
      { title: { en: "Variation & Heredity", zh: "变异与遗传" }, content: { en: "Individuals in a population have natural variations in their traits. These traits can be passed down to offspring through genes. Mutations can introduce new traits.", zh: "种群中的个体在其特征上存在自然变异。这些特征可以通过基因遗传给后代。突变可以引入新的特征。" } },
      { title: { en: "Try It!", zh: "试一试！" }, content: { en: "Add a mutation for fur color or teeth. Then change the environment by adding wolves or changing the food. Watch how the bunny population changes over generations!", zh: "添加毛色或牙齿的突变。然后通过添加狼或改变食物来改变环境。观察兔子种群如何随着几代变化！" } },
    ],
  },
];

interface PhetSimulation {
  simulations: Array<{
    name: string;
    localizedSimulations: Array<{
      locale: string;
      title: string;
    }>;
    topics: string[];
    type: string;
  }>;
}

interface StaticSim {
  slug: string;
  nameEn: string;
  nameZh: string;
  category: string;
  gradeLevel: string;
  hasZh: boolean;
}

const staticCatalog: StaticSim[] = [
  { slug: "acid-base-solutions", nameEn: "Acid-Base Solutions", nameZh: "酸碱溶液", category: "Chemistry", gradeLevel: "middle", hasZh: true },
  { slug: "area-builder", nameEn: "Area Builder", nameZh: "面积生成器", category: "Math", gradeLevel: "elementary", hasZh: true },
  { slug: "area-model-algebra", nameEn: "Area Model Algebra", nameZh: "面积模型代数", category: "Math", gradeLevel: "middle", hasZh: true },
  { slug: "area-model-decimals", nameEn: "Area Model Decimals", nameZh: "面积模型小数", category: "Math", gradeLevel: "elementary", hasZh: true },
  { slug: "area-model-introduction", nameEn: "Area Model Introduction", nameZh: "面积模型简介", category: "Math", gradeLevel: "elementary", hasZh: true },
  { slug: "area-model-multiplication", nameEn: "Area Model Multiplication", nameZh: "面积模型乘法", category: "Math", gradeLevel: "elementary", hasZh: true },
  { slug: "arithmetic", nameEn: "Arithmetic", nameZh: "算术", category: "Math", gradeLevel: "elementary", hasZh: true },
  { slug: "atomic-interactions", nameEn: "Atomic Interactions", nameZh: "原子间相互作用", category: "Chemistry", gradeLevel: "middle", hasZh: true },
  { slug: "balancing-chemical-equations", nameEn: "Balancing Chemical Equations", nameZh: "配平化学方程式", category: "Chemistry", gradeLevel: "middle", hasZh: true },
  { slug: "balloons-and-static-electricity", nameEn: "Balloons and Static Electricity", nameZh: "气球和静电", category: "Physics", gradeLevel: "elementary", hasZh: true },
  { slug: "beers-law-lab", nameEn: "Beer's Law Lab", nameZh: "比尔定律实验室", category: "Chemistry", gradeLevel: "middle", hasZh: true },
  { slug: "bending-light", nameEn: "Bending Light", nameZh: "光的折射", category: "Physics", gradeLevel: "middle", hasZh: true },
  { slug: "blackbody-spectrum", nameEn: "Blackbody Spectrum", nameZh: "黑体辐射光谱", category: "Physics", gradeLevel: "middle", hasZh: true },
  { slug: "build-a-molecule", nameEn: "Build a Molecule", nameZh: "搭建分子", category: "Chemistry", gradeLevel: "middle", hasZh: true },
  { slug: "build-a-fraction", nameEn: "Build a Fraction", nameZh: "搭建分数", category: "Math", gradeLevel: "elementary", hasZh: true },
  { slug: "build-a-nucleus", nameEn: "Build a Nucleus", nameZh: "构建原子核", category: "Physics", gradeLevel: "middle", hasZh: true },
  { slug: "buoyancy", nameEn: "Buoyancy", nameZh: "浮力", category: "Physics", gradeLevel: "middle", hasZh: true },
  { slug: "buoyancy-basics", nameEn: "Buoyancy Basics", nameZh: "浮力基础", category: "Physics", gradeLevel: "elementary", hasZh: true },
  { slug: "calculus-grapher", nameEn: "Calculus Grapher", nameZh: "微积分图形", category: "Math", gradeLevel: "middle", hasZh: true },
  { slug: "capacitor-lab-basics", nameEn: "Capacitor Lab: Basics", nameZh: "电容器实验室：基础", category: "Physics", gradeLevel: "middle", hasZh: true },
  { slug: "center-and-variability", nameEn: "Center and Variability", nameZh: "集中与变异", category: "Math", gradeLevel: "middle", hasZh: true },
  { slug: "charges-and-fields", nameEn: "Charges and Fields", nameZh: "电荷与电场", category: "Physics", gradeLevel: "middle", hasZh: true },
  { slug: "circuit-construction-kit-ac", nameEn: "Circuit Construction Kit: AC", nameZh: "电路组建实验：交流", category: "Physics", gradeLevel: "middle", hasZh: true },
  { slug: "collision-lab", nameEn: "Collision Lab", nameZh: "碰撞实验室", category: "Physics", gradeLevel: "middle", hasZh: true },
  { slug: "color-vision", nameEn: "Color Vision", nameZh: "彩色视觉", category: "Physics", gradeLevel: "elementary", hasZh: true },
  { slug: "concentration", nameEn: "Concentration", nameZh: "浓度", category: "Chemistry", gradeLevel: "middle", hasZh: true },
  { slug: "coulombs-law", nameEn: "Coulomb's Law", nameZh: "库仑定律", category: "Physics", gradeLevel: "middle", hasZh: true },
  { slug: "curve-fitting", nameEn: "Curve Fitting", nameZh: "曲线拟合", category: "Math", gradeLevel: "middle", hasZh: true },
  { slug: "density", nameEn: "Density", nameZh: "密度", category: "Physics", gradeLevel: "middle", hasZh: true },
  { slug: "diffusion", nameEn: "Diffusion", nameZh: "扩散", category: "Physics", gradeLevel: "middle", hasZh: true },
  { slug: "energy-forms-and-changes", nameEn: "Energy Forms and Changes", nameZh: "能量的形式和转化", category: "Physics", gradeLevel: "elementary", hasZh: true },
  { slug: "equality-explorer-basics", nameEn: "Equality Explorer: Basics", nameZh: "等式探索：基础", category: "Math", gradeLevel: "elementary", hasZh: true },
  { slug: "equality-explorer-two-variables", nameEn: "Equality Explorer: Two Variables", nameZh: "等式探索：两个变量", category: "Math", gradeLevel: "middle", hasZh: true },
  { slug: "estimation", nameEn: "Estimation", nameZh: "估算", category: "Math", gradeLevel: "elementary", hasZh: true },
  { slug: "expression-exchange", nameEn: "Expression Exchange", nameZh: "表达式变换", category: "Math", gradeLevel: "middle", hasZh: true },
  { slug: "faradays-law", nameEn: "Faraday's Law", nameZh: "法拉第电磁感应定律", category: "Physics", gradeLevel: "middle", hasZh: true },
  { slug: "forces-and-motion-basics", nameEn: "Forces and Motion: Basics", nameZh: "力和运动：基础", category: "Physics", gradeLevel: "elementary", hasZh: true },
  { slug: "fraction-matcher", nameEn: "Fraction Matcher", nameZh: "分数配对", category: "Math", gradeLevel: "elementary", hasZh: true },
  { slug: "fractions-equality", nameEn: "Fractions: Equality", nameZh: "分数：相等", category: "Math", gradeLevel: "elementary", hasZh: true },
  { slug: "fractions-intro", nameEn: "Fractions: Intro", nameZh: "分数：简介", category: "Math", gradeLevel: "elementary", hasZh: true },
  { slug: "fractions-mixed-numbers", nameEn: "Fractions: Mixed Numbers", nameZh: "分数：混合数", category: "Math", gradeLevel: "elementary", hasZh: true },
  { slug: "function-builder", nameEn: "Function Builder", nameZh: "函数生成器", category: "Math", gradeLevel: "elementary", hasZh: true },
  { slug: "function-builder-basics", nameEn: "Function Builder: Basics", nameZh: "函数生成器：基础", category: "Math", gradeLevel: "elementary", hasZh: true },
  { slug: "gas-properties", nameEn: "Gas Properties", nameZh: "气体性质", category: "Chemistry", gradeLevel: "middle", hasZh: true },
  { slug: "gases-intro", nameEn: "Gases Intro", nameZh: "气体简介", category: "Chemistry", gradeLevel: "middle", hasZh: true },
  { slug: "gene-expression-essentials", nameEn: "Gene Expression Essentials", nameZh: "基因表达基础", category: "Biology", gradeLevel: "middle", hasZh: true },
  { slug: "geometric-optics", nameEn: "Geometric Optics", nameZh: "几何光学", category: "Physics", gradeLevel: "middle", hasZh: true },
  { slug: "geometric-optics-basics", nameEn: "Geometric Optics: Basics", nameZh: "几何光学：基础", category: "Physics", gradeLevel: "elementary", hasZh: true },
  { slug: "graphing-lines", nameEn: "Graphing Lines", nameZh: "画线", category: "Math", gradeLevel: "middle", hasZh: true },
  { slug: "graphing-quadratics", nameEn: "Graphing Quadratics", nameZh: "画二次方程图", category: "Math", gradeLevel: "middle", hasZh: true },
  { slug: "graphing-slope-intercept", nameEn: "Graphing Slope-Intercept", nameZh: "画斜截式图", category: "Math", gradeLevel: "middle", hasZh: true },
  { slug: "gravity-force-lab", nameEn: "Gravity Force Lab", nameZh: "万有引力实验室", category: "Physics", gradeLevel: "middle", hasZh: true },
  { slug: "gravity-force-lab-basics", nameEn: "Gravity Force Lab: Basics", nameZh: "万有引力实验室：基础", category: "Physics", gradeLevel: "elementary", hasZh: true },
  { slug: "greenhouse-effect", nameEn: "Greenhouse Effect", nameZh: "温室效应", category: "Earth Science", gradeLevel: "middle", hasZh: true },
  { slug: "hookes-law", nameEn: "Hooke's Law", nameZh: "胡克定律", category: "Physics", gradeLevel: "middle", hasZh: true },
  { slug: "isotopes-and-atomic-mass", nameEn: "Isotopes and Atomic Mass", nameZh: "同位素和原子量", category: "Chemistry", gradeLevel: "middle", hasZh: true },
  { slug: "john-travoltage", nameEn: "John Travoltage", nameZh: "静电约翰", category: "Physics", gradeLevel: "elementary", hasZh: true },
  { slug: "keplers-laws", nameEn: "Kepler's Laws", nameZh: "开普勒定律", category: "Physics", gradeLevel: "middle", hasZh: true },
  { slug: "least-squares-regression", nameEn: "Least-Squares Regression", nameZh: "最小二乘回归", category: "Math", gradeLevel: "middle", hasZh: true },
  { slug: "make-a-ten", nameEn: "Make a Ten", nameZh: "凑十", category: "Math", gradeLevel: "elementary", hasZh: true },
  { slug: "mean-share-and-balance", nameEn: "Mean: Share and Balance", nameZh: "平均数：分享和平衡", category: "Math", gradeLevel: "middle", hasZh: true },
  { slug: "models-of-the-hydrogen-atom", nameEn: "Models of the Hydrogen Atom", nameZh: "氢原子模型", category: "Physics", gradeLevel: "middle", hasZh: true },
  { slug: "molarity", nameEn: "Molarity", nameZh: "摩尔浓度", category: "Chemistry", gradeLevel: "middle", hasZh: true },
  { slug: "molecule-polarity", nameEn: "Molecule Polarity", nameZh: "分子极性", category: "Chemistry", gradeLevel: "middle", hasZh: true },
  { slug: "molecule-shapes", nameEn: "Molecule Shapes", nameZh: "分子形状", category: "Chemistry", gradeLevel: "middle", hasZh: true },
  { slug: "molecule-shapes-basics", nameEn: "Molecule Shapes: Basics", nameZh: "分子形状：基础", category: "Chemistry", gradeLevel: "elementary", hasZh: true },
  { slug: "molecules-and-light", nameEn: "Molecules and Light", nameZh: "分子和光", category: "Chemistry", gradeLevel: "middle", hasZh: true },
  { slug: "my-solar-system", nameEn: "My Solar System", nameZh: "我的太阳系", category: "Physics", gradeLevel: "middle", hasZh: true },
  { slug: "number-compare", nameEn: "Number Compare", nameZh: "数字比较", category: "Math", gradeLevel: "elementary", hasZh: true },
  { slug: "number-line-distance", nameEn: "Number Line: Distance", nameZh: "数轴：距离", category: "Math", gradeLevel: "elementary", hasZh: true },
  { slug: "number-line-integers", nameEn: "Number Line: Integers", nameZh: "数轴：整数", category: "Math", gradeLevel: "elementary", hasZh: true },
  { slug: "number-line-operations", nameEn: "Number Line: Operations", nameZh: "数轴：运算", category: "Math", gradeLevel: "elementary", hasZh: true },
  { slug: "number-play", nameEn: "Number Play", nameZh: "数字游戏", category: "Math", gradeLevel: "elementary", hasZh: true },
  { slug: "ohms-law", nameEn: "Ohm's Law", nameZh: "欧姆定律", category: "Physics", gradeLevel: "middle", hasZh: true },
  { slug: "optics-lab", nameEn: "Optics Lab", nameZh: "光学实验室", category: "Physics", gradeLevel: "middle", hasZh: false },
  { slug: "pendulum-lab", nameEn: "Pendulum Lab", nameZh: "摆实验室", category: "Physics", gradeLevel: "middle", hasZh: true },
  { slug: "ph-scale", nameEn: "pH Scale", nameZh: "pH值", category: "Chemistry", gradeLevel: "middle", hasZh: true },
  { slug: "ph-scale-basics", nameEn: "pH Scale: Basics", nameZh: "pH值：基础", category: "Chemistry", gradeLevel: "elementary", hasZh: true },
  { slug: "phet-io-test-sim", nameEn: "PhET-iO Test Sim", nameZh: "PhET-iO 测试模拟", category: "Physics", gradeLevel: "middle", hasZh: false },
  { slug: "plinko-probability", nameEn: "Plinko Probability", nameZh: "弹珠概率", category: "Math", gradeLevel: "elementary", hasZh: true },
  { slug: "proportion-playground", nameEn: "Proportion Playground", nameZh: "比例游乐场", category: "Math", gradeLevel: "elementary", hasZh: true },
  { slug: "ratio-and-proportion", nameEn: "Ratio and Proportion", nameZh: "比和比例", category: "Math", gradeLevel: "elementary", hasZh: true },
  { slug: "reactants-products-and-leftovers", nameEn: "Reactants, Products and Leftovers", nameZh: "反应物、产物和剩余物", category: "Chemistry", gradeLevel: "middle", hasZh: true },
  { slug: "resistance-in-a-wire", nameEn: "Resistance in a Wire", nameZh: "导线电阻", category: "Physics", gradeLevel: "middle", hasZh: true },
  { slug: "rutherford-scattering", nameEn: "Rutherford Scattering", nameZh: "卢瑟福散射", category: "Physics", gradeLevel: "middle", hasZh: true },
  { slug: "states-of-matter-basics", nameEn: "States of Matter: Basics", nameZh: "物质状态：基础", category: "Chemistry", gradeLevel: "elementary", hasZh: true },
  { slug: "trig-tour", nameEn: "Trig Tour", nameZh: "三角函数之旅", category: "Math", gradeLevel: "middle", hasZh: true },
  { slug: "unit-rates", nameEn: "Unit Rates", nameZh: "单位费率", category: "Math", gradeLevel: "middle", hasZh: true },
  { slug: "vector-addition", nameEn: "Vector Addition", nameZh: "矢量加法", category: "Physics", gradeLevel: "middle", hasZh: true },
  { slug: "vector-addition-equations", nameEn: "Vector Addition: Equations", nameZh: "矢量加法：方程", category: "Math", gradeLevel: "middle", hasZh: true },
  { slug: "wave-interference", nameEn: "Wave Interference", nameZh: "波的干涉", category: "Physics", gradeLevel: "middle", hasZh: true },
  { slug: "waves-intro", nameEn: "Waves Intro", nameZh: "波的简介", category: "Physics", gradeLevel: "elementary", hasZh: true },
  { slug: "under-pressure", nameEn: "Under Pressure", nameZh: "压力之下", category: "Physics", gradeLevel: "middle", hasZh: true },
  { slug: "masses-and-springs-basics", nameEn: "Masses and Springs: Basics", nameZh: "质量与弹簧：基础", category: "Physics", gradeLevel: "elementary", hasZh: true },
  { slug: "energy-skate-park-basics", nameEn: "Energy Skate Park: Basics", nameZh: "能量滑板公园：基础", category: "Physics", gradeLevel: "elementary", hasZh: true },
];

async function main() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL must be set");
  }

  const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
  const db = drizzle(pool, { schema });

  console.log("Fetching PhET simulation metadata...");

  let phetData: PhetSimulation;
  try {
    const response = await fetch(PHET_API_URL);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    phetData = await response.json() as PhetSimulation;
  } catch (err) {
    console.error("Failed to fetch PhET API, using existing simulations only:", err);
    phetData = { simulations: [] };
  }

  const existingSlugs = new Set(existingSimulations.map(s => s.slug));
  const allInserts: schema.InsertSimulation[] = [];

  for (const existing of existingSimulations) {
    allInserts.push({
      slug: existing.slug,
      nameEn: existing.nameEn,
      nameZh: existing.nameZh,
      descriptionEn: existing.descriptionEn,
      descriptionZh: existing.descriptionZh,
      category: existing.category,
      gradeLevel: existing.gradeLevel,
      tagsEn: existing.tagsEn,
      tagsZh: existing.tagsZh,
      urlEn: existing.urlEn,
      urlZh: existing.urlZh,
      githubRepoUrl: `https://github.com/phetsims/${existing.slug}`,
      thumbnailUrl: `https://phet.colorado.edu/sims/html/${existing.slug}/latest/${existing.slug}-600.png`,
      hasChineseLocalization: !existing.localDev,
      isFeatured: true,
      localDev: existing.localDev || false,
      customRoute: existing.customRoute || null,
      guide: existing.guide,
    });
  }

  const htmlSims = phetData.simulations.filter(s => {
    return s.name && s.type?.includes?.("html") !== false;
  });

  console.log(`Found ${htmlSims.length} simulations from PhET API`);

  if (htmlSims.length > 0) {
    for (const sim of htmlSims) {
      const slug = sim.name;
      if (existingSlugs.has(slug)) continue;

      const zhLocalization = sim.localizedSimulations?.find(
        (l) => l.locale === "zh_CN" || l.locale === "zh_TW"
      );
      const hasZh = !!zhLocalization;
      const zhTitle = zhLocalization?.title || slug;
      const enTitle = sim.localizedSimulations?.find(l => l.locale === "en")?.title || slug.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());
      const topicCategoryMap: Record<string, string> = {
        "physics": "Physics",
        "chemistry": "Chemistry",
        "biology": "Biology",
        "math": "Math",
        "mathematics": "Math",
        "earth-science": "Earth Science",
        "earth science": "Earth Science",
      };
      const rawTopic = (sim.topics?.[0] || "").toLowerCase();
      const category = topicCategoryMap[rawTopic] || "Physics";

      allInserts.push({
        slug,
        nameEn: enTitle,
        nameZh: hasZh ? zhTitle : enTitle,
        descriptionEn: `Interactive simulation: ${enTitle}`,
        descriptionZh: hasZh ? `互动模拟：${zhTitle}` : `Interactive simulation: ${enTitle}`,
        category,
        gradeLevel: slug.includes("basics") || slug.includes("intro") ? "elementary" : "middle",
        tagsEn: (sim.topics || []).map(t => t.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase())).slice(0, 5),
        tagsZh: [],
        urlEn: `https://phet.colorado.edu/sims/html/${slug}/latest/${slug}_en.html`,
        urlZh: hasZh ? `https://phet.colorado.edu/sims/html/${slug}/latest/${slug}_zh_CN.html` : `https://phet.colorado.edu/sims/html/${slug}/latest/${slug}_en.html`,
        githubRepoUrl: `https://github.com/phetsims/${slug}`,
        thumbnailUrl: `https://phet.colorado.edu/sims/html/${slug}/latest/${slug}-600.png`,
        hasChineseLocalization: hasZh,
        isFeatured: false,
        localDev: false,
        customRoute: null,
        guide: [],
      });
    }
  } else {
    console.log(`Using static catalog of ${staticCatalog.length} simulations as fallback`);
    const categoryDescMap: Record<string, string> = {
      "Physics": "物理", "Chemistry": "化学", "Biology": "生物",
      "Math": "数学", "Earth Science": "地球科学",
    };
    for (const sim of staticCatalog) {
      if (existingSlugs.has(sim.slug)) continue;
      allInserts.push({
        slug: sim.slug,
        nameEn: sim.nameEn,
        nameZh: sim.nameZh,
        descriptionEn: `Interactive ${sim.category.toLowerCase()} simulation: ${sim.nameEn}`,
        descriptionZh: sim.hasZh ? `互动${categoryDescMap[sim.category] || "科学"}模拟：${sim.nameZh}` : `Interactive simulation: ${sim.nameEn}`,
        category: sim.category,
        gradeLevel: sim.gradeLevel,
        tagsEn: [sim.category],
        tagsZh: sim.hasZh ? [categoryDescMap[sim.category] || sim.category] : [],
        urlEn: `https://phet.colorado.edu/sims/html/${sim.slug}/latest/${sim.slug}_en.html`,
        urlZh: sim.hasZh ? `https://phet.colorado.edu/sims/html/${sim.slug}/latest/${sim.slug}_zh_CN.html` : `https://phet.colorado.edu/sims/html/${sim.slug}/latest/${sim.slug}_en.html`,
        githubRepoUrl: `https://github.com/phetsims/${sim.slug}`,
        thumbnailUrl: `https://phet.colorado.edu/sims/html/${sim.slug}/latest/${sim.slug}-600.png`,
        hasChineseLocalization: sim.hasZh,
        isFeatured: false,
        localDev: false,
        customRoute: null,
        guide: [],
      });
    }
  }

  console.log(`Inserting ${allInserts.length} simulations...`);

  await db.transaction(async (tx) => {
    await tx.delete(schema.simulationsTable);

    const batchSize = 50;
    for (let i = 0; i < allInserts.length; i += batchSize) {
      const batch = allInserts.slice(i, i + batchSize);
      await tx.insert(schema.simulationsTable).values(batch);
      console.log(`  Inserted batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(allInserts.length / batchSize)}`);
    }
  });

  console.log(`Done! Inserted ${allInserts.length} simulations total.`);

  await pool.end();
}

main().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
