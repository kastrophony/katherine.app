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
  return () => <link rel="icon" href="https://fav.farm/🏳️‍⚧️" />;
}
