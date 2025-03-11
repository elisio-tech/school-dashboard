import ComponentCard from "../../common/ComponentCard";
import Label from "../Label";
import Input from "../input/InputField";
import Select from "../Select";

export default function DefaultInputs() {
  const options = [
    { value: "Masculino", label: "Masculino" },
    { value: "Femenino", label: "Femenino" },
  ];
  const handleSelectChange = (value: string) => {
    console.log("Selected value:", value);
  };

  return (
    <ComponentCard title="Agendar consulta" desc="Informacoes pessoais">
      <div className="space-y-6">
        <div>
          <Label htmlFor="input">Nome</Label>
          <Input type="text" id="input" />
        </div>

        <div>
          <Label htmlFor="input">Endereco</Label>
          <Input type="text" id="input" />
        </div>

        <div>
          <Label htmlFor="input">Idade</Label>
          <Input type="text" id="input" />
        </div>

        <div>
          <Label>Genero</Label>
          <Select
            options={options}
            placeholder="Selecionar opcao"
            onChange={handleSelectChange}
            className="dark:bg-dark-900"
          />
        </div>
      </div>
    </ComponentCard>
  );
}
