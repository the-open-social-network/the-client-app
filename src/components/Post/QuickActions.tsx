import IconComment from "../Icons/IconComment";
import IconDot3x from "../Icons/IconDot3x";
import IconHeart from "../Icons/IconHeart";
import IconRepost from "../Icons/IconRepost";

export function QuickActions() {
  return (
    <div className="post__actions">
      <ul>
        <li>
          <button className='button-brick button-seamless button--small'>
            <IconComment />
          </button>
        </li>
        <li>
          <button className='button-brick button-seamless button--small'>
            <IconRepost />
          </button>  
        </li>
        <li>
          <button className='button-brick button-seamless button--small'>
            <IconHeart />
          </button>  
        </li>
        <li>
          <button className='button-brick button-seamless button--small'>
            <IconDot3x />
          </button>
        </li>
      </ul>
    </div>
  )
}