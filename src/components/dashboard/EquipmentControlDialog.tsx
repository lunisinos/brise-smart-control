import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Power,
  Snowflake,
  Sun,
  Wind,
  Fan,
  Thermometer,
  Settings,
  Timer,
  Minus,
  Plus,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Equipment {
  id: string;
  name: string;
  location: string;
  isOn: boolean;
  currentTemp: number;
  targetTemp: number;
  mode: string;
  energyConsumption: number;
  efficiency: number;
}

interface EquipmentControlDialogProps {
  equipment: Equipment | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (id: string, updates: Partial<Equipment>) => void;
}

const EquipmentControlDialog = ({
  equipment,
  isOpen,
  onClose,
  onUpdate,
}: EquipmentControlDialogProps) => {
  const { toast } = useToast();
  const [localTemp, setLocalTemp] = useState(equipment?.targetTemp || 22);
  const [localMode, setLocalMode] = useState(equipment?.mode || "cool");
  const [fanSpeed, setFanSpeed] = useState(2);
  const [autoMode, setAutoMode] = useState(false);
  const [isManualMode, setIsManualMode] = useState(false);
  const [minTemp, setMinTemp] = useState([18]);
  const [maxTemp, setMaxTemp] = useState([26]);

  if (!equipment) return null;

  const handlePowerToggle = () => {
    const newState = !equipment.isOn;
    onUpdate(equipment.id, { isOn: newState });
    toast({
      title: newState ? "Equipamento Ligado" : "Equipamento Desligado",
      description: `${equipment.name} foi ${newState ? "ligado" : "desligado"}`,
    });
  };

  const handleTempChange = (increment: boolean) => {
    const newTemp = increment ? localTemp + 1 : localTemp - 1;
    if (newTemp >= 16 && newTemp <= 30) {
      setLocalTemp(newTemp);
      onUpdate(equipment.id, { targetTemp: newTemp });
    }
  };

  const handleModeChange = (mode: string) => {
    setLocalMode(mode);
    onUpdate(equipment.id, { mode });
    toast({
      title: "Modo Alterado",
      description: `Modo alterado para ${mode === "cool" ? "Refrigerar" : mode === "heat" ? "Aquecer" : "Ventilação"}`,
    });
  };

  const getModeIcon = (mode: string) => {
    switch (mode) {
      case "cool":
        return <Snowflake className="h-4 w-4" />;
      case "heat":
        return <Sun className="h-4 w-4" />;
      default:
        return <Wind className="h-4 w-4" />;
    }
  };

  const getModeColor = (mode: string) => {
    switch (mode) {
      case "cool":
        return "secondary";
      case "heat":
        return "destructive";
      default:
        return "outline";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Thermometer className="h-5 w-5" />
            Controle - {equipment.name}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Mode Selector */}
          <div className="flex items-center justify-center gap-4 p-4 bg-muted/50 rounded-lg">
            <Label htmlFor="mode-selector" className="font-medium">
              Modo de Controle:
            </Label>
            <div className="flex items-center gap-2">
              <span className={!isManualMode ? "font-semibold" : "text-muted-foreground"}>
                Setpoints
              </span>
              <Switch
                id="mode-selector"
                checked={isManualMode}
                onCheckedChange={setIsManualMode}
              />
              <span className={isManualMode ? "font-semibold" : "text-muted-foreground"}>
                Manual
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Setpoints Configuration - Only shown when NOT in manual mode */}
            {!isManualMode && (
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-4 w-4" />
                    Configuração de Setpoints
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="auto-mode">Modo Automático</Label>
                    <Switch
                      id="auto-mode"
                      checked={autoMode}
                      onCheckedChange={setAutoMode}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label className="text-sm font-medium mb-2 block">
                        Temperatura Mínima: {minTemp[0]}°C
                      </Label>
                      <Slider
                        value={minTemp}
                        onValueChange={setMinTemp}
                        max={30}
                        min={16}
                        step={1}
                        className="w-full"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Se menor que {minTemp[0]}°C, aquecerá até atingir esta temperatura
                      </p>
                    </div>

                    <div>
                      <Label className="text-sm font-medium mb-2 block">
                        Temperatura Máxima: {maxTemp[0]}°C
                      </Label>
                      <Slider
                        value={maxTemp}
                        onValueChange={setMaxTemp}
                        max={30}
                        min={16}
                        step={1}
                        className="w-full"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Se maior que {maxTemp[0]}°C, resfriará até atingir esta temperatura
                      </p>
                    </div>
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <h4 className="font-medium mb-2">Status Atual</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Temperatura:</span>
                        <p className="font-medium">{equipment.currentTemp}°C</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Setpoint:</span>
                        <p className="font-medium">{localTemp}°C</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Remote Control Interface - Only shown in manual mode */}
            {isManualMode && (
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Fan className="h-4 w-4" />
                    Controle Remoto
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gradient-to-b from-muted/50 to-muted rounded-2xl p-6 space-y-6 max-w-md mx-auto">
                    {/* Status Display */}
                    <div className="text-center space-y-2">
                      <div className="flex items-center justify-center gap-2">
                        <Badge variant={equipment.isOn ? "default" : "secondary"}>
                          {equipment.isOn ? "LIGADO" : "DESLIGADO"}
                        </Badge>
                        <Badge variant={getModeColor(localMode)}>
                          {getModeIcon(localMode)}
                          {localMode.toUpperCase()}
                        </Badge>
                      </div>
                      <div className="text-3xl font-bold text-primary">
                        {localTemp}°C
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Atual: {equipment.currentTemp}°C
                      </div>
                    </div>

                    {/* Power Button */}
                    <div className="flex justify-center">
                      <Button
                        variant={equipment.isOn ? "destructive" : "default"}
                        size="lg"
                        onClick={handlePowerToggle}
                        className="rounded-full w-16 h-16"
                      >
                        <Power className="h-6 w-6" />
                      </Button>
                    </div>

                    {/* Temperature Controls */}
                    <div className="flex items-center justify-center gap-4">
                      <Button
                        variant="outline"
                        size="lg"
                        onClick={() => handleTempChange(false)}
                        disabled={!equipment.isOn || localTemp <= 16}
                        className="rounded-full w-12 h-12"
                      >
                        <Minus className="h-5 w-5" />
                      </Button>
                      <div className="text-center min-w-[80px]">
                        <div className="text-2xl font-bold">{localTemp}°C</div>
                      </div>
                      <Button
                        variant="outline"
                        size="lg"
                        onClick={() => handleTempChange(true)}
                        disabled={!equipment.isOn || localTemp >= 30}
                        className="rounded-full w-12 h-12"
                      >
                        <Plus className="h-5 w-5" />
                      </Button>
                    </div>

                    {/* Mode Buttons */}
                    <div className="grid grid-cols-3 gap-2">
                      <Button
                        variant={localMode === "cool" ? "cooling" : "outline"}
                        onClick={() => handleModeChange("cool")}
                        disabled={!equipment.isOn}
                        className="flex flex-col gap-1 h-16"
                      >
                        <Snowflake className="h-5 w-5" />
                        <span className="text-xs">FRIO</span>
                      </Button>
                      <Button
                        variant={localMode === "heat" ? "heating" : "outline"}
                        onClick={() => handleModeChange("heat")}
                        disabled={!equipment.isOn}
                        className="flex flex-col gap-1 h-16"
                      >
                        <Sun className="h-5 w-5" />
                        <span className="text-xs">QUENTE</span>
                      </Button>
                      <Button
                        variant={localMode === "fan" ? "energy" : "outline"}
                        onClick={() => handleModeChange("fan")}
                        disabled={!equipment.isOn}
                        className="flex flex-col gap-1 h-16"
                      >
                        <Wind className="h-5 w-5" />
                        <span className="text-xs">VENTO</span>
                      </Button>
                    </div>

                    {/* Fan Speed */}
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">
                        Velocidade do Ventilador
                      </Label>
                      <div className="grid grid-cols-4 gap-1">
                        {[1, 2, 3, 4].map((speed) => (
                          <Button
                            key={speed}
                            variant={fanSpeed === speed ? "default" : "outline"}
                            size="sm"
                            onClick={() => setFanSpeed(speed)}
                            disabled={!equipment.isOn}
                          >
                            {speed}
                          </Button>
                        ))}
                      </div>
                    </div>

                    {/* Timer Button */}
                    <div className="flex justify-center">
                      <Button variant="outline" disabled={!equipment.isOn}>
                        <Timer className="h-4 w-4 mr-2" />
                        Timer
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EquipmentControlDialog;
