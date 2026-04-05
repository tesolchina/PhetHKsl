import { useState } from 'react';
import { Simulation } from '@/data/simulations';
import { Play } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';

interface SimulationCardProps {
  simulation: Simulation;
}

export function SimulationCard({ simulation }: SimulationCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div 
        className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-white/5 bg-card p-6 card-hover-glow cursor-pointer h-full"
        onClick={() => setIsOpen(true)}
        data-testid={`card-${simulation.id}`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        
        <div className="relative z-10 flex-1">
          <div className="mb-4 flex items-center justify-between">
            <Badge variant="outline" className="border-primary/20 text-primary uppercase tracking-wider text-xs font-semibold">
              {simulation.category}
            </Badge>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:scale-110">
              <Play className="h-4 w-4" />
            </div>
          </div>
          
          <h3 className="font-serif text-2xl font-semibold tracking-tight text-foreground mb-3 text-glow">
            {simulation.name}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
            {simulation.description}
          </p>
        </div>

        <div className="relative z-10 mt-6 flex flex-wrap gap-2">
          {simulation.tags.map((tag) => (
            <span key={tag} className="text-xs font-medium text-muted-foreground/80 bg-white/5 px-2 py-1 rounded-md">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-6xl w-[95vw] h-[85vh] p-0 border-white/10 bg-background/95 backdrop-blur-xl overflow-hidden flex flex-col">
          <DialogTitle className="sr-only">{simulation.name}</DialogTitle>
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-card/50">
            <div>
              <h2 className="font-serif text-xl font-medium text-glow">{simulation.name}</h2>
              <p className="text-xs text-muted-foreground mt-1">{simulation.category}</p>
            </div>
          </div>
          <div className="flex-1 w-full bg-black relative">
            {isOpen && (
              <iframe 
                src={simulation.url} 
                className="absolute inset-0 w-full h-full border-0"
                allowFullScreen
                title={simulation.name}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
