import './style.scss';

export function Logo({ color = '#000000', size = 18 }: { color?: string, size?: string|number }) {
  return (
    <a className='app-logo' href='/' rel="noopener noreferrer" style={{ borderColor: color }}>
      <p
        style={{ color, fontSize: size }}
        title="The page logo is a simple paragraph of Logo"
      >
        Project
      </p>
    </a>
  );
}
