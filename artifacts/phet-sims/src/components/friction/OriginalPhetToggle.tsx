import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Microscope, X, ExternalLink } from 'lucide-react';

interface Props {
  language: 'en' | 'zh';
}

const phetUrls = {
  en: 'https://phet.colorado.edu/sims/html/friction/latest/friction_en.html',
  zh: 'https://phet.colorado.edu/sims/html/friction/latest/friction_zh_CN.html',
};

export function OriginalPhetToggle({ language }: Props) {
  const [showPhet, setShowPhet] = useState(false);

  const label = language === 'zh' ? '对比原版 PhET' : 'Compare Original PhET';
  const closeLabel = language === 'zh' ? '关闭原版' : 'Close Original';

  if (!showPhet) {
    return (
      <Button
        variant="outline"
        size="sm"
        onClick={() => setShowPhet(true)}
        className="gap-2 text-xs border-violet-500/20 text-violet-400 hover:bg-violet-500/10"
      >
        <Microscope className="h-3.5 w-3.5" />
        {label}
      </Button>
    );
  }

  return (
    <div className="w-full mt-4 animate-in fade-in slide-in-from-bottom-3 duration-500">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Microscope className="h-4 w-4 text-violet-400" />
          <span className="text-sm font-medium text-violet-300">
            {language === 'zh' ? '原版 PhET 摩擦力模拟' : 'Original PhET Friction Simulation'}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <a
            href={phetUrls[language]}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-violet-400/60 hover:text-violet-400 flex items-center gap-1"
          >
            <ExternalLink className="h-3 w-3" />
            {language === 'zh' ? '新窗口打开' : 'Open in new tab'}
          </a>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowPhet(false)}
            className="h-7 w-7 p-0 text-muted-foreground hover:text-white"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="rounded-xl overflow-hidden border border-violet-500/20 shadow-lg shadow-violet-500/5 bg-white">
        <iframe
          src={phetUrls[language]}
          className="w-full h-[400px] border-0"
          title="PhET Friction Simulation"
          allowFullScreen
        />
      </div>
      <p className="text-[10px] text-muted-foreground mt-2 text-center">
        {language === 'zh'
          ? 'PhET Interactive Simulations, University of Colorado Boulder. https://phet.colorado.edu'
          : 'PhET Interactive Simulations, University of Colorado Boulder. https://phet.colorado.edu'}
      </p>
    </div>
  );
}
