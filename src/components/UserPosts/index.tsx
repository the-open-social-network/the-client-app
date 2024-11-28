import { Post } from "../Post";
import "./style.scss";

export function UserPosts() {
  return (
    <Post 
      quote={<Post noActions={true}/>}
    />
  )
}