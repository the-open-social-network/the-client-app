export function Snippet({ host, value }: { host: string; value: string }) {
  return (
<pre>
  <code>
{`Type:
TXT

Host or Name:
${host}

Value:
${value}`}
  </code>
</pre>    
  );
}