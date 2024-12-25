import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface PlanSelectorProps {
  selectedPlan: string;
  setSelectedPlan: (plan: string) => void;
}

const PlanSelector: React.FC<PlanSelectorProps> = ({
  selectedPlan,
  setSelectedPlan,
}) => {
  return (
    <div className="mt-4">
      <h2 className="mb-2 text-lg font-medium">Choose Plan:</h2>
      <RadioGroup
        className="flex flex-wrap gap-4 justify-between"
        value={selectedPlan}
        onValueChange={setSelectedPlan}
      >
        <div className="flex flex-col items-center">
          <RadioGroupItem className="mb-2" value="Default" id="r1" />
          <Label htmlFor="r1">Default</Label>
        </div>
        <div className="flex flex-col items-center">
          <RadioGroupItem className="mb-2" value="Standard" id="r2" />
          <Label htmlFor="r2">Standard</Label>
        </div>
        <div className="flex flex-col items-center">
          <RadioGroupItem className="mb-2" value="Gold" id="r3" />
          <Label htmlFor="r3">Gold</Label>
        </div>
        <div className="flex flex-col items-center">
          <RadioGroupItem className="mb-2" value="Platinum" id="r4" />
          <Label htmlFor="r4">Platinum</Label>
        </div>
      </RadioGroup>
    </div>
  );
};

export default PlanSelector;
