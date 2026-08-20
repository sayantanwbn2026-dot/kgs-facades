import { useSingleton } from "@/lib/cms";

export function Footer() {
  const { data: f } = useSingleton<any>("footer");

  const brandLine1 = f?.brand_line1 || "Kolkata";
  const brandLine2Accent = f?.brand_line2_accent || "Glazing";
  const brandLine2Rest = f?.brand_line2_rest || "Services";

  // The consultation section (07) already carries every contact detail, so the
  // footer is just the wordmark that closes the page.
  return (
    <footer className="relative overflow-hidden border-t border-line bg-background pt-14 pb-12 md:pt-24 md:pb-16">
      <div className="container-kgs">
        <h2 className="display-section text-balance text-[clamp(2.1rem,7vw,6.25rem)] leading-[0.94] tracking-[-0.05em]">
          {brandLine1}
          <br />
          <span className="text-brass italic">{brandLine2Accent}</span> {brandLine2Rest}
          <span className="text-brass">.</span>
        </h2>
      </div>
    </footer>
  );
}
