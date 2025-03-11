import { useState } from "react";
import ComponentCard from "../../common/ComponentCard";
import Label from "../Label";
import Select from "../Select";
import MultiSelect from "../MultiSelect";

export default function SelectInputs() {
  const options = [
    { value: "pre_natal", label: "Pré-natal" },
    { value: "consulta_geral", label: "Consulta Geral" },
    { value: "consulta_odontologica", label: "Consulta Odontológica" },
    { value: "emergencia", label: "Emergência" },
    { value: "consulta_especializada", label: "Consulta Especializada" },
    { value: "psiquiatria", label: "Psiquiatria" },
    { value: "fisioterapia", label: "Fisioterapia" },
  ];
  
  const handleSelectChange = (value: string) => {
    console.log("Selected value:", value);
  };
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const multiOptions = [
    { value: "pre_natal", text: "Pré-natal", selected: false },
    { value: "consulta_geral", text: "Consulta Geral", selected: false },
    { value: "consulta_odontologica", text: "Consulta Odontológica", selected: false },
    { value: "emergencia", text: "Emergência", selected: false },
    { value: "consulta_especializada", text: "Consulta Especializada", selected: false },
    { value: "psiquiatria", text: "Psiquiatria", selected: false },
    { value: "fisioterapia", text: "Fisioterapia", selected: false },
    { value: "dermatologia", text: "Dermatologia", selected: false },
    { value: "oftalmologia", text: "Oftalmologia", selected: false },
    { value: "nutricao", text: "Nutrição", selected: false },
  ];
  
  return (
    <ComponentCard title="Tipo de consulta" desc="Informacoes medica">
      <div className="space-y-6">
        <div>
          <Label>Consulta</Label>
          <Select
            options={options}
            placeholder="Selecionar"
            onChange={handleSelectChange}
            className="dark:bg-dark-900"
          />
        </div>
        <div>
          <MultiSelect
            label="Multiplas consultas"
            options={multiOptions}
            defaultSelected={["nutricao", "emergencia"]}
            onChange={(values) => setSelectedValues(values)}
          />
          <p className="sr-only">
            Selected Values: {selectedValues.join(", ")}
          </p>
        </div>
      </div>
    </ComponentCard>
  );
}
