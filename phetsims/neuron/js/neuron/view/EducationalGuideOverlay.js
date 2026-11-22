// Copyright 2026, Secondary Development
// Educational guide overlay for the Neuron simulation.
// Adds step-by-step educational narration with text-to-speech support directly into the simulation.

import Property from '../../../../axon/js/Property.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Rectangle from '../../../../scenery/js/nodes/Rectangle.js';
import RichText from '../../../../scenery/js/nodes/RichText.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import VBox from '../../../../scenery/js/layout/nodes/VBox.js';
import HBox from '../../../../scenery/js/layout/nodes/HBox.js';
import Panel from '../../../../sun/js/Panel.js';
import RectangularPushButton from '../../../../sun/js/buttons/RectangularPushButton.js';
import RectangularToggleButton from '../../../../sun/js/buttons/RectangularToggleButton.js';

const GUIDE_STEPS_EN = [
  {
    title: 'Step 1: What is a Neuron?',
    content: 'A neuron is a nerve cell that transmits\nelectrical signals. It has a cell body,\ndendrites (receive signals), and an\naxon (sends signals to other cells).'
  },
  {
    title: 'Step 2: The Action Potential',
    content: 'Click "Stimulate Neuron" to trigger an\naction potential. Sodium ions (Na+) rush\ninto the cell, making it more positive.\nThis pulse travels along the axon.'
  },
  {
    title: 'Step 3: Ion Channels',
    content: 'Watch the membrane channels open and\nclose. Sodium channels open first\n(depolarization), then potassium\nchannels (repolarization).'
  },
  {
    title: 'Step 4: Observe the Chart',
    content: 'The chart below shows membrane\npotential over time. Notice the sharp\nspike during the action potential,\nthen the return to resting potential.'
  }
];

const GUIDE_STEPS_ZH = [
  {
    title: '第1步：什么是神经元？',
    content: '神经元是传输电信号的神经细胞。\n它有细胞体、树突（接收信号）\n和轴突（将信号发送到其他细胞）。'
  },
  {
    title: '第2步：动作电位',
    content: '点击"刺激神经元"按钮触发动作电位。\n钠离子（Na+）涌入细胞内部，\n使其变得更加正电。这个脉冲\n沿轴突传播。'
  },
  {
    title: '第3步：离子通道',
    content: '观察细胞膜通道的打开和关闭。\n钠通道首先打开（去极化），\n然后钾通道打开（复极化）。'
  },
  {
    title: '第4步：观察图表',
    content: '下面的图表显示了膜电位随时间\n的变化。注意动作电位期间的\n尖锐峰值，然后恢复到静息电位。'
  }
];

const TITLE_FONT = new PhetFont( { size: 13, weight: 'bold' } );
const CONTENT_FONT = new PhetFont( { size: 11 } );
const BUTTON_FONT = new PhetFont( { size: 11 } );
const NAV_FONT = new PhetFont( { size: 10 } );

class EducationalGuideOverlay extends Node {

