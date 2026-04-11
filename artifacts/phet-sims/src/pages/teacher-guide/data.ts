export const curriculumData = {
  science: {
    title: { zh: '科学课程标准（2022年版）', en: 'Science Curriculum Standards (2022)' },
    grades: [
      {
        range: { zh: '1-2年级', en: 'Grade 1-2' },
        age: { zh: '6-8岁', en: 'Age 6-8' },
        goals: {
          zh: [
            '物质科学：认识常见物体的基本特征（大小、形状、颜色、轻重）',
            '生命科学：观察身边常见的动物和植物',
            '地球与宇宙：感知天气变化，认识四季',
            '技术与工程：使用简单工具完成小制作',
          ],
          en: [
            'Physical Science: Recognize basic properties of common objects (size, shape, color, weight)',
            'Life Science: Observe common animals and plants nearby',
            'Earth & Space: Perceive weather changes, recognize seasons',
            'Technology: Use simple tools for small projects',
          ],
        },
        simFit: {
          zh: '适合简单的观察类模拟（颜色混合、物体分类），语言以看图说话为主',
          en: 'Suitable for simple observation simulations (color mixing, object sorting). Language focus on picture descriptions.',
        },
      },
      {
        range: { zh: '3-4年级', en: 'Grade 3-4' },
        age: { zh: '8-10岁', en: 'Age 8-10' },
        goals: {
          zh: [
            '物质科学：认识力的作用（推、拉、摩擦力）；了解声音、光的基本现象',
            '物质科学：认识水的三态变化（固、液、气）',
            '生命科学：了解人体的主要器官和功能',
            '地球与宇宙：认识地球的基本结构',
            '技术与工程：设计简单的实验方案，记录实验数据',
          ],
          en: [
            'Physical Science: Understand forces (push, pull, friction); basic phenomena of sound and light',
            'Physical Science: Understand water phase changes (solid, liquid, gas)',
            'Life Science: Learn about major human organs and functions',
            'Earth & Space: Understand basic Earth structure',
            'Technology: Design simple experiments, record data',
          ],
        },
        simFit: {
          zh: '摩擦力实验室非常适合！力的作用是这个阶段的核心内容。可以扩展到声音和光的模拟。',
          en: 'Friction Lab is a perfect fit! Forces are core content at this stage. Can expand to sound and light simulations.',
        },
      },
      {
        range: { zh: '5-6年级', en: 'Grade 5-6' },
        age: { zh: '10-12岁', en: 'Age 10-12' },
        goals: {
          zh: [
            '物质科学：认识能量的转化（动能、热能、电能）；简单电路',
            '物质科学：了解物质的微观结构（分子、原子的初步概念）',
            '生命科学：了解生态系统的基本概念',
            '地球与宇宙：了解太阳系和地球运动',
            '技术与工程：综合运用知识解决实际问题',
          ],
          en: [
            'Physical Science: Understand energy conversion (kinetic, thermal, electrical); simple circuits',
            'Physical Science: Introduction to microscopic structure (molecules, atoms)',
            'Life Science: Basic ecosystem concepts',
            'Earth & Space: Solar system and Earth\'s motion',
            'Technology: Apply knowledge to solve real problems',
          ],
        },
        simFit: {
          zh: '可以深化摩擦力中的能量转化概念，新增电路模拟、生态系统模拟等。原子视图在这个阶段更有意义。',
          en: 'Can deepen energy conversion in friction. Add circuit and ecosystem simulations. Atom view is more meaningful at this stage.',
        },
      },
    ],
  },
  chinese: {
    title: { zh: '语文课程标准（表达与写作）', en: 'Chinese Language Arts Standards (Expression & Writing)' },
    grades: [
      {
        range: { zh: '1-2年级', en: 'Grade 1-2' },
        goals: {
          zh: ['看图写话（1-3句）', '能说完整的句子表达想法', '认识常用汉字600-800个'],
          en: ['Picture-based writing (1-3 sentences)', 'Express ideas in complete sentences', 'Recognize 600-800 Chinese characters'],
        },
        integration: { zh: '模拟后用简单句子描述观察："我看到了……""它变成了……"', en: 'After simulation: describe observations in simple sentences.' },
      },
      {
        range: { zh: '3-4年级', en: 'Grade 3-4' },
        goals: {
          zh: ['学写说明文（介绍事物的特点）', '能写200-300字的短文', '学习使用"首先、然后、最后"等连接词', '开始接触观察日记和实验报告'],
          en: ['Learn expository writing (describe features)', 'Write 200-300 character essays', 'Use transition words (first, then, finally)', 'Start observation diaries and experiment reports'],
        },
        integration: { zh: '写科学说明文："摩擦力是什么？"用"首先……然后……最后……"描述实验过程', en: 'Write science expository text: "What is friction?" Use transition words to describe experiment steps.' },
      },
      {
        range: { zh: '5-6年级', en: 'Grade 5-6' },
        goals: {
          zh: ['写较复杂的说明文和议论文', '能写400字以上的文章', '学会引用数据和事实支持观点', '具备一定的科学写作能力'],
          en: ['Write complex expository and argumentative texts', 'Write 400+ character articles', 'Cite data and facts to support arguments', 'Develop scientific writing ability'],
        },
        integration: { zh: '写完整的实验报告：提出假设→描述实验→分析数据→得出结论', en: 'Write full lab reports: hypothesis → experiment → data analysis → conclusion.' },
      },
    ],
  },
  english: {
    title: { zh: '英语课程标准', en: 'English Curriculum Standards' },
    grades: [
      {
        range: { zh: '3-4年级（起步阶段）', en: 'Grade 3-4 (Beginner)' },
        goals: {
          zh: ['学习基础日常词汇（约300-400词）', '能听懂简单的英语指令', '学唱简单的英语歌曲', '能用简单句型表达（I like... / This is...）'],
          en: ['Learn basic daily vocabulary (~300-400 words)', 'Understand simple English instructions', 'Sing simple English songs', 'Use simple sentence patterns (I like... / This is...)'],
        },
        integration: { zh: '通过模拟学习科学词汇（friction, hot, cold, fast, slow），用歌曲巩固', en: 'Learn science vocab through simulation, reinforce with songs.' },
      },
      {
        range: { zh: '5-6年级', en: 'Grade 5-6' },
        goals: {
          zh: ['词汇量扩展到600-700词', '能进行简单的日常对话', '能读懂简短的英语段落', '尝试写简单的英语句子和短文'],
          en: ['Expand vocabulary to 600-700 words', 'Simple daily conversations', 'Read short English paragraphs', 'Write simple English sentences and passages'],
        },
        integration: { zh: '用英语描述实验结果："The sandpaper has more friction than ice."', en: 'Describe experiment results in English sentences.' },
      },
    ],
  },
};

