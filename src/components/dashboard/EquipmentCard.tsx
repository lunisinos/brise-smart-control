import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { 
  Wind, 
  Thermometer, 
  Power, 
  Settings,
  TrendingUp,
  TrendingDown 
} from "lucide-react";

interface Equipment {
  id: string;
  name: string;
  location: string;
  isOn: boolean;
  currentTemp: number;
  targetTemp: number;
  mode: "cool" | "heat" | "auto" | "fan";
  energyConsumption: number;
  efficiency: number;
}

interface EquipmentCardProps {
  equipment: Equipment;
  onToggle: (id: string) => void;
  onControl: (id: string) => void;
}

const EquipmentCard = ({ equipment, onToggle, onControl }: EquipmentCardProps) => {
  const getModeColor = (mode: string) => {
    switch (mode) {
      case "cool":
        return "bg-cooling text-white";
      case "heat":
        return "bg-heating text-white";
      case "auto":
        return "bg-energy-efficient text-white";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getModeIcon = (mode: string) => {
    switch (mode) {
      case "cool":
      case "heat":
        return <Thermometer className="h-3 w-3" />;
      default:
        return <Wind className="h-3 w-3" />;
    }
  };

  const getEfficiencyTrend = (efficiency: number) => {
    if (efficiency >= 85) return { icon: TrendingUp, color: "text-energy-efficient" };
    if (efficiency >= 70) return { icon: TrendingUp, color: "text-energy-warning" };
    return { icon: TrendingDown, color: "text-energy-critical" };
  };

  const efficiencyTrend = getEfficiencyTrend(equipment.efficiency);

  return (
    <Card className={cn(
      "transition-all duration-300 hover:shadow-elevated",
      equipment.isOn ? "border-cooling/30 bg-gradient-to-br from-cooling-light/5 to-transparent" : ""
    )}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">{equipment.name}</CardTitle>
            <p className="text-sm text-muted-foreground">{equipment.location}</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge 
              variant="outline" 
              className={cn("gap-1", getModeColor(equipment.mode))}
            >
              {getModeIcon(equipment.mode)}
              {equipment.mode.toUpperCase()}
            </Badge>
            <Button
              variant={equipment.isOn ? "cooling" : "outline"}
              size="sm"
              onClick={() => onToggle(equipment.id)}
            >
              <Power className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Temperatura Atual</p>
            <p className="text-xl font-bold">{equipment.currentTemp}°C</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Meta</p>
            <p className="text-xl font-bold text-cooling">{equipment.targetTemp}°C</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Consumo</p>
            <p className="text-sm font-medium">{equipment.energyConsumption}W</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Eficiência</p>
            <div className="flex items-center gap-1">
              <p className="text-sm font-medium">{equipment.efficiency}%</p>
              <efficiencyTrend.icon className={cn("h-3 w-3", efficiencyTrend.color)} />
            </div>
          </div>
        </div>

        <Button 
          variant="control" 
          size="sm" 
          className="w-full"
          onClick={() => onControl(equipment.id)}
        >
          <Settings className="h-3 w-3" />
          Controlar
        </Button>
      </CardContent>
    </Card>
  );
};

export default EquipmentCard;