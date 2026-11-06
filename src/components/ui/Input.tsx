import { forwardRef, useId, type InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  ringColor?: string;
  inputClassName?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    label,
    error,
    required,
    ringColor,
    className = "",
    inputClassName = "",
    id,
    ...rest
  },
  ref
) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const errorId = `${inputId}-error`;

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && (
        <label htmlFor={inputId} className="text-xs font-medium text-gray-600">
          {label}
          {required && (
            <span aria-hidden="true" className="ms-1 text-red-500">
              *
            </span>
          )}
        </label>
      )}
      <input
        ref={ref}
        id={inputId}
        required={required}
        aria-required={required || undefined}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={`border border-gray-200 focus:outline-none focus:ring-2 bg-white bg-opacity-80 ${inputClassName}`}
        style={
          ringColor
            ? ({ "--tw-ring-color": `${ringColor}80` } as React.CSSProperties)
            : undefined
        }
        {...rest}
      />
      {error && (
        <p id={errorId} className="text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  );
});

export default Input;
