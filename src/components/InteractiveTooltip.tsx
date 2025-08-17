import { ReactNode } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface InteractiveTooltipProps {
  children: ReactNode;
  content: string;
  data?: any;
}

export const InteractiveTooltip = ({ children, content, data }: InteractiveTooltipProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {children}
        </TooltipTrigger>
        <TooltipContent 
          side="top" 
          className="max-w-sm p-4 bg-card border border-border/50 rounded-lg shadow-lg"
        >
          <div className="space-y-2">
            <p className="text-sm font-medium text-foreground">{content}</p>
            {data && (
              <div className="text-xs text-muted-foreground">
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {Object.entries(data).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <span className="capitalize">{key}:</span>
                      <span className="font-medium">{String(value)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};