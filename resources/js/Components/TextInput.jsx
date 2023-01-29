import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function TextInput(
    { type = 'text', name, id, value, placeHolder, className, autoComplete, required, isFocused, handleChange },
    ref
) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <div className="flex flex-col items-start">
            <input
                type={type}
                name={name}
                id={id}
                value={value}
                placeholder={placeHolder}
                className={
                    `border-gray-300 focus:border-pinif-2 focus:ring-pinif-2 rounded-md shadow-sm ` +
                    className
                }
                ref={input}
                autoComplete={autoComplete}
                required={required}
                onChange={(e) => handleChange(e)}
            />
        </div>
    );
});
