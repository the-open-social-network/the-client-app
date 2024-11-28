import "./style.scss";
import { useEffect, useRef, useState } from "react";

export function TextArea(props: React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>) {
  const textAreaRef = useRef(null);
  const [count, setCount] = useState(0);

  const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const $textarea = e.target as HTMLTextAreaElement;
    setCount($textarea?.value?.length || 0);
  }

  useEffect(() => {
    const { current } = textAreaRef

    if (current) {
      const $textarea = current as HTMLTextAreaElement;
      setCount($textarea.value.length);
    }
  }, []);

  return (
    <>
      <textarea
        {...props}
        ref={textAreaRef}
        className="app-custom-textarea"

        onInput={e => {
          handleInput(e);

          if (props.onInput) {
            return props.onInput(e);
          }
        }}
      />

      {props.maxLength && (
        <div className="app-custom-textarea textarea-count">
          <p>{count}/{props.maxLength}</p>
        </div>
      )}
    </>
  );
}