export const visitQuestions = {
  forTeachers: {
    title: { zh: '给老师的问题', en: 'Questions for Teachers' },
    questions: {
      zh: [
        { q: '你们目前用什么教材？科学课一周几节课？', why: '了解基本教学安排，确保我们的内容能融入现有课时' },
        { q: '科学课上实验怎么做的？学校有实验室吗？常用什么器材？', why: '了解硬件条件，设计匹配的动手实验' },
        { q: '学生对科学课最感兴趣和最困难的部分是什么？', why: '找到痛点，让模拟重点解决理解困难的知识点' },
        { q: '语文课上的写作训练是怎么安排的？写日记/周记吗？', why: '了解写作基础，设计合适难度的科学写作模板' },
        { q: '英语课进度到哪里了？学生能认多少单词？能写句子吗？', why: '确保英语词汇和歌曲的难度匹配学生水平' },
        { q: '你觉得跨学科教学（比如科学+语文+英语）在实际中可行吗？有什么顾虑？', why: '了解老师对跨学科的态度和可能的阻力' },
        { q: '学校有电脑/平板吗？学生能上网吗？一个班多少人？', why: '确定技术部署方案：是投影演示还是学生自己操作' },
        { q: '对支教大学生有什么期望？希望他们重点做什么？', why: '明确支教团的角色定位' },
        { q: '之前有没有外部资源/志愿者来上过课？效果怎么样？', why: '学习经验，避免重复别人的错误' },
        { q: '课标中哪些内容你觉得最难教？如果有一个工具能帮忙，你最希望解决什么问题？', why: '找到最高价值的切入点' },
      ],
      en: [
        { q: 'What textbooks do you use? How many science classes per week?', why: 'Understand schedule to fit our content into existing class time' },
        { q: 'How do you handle experiments? Does the school have a lab? What equipment?', why: 'Understand hardware to design matching hands-on activities' },
        { q: 'What do students find most interesting and most difficult in science?', why: 'Find pain points for simulation focus' },
        { q: 'How is writing practice arranged in Chinese class? Diaries/journals?', why: 'Match writing template difficulty to student level' },
        { q: 'Where are students at in English? How many words? Can they write sentences?', why: 'Ensure vocabulary and songs match student level' },
        { q: 'Is cross-curricular teaching (science+Chinese+English) feasible? Any concerns?', why: 'Understand teacher attitudes and possible resistance' },
        { q: 'Does the school have computers/tablets? Internet access? Class size?', why: 'Determine deployment: projection demo vs student-operated' },
        { q: 'What do you expect from the university volunteers? What should they focus on?', why: 'Clarify volunteer team role' },
        { q: 'Have external resources/volunteers taught here before? How did it go?', why: 'Learn from past experience' },
        { q: 'Which curriculum topics are hardest to teach? If a tool could help, what problem would you most want solved?', why: 'Find highest-value entry point' },
      ],
    },
  },
  forStudents: {
    title: { zh: '给学生的问题（轻松聊天方式）', en: 'Questions for Students (Casual Conversation)' },
    questions: {
      zh: [
        { q: '你最喜欢什么课？为什么？', why: '了解兴趣点' },
        { q: '科学课上做过什么有趣的实验吗？', why: '了解实验经验' },
        { q: '你在家用过电脑或平板吗？平时玩什么？', why: '了解技术熟悉度' },
        { q: '你觉得"摩擦力"是什么？能举个例子吗？', why: '了解对摩擦力的已有认知' },
        { q: '写作文的时候最头疼的是什么？', why: '了解写作痛点' },
        { q: '英语课上学了哪些单词？会唱英语歌吗？', why: '了解英语水平' },
        { q: '如果让你自己设计一个科学实验，你想研究什么？', why: '了解好奇心方向' },
      ],
      en: [
        { q: 'What is your favorite class? Why?', why: 'Understand interests' },
        { q: 'Have you done any fun experiments in science class?', why: 'Understand experiment experience' },
        { q: 'Do you use a computer or tablet at home? What do you play?', why: 'Understand tech familiarity' },
        { q: 'What do you think "friction" is? Can you give an example?', why: 'Understand prior knowledge' },
        { q: 'What is the hardest part about writing essays?', why: 'Understand writing pain points' },
        { q: 'What English words have you learned? Can you sing English songs?', why: 'Understand English level' },
        { q: 'If you could design your own science experiment, what would you study?', why: 'Understand curiosity direction' },
      ],
    },
  },
};

