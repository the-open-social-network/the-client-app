import "./style.scss";

type SpinnerProps = {
  size?: "sm"|"lg"|"xl";
  color?: string;
}

export function Spinner({ size, color }: SpinnerProps) {
  return (
    <span
      role="alert"
      style={{ color }}
      aria-busy="true"
      className={`spinner ${size || ""}`}
    ></span>
  )
}