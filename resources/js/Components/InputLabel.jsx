export default function InputLabel({ forInput, value, className, children }) {
    return (
        <label htmlFor={forInput} className={`block text-sm font-semibold text-pinif-1 ` + className}>
            {value ? value : children}
        </label>
    );
}
