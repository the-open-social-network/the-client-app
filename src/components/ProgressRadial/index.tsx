import './style.scss';

export function ProgressRadial({ value = 0, size = 18, trackColor = '#ccc', color = '#000' }) {
  const MAX = -219.99078369140625;

  function progressValue(v: number) {
    return ((100 - value) / 100) * MAX;
  }

  return (
    <svg
      x="0px"
      y="0px"
      viewBox="0 0 80 80"
      data-progress={value}
      style={{ width: size }}
      className="progress-radial"
    >
      <path
        className="track"
        stroke={trackColor}
        d="M5,40a35,35 0 1,0 70,0a35,35 0 1,0 -70,0"
      />

      <path
        className="fill"
        stroke={color}
        strokeDasharray={String(MAX * -1)}
        strokeDashoffset={progressValue(value)}
        d="M5,40a35,35 0 1,0 70,0a35,35 0 1,0 -70,0"
      />
    </svg>
  );
}