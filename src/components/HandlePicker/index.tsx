import "./style.scss";
import { useEffect, useState } from "react";
import { isValidHandle, normalizeHandle } from "../../toolbox/string-utils";
import { useAPI } from "../../hooks/useAPI";
import { useAuth } from "../../hooks/useAuth";

type HandlePickerProps = {
  disabled?: boolean;
  defaultValue?: string;
  onChangeValidity?: Function;
};

export const HANDLEPICKERSTATES = {
  EMPTY: "EMPTY",
  ERROR: "ERROR",
  VALID: "VALID",
  EXISTS: "EXISTS",
  CURRENT: "CURRENT",
  INVALID: "INVALID",
  LOADING: "LOADING",
};

export const HANDLEPICKERFEEDBACK: Record<string|symbol, string> = {
  EMPTY: "Choose your handle",
  ERROR: "Error while validating this handle :(",
  VALID: "This handle is available!",
  EXISTS: "This handle is not available",
  CURRENT: "This is your current handle",
  INVALID: "Invalid handle!",
  LOADING: "...",
}

export function HandlePicker({ disabled, defaultValue, onChangeValidity }: HandlePickerProps) {
  const { GET } = useAPI();
  const { me } = useAuth();  

  const [pickerState, setPickerState] = useState<string>(
    defaultValue === me.handle
      ? HANDLEPICKERSTATES.CURRENT
      : HANDLEPICKERSTATES.EMPTY
  );

  const handleFocus = (event: React.FormEvent<HTMLInputElement>) => {
    const input = event.target as HTMLInputElement;

    if (input.value.replace(/[^a-z0-9-_]/gi, '') === "") {
      input.setSelectionRange(2, 2);
    }
  }

  const handleInput = (event: React.FormEvent<HTMLInputElement>) => {
    setPickerState(HANDLEPICKERSTATES.LOADING);
    const input = event.target as HTMLInputElement;

    let v = input.value.replace(/[^a-z0-9-_]/gi, '');
    const hasInvalidChars = v !== input.value.substring(1);
    const selectionRecoil =  hasInvalidChars ? 1 : 0;
    const { selectionStart, selectionEnd } = input;
    const newSelectionStart = Number(selectionStart) < 2 ? 2 : selectionStart;
    const newSelectionEnd = selectionEnd ? (selectionEnd - selectionRecoil) || 2 : 1;

    input.value = `@${v}`.toLowerCase();
    input.setSelectionRange(newSelectionStart, newSelectionEnd);
    clearTimeout((input as any).__debounce);

    Object.assign(input, {
      __debounce: setTimeout(() => {
        const normalized = normalizeHandle(input.value);

        if (!input.value || input.value.trim() === '@' || !normalized) {
          setPickerState(HANDLEPICKERSTATES.EMPTY);
          return;
        }

        if (normalized === me.handle) {
          setPickerState(HANDLEPICKERSTATES.CURRENT);
          return;
        }

        if (!isValidHandle(input.value)) {
          setPickerState(HANDLEPICKERSTATES.INVALID);
          return;
        }

        GET('/handle/check', { handle: normalized })
          .then(response => response.json())
          .then(result => {
            if (result.checkedhandle !== normalized) {
              setPickerState(HANDLEPICKERSTATES.ERROR);
            }

            setPickerState(result.available
              ? HANDLEPICKERSTATES.VALID
              : HANDLEPICKERSTATES.EXISTS
            );
          })
          .catch(() => setPickerState(HANDLEPICKERSTATES.ERROR));
      }, 400)
    });
  }

  useEffect(() => {
    onChangeValidity && onChangeValidity(pickerState);
  }, [pickerState]);

  return (
    <div className="handle-picker">
      <div className="field">
        <label htmlFor="name">
          Your @handle
        </label>

        <input
          type="text"
          name="handle"
          maxLength={51}
          autoComplete="off"
          disabled={disabled}
          onInput={handleInput}
          onFocus={handleFocus}
          defaultValue={'@'+(defaultValue || '')}
        />

        <p data-picker-state={pickerState?.toLowerCase()}>
          {HANDLEPICKERFEEDBACK[pickerState]}
        </p>
      </div>
    </div>
  )
}