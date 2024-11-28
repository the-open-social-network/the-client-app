import "./style.scss";

export function Dashboard({
  right,
  children,
  left,
}: Readonly<{
  right?: React.ReactNode;
  children?: React.ReactNode;
  left?: React.ReactNode;
}>) {

  return (
    <main className="dashboard">
      <div className="dashboard__container">
        <div className='dashboard__left'>
          {right}
        </div>

        <div className='dashboard__center'>
          {children}
        </div>

        <div className='dashboard__right'>
          {left}
        </div>
      </div>
    </main>
  );
}