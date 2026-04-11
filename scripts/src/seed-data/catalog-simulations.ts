import type { StaticSim } from "./types";

export const fullCatalog: StaticSim[] = [
  // ==================== PHYSICS ====================
  { slug: "alpha-decay", nameEn: "Alpha Decay", nameZh: "阿尔法衰变", category: "Physics", gradeLevel: "middle", hasZh: true },
  { slug: "atomic-interactions", nameEn: "Atomic Interactions", nameZh: "原子间相互作用", category: "Chemistry", gradeLevel: "middle", hasZh: true },
  { slug: "balloons-and-static-electricity", nameEn: "Balloons and Static Electricity", nameZh: "气球和静电", category: "Physics", gradeLevel: "elementary", hasZh: true, curriculumMappings: [
    { standard: "2022-CN-SCI-4-9", region: "CN", grade: "4", subject: "科学", topic: "静电现象", description: "四年级下册《电》单元：摩擦起电，静电现象" },
    { standard: "HK-GS-P4", region: "HK", grade: "P4", subject: "常识", topic: "Static Electricity", description: "P4: Exploring static electricity" },
  ]},
  { slug: "bending-light", nameEn: "Bending Light", nameZh: "光的折射", category: "Physics", gradeLevel: "middle", hasZh: true },
  { slug: "blackbody-spectrum", nameEn: "Blackbody Spectrum", nameZh: "黑体辐射光谱", category: "Physics", gradeLevel: "middle", hasZh: true },
  { slug: "build-a-nucleus", nameEn: "Build a Nucleus", nameZh: "构建原子核", category: "Physics", gradeLevel: "middle", hasZh: true },
  { slug: "buoyancy", nameEn: "Buoyancy", nameZh: "浮力", category: "Physics", gradeLevel: "middle", hasZh: true },
  { slug: "buoyancy-basics", nameEn: "Buoyancy Basics", nameZh: "浮力基础", category: "Physics", gradeLevel: "elementary", hasZh: true, curriculumMappings: [
    { standard: "2022-CN-SCI-3-9", region: "CN", grade: "3", subject: "科学", topic: "沉与浮", description: "三年级上册：物体的沉浮与什么有关" },
  ]},
  { slug: "capacitor-lab-basics", nameEn: "Capacitor Lab: Basics", nameZh: "电容器实验室：基础", category: "Physics", gradeLevel: "middle", hasZh: true },
  { slug: "charges-and-fields", nameEn: "Charges and Fields", nameZh: "电荷与电场", category: "Physics", gradeLevel: "middle", hasZh: true },
  { slug: "circuit-construction-kit-ac", nameEn: "Circuit Construction Kit: AC", nameZh: "电路组建实验：交流", category: "Physics", gradeLevel: "middle", hasZh: true },
  { slug: "circuit-construction-kit-ac-virtual-lab", nameEn: "Circuit Construction Kit: AC - Virtual Lab", nameZh: "电路组建实验：交流 - 虚拟实验室", category: "Physics", gradeLevel: "middle", hasZh: true },
  { slug: "circuit-construction-kit-dc-virtual-lab", nameEn: "Circuit Construction Kit: DC - Virtual Lab", nameZh: "电路组建实验：直流 - 虚拟实验室", category: "Physics", gradeLevel: "middle", hasZh: true },
  { slug: "collision-lab", nameEn: "Collision Lab", nameZh: "碰撞实验室", category: "Physics", gradeLevel: "middle", hasZh: true },
  { slug: "coulombs-law", nameEn: "Coulomb's Law", nameZh: "库仑定律", category: "Physics", gradeLevel: "middle", hasZh: true },
  { slug: "density", nameEn: "Density", nameZh: "密度", category: "Physics", gradeLevel: "middle", hasZh: true },
  { slug: "diffusion", nameEn: "Diffusion", nameZh: "扩散", category: "Physics", gradeLevel: "middle", hasZh: true },
  { slug: "energy-forms-and-changes", nameEn: "Energy Forms and Changes", nameZh: "能量的形式和转化", category: "Physics", gradeLevel: "elementary", hasZh: true, curriculumMappings: [
    { standard: "2022-CN-SCI-4-10", region: "CN", grade: "4", subject: "科学", topic: "能量转换", description: "四年级下册：热能、光能、电能之间的转换" },
  ]},
  { slug: "energy-skate-park-basics", nameEn: "Energy Skate Park: Basics", nameZh: "能量滑板公园：基础", category: "Physics", gradeLevel: "elementary", hasZh: true, curriculumMappings: [
    { standard: "2022-CN-SCI-4-5", region: "CN", grade: "4", subject: "科学", topic: "能量", description: "四年级下册：能量的形式和转换（基础版）" },
  ]},
  { slug: "faradays-law", nameEn: "Faraday's Law", nameZh: "法拉第电磁感应定律", category: "Physics", gradeLevel: "middle", hasZh: true },
  { slug: "faradays-electromagnetic-lab", nameEn: "Faraday's Electromagnetic Lab", nameZh: "法拉第电磁实验室", category: "Physics", gradeLevel: "middle", hasZh: true },
  { slug: "forces-and-motion-basics", nameEn: "Forces and Motion: Basics", nameZh: "力和运动：基础", category: "Physics", gradeLevel: "elementary", hasZh: true, curriculumMappings: [
    { standard: "2022-CN-SCI-3-10", region: "CN", grade: "3", subject: "科学", topic: "力与运动", description: "三年级下册：推力和拉力，力的作用效果" },
    { standard: "HK-GS-P4", region: "HK", grade: "P4", subject: "常识", topic: "Forces", description: "P4: Forces and their effects on motion" },
  ]},
  { slug: "fluid-pressure-and-flow", nameEn: "Fluid Pressure and Flow", nameZh: "流体压强和流速", category: "Physics", gradeLevel: "middle", hasZh: true },
  { slug: "geometric-optics", nameEn: "Geometric Optics", nameZh: "几何光学", category: "Physics", gradeLevel: "middle", hasZh: true },
  { slug: "geometric-optics-basics", nameEn: "Geometric Optics: Basics", nameZh: "几何光学：基础", category: "Physics", gradeLevel: "elementary", hasZh: true, curriculumMappings: [
    { standard: "2022-CN-SCI-3-11", region: "CN", grade: "3", subject: "科学", topic: "光的传播", description: "三年级上册《光》单元：光的直线传播、反射" },
  ]},
  { slug: "gravity-force-lab", nameEn: "Gravity Force Lab", nameZh: "万有引力实验室", category: "Physics", gradeLevel: "middle", hasZh: true },
  { slug: "gravity-force-lab-basics", nameEn: "Gravity Force Lab: Basics", nameZh: "万有引力实验室：基础", category: "Physics", gradeLevel: "elementary", hasZh: true, curriculumMappings: [
    { standard: "2022-CN-SCI-3-12", region: "CN", grade: "3", subject: "科学", topic: "重力", description: "三年级下册：地球引力，物体为什么会落下" },
  ]},
  { slug: "greenhouse-effect", nameEn: "Greenhouse Effect", nameZh: "温室效应", category: "Earth Science", gradeLevel: "middle", hasZh: true, curriculumMappings: [
    { standard: "2022-CN-SCI-4-11", region: "CN", grade: "4", subject: "科学", topic: "地球与环境", description: "四年级下册：温室效应与气候变化" },
  ]},
  { slug: "hookes-law", nameEn: "Hooke's Law", nameZh: "胡克定律", category: "Physics", gradeLevel: "middle", hasZh: true },
  { slug: "john-travoltage", nameEn: "John Travoltage", nameZh: "静电约翰", category: "Physics", gradeLevel: "elementary", hasZh: true, curriculumMappings: [
    { standard: "2022-CN-SCI-4-9", region: "CN", grade: "4", subject: "科学", topic: "静电现象", description: "四年级下册《电》单元：静电与放电" },
  ]},
  { slug: "keplers-laws", nameEn: "Kepler's Laws", nameZh: "开普勒定律", category: "Physics", gradeLevel: "middle", hasZh: true },
  { slug: "masses-and-springs-basics", nameEn: "Masses and Springs: Basics", nameZh: "质量与弹簧：基础", category: "Physics", gradeLevel: "elementary", hasZh: true, curriculumMappings: [
    { standard: "2022-CN-SCI-3-8", region: "CN", grade: "3", subject: "科学", topic: "弹力", description: "三年级下册：弹簧和弹力（基础版）" },
  ]},
  { slug: "models-of-the-hydrogen-atom", nameEn: "Models of the Hydrogen Atom", nameZh: "氢原子模型", category: "Physics", gradeLevel: "middle", hasZh: true },
  { slug: "my-solar-system", nameEn: "My Solar System", nameZh: "我的太阳系", category: "Physics", gradeLevel: "middle", hasZh: true, curriculumMappings: [
    { standard: "2022-CN-SCI-3-7", region: "CN", grade: "3", subject: "科学", topic: "太阳系", description: "三年级下册：太阳系的组成" },
  ]},
  { slug: "normal-modes", nameEn: "Normal Modes", nameZh: "简正模式", category: "Physics", gradeLevel: "middle", hasZh: true },
  { slug: "ohms-law", nameEn: "Ohm's Law", nameZh: "欧姆定律", category: "Physics", gradeLevel: "middle", hasZh: true },
  { slug: "optics-lab", nameEn: "Optics Lab", nameZh: "光学实验室", category: "Physics", gradeLevel: "middle", hasZh: false },
  { slug: "pendulum-lab", nameEn: "Pendulum Lab", nameZh: "摆实验室", category: "Physics", gradeLevel: "middle", hasZh: true },
  { slug: "photoelectric-effect", nameEn: "Photoelectric Effect", nameZh: "光电效应", category: "Physics", gradeLevel: "middle", hasZh: true },
  { slug: "projectile-data-lab", nameEn: "Projectile Data Lab", nameZh: "抛体数据实验室", category: "Physics", gradeLevel: "middle", hasZh: true },
  { slug: "quantum-measurement", nameEn: "Quantum Measurement", nameZh: "量子测量", category: "Physics", gradeLevel: "middle", hasZh: false },
  { slug: "resistance-in-a-wire", nameEn: "Resistance in a Wire", nameZh: "导线电阻", category: "Physics", gradeLevel: "middle", hasZh: true },
  { slug: "rutherford-scattering", nameEn: "Rutherford Scattering", nameZh: "卢瑟福散射", category: "Physics", gradeLevel: "middle", hasZh: true },
  { slug: "solar-system-model", nameEn: "Solar System Model", nameZh: "太阳系模型", category: "Physics", gradeLevel: "elementary", hasZh: true, curriculumMappings: [
    { standard: "2022-CN-SCI-3-7", region: "CN", grade: "3", subject: "科学", topic: "太阳系", description: "三年级下册：太阳系的结构和行星运动" },
  ]},
  { slug: "under-pressure", nameEn: "Under Pressure", nameZh: "压力之下", category: "Physics", gradeLevel: "middle", hasZh: true },
  { slug: "vector-addition", nameEn: "Vector Addition", nameZh: "矢量加法", category: "Physics", gradeLevel: "middle", hasZh: true },
  { slug: "wave-interference", nameEn: "Wave Interference", nameZh: "波的干涉", category: "Physics", gradeLevel: "middle", hasZh: true },
  { slug: "waves-intro", nameEn: "Waves Intro", nameZh: "波的简介", category: "Physics", gradeLevel: "elementary", hasZh: true, curriculumMappings: [
    { standard: "2022-CN-SCI-4-7", region: "CN", grade: "4", subject: "科学", topic: "声音", description: "四年级上册：声音的产生与波" },
  ]},

  // ==================== CHEMISTRY ====================
  { slug: "acid-base-solutions", nameEn: "Acid-Base Solutions", nameZh: "酸碱溶液", category: "Chemistry", gradeLevel: "middle", hasZh: true },
  { slug: "balancing-chemical-equations", nameEn: "Balancing Chemical Equations", nameZh: "配平化学方程式", category: "Chemistry", gradeLevel: "middle", hasZh: true },
  { slug: "beers-law-lab", nameEn: "Beer's Law Lab", nameZh: "比尔定律实验室", category: "Chemistry", gradeLevel: "middle", hasZh: true },
  { slug: "build-a-molecule", nameEn: "Build a Molecule", nameZh: "搭建分子", category: "Chemistry", gradeLevel: "middle", hasZh: true },
  { slug: "concentration", nameEn: "Concentration", nameZh: "浓度", category: "Chemistry", gradeLevel: "middle", hasZh: true },
  { slug: "gas-properties", nameEn: "Gas Properties", nameZh: "气体性质", category: "Chemistry", gradeLevel: "middle", hasZh: true },
  { slug: "gases-intro", nameEn: "Gases Intro", nameZh: "气体简介", category: "Chemistry", gradeLevel: "middle", hasZh: true },
  { slug: "isotopes-and-atomic-mass", nameEn: "Isotopes and Atomic Mass", nameZh: "同位素和原子量", category: "Chemistry", gradeLevel: "middle", hasZh: true },
  { slug: "molarity", nameEn: "Molarity", nameZh: "摩尔浓度", category: "Chemistry", gradeLevel: "middle", hasZh: true },
  { slug: "molecule-polarity", nameEn: "Molecule Polarity", nameZh: "分子极性", category: "Chemistry", gradeLevel: "middle", hasZh: true },
  { slug: "molecule-shapes", nameEn: "Molecule Shapes", nameZh: "分子形状", category: "Chemistry", gradeLevel: "middle", hasZh: true },
  { slug: "molecule-shapes-basics", nameEn: "Molecule Shapes: Basics", nameZh: "分子形状：基础", category: "Chemistry", gradeLevel: "elementary", hasZh: true },
  { slug: "molecules-and-light", nameEn: "Molecules and Light", nameZh: "分子和光", category: "Chemistry", gradeLevel: "middle", hasZh: true },
  { slug: "ph-scale", nameEn: "pH Scale", nameZh: "pH值", category: "Chemistry", gradeLevel: "middle", hasZh: true },
  { slug: "ph-scale-basics", nameEn: "pH Scale: Basics", nameZh: "pH值：基础", category: "Chemistry", gradeLevel: "elementary", hasZh: true },
  { slug: "reactants-products-and-leftovers", nameEn: "Reactants, Products and Leftovers", nameZh: "反应物、产物和剩余物", category: "Chemistry", gradeLevel: "middle", hasZh: true },
  { slug: "states-of-matter-basics", nameEn: "States of Matter: Basics", nameZh: "物质状态：基础", category: "Chemistry", gradeLevel: "elementary", hasZh: true, curriculumMappings: [
    { standard: "2022-CN-SCI-3-1", region: "CN", grade: "3", subject: "科学", topic: "水的三态变化", description: "三年级上册：固态、液态、气态变化（基础版）" },
  ]},

  // ==================== MATH ====================
  { slug: "area-builder", nameEn: "Area Builder", nameZh: "面积生成器", category: "Math", gradeLevel: "elementary", hasZh: true, curriculumMappings: [
    { standard: "2022-CN-MATH-3-AREA", region: "CN", grade: "3", subject: "数学", topic: "面积", description: "三年级下册：认识面积，长方形和正方形面积计算" },
  ]},
  { slug: "area-model-algebra", nameEn: "Area Model Algebra", nameZh: "面积模型代数", category: "Math", gradeLevel: "middle", hasZh: true },
  { slug: "area-model-decimals", nameEn: "Area Model Decimals", nameZh: "面积模型小数", category: "Math", gradeLevel: "elementary", hasZh: true, curriculumMappings: [
    { standard: "2022-CN-MATH-4-DEC", region: "CN", grade: "4", subject: "数学", topic: "小数", description: "四年级下册：小数的意义和加减法" },
  ]},
  { slug: "area-model-introduction", nameEn: "Area Model Introduction", nameZh: "面积模型简介", category: "Math", gradeLevel: "elementary", hasZh: true, curriculumMappings: [
    { standard: "2022-CN-MATH-3-AREA", region: "CN", grade: "3", subject: "数学", topic: "面积", description: "三年级下册：面积模型入门" },
  ]},
  { slug: "area-model-multiplication", nameEn: "Area Model Multiplication", nameZh: "面积模型乘法", category: "Math", gradeLevel: "elementary", hasZh: true, curriculumMappings: [
    { standard: "2022-CN-MATH-3-MUL", region: "CN", grade: "3", subject: "数学", topic: "乘法", description: "三年级上册：多位数乘法，面积模型" },
  ]},
  { slug: "arithmetic", nameEn: "Arithmetic", nameZh: "算术", category: "Math", gradeLevel: "elementary", hasZh: true, curriculumMappings: [
    { standard: "2022-CN-MATH-3-CALC", region: "CN", grade: "3", subject: "数学", topic: "四则运算", description: "三年级：加减乘除基本运算" },
  ]},
  { slug: "build-a-fraction", nameEn: "Build a Fraction", nameZh: "搭建分数", category: "Math", gradeLevel: "elementary", hasZh: true, curriculumMappings: [
    { standard: "2022-CN-MATH-3-FRAC", region: "CN", grade: "3", subject: "数学", topic: "分数的初步认识", description: "三年级上册：分数的初步认识" },
  ]},
  { slug: "calculus-grapher", nameEn: "Calculus Grapher", nameZh: "微积分图形", category: "Math", gradeLevel: "middle", hasZh: true },
  { slug: "center-and-variability", nameEn: "Center and Variability", nameZh: "集中与变异", category: "Math", gradeLevel: "middle", hasZh: true },
  { slug: "counting", nameEn: "Counting", nameZh: "计数", category: "Math", gradeLevel: "elementary", hasZh: true },
  { slug: "curve-fitting", nameEn: "Curve Fitting", nameZh: "曲线拟合", category: "Math", gradeLevel: "middle", hasZh: true },
  { slug: "equality-explorer-basics", nameEn: "Equality Explorer: Basics", nameZh: "等式探索：基础", category: "Math", gradeLevel: "elementary", hasZh: true, curriculumMappings: [
    { standard: "2022-CN-MATH-3-EQ", region: "CN", grade: "3", subject: "数学", topic: "等式", description: "三年级：等式概念入门" },
  ]},
  { slug: "equality-explorer-two-variables", nameEn: "Equality Explorer: Two Variables", nameZh: "等式探索：两个变量", category: "Math", gradeLevel: "middle", hasZh: true },
  { slug: "estimation", nameEn: "Estimation", nameZh: "估算", category: "Math", gradeLevel: "elementary", hasZh: true, curriculumMappings: [
    { standard: "2022-CN-MATH-3-EST", region: "CN", grade: "3", subject: "数学", topic: "估算", description: "三年级上册：估算方法与应用" },
  ]},
  { slug: "expression-exchange", nameEn: "Expression Exchange", nameZh: "表达式变换", category: "Math", gradeLevel: "middle", hasZh: true },
  { slug: "fraction-matcher", nameEn: "Fraction Matcher", nameZh: "分数配对", category: "Math", gradeLevel: "elementary", hasZh: true, curriculumMappings: [
    { standard: "2022-CN-MATH-3-FRAC", region: "CN", grade: "3", subject: "数学", topic: "分数的初步认识", description: "三年级上册：比较分数大小" },
  ]},
  { slug: "fractions-equality", nameEn: "Fractions: Equality", nameZh: "分数：相等", category: "Math", gradeLevel: "elementary", hasZh: true, curriculumMappings: [
    { standard: "2022-CN-MATH-3-FRAC", region: "CN", grade: "3", subject: "数学", topic: "分数", description: "三年级：相等的分数" },
  ]},
  { slug: "fractions-intro", nameEn: "Fractions: Intro", nameZh: "分数：简介", category: "Math", gradeLevel: "elementary", hasZh: true, curriculumMappings: [
    { standard: "2022-CN-MATH-3-FRAC", region: "CN", grade: "3", subject: "数学", topic: "分数的初步认识", description: "三年级上册：认识分数" },
  ]},
  { slug: "fractions-mixed-numbers", nameEn: "Fractions: Mixed Numbers", nameZh: "分数：混合数", category: "Math", gradeLevel: "elementary", hasZh: true, curriculumMappings: [
    { standard: "2022-CN-MATH-4-FRAC", region: "CN", grade: "4", subject: "数学", topic: "分数", description: "四年级下册：带分数" },
  ]},
  { slug: "function-builder", nameEn: "Function Builder", nameZh: "函数生成器", category: "Math", gradeLevel: "elementary", hasZh: true },
  { slug: "function-builder-basics", nameEn: "Function Builder: Basics", nameZh: "函数生成器：基础", category: "Math", gradeLevel: "elementary", hasZh: true },
  { slug: "graphing-lines", nameEn: "Graphing Lines", nameZh: "画线", category: "Math", gradeLevel: "middle", hasZh: true },
  { slug: "graphing-quadratics", nameEn: "Graphing Quadratics", nameZh: "画二次方程图", category: "Math", gradeLevel: "middle", hasZh: true },
  { slug: "graphing-slope-intercept", nameEn: "Graphing Slope-Intercept", nameZh: "画斜截式图", category: "Math", gradeLevel: "middle", hasZh: true },
  { slug: "least-squares-regression", nameEn: "Least-Squares Regression", nameZh: "最小二乘回归", category: "Math", gradeLevel: "middle", hasZh: true },
  { slug: "make-a-ten", nameEn: "Make a Ten", nameZh: "凑十", category: "Math", gradeLevel: "elementary", hasZh: true, curriculumMappings: [
    { standard: "2022-CN-MATH-3-ADD", region: "CN", grade: "3", subject: "数学", topic: "加法", description: "基础：凑十法加法策略" },
  ]},
  { slug: "mean-share-and-balance", nameEn: "Mean: Share and Balance", nameZh: "平均数：分享和平衡", category: "Math", gradeLevel: "middle", hasZh: true },
  { slug: "number-compare", nameEn: "Number Compare", nameZh: "数字比较", category: "Math", gradeLevel: "elementary", hasZh: true, curriculumMappings: [
    { standard: "2022-CN-MATH-3-NUM", region: "CN", grade: "3", subject: "数学", topic: "万以内数的认识", description: "三年级：数的大小比较" },
  ]},
  { slug: "number-line-distance", nameEn: "Number Line: Distance", nameZh: "数轴：距离", category: "Math", gradeLevel: "elementary", hasZh: true },
  { slug: "number-line-integers", nameEn: "Number Line: Integers", nameZh: "数轴：整数", category: "Math", gradeLevel: "elementary", hasZh: true },
  { slug: "number-line-operations", nameEn: "Number Line: Operations", nameZh: "数轴：运算", category: "Math", gradeLevel: "elementary", hasZh: true, curriculumMappings: [
    { standard: "2022-CN-MATH-3-NUM", region: "CN", grade: "3", subject: "数学", topic: "数轴运算", description: "三年级：在数轴上理解加减法" },
  ]},
  { slug: "number-play", nameEn: "Number Play", nameZh: "数字游戏", category: "Math", gradeLevel: "elementary", hasZh: true },
  { slug: "plinko-probability", nameEn: "Plinko Probability", nameZh: "弹珠概率", category: "Math", gradeLevel: "elementary", hasZh: true },
  { slug: "proportion-playground", nameEn: "Proportion Playground", nameZh: "比例游乐场", category: "Math", gradeLevel: "elementary", hasZh: true, curriculumMappings: [
    { standard: "2022-CN-MATH-4-RATIO", region: "CN", grade: "4", subject: "数学", topic: "比例", description: "四年级：比例的认识" },
  ]},
  { slug: "ratio-and-proportion", nameEn: "Ratio and Proportion", nameZh: "比和比例", category: "Math", gradeLevel: "elementary", hasZh: true, curriculumMappings: [
    { standard: "2022-CN-MATH-4-RATIO", region: "CN", grade: "4", subject: "数学", topic: "比和比例", description: "四年级：比的意义和比例" },
  ]},
  { slug: "trig-tour", nameEn: "Trig Tour", nameZh: "三角函数之旅", category: "Math", gradeLevel: "middle", hasZh: true },
  { slug: "unit-rates", nameEn: "Unit Rates", nameZh: "单位费率", category: "Math", gradeLevel: "middle", hasZh: true },
  { slug: "vector-addition-equations", nameEn: "Vector Addition: Equations", nameZh: "矢量加法：方程", category: "Math", gradeLevel: "middle", hasZh: true },

  // ==================== BIOLOGY ====================
  { slug: "gene-expression-essentials", nameEn: "Gene Expression Essentials", nameZh: "基因表达基础", category: "Biology", gradeLevel: "middle", hasZh: true },
  { slug: "selection", nameEn: "Selection", nameZh: "选择", category: "Biology", gradeLevel: "middle", hasZh: true },

  // ==================== NEW SIMS not in original catalog ====================
  { slug: "bamboo", nameEn: "Bamboo", nameZh: "竹子", category: "Physics", gradeLevel: "elementary", hasZh: false },
  { slug: "beer-lambert-law", nameEn: "Beer-Lambert Law", nameZh: "比尔-朗伯定律", category: "Chemistry", gradeLevel: "middle", hasZh: true },
  { slug: "beta-decay", nameEn: "Beta Decay", nameZh: "贝塔衰变", category: "Physics", gradeLevel: "middle", hasZh: true },
  { slug: "center-and-spread", nameEn: "Center and Spread", nameZh: "集中与离散", category: "Math", gradeLevel: "middle", hasZh: true },
  { slug: "chains", nameEn: "Chains", nameZh: "链条", category: "Physics", gradeLevel: "middle", hasZh: false },
  { slug: "circus-act", nameEn: "Circus Act", nameZh: "杂技表演", category: "Physics", gradeLevel: "elementary", hasZh: false },
  { slug: "color-vision-basics", nameEn: "Color Vision: Basics", nameZh: "彩色视觉：基础", category: "Physics", gradeLevel: "elementary", hasZh: true, curriculumMappings: [
    { standard: "2022-CN-SCI-3-4", region: "CN", grade: "3", subject: "科学", topic: "光与颜色", description: "三年级上册《光》单元：光的三原色（基础版）" },
  ]},
  { slug: "decay-rates", nameEn: "Decay Rates", nameZh: "衰变速率", category: "Physics", gradeLevel: "middle", hasZh: true },
  { slug: "eating-exercise-and-energy", nameEn: "Eating, Exercise, and Energy", nameZh: "饮食、运动与能量", category: "Biology", gradeLevel: "elementary", hasZh: true, curriculumMappings: [
    { standard: "2022-CN-SCI-4-12", region: "CN", grade: "4", subject: "科学", topic: "人体与健康", description: "四年级上册：食物中的营养和能量" },
  ]},
  { slug: "expression-basics", nameEn: "Expression Basics", nameZh: "表达式基础", category: "Math", gradeLevel: "elementary", hasZh: true },
  { slug: "fourier-making-waves", nameEn: "Fourier: Making Waves", nameZh: "傅里叶：制造波", category: "Physics", gradeLevel: "middle", hasZh: true },
  { slug: "gene-machine", nameEn: "Gene Machine", nameZh: "基因机器", category: "Biology", gradeLevel: "middle", hasZh: false },
  { slug: "gravity-basics", nameEn: "Gravity Basics", nameZh: "引力基础", category: "Physics", gradeLevel: "elementary", hasZh: true },
  { slug: "isotopes", nameEn: "Isotopes", nameZh: "同位素", category: "Chemistry", gradeLevel: "middle", hasZh: true },
  { slug: "magnets-and-electromagnets", nameEn: "Magnets and Electromagnets", nameZh: "磁铁和电磁铁", category: "Physics", gradeLevel: "elementary", hasZh: true, curriculumMappings: [
    { standard: "2022-CN-SCI-3-13", region: "CN", grade: "3", subject: "科学", topic: "磁铁", description: "三年级下册：磁铁的性质和磁极" },
    { standard: "2022-CN-SCI-4-13", region: "CN", grade: "4", subject: "科学", topic: "电磁铁", description: "四年级下册《电》单元：电磁铁的原理" },
    { standard: "HK-GS-P3", region: "HK", grade: "P3", subject: "常识", topic: "Magnets", description: "P3 General Studies: properties of magnets" },
  ]},
  { slug: "meanshare-and-balance", nameEn: "Mean, Median, and Mode", nameZh: "平均数、中位数和众数", category: "Math", gradeLevel: "middle", hasZh: true },
  { slug: "membrane-channels", nameEn: "Membrane Channels", nameZh: "膜通道", category: "Biology", gradeLevel: "middle", hasZh: true },
  { slug: "mirrors", nameEn: "Mirrors", nameZh: "镜子", category: "Physics", gradeLevel: "elementary", hasZh: true, curriculumMappings: [
    { standard: "2022-CN-SCI-3-11", region: "CN", grade: "3", subject: "科学", topic: "光的反射", description: "三年级上册：镜子与光的反射" },
  ]},
  { slug: "molality", nameEn: "Molality", nameZh: "质量摩尔浓度", category: "Chemistry", gradeLevel: "middle", hasZh: true },
  { slug: "number-pairs", nameEn: "Number Pairs", nameZh: "数字配对", category: "Math", gradeLevel: "elementary", hasZh: true },
  { slug: "percent", nameEn: "Percent", nameZh: "百分数", category: "Math", gradeLevel: "elementary", hasZh: true, curriculumMappings: [
    { standard: "2022-CN-MATH-4-PCT", region: "CN", grade: "4", subject: "数学", topic: "百分数", description: "四年级：百分数的初步认识" },
  ]},
  { slug: "plate-tectonics", nameEn: "Plate Tectonics", nameZh: "板块构造", category: "Earth Science", gradeLevel: "middle", hasZh: true, curriculumMappings: [
    { standard: "2022-CN-SCI-4-14", region: "CN", grade: "4", subject: "科学", topic: "地球内部", description: "四年级下册：地球内部构造，板块运动" },
  ]},
  { slug: "projectile-sampling-distributions", nameEn: "Projectile Sampling Distributions", nameZh: "抛射采样分布", category: "Math", gradeLevel: "middle", hasZh: false },
  { slug: "radioactive-dating-game", nameEn: "Radioactive Dating Game", nameZh: "放射性定年游戏", category: "Earth Science", gradeLevel: "middle", hasZh: true },
  { slug: "seasons", nameEn: "Seasons", nameZh: "季节", category: "Earth Science", gradeLevel: "elementary", hasZh: true, curriculumMappings: [
    { standard: "2022-CN-SCI-3-14", region: "CN", grade: "3", subject: "科学", topic: "四季变化", description: "三年级上册：季节更替与地球公转" },
    { standard: "HK-GS-P3", region: "HK", grade: "P3", subject: "常识", topic: "Seasons and Weather", description: "P3: Understanding seasons and weather patterns" },
  ]},
  { slug: "sound-waves", nameEn: "Sound Waves", nameZh: "声波", category: "Physics", gradeLevel: "elementary", hasZh: true, curriculumMappings: [
    { standard: "2022-CN-SCI-4-7", region: "CN", grade: "4", subject: "科学", topic: "声音", description: "四年级上册《声音》单元：声波的传播" },
    { standard: "HK-GS-P4", region: "HK", grade: "P4", subject: "常识", topic: "Sound", description: "P4: How sound is produced and travels" },
  ]},
  { slug: "sun-and-earth", nameEn: "Sun and Earth", nameZh: "太阳与地球", category: "Earth Science", gradeLevel: "elementary", hasZh: true, curriculumMappings: [
    { standard: "2022-CN-SCI-3-15", region: "CN", grade: "3", subject: "科学", topic: "昼夜交替", description: "三年级下册：地球自转与昼夜交替" },
  ]},
  { slug: "temperature-change", nameEn: "Temperature Change", nameZh: "温度变化", category: "Physics", gradeLevel: "elementary", hasZh: true, curriculumMappings: [
    { standard: "2022-CN-SCI-3-16", region: "CN", grade: "3", subject: "科学", topic: "温度", description: "三年级上册：温度的测量" },
  ]},
  { slug: "thinking-in-3d", nameEn: "Thinking in 3D", nameZh: "三维思维", category: "Math", gradeLevel: "elementary", hasZh: true, curriculumMappings: [
    { standard: "2022-CN-MATH-4-GEO", region: "CN", grade: "4", subject: "数学", topic: "图形与几何", description: "四年级：空间与图形" },
  ]},
  { slug: "wave-on-a-string-basics", nameEn: "Wave on a String: Basics", nameZh: "绳波：基础", category: "Physics", gradeLevel: "elementary", hasZh: true },
  { slug: "whack-a-mole", nameEn: "Whack-a-Mole", nameZh: "打地鼠", category: "Math", gradeLevel: "elementary", hasZh: false },
];
