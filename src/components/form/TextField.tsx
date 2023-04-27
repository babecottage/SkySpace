import { useDescription, useTsController } from "@ts-react/form";

export const TextField = () => {
  const {
    field: { onChange, value },
    error,
  } = useTsController<string>();

  const { label, placeholder } = useDescription();

  return (
    <div>
      <label>
        {label}
        <input
          className="border-solid border-gray-300 border py-2 px-4 w-full
      rounded text-gray-700"
          onChange={(e) => onChange(e.target.value)}
          value={value ? value : ""}
          placeholder={placeholder}
        />
      </label>
      {error && <span className="text-red-500">{error.errorMessage}</span>}
    </div>
  );
};
