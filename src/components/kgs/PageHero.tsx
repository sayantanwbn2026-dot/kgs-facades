import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import defaultHero from "@/assets/hero-facade.jpg";

/**
 * Sub-page header. Mirrors the home hero — a full-bleed photograph with the
 * title on a foot line — so the pages read as one family. Sized as a header
 * (not a landing frame): it sits within a single screen, and the title is kept
 * to a couple of balanced lines rather than a tall ragged stack.
 */
export function PageHero({
  eyebrow,
  title,
  highlight,
  subtitle,
  crumb,
  parentCrumb,
  parentPath,
  image,
}: {
  eyebrow: string;
  title: string;
  highlight?: string;
  subtitle: string;
  crumb: string;
  parentCrumb?: string;
  parentPath?: string;
  image?: string;
}) {
  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <section className="relative isolate flex min-h-[62svh] max-h-[760px] flex-col overflow-hidden text-white">
      <div className="absolute inset-0 -z-20">
        <img
          src={image || defaultHero}
          alt=""
          aria-hidden
          loading="eager"
          decoding="async"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Same two-scrim treatment as the home hero */}
      <div className="absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-ink/55 via-ink/20 to-transparent" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/88 via-ink/28 via-45% to-transparent" />

      <div className="container-kgs relative flex flex-1 flex-col justify-end pt-24 pb-10 md:pb-14">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-white/50"
        >
          <Link to="/" className="transition-colors hover:text-white">
            KGS
          </Link>
          {parentCrumb && parentPath && (
            <>
              <span className="text-white/25">/</span>
              <Link to={parentPath} className="transition-colors hover:text-white">
                {parentCrumb}
              </Link>
            </>
          )}
          <span className="text-white/25">/</span>
          <span className="text-white/80">{crumb}</span>
        </motion.div>

        {/* Foot line: title left, lede right */}
        <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-14">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.06 }}
              className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-white/55"
            >
              <span className="h-1 w-1 rounded-full bg-brass-soft" />
              {eyebrow}
            </motion.span>

            {/* max-width in `ch` lives on the h1 so it tracks the title's own
                font size (not the wrapper's), keeping every page's title to a
                tidy two or three lines regardless of length. */}
            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.14, ease }}
              className="mt-4 display-text max-w-[18ch] text-balance text-[clamp(1.7rem,3vw,2.5rem)] leading-[1.1] text-white"
            >
              {title}
              {highlight && (
                <>
                  {" "}
                  <span className="text-white/50">{highlight}</span>
                </>
              )}
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.28 }}
            className="max-w-[40ch] text-[13px] leading-[1.6] text-white/65 lg:shrink-0 lg:pb-1.5 md:text-[14px]"
          >
            {subtitle}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
