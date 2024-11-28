import "./style.scss";
import { useEffect, useState } from "react"
import { Snippet } from "./Snippet";
import { Spinner } from "../Spinner";
import { useAPI } from "../../hooks/useAPI";
import { useAuth } from "../../hooks/useAuth";

type DomainInputProps = {
  toggle?: string;
  disabled?: boolean;
  autoFocus?: boolean;
  defaultValue?: string;
  submitButton?: boolean;
}

type DomainConfig = {
  host: string;
  value: string;
}

export function DomainInput({ defaultValue, toggle, autoFocus, submitButton, disabled }: DomainInputProps) {
  const { GET } = useAPI();
  const { me } = useAuth();
  const [ domain, setDomain ] = useState(me.domain);
  const [ loading, setLoading ] = useState(true);
  const [ visible, setVisible ] = useState(!toggle);
  const [ config, setConfig ] = useState<DomainConfig|null>(null);
  const [ unexpectedError, setUnexpectedError ] = useState(false);

  useEffect(() => {
    if (visible && !config) {
      GET('/domain/config')
        .then(response => response.json())
        .then(setConfig)
        .catch(() => setUnexpectedError(true))
        .finally(() => setLoading(false));
    }
  }, [ visible ]);

  useEffect(() => {
    try {
      const { hostname } = new URL(domain);

      if (hostname) {
        setDomain(hostname);
      }
    } catch {
      // silence is golden
    }
  }, [domain])

  return (
    <div className="domain-input">
      {toggle && (
        <div className="field switch">
          <label>
            <input
              value="true"
              type="checkbox"
              data-toggler="true"
              defaultChecked={false}
              name="configuredomain"
              disabled={disabled}
              defaultValue={defaultValue}
              onChange={e => setVisible(e.target.checked)}
            />
            {toggle}
          </label>
        </div>        
      )}

      {visible && (
        <>
          {loading ? (
            <div className="domain-input__loading">
              <Spinner size="sm" />
            </div>
          ) : (
            <div className="domain-input__content">
              <div className="field">
                <label htmlFor="name">
                  Your domain
                </label>

                <input
                  type="text"
                  name="domain"
                  placeholder="example.com"
                  value={domain}
                  disabled={disabled}
                  autoFocus={autoFocus || !!toggle}
                  onInput={e => setDomain((e.target as HTMLInputElement).value)}
                />
              </div>

              {submitButton && (
                <div className="field">
                  <button className="button-primary button--blocked">
                    Set as my domain
                  </button>
                </div>
              )}

              <p>
                Please, add this DNS record to your domain. Do not
                share this information:
              </p>

              {unexpectedError || !config?.host || !config.value ? (
                <p>An unexpected error ocurred. Please, try again in a few minutes...</p>
              ) : (
                <Snippet host={config?.host || ""} value={config?.value || ""} />
              )}

              <p>
                Alternativelly you can create a route on your server or upload a text file to:
              </p>

              <div className="field">
                <input type="text" value={`https://${domain}/.well-known/${config?.host}`} readOnly />
              </div>

              <p>With the following content:</p>

              <div className="field">
                <input type="text" value={config?.value} readOnly />
              </div>
            </div>
          )}
        </>
      )}
    </div>

  )
}