  constructor() {
    super();

    this.currentStepProperty = new Property( 0 );
    this.isVisibleProperty = new Property( true );
    this.isSpeaking = false;

    const locale = phet.chipper.locale || 'en';
    this.guideSteps = ( locale === 'zh_CN' || locale === 'zh' ) ? GUIDE_STEPS_ZH : GUIDE_STEPS_EN;
    this.isZH = ( locale === 'zh_CN' || locale === 'zh' );

    this.titleNode = new Text( '', { font: TITLE_FONT, fill: '#1a237e', maxWidth: 180 } );
    this.contentNode = new RichText( '', { font: CONTENT_FONT, fill: '#333', maxWidth: 180, lineWrap: 180 } );

    const speakLabel = this.isZH ? '朗读' : 'Read Aloud';
    const speakingLabel = this.isZH ? '停止' : 'Stop';

    this.speakButton = new RectangularPushButton( {
      content: new Text( speakLabel, { font: BUTTON_FONT, fill: 'white', maxWidth: 80 } ),
      baseColor: '#4a90d9',
      listener: () => this.toggleSpeech(),
      cornerRadius: 4,
      xMargin: 8,
      yMargin: 4
    } );

    const prevLabel = this.isZH ? '上一步' : 'Prev';
    const nextLabel = this.isZH ? '下一步' : 'Next';

    this.prevButton = new RectangularPushButton( {
      content: new Text( prevLabel, { font: NAV_FONT, maxWidth: 50 } ),
      baseColor: '#e0e0e0',
      listener: () => {
        if ( this.currentStepProperty.value > 0 ) {
          this.stopSpeech();
          this.currentStepProperty.value = this.currentStepProperty.value - 1;
        }
      },
      cornerRadius: 3,
      xMargin: 6,
      yMargin: 3
    } );

    this.nextButton = new RectangularPushButton( {
      content: new Text( nextLabel, { font: NAV_FONT, maxWidth: 50 } ),
      baseColor: '#e0e0e0',
      listener: () => {
        if ( this.currentStepProperty.value < this.guideSteps.length - 1 ) {
          this.stopSpeech();
          this.currentStepProperty.value = this.currentStepProperty.value + 1;
        }
      },
      cornerRadius: 3,
      xMargin: 6,
      yMargin: 3
    } );

    this.stepIndicator = new Text( '', { font: NAV_FONT, fill: '#666' } );

    const navBar = new HBox( {
      children: [ this.prevButton, this.stepIndicator, this.nextButton ],
      spacing: 8,
      align: 'center'
    } );

    const contentBox = new VBox( {
      children: [ this.titleNode, this.contentNode, this.speakButton, navBar ],
      spacing: 8,
      align: 'left'
    } );

    this.panel = new Panel( contentBox, {
      fill: 'rgba(255, 255, 255, 0.92)',
      stroke: '#90a4ae',
      cornerRadius: 8,
      xMargin: 12,
      yMargin: 10,
      lineWidth: 1.5
    } );

    this.addChild( this.panel );

    const hideLabel = this.isZH ? '隐藏' : 'Hide';
    const showLabel = this.isZH ? '指南' : 'Guide';

    this.toggleButton = new RectangularPushButton( {
      content: new Text( showLabel, { font: NAV_FONT, fill: 'white', maxWidth: 40 } ),
      baseColor: '#4a90d9',
      listener: () => {
        this.isVisibleProperty.value = !this.isVisibleProperty.value;
      },
      cornerRadius: 4,
      xMargin: 6,
      yMargin: 4
    } );
    this.addChild( this.toggleButton );

    this.currentStepProperty.link( () => this.updateDisplay() );

    this.isVisibleProperty.link( visible => {
      this.panel.visible = visible;
      this.toggleButton.children[ 0 ].string = visible ? hideLabel : showLabel;
    } );

    this.updateDisplay();
  }

  updateDisplay() {
    const step = this.guideSteps[ this.currentStepProperty.value ];
    this.titleNode.string = step.title;
    this.contentNode.string = step.content;
    this.stepIndicator.string = `${this.currentStepProperty.value + 1} / ${this.guideSteps.length}`;
    this.prevButton.enabled = this.currentStepProperty.value > 0;
    this.nextButton.enabled = this.currentStepProperty.value < this.guideSteps.length - 1;
  }

  toggleSpeech() {
    if ( this.isSpeaking ) {
      this.stopSpeech();
    }
    else {
      this.startSpeech();
    }
  }

  startSpeech() {
    if ( typeof window !== 'undefined' && 'speechSynthesis' in window ) {
      this.stopSpeech();
      const step = this.guideSteps[ this.currentStepProperty.value ];
      const text = `${step.title}. ${step.content.replace( /\n/g, ' ' )}`;
      const utterance = new SpeechSynthesisUtterance( text );
      utterance.lang = this.isZH ? 'zh-CN' : 'en-US';
      utterance.rate = this.isZH ? 0.9 : 1.0;
      utterance.onend = () => { this.isSpeaking = false; };
      utterance.onerror = () => { this.isSpeaking = false; };
      this.isSpeaking = true;
      window.speechSynthesis.speak( utterance );
    }
  }

  stopSpeech() {
    if ( typeof window !== 'undefined' && 'speechSynthesis' in window ) {
      window.speechSynthesis.cancel();
    }
    this.isSpeaking = false;
  }

  setPosition( x, y ) {
    this.panel.left = x;
    this.panel.top = y;
    this.toggleButton.left = x;
    this.toggleButton.top = y - 25;
  }
}

export default EducationalGuideOverlay;
