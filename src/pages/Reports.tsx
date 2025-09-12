import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, Download, Calendar, TrendingUp, Zap, Thermometer } from "lucide-react";

const Reports = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Relatórios</h1>
          <p className="text-muted-foreground">
            Análises e insights do sistema de climatização
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Calendar className="h-4 w-4" />
            Período
          </Button>
          <Button variant="energy" className="gap-2">
            <Download className="h-4 w-4" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-energy-efficient/20 bg-gradient-to-br from-energy-efficient/10 to-transparent">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-energy-efficient">
              <Zap className="h-4 w-4" />
              Economia de Energia
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23.5%</div>
            <p className="text-sm text-muted-foreground">vs. mês anterior</p>
          </CardContent>
        </Card>

        <Card className="border-cooling/20 bg-gradient-to-br from-cooling-light/10 to-transparent">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-cooling">
              <Thermometer className="h-4 w-4" />
              Eficiência Média
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87.3%</div>
            <p className="text-sm text-muted-foreground">Últimos 30 dias</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Redução CO₂
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.2t</div>
            <p className="text-sm text-muted-foreground">Este mês</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Economia (R$)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 3.847</div>
            <p className="text-sm text-muted-foreground">Últimos 30 dias</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Placeholders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Consumo Energético</CardTitle>
          </CardHeader>
          <CardContent className="h-80 flex items-center justify-center bg-gradient-to-br from-muted/50 to-transparent rounded-lg">
            <div className="text-center">
              <BarChart3 className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
              <p className="text-muted-foreground">Gráfico de consumo por período</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Eficiência por Equipamento</CardTitle>
          </CardHeader>
          <CardContent className="h-80 flex items-center justify-center bg-gradient-to-br from-muted/50 to-transparent rounded-lg">
            <div className="text-center">
              <TrendingUp className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
              <p className="text-muted-foreground">Análise de performance</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Temperatura por Local</CardTitle>
          </CardHeader>
          <CardContent className="h-80 flex items-center justify-center bg-gradient-to-br from-muted/50 to-transparent rounded-lg">
            <div className="text-center">
              <Thermometer className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
              <p className="text-muted-foreground">Histórico de temperatura</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Padrões de Uso</CardTitle>
          </CardHeader>
          <CardContent className="h-80 flex items-center justify-center bg-gradient-to-br from-muted/50 to-transparent rounded-lg">
            <div className="text-center">
              <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
              <p className="text-muted-foreground">Análise de ocupação</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Reports;