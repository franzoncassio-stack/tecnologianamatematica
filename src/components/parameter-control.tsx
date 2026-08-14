interface ParameterControlProps {
  label: string;
  name: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
}

export function ParameterControl({ label, name, value, min, max, step, onChange }: ParameterControlProps) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-2">
        <label className="text-slate-500 font-medium">{label}</label>
        <span className="text-brand-primary font-bold italic">
          {name} = {value.toFixed(1)}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="brand-range w-full"
      />
    </div>
  );
}