export const volunteerRoles = {
  zh: {
    title: '大学生支教团的角色',
    roles: [
      {
        title: '课堂引导员',
        desc: '带领学生完成模拟实验的各个步骤，引导讨论和思考',
        tasks: [
          '用投影展示模拟，让学生轮流操作',
          '引导学生在"预测"环节讨论：你觉得会怎样？为什么？',
          '帮助学生完成写作和英语学习环节',
          '指导动手实验，确保安全和记录',
        ],
      },
      {
        title: '内容设计师',
        desc: '根据实际教学情况，在平台上调整和定制内容',
        tasks: [
          '根据学校课本内容调整模拟的难度和知识点',
          '设计更多贴近当地生活的故事情境',
          '编写适合学生水平的写作模板',
          '收集学生反馈，提出改进建议',
        ],
      },
      {
        title: '技术助教',
        desc: '负责设备调试和技术支持',
        tasks: [
          '提前测试网络和设备是否能正常运行平台',
          '准备动手实验的材料包',
          '拍照和录像记录教学过程',
          '整理学生作品和实验数据',
        ],
      },
      {
        title: 'AI工具探索者',
        desc: '学习使用AI辅助教学设计，是这次支教的附加收获',
        tasks: [
          '学习如何用AI生成教学图片（已在平台中实现）',
          '尝试用AI辅助编写教学故事和科学解释',
          '探索如何用AI生成适合不同年级的练习题',
          '记录AI辅助教学的经验和心得，作为案例研究',
        ],
      },
    ],
  },
  en: {
    title: 'University Volunteer Team Roles',
    roles: [
      {
        title: 'Classroom Facilitator',
        desc: 'Guide students through simulation steps, lead discussions',
        tasks: [
          'Project the simulation, let students take turns operating',
          'Guide prediction discussions: What do you think will happen? Why?',
          'Help students with writing and English learning sections',
          'Supervise hands-on experiments, ensure safety and recording',
        ],
      },
      {
        title: 'Content Designer',
        desc: 'Customize content based on actual teaching needs',
        tasks: [
          'Adjust simulation difficulty based on school textbook content',
          'Design story scenarios relevant to local life',
          'Write writing templates matching student levels',
          'Collect student feedback, suggest improvements',
        ],
      },
      {
        title: 'Tech Assistant',
        desc: 'Handle equipment setup and technical support',
        tasks: [
          'Pre-test network and devices for platform compatibility',
          'Prepare hands-on experiment material kits',
          'Photo and video documentation of teaching',
          'Organize student work and experiment data',
        ],
      },
      {
        title: 'AI Tool Explorer',
        desc: 'Learn AI-assisted teaching design as a bonus learning outcome',
        tasks: [
          'Learn how AI generates teaching illustrations (already in platform)',
          'Try AI-assisted writing of teaching stories and science explanations',
          'Explore AI-generated exercises for different grade levels',
          'Document AI-assisted teaching experience as case study',
        ],
      },
    ],
  },
};

