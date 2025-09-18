import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuCheckboxItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Clock, CalendarDays, Power, Settings, Plus, ChevronDown, Trash2, Thermometer } from "lucide-react";

interface TimeRoutineDialogProps {
  children: React.ReactNode;
}

interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
}

interface TemperatureRule {
  id: string;
  startTime: string;
  endTime: string;
  temperature: number;
}

const TimeRoutineDialog = ({ children }: TimeRoutineDialogProps) => {
  const [routineName, setRoutineName] = useState("");
  const [timeAutomation, setTimeAutomation] = useState(true);
  const [temperatureChange, setTemperatureChange] = useState(false);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([
    { id: "1", startTime: "22:00", endTime: "06:00" }
  ]);
  const [temperatureRules, setTemperatureRules] = useState<TemperatureRule[]>([]);
  const [selectedDays, setSelectedDays] = useState<string[]>(["saturday", "sunday"]);
  const [selectedEquipments, setSelectedEquipments] = useState<string[]>([]);
  const [selectedEnvironments, setSelectedEnvironments] = useState<string[]>([]);
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

  const environments = [
    { id: "sala-101", name: "Sala 101" },
    { id: "sala-102", name: "Sala 102" },
    { id: "auditorio", name: "Auditório" },
    { id: "recepcao", name: "Recepção" },
    { id: "almoxarifado", name: "Almoxarifado" },
    { id: "cozinha", name: "Cozinha" }
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

  const toggleEnvironment = (environmentId: string) => {
    setSelectedEnvironments(prev => 
      prev.includes(environmentId) 
        ? prev.filter(e => e !== environmentId)
        : [...prev, environmentId]
    );
  };

  const addTimeSlot = () => {
    const newTimeSlot: TimeSlot = {
      id: Date.now().toString(),
      startTime: "09:00",
      endTime: "17:00"
    };
    setTimeSlots(prev => [...prev, newTimeSlot]);
  };

  const removeTimeSlot = (id: string) => {
    if (timeSlots.length > 1) {
      setTimeSlots(prev => prev.filter(slot => slot.id !== id));
      setTemperatureRules(prev => prev.filter(rule => 
        timeSlots.some(slot => 
          slot.id !== id && 
          rule.startTime >= slot.startTime && 
          rule.endTime <= slot.endTime
        )
      ));
    }
  };

  const updateTimeSlot = (id: string, field: 'startTime' | 'endTime', value: string) => {
    setTimeSlots(prev => prev.map(slot => 
      slot.id === id ? { ...slot, [field]: value } : slot
    ));
  };

  const addTemperatureRule = () => {
    if (timeSlots.length > 0) {
      const firstSlot = timeSlots[0];
      const newRule: TemperatureRule = {
        id: Date.now().toString(),
        startTime: firstSlot.startTime,
        endTime: firstSlot.endTime,
        temperature: 23
      };
      setTemperatureRules(prev => [...prev, newRule]);
    }
  };

  const removeTemperatureRule = (id: string) => {
    setTemperatureRules(prev => prev.filter(rule => rule.id !== id));
  };

  const updateTemperatureRule = (id: string, field: 'startTime' | 'endTime' | 'temperature', value: string | number) => {
    setTemperatureRules(prev => prev.map(rule => 
      rule.id === id ? { ...rule, [field]: value } : rule
    ));
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

          {/* Automação por Horário */}
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

            {/* Horários */}
            <div className={`space-y-4 ${!timeAutomation ? 'opacity-50 pointer-events-none' : ''}`}>
              <div className="flex items-center justify-between">
                <Label className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Horários de Funcionamento
                </Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addTimeSlot}
                  disabled={!timeAutomation}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Adicionar Horário
                </Button>
              </div>
              {timeSlots.map((slot, index) => (
                <Card key={slot.id} className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="grid grid-cols-2 gap-4 flex-1">
                      <div className="space-y-2">
                        <Label htmlFor={`start-time-${slot.id}`}>Horário de Início</Label>
                        <Input
                          id={`start-time-${slot.id}`}
                          type="time"
                          value={slot.startTime}
                          onChange={(e) => updateTimeSlot(slot.id, 'startTime', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`end-time-${slot.id}`}>Horário de Término</Label>
                        <Input
                          id={`end-time-${slot.id}`}
                          type="time"
                          value={slot.endTime}
                          onChange={(e) => updateTimeSlot(slot.id, 'endTime', e.target.value)}
                        />
                      </div>
                    </div>
                    {timeSlots.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeTimeSlot(slot.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </Card>
              ))}
            </div>

            {/* Dias da Semana */}
            <div className={`space-y-3 ${!timeAutomation ? 'opacity-50 pointer-events-none' : ''}`}>
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
          </div>

          {/* Automação de Temperatura */}
          <div className="space-y-4">
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

          {/* Configuração de Temperatura */}
          {temperatureChange && (
            <div className={`space-y-4 ${!temperatureChange ? 'opacity-50 pointer-events-none' : ''}`}>
              <div className="flex items-center justify-between">
                <Label className="flex items-center gap-2">
                  <Thermometer className="h-4 w-4" />
                  Configuração de Temperatura por Horário
                </Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addTemperatureRule}
                  disabled={!temperatureChange || timeSlots.length === 0}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Adicionar Regra
                </Button>
              </div>
              {temperatureRules.map((rule) => (
                <Card key={rule.id} className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="grid grid-cols-3 gap-4 flex-1">
                      <div className="space-y-2">
                        <Label htmlFor={`temp-start-${rule.id}`}>Início</Label>
                        <Input
                          id={`temp-start-${rule.id}`}
                          type="time"
                          value={rule.startTime}
                          onChange={(e) => updateTemperatureRule(rule.id, 'startTime', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`temp-end-${rule.id}`}>Fim</Label>
                        <Input
                          id={`temp-end-${rule.id}`}
                          type="time"
                          value={rule.endTime}
                          onChange={(e) => updateTemperatureRule(rule.id, 'endTime', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`temp-value-${rule.id}`}>Temperatura (°C)</Label>
                        <Input
                          id={`temp-value-${rule.id}`}
                          type="number"
                          min="16"
                          max="30"
                          value={rule.temperature}
                          onChange={(e) => updateTemperatureRule(rule.id, 'temperature', parseInt(e.target.value))}
                        />
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeTemperatureRule(rule.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* Seleção de Ambientes */}
          <div className="space-y-3">
            <Label>Ambientes</Label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full justify-between">
                  {selectedEnvironments.length === 0 
                    ? "Selecionar ambientes" 
                    : `${selectedEnvironments.length} ambiente(s) selecionado(s)`
                  }
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-full min-w-[400px] bg-background border border-border z-50">
                {environments.map((environment) => (
                  <DropdownMenuCheckboxItem
                    key={environment.id}
                    checked={selectedEnvironments.includes(environment.id)}
                    onCheckedChange={() => toggleEnvironment(environment.id)}
                  >
                    {environment.name}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
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
          {routineName && selectedDays.length > 0 && (selectedEquipments.length > 0 || selectedEnvironments.length > 0) && (
            <Card className="bg-cooling/5 border-cooling/20">
              <CardContent className="p-4">
                <h4 className="font-semibold text-sm mb-2">Resumo da Rotina:</h4>
                <p className="text-sm text-muted-foreground">
                  <strong>{routineName}</strong> será executada {selectedDays.length === 7 ? "todos os dias" : `nos dias: ${selectedDays.map(d => daysOfWeek.find(day => day.id === d)?.label).join(", ")}`} 
                  {timeSlots.length > 0 && (
                    <>
                      {timeSlots.map((slot, index) => (
                        <span key={slot.id}>
                          {index > 0 && " e "}das <strong>{slot.startTime}</strong> às <strong>{slot.endTime}</strong>
                        </span>
                      ))}
                    </>
                  )}
                  {action === "turn_off" && ", desligando"} 
                  {action === "turn_on" && ", ligando"}
                  {action === "set_temp" && ", ajustando a temperatura de"}
                  {selectedEnvironments.length > 0 && <strong> {selectedEnvironments.length} ambiente(s)</strong>}
                  {selectedEquipments.length > 0 && <strong> {selectedEquipments.length} equipamento(s)</strong>}.
                  {temperatureRules.length > 0 && (
                    <span> Configuração de temperatura: {temperatureRules.length} regra(s) definida(s).</span>
                  )}
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="flex justify-end gap-3">
          <Button variant="outline">Cancelar</Button>
          <Button 
            variant="control" 
            disabled={!routineName || selectedDays.length === 0 || (selectedEquipments.length === 0 && selectedEnvironments.length === 0)}
          >
            Criar Rotina
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TimeRoutineDialog;