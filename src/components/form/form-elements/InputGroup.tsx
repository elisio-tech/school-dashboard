import ComponentCard from "../../common/ComponentCard";
import Label from "../Label";
import Input from "../input/InputField";
import { Message } from "iconsax-react";
import PhoneInput from "../group-input/PhoneInput";
import { useTheme } from "../../../context/ThemeContext";

export default function InputGroup() {
  const { theme } = useTheme()
  const countries = [
    { code: "Ang", label: "+244" },
  ];
  const handlePhoneNumberChange = (phoneNumber: string) => {
    console.log("Updated phone number:", phoneNumber);
  };
  return (
    <ComponentCard title="Contacto" desc="Informacoes de contacto">
      <div className="space-y-6">
        <div>
          <Label>Email</Label>
          <div className="relative">
            <Input
              placeholder="info@gmail.com"
              type="text"
              className="pl-[62px]"
            />
            <span className="absolute left-0 top-1/2 -translate-y-1/2 border-r border-gray-200 px-3.5 py-3 text-gray-500 dark:border-gray-800 dark:text-gray-400">
              <Message size={20} color={theme === "dark" ? "#fff" : "#102818" } variant="Bold"/>
            </span>
          </div>
        </div>
        <div>
          <Label>Telefone</Label>
          <PhoneInput
            selectPosition="start"
            countries={countries}
            placeholder="+244 999 999 999"
            onChange={handlePhoneNumberChange}
          />
        </div>
      </div>
    </ComponentCard>
  );
}
