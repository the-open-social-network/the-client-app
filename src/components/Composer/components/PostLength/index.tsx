import { ProgressRadial } from '../../../ProgressRadial';
import './style.scss';

export function PostLength({ value = 0, max = 0 }) {
  const RED = '#e74c3c';
  const remaining = max - value;

  function getProgressColor(v: number) {
    if (v >= 250) {
      return RED;
    }

    return '#000';
  }

  function getPercentage(v: number) {
    return (v / max) * 100;
  }

  function getProgressVal(v: number) {
    if (remaining < 0) {
      return 100;
    }

    return getPercentage(v);
  }

  return (
    <div className="post-length">
      <p style={{ color: remaining < 0 ? RED : '#444' }}>
        {remaining}
      </p>
      
      <ProgressRadial
        size={20}
        value={getProgressVal(value)}
        color={getProgressColor(value)}
      />
    </div>
  );
}