export default function Checkbox({ name, value, handleChange }) {
    return (
        <input
            type="checkbox"
            name={name}
            value={value}
            className="rounded border-gray-300 text-pinif-2 shadow-sm focus:ring-pinif-1"
            onChange={(e) => handleChange(e)}
        />
    );
}