export const landingPlan = {
  zh: {
    title: '落地方案',
    scenarios: [
      {
        name: '方案A：有网络 + 投影仪（最佳）',
        desc: '大学生用电脑打开平台，投影到大屏幕',
        steps: [
          '支教团提前部署平台到Replit',
          '教室投影展示，支教团操作，学生参与讨论',
          '学生轮流到电脑前操作模拟',
          '写作和动手实验在纸上完成（打印模板）',
        ],
      },
      {
        name: '方案B：有网络 + 学生平板/电脑',
        desc: '学生各自操作，支教团巡回指导',
        steps: [
          '每个学生/小组打开平台自主学习',
          '支教团在教室巡回，解答问题',
          '写作直接在平台上完成',
          '动手实验分小组进行',
        ],
      },
      {
        name: '方案C：无网络/低网络',
        desc: '提前下载资料，离线教学',
        steps: [
          '提前截图/录屏模拟的关键画面',
          '打印教学手册（含故事、预测题、写作模板）',
          '支教团口述引导 + 纸质材料',
          '动手实验不受影响，正常进行',
        ],
      },
    ],
    timeline: [
      { phase: '第一阶段：调研（去学校前）', tasks: ['联系学校了解基本情况', '带着问题清单去实地走访', '确定目标年级和班级'] },
      { phase: '第二阶段：定制（调研后）', tasks: ['根据调研结果调整模拟内容', '匹配当地教材的知识点', '准备动手实验材料包'] },
      { phase: '第三阶段：培训（出发前）', tasks: ['培训支教大学生使用平台', '模拟课堂演练', '分配角色（引导员/设计师/助教）'] },
      { phase: '第四阶段：实施（支教期间）', tasks: ['第1天：破冰+摩擦力故事', '第2-3天：模拟+动手+写作', '持续收集反馈改进'] },
    ],
  },
  en: {
    title: 'Implementation Plan',
    scenarios: [
      {
        name: 'Plan A: Internet + Projector (Best)',
        desc: 'Volunteers use laptop, project to big screen',
        steps: ['Pre-deploy platform on Replit', 'Project display, volunteers operate, students discuss', 'Students take turns at computer', 'Writing and experiments on paper (print templates)'],
      },
      {
        name: 'Plan B: Internet + Student Tablets',
        desc: 'Students operate independently, volunteers circulate',
        steps: ['Each student/group opens platform', 'Volunteers circulate to answer questions', 'Writing done on platform', 'Hands-on experiments in groups'],
      },
      {
        name: 'Plan C: No/Low Internet',
        desc: 'Pre-download materials, teach offline',
        steps: ['Pre-screenshot/screen-record key simulation frames', 'Print teaching manual (stories, quizzes, writing templates)', 'Volunteer-led oral guidance + printed materials', 'Hands-on experiments work normally'],
      },
    ],
    timeline: [
      { phase: 'Phase 1: Research (Before Visit)', tasks: ['Contact school for basic info', 'Visit with question checklist', 'Determine target grade and class'] },
      { phase: 'Phase 2: Customize (After Research)', tasks: ['Adjust simulation content based on findings', 'Match local textbook topics', 'Prepare experiment material kits'] },
      { phase: 'Phase 3: Training (Before Departure)', tasks: ['Train volunteers to use platform', 'Simulate classroom rehearsal', 'Assign roles (facilitator/designer/assistant)'] },
      { phase: 'Phase 4: Implementation (During Teaching)', tasks: ['Day 1: Icebreaker + friction story', 'Day 2-3: Simulation + hands-on + writing', 'Continuously collect feedback'] },
    ],
  },
};
