interface LoadingSpinnerProps {
  label: string;
  size?: number;
  color?: string;
  borderWidth?: number;
  className?: string;
}

export default function LoadingSpinner({
  label,
  size = 24,
  color = "white",
  borderWidth = 2,
  className = "",
}: LoadingSpinnerProps) {
  return (
    <div
      className={`inline-block animate-spin ${className}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: "50%",
        borderTop: `${borderWidth}px solid ${color}`,
        borderRight: `${borderWidth}px solid transparent`,
        borderBottom: `${borderWidth}px solid ${color}`,
        borderLeft: `${borderWidth}px solid transparent`,
      }}
      role="status"
      aria-label={label}
    />
  );
}
