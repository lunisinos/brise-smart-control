import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { mockEquipments } from "@/data/mockData";
import { Search, Filter, Plus, Settings, Power } from "lucide-react";

const Equipments = () => {
  const [equipments] = useState(mockEquipments);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredEquipments = equipments.filter(
    eq => 
      eq.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      eq.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (isOn: boolean) => (
    <Badge variant={isOn ? "default" : "secondary"} className="gap-1">
      <div className={`w-2 h-2 rounded-full ${isOn ? "bg-energy-efficient" : "bg-muted-foreground"}`} />
      {isOn ? "Ativo" : "Inativo"}
    </Badge>
  );

  const getIntegrationBadge = (integration: string) => (
    <Badge variant="outline" className={
      integration === "SMART" ? "border-cooling text-cooling" : "border-energy-efficient text-energy-efficient"
    }>
      {integration}
    </Badge>
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Equipamentos</h1>
          <p className="text-muted-foreground">
            Gerencie todos os equipamentos de climatização
          </p>
        </div>
        <Button variant="cooling" className="gap-2">
          <Plus className="h-4 w-4" />
          Adicionar Equipamento
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar equipamentos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          Filtros
        </Button>
      </div>

      {/* Equipment List */}
      <div className="grid gap-4">
        {filteredEquipments.map((equipment) => (
          <Card key={equipment.id} className="hover:shadow-elevated transition-all duration-300">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">{equipment.name}</CardTitle>
                  <p className="text-muted-foreground">{equipment.location}</p>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusBadge(equipment.isOn)}
                  {getIntegrationBadge(equipment.integration)}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Modelo</p>
                  <p className="font-medium">{equipment.model}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Capacidade</p>
                  <p className="font-medium">{equipment.capacity.toLocaleString()} BTU/h</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Temperatura</p>
                  <p className="font-medium">{equipment.currentTemp}°C / {equipment.targetTemp}°C</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Consumo</p>
                  <p className="font-medium">{equipment.energyConsumption}W</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Eficiência</p>
                  <p className="font-medium">{equipment.efficiency}%</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Power className="h-3 w-3" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Settings className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Equipments;