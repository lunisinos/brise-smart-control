import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const equipmentSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  location: z.string().min(1, "Localização é obrigatória"),
  model: z.string().min(1, "Modelo é obrigatório"),
  capacity: z.string().min(1, "Capacidade é obrigatória"),
  integration: z.enum(["BRISE", "SMART"], {
    required_error: "Selecione o tipo de integração",
  }),
});

type EquipmentFormData = z.infer<typeof equipmentSchema>;

interface AddEquipmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddEquipmentDialog({ open, onOpenChange }: AddEquipmentDialogProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<EquipmentFormData>({
    resolver: zodResolver(equipmentSchema),
    defaultValues: {
      name: "",
      location: "",
      model: "",
      capacity: "",
      integration: undefined,
    },
  });

  const onSubmit = async (data: EquipmentFormData) => {
    setIsLoading(true);
    
    try {
      // Simular criação do equipamento
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log("Novo equipamento:", {
        ...data,
        capacity: parseInt(data.capacity),
        id: Math.random().toString(36).substr(2, 9),
        isOn: false,
        currentTemp: 25,
        targetTemp: 22,
        mode: "cool",
        energyConsumption: 0,
        efficiency: 85,
      });

      toast({
        title: "Equipamento adicionado com sucesso!",
        description: `${data.name} foi adicionado à sua lista de equipamentos.`,
      });

      form.reset();
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Erro ao adicionar equipamento",
        description: "Tente novamente em alguns instantes.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Adicionar Novo Equipamento</DialogTitle>
          <DialogDescription>
            Preencha as informações do equipamento de climatização que deseja adicionar.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome do Equipamento</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Sala de Reuniões A" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Localização</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Térreo - Ala Norte" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="model"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Modelo</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Samsung AR12345" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="capacity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Capacidade (BTU/h)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="Ex: 12000" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="integration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de Integração</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="SMART">SMART</SelectItem>
                      <SelectItem value="BRISE">BRISE</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isLoading}
              >
                Cancelar
              </Button>
              <Button type="submit" variant="cooling" disabled={isLoading}>
                {isLoading ? "Adicionando..." : "Adicionar Equipamento"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}