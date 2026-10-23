import { Document } from "./document.tsx";

const pronouns = "she/her";

export function PronounsPage() {
  return () => (
    <Document title={pronouns} head={<Head />}>
      <h1>{pronouns}</h1>
    </Document>
  );
}

function Head() {
  return () => <link rel="icon" type="image/png" sizes="32x32" href="/transflag-32x32.png" />;
}
