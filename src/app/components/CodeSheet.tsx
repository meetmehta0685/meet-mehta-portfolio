export default function CodeSheet({ source, className }: { source: string; className?: string }) {
  return (
    <pre className={className ? `code-sheet ${className}` : "code-sheet"}>
      <code>
        {source.split("\n").map((text, i) => (
          <span key={i} className={text.trimStart().startsWith("//") ? "code-comment" : undefined}>
            {text}
            {"\n"}
          </span>
        ))}
      </code>
    </pre>
  );
}
