import { cn } from '@/lib/utils';

interface RiskGaugeProps {
  score: number;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const RiskGauge = ({ score, label, size = 'md' }: RiskGaugeProps) => {
  const getColor = (score: number) => {
    if (score <= 30) return { color: 'text-success', bg: 'bg-success', label: 'Low Risk' };
    if (score <= 60) return { color: 'text-warning', bg: 'bg-warning', label: 'Medium Risk' };
    if (score <= 80) return { color: 'text-orange-500', bg: 'bg-orange-500', label: 'High Risk' };
    return { color: 'text-destructive', bg: 'bg-destructive', label: 'Critical' };
  };

  const { color, bg, label: riskLabel } = getColor(score);
  
  const sizeStyles = {
    sm: { container: 'w-24 h-24', text: 'text-2xl', label: 'text-xs' },
    md: { container: 'w-40 h-40', text: 'text-4xl', label: 'text-sm' },
    lg: { container: 'w-56 h-56', text: 'text-5xl', label: 'text-base' },
  };

  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-3">
      <div className={cn("relative", sizeStyles[size].container)}>
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            className="text-secondary"
          />
          {/* Progress circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className={cn(color, "transition-all duration-1000 ease-out")}
            style={{
              filter: 'drop-shadow(0 0 6px currentColor)',
            }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={cn("font-bold", sizeStyles[size].text, color)}>
            {score}
          </span>
          <span className={cn("text-muted-foreground mt-1", sizeStyles[size].label)}>
            / 100
          </span>
        </div>
      </div>
      <div className="text-center">
        <div className={cn("inline-flex items-center gap-2 px-3 py-1.5 rounded-full", `${bg}/10`)}>
          <div className={cn("w-2 h-2 rounded-full animate-pulse", bg)} />
          <span className={cn("text-sm font-medium", color)}>
            {label || riskLabel}
          </span>
        </div>
      </div>
    </div>
  );
};
