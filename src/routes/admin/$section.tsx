import { createFileRoute, notFound } from "@tanstack/react-router";
import { SCHEMAS } from "@/lib/cms-schemas";
import { AdminEditor } from "@/components/cms/AdminEditor";

export const Route = createFileRoute("/admin/$section")({
  component: SectionPage,
  notFoundComponent: () => <div className="p-8">Section not found.</div>,
  errorComponent: ({ error }) => <div className="p-8 text-red-600">Error: {error.message}</div>,
});

function SectionPage() {
  const { section } = Route.useParams();
  const schema = SCHEMAS[section];
  if (!schema) throw notFound();
  return <AdminEditor schema={schema} />;
}