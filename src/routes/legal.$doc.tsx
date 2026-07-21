import { createFileRoute, notFound } from "@tanstack/react-router";
import impressum from "../content/legal/impressum.md?raw";
import datenschutz from "../content/legal/datenschutz.md?raw";
import agb from "../content/legal/agb.md?raw";
import privacy from "../content/legal/privacy.md?raw";
import terms from "../content/legal/terms.md?raw";

const DOCS: Record<string, string> = { impressum, datenschutz, agb, privacy, terms };

export const Route = createFileRoute("/legal/$doc")({
  component: LegalPage,
  head: () => ({
    meta: [{ title: "Tunefield — Legal" }, { name: "robots", content: "noindex" }],
  }),
});

// Minimal, safe markdown → React (headings, blockquote, lists, bold, links, autolinks).
function renderInline(text: string, key: string) {
  const nodes: React.ReactNode[] = [];
  const re = /\*\*(.+?)\*\*|\[([^\]]+)\]\(([^)]+)\)|<((?:https?:\/\/|mailto:)[^>]+)>/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) nodes.push(text.slice(last, m.index));
    if (m[1]) nodes.push(<strong key={`${key}-b${i}`}>{m[1]}</strong>);
    else if (m[2]) nodes.push(<a key={`${key}-l${i}`} href={m[3]} className="text-teal underline break-words" target="_blank" rel="noreferrer">{m[2]}</a>);
    else if (m[4]) nodes.push(<a key={`${key}-a${i}`} href={m[4]} className="text-teal underline break-words" target="_blank" rel="noreferrer">{m[4]}</a>);
    last = re.lastIndex;
    i++;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

function Markdown({ src }: { src: string }) {
  const lines = src.split("\n");
  const out: React.ReactNode[] = [];
  let list: string[] = [];
  const flush = (k: string) => {
    if (list.length) {
      out.push(
        <ul key={`ul-${k}`} className="my-3 list-disc pl-6 space-y-1">
          {list.map((li, j) => <li key={j}>{renderInline(li, `${k}-${j}`)}</li>)}
        </ul>,
      );
      list = [];
    }
  };
  lines.forEach((raw, idx) => {
    const line = raw.trimEnd();
    const k = String(idx);
    if (line.startsWith("- ")) { list.push(line.slice(2)); return; }
    flush(k);
    if (!line.trim()) return;
    if (line.startsWith("### ")) out.push(<h3 key={k} className="mt-6 mb-2 font-display font-bold text-lg text-charcoal">{renderInline(line.slice(4), k)}</h3>);
    else if (line.startsWith("## ")) out.push(<h2 key={k} className="mt-8 mb-2 font-display font-bold text-2xl text-charcoal">{renderInline(line.slice(3), k)}</h2>);
    else if (line.startsWith("# ")) out.push(<h1 key={k} className="mb-4 font-display font-bold text-4xl tracking-tight text-charcoal">{renderInline(line.slice(2), k)}</h1>);
    else if (line.startsWith("> ")) out.push(<blockquote key={k} className="my-4 border-l-2 border-pink bg-cream-warm rounded-r-md px-4 py-3 text-sm text-charcoal/80">{renderInline(line.slice(2), k)}</blockquote>);
    else out.push(<p key={k} className="my-3 leading-relaxed text-charcoal/85">{renderInline(line, k)}</p>);
  });
  flush("end");
  return <>{out}</>;
}

function LegalPage() {
  const { doc } = Route.useParams();
  const src = DOCS[doc];
  if (!src) throw notFound();
  return (
    <div className="min-h-screen bg-cream text-charcoal px-6 py-16 md:py-24">
      <div className="mx-auto max-w-2xl">
        <a href="/" className="font-display font-bold text-2xl tracking-tight text-charcoal">
          tunefield<span className="text-pink">.</span>
        </a>
        <div className="mt-10">
          <Markdown src={src} />
        </div>
      </div>
    </div>
  );
}
