import "./style.scss";
import { Modal } from "../../../Modal";
import IconArrowLeft from "../../../Icons/IconArrowLeft";

type ModerationProps = {
  open: boolean;
  onClose: Function;
}

export function Moderation({ open, onClose }: ModerationProps) {
  return (
    <Modal
      open={open}
      lightbox={true}
      dropOnBody={true}
      onClose={onClose}
      noHeaderCloseBtn
      title={(
        <>
          <button
            onClick={() => onClose()}
            className="button-primary button-brick button--small"
          >
            <IconArrowLeft />
          </button>

          Moderate Post
        </>
      )}
    >
      <div className="post-moderation">
        <form>
          <div className="field">
            <label htmlFor="content-warning">Sensitive Content</label>
          
            <select name="sensitive" autoFocus>
              <option value="test-c">This is not a sensitive content</option>
              <option value="anyone">Sexually explicit</option>
              <option value="test-b">Animal Abuse</option>
              <option value="test-c">Intimidation or violence </option>
              <option value="test-c">Brutality and Gore</option>
              <option value="test-c">Potential trigger of discomfort</option>
              <option value="test-c">Mark as sensitive for other reasons</option>
            </select>
          </div>
          
          <div className="field">
            <label htmlFor="visibility">Visibility</label>
          
            <select name="visibility" autoFocus>
              <option value="anyone">Anyone can see</option>
              <option value="test-b">Only followers</option>
              <option value="test-c">Only followees</option>
              <option value="test-d">Only followers and followees</option>
              <option value="test-d">Only people I dont follow</option>
              <option value="test-d">Only people that don't follow me</option>
              <option value="test-d">People I don't follow and that don't follow me</option>
              <option value="test-d">People I don't follow or that don't follow me</option>
              <option value="test-e">Only for me</option>
              <option value="test-e">Specify</option>
            </select>
          </div>
          
          <div className="field">
            <label htmlFor="replies">Replies</label>
          
            <select name="replies" autoFocus>
              <option value="anyone">Anyone can reply</option>
              <option value="test-b">Only followers</option>
              <option value="test-c">Only followees</option>
              <option value="test-d">Only followers and followees</option>
              <option value="test-d">Only people I dont follow</option>
              <option value="test-d">Only people that don't follow me</option>
              <option value="test-d">People I don't follow and that don't follow me</option>
              <option value="test-d">People I don't follow or don't follow me</option>
              <option value="test-e">Only me</option>
              <option value="test-e">Specify</option>
            </select>
          </div>

          <div className="field">
            <label htmlFor="content-warning">Promotion</label>
          
            <select name="content-warning" autoFocus>
              <option value="test-c">This is not a promotional content</option>              
              <option value="test-c">This is a promotional content</option>
            </select>
          </div>

          <div className="field">
            <label htmlFor="content-warning">Creative Commons</label>
          
            <select name="content-warning" autoFocus>
              <option value="test-c">Do not add CC</option>
              <option value="test-c">CC BY</option>
              <option value="test-c">CC BY-SA</option>
              <option value="test-c">CC BY-NC</option>
              <option value="test-c">CC BY-NC-SA</option>
              <option value="test-c">CC BY-ND</option>
              <option value="test-c">CC BY-NC-ND</option>
              <option value="test-c">CC Zero - Public Domain</option>
            </select>
          </div>
        </form>
      </div>
    </Modal>
  );
}