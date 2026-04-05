// Copyright 2026, Secondary Development
// Educational guide overlay for the Equality Explorer simulation.

import Property from '../../../../axon/js/Property.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import RichText from '../../../../scenery/js/nodes/RichText.js';
import VBox from '../../../../scenery/js/nodes/VBox.js';
import HBox from '../../../../scenery/js/nodes/HBox.js';
import Panel from '../../../../sun/js/Panel.js';
import RectangularPushButton from '../../../../sun/js/buttons/RectangularPushButton.js';

interface GuideStep {
  title: string;
  content: string;
}

const GUIDE_STEPS_EN: GuideStep[] = [
  {
    title: 'Step 1: Understanding Equality',
    content: 'An equation shows that two expressions\nare equal. The balance scale helps you\nvisualize this: when both sides weigh\nthe same, the scale is balanced.'
  },
  {
    title: 'Step 2: Using the Balance',
    content: 'Drag objects onto both sides of the\nscale. Add the same amount to both\nsides to keep it balanced. This is\nthe key principle of solving equations.'
  },
  {
    title: 'Step 3: Variables',
    content: 'The "x" represents an unknown value.\nYour goal is to figure out what number\nx equals by manipulating both sides\nof the equation equally.'
  },
  {
    title: 'Step 4: Solving Equations',
    content: 'To solve, isolate x on one side.\nWhatever you do to one side, you must\ndo to the other. Try the "Solve It!"\nscreen to practice!'
  }
];

const GUIDE_STEPS_ZH: GuideStep[] = [
  {
    title: '第1步：理解等式',
    content: '等式表示两个表达式相等。\n天平帮助你直观理解：\n当两边重量相同时，\n天平是平衡的。'
  },
  {
    title: '第2步：使用天平',
    content: '将物体拖到天平两侧。\n在两边加上相同的量\n以保持平衡。这是\n解方程的关键原则。'
  },
  {
    title: '第3步：变量',
    content: '"x"代表一个未知值。\n你的目标是通过对等式\n两边进行相同的操作\n来找出x等于多少。'
  },
  {
    title: '第4步：解方程',
    content: '要解方程，需要将x\n孤立在一边。对一边做的\n操作必须对另一边也做。\n试试"解题"页面来练习！'
  }
];

const TITLE_FONT = new PhetFont( { size: 13, weight: 'bold' } );
const CONTENT_FONT = new PhetFont( { size: 11 } );
const BUTTON_FONT = new PhetFont( { size: 11 } );
const NAV_FONT = new PhetFont( { size: 10 } );

export default class EducationalGuideOverlay extends Node {

  private readonly currentStepProperty: Property<number>;
  private readonly isVisibleProperty: Property<boolean>;
  private isSpeaking: boolean;
  private readonly guideSteps: GuideStep[];
  private readonly isZH: boolean;
  private readonly titleNode: Text;
  private readonly contentNode: RichText;
  private readonly stepIndicator: Text;
  private readonly prevButton: RectangularPushButton;
  private readonly nextButton: RectangularPushButton;
  private readonly panel: Panel;
  private readonly toggleButton: RectangularPushButton;

  public constructor() {
    super();

    this.currentStepProperty = new Property<number>( 0 );
    this.isVisibleProperty = new Property<boolean>( true );
    this.isSpeaking = false;

    const locale = phet.chipper.locale || 'en';
    this.isZH = ( locale === 'zh_CN' || locale === 'zh' );
    this.guideSteps = this.isZH ? GUIDE_STEPS_ZH : GUIDE_STEPS_EN;

    this.titleNode = new Text( '', { font: TITLE_FONT, fill: '#1a237e', maxWidth: 180 } );
    this.contentNode = new RichText( '', { font: CONTENT_FONT, fill: '#333', maxWidth: 180, lineWrap: 180 } );

    const speakLabel = this.isZH ? '朗读' : 'Read Aloud';

    const speakButton = new RectangularPushButton( {
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
      children: [ this.titleNode, this.contentNode, speakButton, navBar ],
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

    this.isVisibleProperty.link( ( visible: boolean ) => {
      this.panel.visible = visible;
      ( this.toggleButton.content as Text ).string = visible ? hideLabel : showLabel;
    } );

    this.updateDisplay();
  }

  private updateDisplay(): void {
    const step = this.guideSteps[ this.currentStepProperty.value ];
    this.titleNode.string = step.title;
    this.contentNode.string = step.content;
    this.stepIndicator.string = `${this.currentStepProperty.value + 1} / ${this.guideSteps.length}`;
    this.prevButton.enabled = this.currentStepProperty.value > 0;
    this.nextButton.enabled = this.currentStepProperty.value < this.guideSteps.length - 1;
  }

  private toggleSpeech(): void {
    if ( this.isSpeaking ) {
      this.stopSpeech();
    }
    else {
      this.startSpeech();
    }
  }

  private startSpeech(): void {
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

  private stopSpeech(): void {
    if ( typeof window !== 'undefined' && 'speechSynthesis' in window ) {
      window.speechSynthesis.cancel();
    }
    this.isSpeaking = false;
  }

  public setPosition( x: number, y: number ): void {
    this.panel.left = x;
    this.panel.top = y;
    this.toggleButton.left = x;
    this.toggleButton.top = y - 25;
  }
}
