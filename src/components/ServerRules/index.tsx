import "./style.scss";

import { useState } from "react";
import { useAPI } from "../../hooks/useAPI";
import { Spinner } from "../Spinner";
import { Information } from "../Information";
import { Link } from "react-router-dom";

type RulesDefinitions = {
  title: string;
  description: string;

  rules: Array<  {
    title: string;
    description: string;
  }>
}

export function ServerRules({ onAccept }: { onAccept: React.MouseEventHandler<HTMLButtonElement> }) {
  const { GET } = useAPI();
  const [ error, setError ] = useState(false);
  const [ definitions, setDefinitions ] = useState<RulesDefinitions>();

  if (!definitions) {
    GET('/public/rules.json')
      .then(response => response.json())
      .then(setDefinitions)
      .catch(() => setError(true));
  }

  if (error) {
    return (
      <div className="server-rules server-rules--error">
        <Information
          type="error"
          title="Ooops"
          message="Was not possible to obtain information about the server"
        />
      </div>
    )
  }

  if (!definitions) {
    return (
      <div className="server-rules server-rules--loading">
        <Spinner size="sm"/>
      </div>
    );
  }

  return (
    <div className="server-rules">
      <h2>{definitions.title}</h2>
      <p>{definitions.description}</p>

      <ol>
        {definitions.rules.map((rule, i: number) => (
          <li key={btoa(i+rule.title.substring(0, 5))}>
            <p><strong>{rule.title}</strong></p>
            <p>{rule.description}</p>
          </li>
        ))}
      </ol>

      <button
        onClick={onAccept}
        className="button-primary button--blocked"
      >
        Accept
      </button>

      <Link to="/">
        <button className="button--blocked">
          Back
        </button>
      </Link>
    </div>
  )
}