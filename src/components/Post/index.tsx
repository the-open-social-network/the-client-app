import './style.scss';
import { Avatar } from '../Avatar';
import { QuickActions } from './QuickActions';

type PostProps = {
  quote?: React.ReactNode;
  noActions?: Boolean;
}

export function Post({ quote, noActions }: PostProps) {
  return (
    <div className="post">
      <header>
        <div className="post__author">
          <Avatar
            size={48}
            href="/profile"
            alt="User's avatar"
            src="https://placehold.co/400"
          />

          <div className="post__author__info">
            <div>
              <a href="/" className='author-name'>
                Author Cool Name
              </a>
            </div>

            <div>
              <a href="/" className='author-at'>
                @author.cool.name
              </a>
            </div>
          </div>

          <div>
            <a className='post-time' href="/">
              3m
            </a>
          </div>
        </div>
      </header>

      <div className="post__content">
        <p>In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available. Wikipedia</p>
      </div>

      {quote && (
        <div className="post__quote">
          {quote}
        </div>
      )}

      {!noActions && (
        <footer>
          <QuickActions />
        </footer>
      )}
    </div>
  );
}