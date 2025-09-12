import { useState } from "react";
import StatusCard from "@/components/dashboard/StatusCard";
import EquipmentCard from "@/components/dashboard/EquipmentCard";
import { mockEquipments, mockLocations, mockAlerts } from "@/data/mockData";
import { 
  Wind, 
  Zap, 
  Thermometer, 
  TrendingUp,
  AlertTriangle,
  MapPin
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const [equipments, setEquipments] = useState(mockEquipments);
  const { toast } = useToast();

  const totalEquipments = equipments.length;
  const activeEquipments = equipments.filter(eq => eq.isOn).length;
  const totalConsumption = equipments.reduce((sum, eq) => sum + eq.energyConsumption, 0);
  const avgEfficiency = Math.round(
    equipments.reduce((sum, eq) => sum + eq.efficiency, 0) / equipments.length
  );
  const avgTemp = Math.round(
    equipments.filter(eq => eq.isOn).reduce((sum, eq) => sum + eq.currentTemp, 0) / 
    activeEquipments || 0
  );

  const handleToggleEquipment = (id: string) => {
    setEquipments(prev => prev.map(eq => {
      if (eq.id === id) {
        const newState = !eq.isOn;
        toast({
          title: newState ? "Equipamento Ligado" : "Equipamento Desligado",
          description: `${eq.name} foi ${newState ? "ligado" : "desligado"} com sucesso.`,
        });
        return { 
          ...eq, 
          isOn: newState,
          energyConsumption: newState ? (eq.capacity * 0.8) : 0
        };
      }
      return eq;
    }));
  };

  const handleControlEquipment = (id: string) => {
    const equipment = equipments.find(eq => eq.id === id);
    toast({
      title: "Controle Remoto",
      description: `Abrindo controle para ${equipment?.name}`,
    });
  };

  return (
    <div className="p-6 space-y-6 bg-gradient-dashboard min-h-screen">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Visão geral do sistema de climatização
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Última atualização</p>
          <p className="text-sm font-medium">{new Date().toLocaleString()}</p>
        </div>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatusCard
          title="Equipamentos Ativos"
          value={`${activeEquipments}/${totalEquipments}`}
          description="Equipamentos em operação"
          icon={Wind}
          variant="cooling"
        />
        <StatusCard
          title="Consumo Total"
          value={`${(totalConsumption / 1000).toFixed(1)}kW`}
          description="Consumo energético atual"
          icon={Zap}
          variant="energy"
        />
        <StatusCard
          title="Temperatura Média"
          value={`${avgTemp}°C`}
          description="Média dos ambientes ativos"
          icon={Thermometer}
          variant="cooling"
        />
        <StatusCard
          title="Eficiência Média"
          value={`${avgEfficiency}%`}
          description="Performance do sistema"
          icon={TrendingUp}
          variant="energy"
        />
        <StatusCard
          title="Alertas Ativos"
          value={mockAlerts.length}
          description="Requer atenção"
          icon={AlertTriangle}
          variant="heating"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Equipment Overview */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-semibold">Equipamentos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {equipments.map((equipment) => (
              <EquipmentCard
                key={equipment.id}
                equipment={equipment}
                onToggle={handleToggleEquipment}
                onControl={handleControlEquipment}
              />
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Locations Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Locais
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockLocations.map((location) => (
                <div key={location.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <p className="font-medium">{location.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {location.activeEquipment}/{location.equipmentCount} ativos
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{location.avgTemp}°C</p>
                    <p className="text-xs text-muted-foreground">
                      {(location.totalConsumption / 1000).toFixed(1)}kW
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Alerts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Alertas Recentes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockAlerts.map((alert) => (
                <div key={alert.id} className="space-y-2">
                  <div className="flex items-start gap-2">
                    <Badge variant={
                      alert.type === "critical" ? "destructive" : 
                      alert.type === "warning" ? "secondary" : "outline"
                    }>
                      {alert.type}
                    </Badge>
                    <div className="flex-1">
                      <p className="text-sm">{alert.message}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(alert.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;