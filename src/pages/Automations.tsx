import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Clock, Thermometer, Users, Calendar, Settings2 } from "lucide-react";

const Automations = () => {
  const automations = [
    {
      id: 1,
      name: "Economia Noturna",
      description: "Desliga ar-condicionado das 22h às 6h nos finais de semana",
      status: "active",
      trigger: "Horário",
      action: "Desligar equipamentos",
      lastRun: "2 horas atrás",
      icon: Clock
    },
    {
      id: 2,
      name: "Controle de Temperatura",
      description: "Ajusta temperatura baseado na ocupação do ambiente",
      status: "active",
      trigger: "Sensor de presença",
      action: "Ajustar setpoint",
      lastRun: "30 min atrás",
      icon: Thermometer
    },
    {
      id: 3,
      name: "Agenda Corporativa",
      description: "Liga climatização 30min antes de reuniões agendadas",
      status: "inactive",
      trigger: "Calendário",
      action: "Pré-climatizar",
      lastRun: "Nunca executado",
      icon: Calendar
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-cooling bg-clip-text text-transparent">
            Automações
          </h1>
          <p className="text-muted-foreground">
            Crie e gerencie automações inteligentes para seus equipamentos
          </p>
        </div>
        <Button variant="control" className="gap-2">
          <Plus className="h-4 w-4" />
          Nova Automação
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <Card className="border-dashed border-2 border-muted hover:border-primary/50 transition-colors cursor-pointer">
          <CardContent className="flex flex-col items-center justify-center h-32 space-y-2">
            <Plus className="h-8 w-8 text-muted-foreground" />
            <p className="text-sm font-medium">Criar Nova Automação</p>
          </CardContent>
        </Card>

        <Card className="border-energy-efficient/20 bg-gradient-to-br from-energy-efficient/5 to-transparent">
          <CardContent className="flex flex-col items-center justify-center h-32 space-y-2">
            <Clock className="h-8 w-8 text-energy-efficient" />
            <p className="text-sm font-medium">Rotina por Horário</p>
          </CardContent>
        </Card>

        <Card className="border-cooling/20 bg-gradient-to-br from-cooling/5 to-transparent">
          <CardContent className="flex flex-col items-center justify-center h-32 space-y-2">
            <Users className="h-8 w-8 text-cooling" />
            <p className="text-sm font-medium">Baseada em Ocupação</p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Automações Configuradas</h2>
          <div className="flex gap-2">
            <Badge variant="secondary" className="bg-energy-efficient/10 text-energy-efficient">
              3 Ativas
            </Badge>
            <Badge variant="outline">1 Inativa</Badge>
          </div>
        </div>

        <div className="grid gap-4">
          {automations.map((automation) => {
            const IconComponent = automation.icon;
            return (
              <Card key={automation.id} className="hover:shadow-elevated transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-gradient-cooling/10">
                        <IconComponent className="h-5 w-5 text-cooling" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{automation.name}</CardTitle>
                        <CardDescription>{automation.description}</CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant={automation.status === "active" ? "default" : "secondary"}
                        className={automation.status === "active" 
                          ? "bg-energy-efficient text-white" 
                          : ""
                        }
                      >
                        {automation.status === "active" ? "Ativa" : "Inativa"}
                      </Badge>
                      <Button variant="ghost" size="icon">
                        <Settings2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Gatilho</p>
                      <p className="font-medium">{automation.trigger}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Ação</p>
                      <p className="font-medium">{automation.action}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Última execução</p>
                      <p className="font-medium">{automation.lastRun}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Automations;