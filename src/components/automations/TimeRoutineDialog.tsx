import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Clock, CalendarDays, Power, Settings } from "lucide-react";

interface TimeRoutineDialogProps {
  children: React.ReactNode;
}

const TimeRoutineDialog = ({ children }: TimeRoutineDialogProps) => {
  const [routineName, setRoutineName] = useState("");
  const [timeAutomation, setTimeAutomation] = useState(true);
  const [temperatureChange, setTemperatureChange] = useState(false);
  const [startTime, setStartTime] = useState("22:00");
  const [endTime, setEndTime] = useState("06:00");
  const [selectedDays, setSelectedDays] = useState<string[]>(["saturday", "sunday"]);
  const [selectedEquipments, setSelectedEquipments] = useState<string[]>([]);
  const [action, setAction] = useState("turn_off");

  const daysOfWeek = [
    { id: "monday", label: "Seg", name: "Segunda" },
    { id: "tuesday", label: "Ter", name: "Terça" },
    { id: "wednesday", label: "Qua", name: "Quarta" },
    { id: "thursday", label: "Qui", name: "Quinta" },
    { id: "friday", label: "Sex", name: "Sexta" },
    { id: "saturday", label: "Sáb", name: "Sábado" },
    { id: "sunday", label: "Dom", name: "Domingo" }
  ];

  const equipments = [
    { id: "ac-1", name: "Ar Condicionado - Sala 101" },
    { id: "ac-2", name: "Ar Condicionado - Sala 102" },
    { id: "ac-3", name: "Ar Condicionado - Auditório" },
    { id: "ac-4", name: "Ar Condicionado - Recepção" }
  ];

  const actions = [
    { id: "turn_off", label: "Desligar equipamentos", icon: Power },
    { id: "turn_on", label: "Ligar equipamentos", icon: Power },
    { id: "set_temp", label: "Ajustar temperatura", icon: Settings }
  ];

  const toggleDay = (dayId: string) => {
    setSelectedDays(prev => 
      prev.includes(dayId) 
        ? prev.filter(d => d !== dayId)
        : [...prev, dayId]
    );
  };

  const toggleEquipment = (equipmentId: string) => {
    setSelectedEquipments(prev => 
      prev.includes(equipmentId) 
        ? prev.filter(e => e !== equipmentId)
        : [...prev, equipmentId]
    );
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-cooling" />
            Nova Rotina por Horário
          </DialogTitle>
          <DialogDescription>
            Configure uma automação baseada em horários específicos
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Nome da Rotina */}
          <div className="space-y-2">
            <Label htmlFor="routine-name">Nome da Rotina</Label>
            <Input
              id="routine-name"
              placeholder="Ex: Economia Noturna"
              value={routineName}
              onChange={(e) => setRoutineName(e.target.value)}
            />
          </div>

          {/* Configurações de Automação */}
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="space-y-1">
                <Label className="text-sm font-medium">Automação por Horário</Label>
                <p className="text-xs text-muted-foreground">
                  Ativar ou desativar equipamentos em horários específicos
                </p>
              </div>
              <Switch
                checked={timeAutomation}
                onCheckedChange={setTimeAutomation}
              />
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="space-y-1">
                <Label className="text-sm font-medium">Mudança de Temperatura</Label>
                <p className="text-xs text-muted-foreground">
                  Ajustar temperatura automaticamente baseado no horário
                </p>
              </div>
              <Switch
                checked={temperatureChange}
                onCheckedChange={setTemperatureChange}
              />
            </div>
          </div>

          {/* Horários */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="start-time">Horário de Início</Label>
              <Input
                id="start-time"
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="end-time">Horário de Término</Label>
              <Input
                id="end-time"
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </div>
          </div>

          {/* Dias da Semana */}
          <div className="space-y-3">
            <Label className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4" />
              Dias da Semana
            </Label>
            <div className="flex flex-wrap gap-2">
              {daysOfWeek.map((day) => (
                <Badge
                  key={day.id}
                  variant={selectedDays.includes(day.id) ? "default" : "outline"}
                  className={`cursor-pointer px-3 py-1 ${
                    selectedDays.includes(day.id) 
                      ? "bg-cooling text-white hover:bg-cooling-dark" 
                      : "hover:bg-cooling/10"
                  }`}
                  onClick={() => toggleDay(day.id)}
                >
                  {day.label}
                </Badge>
              ))}
            </div>
          </div>

          {/* Ação */}
          <div className="space-y-3">
            <Label>Ação a ser Executada</Label>
            <Select value={action} onValueChange={setAction}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma ação" />
              </SelectTrigger>
              <SelectContent>
                {actions.map((actionItem) => {
                  const IconComponent = actionItem.icon;
                  return (
                    <SelectItem key={actionItem.id} value={actionItem.id}>
                      <div className="flex items-center gap-2">
                        <IconComponent className="h-4 w-4" />
                        {actionItem.label}
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>

          {/* Seleção de Equipamentos */}
          <div className="space-y-3">
            <Label>Equipamentos</Label>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {equipments.map((equipment) => (
                <Card 
                  key={equipment.id} 
                  className={`cursor-pointer transition-colors ${
                    selectedEquipments.includes(equipment.id)
                      ? "border-cooling bg-cooling/5"
                      : "hover:bg-muted/50"
                  }`}
                  onClick={() => toggleEquipment(equipment.id)}
                >
                  <CardContent className="flex items-center justify-between p-3">
                    <span className="text-sm">{equipment.name}</span>
                    <Switch
                      checked={selectedEquipments.includes(equipment.id)}
                      onChange={() => toggleEquipment(equipment.id)}
                    />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Resumo */}
          {routineName && selectedDays.length > 0 && selectedEquipments.length > 0 && (
            <Card className="bg-cooling/5 border-cooling/20">
              <CardContent className="p-4">
                <h4 className="font-semibold text-sm mb-2">Resumo da Rotina:</h4>
                <p className="text-sm text-muted-foreground">
                  <strong>{routineName}</strong> será executada {selectedDays.length === 7 ? "todos os dias" : `nos dias: ${selectedDays.map(d => daysOfWeek.find(day => day.id === d)?.label).join(", ")}`} das <strong>{startTime}</strong> às <strong>{endTime}</strong>, 
                  {action === "turn_off" && " desligando"} 
                  {action === "turn_on" && " ligando"}
                  {action === "set_temp" && " ajustando a temperatura de"}
                  <strong> {selectedEquipments.length} equipamento(s)</strong>.
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="flex justify-end gap-3">
          <Button variant="outline">Cancelar</Button>
          <Button 
            variant="control" 
            disabled={!routineName || selectedDays.length === 0 || selectedEquipments.length === 0}
          >
            Criar Rotina
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TimeRoutineDialog;