import Link from "next/link";
import { indexMeta, indexBody, posts } from "./content-data";
import { parseSections, renderMarkdown } from "./lib/markdown";
import SiteNav from "./site-nav";
import SiteFooter from "./site-footer";
import ResearchExplorer from "./research-explorer";
import HeroVisual from "./hero-visual";

// Hand-written navigation copy, not part of the fact-checked content files --
// one sentence per post so the home page reads as a list rather than a wall
// of headings. See content/posts/*.md for the actual, verbatim reporting.
const teasers: Record<string, string> = {
  "fairshift-lab-robustness":
    "Stress-testing a fairness measurement against label noise, measurement error, and small samples, instead of trusting a single clean number.",
  "three-body-lab-chaos-boundary":
    "A validated orbital integrator measures exactly where chaos sets in for three gravitating bodies, and catches a 150-year-old stability theorem happening live.",
  "frb-atlas-dispersion-measure":
    "Re-running a landmark fast radio burst catalog paper's own statistical test on the same public data, and reporting the result that didn't replicate.",
  "foldings-edge-plddt-disorder":
    "228,662 residues of real AlphaFold and DisProt data test whether confidence scores predict protein disorder, and exactly where that prediction breaks down.",
  "climate-twin-frankfurt-heat-island":
    "Forty years of real DWD weather-station data, paired and bootstrapped, to put an actual confidence interval on Frankfurt's urban heat island.",
};

export default function Home() {
  const sections = Object.fromEntries(
    parseSections(indexBody).map((section) => [section.heading, section.body]),
  );
  const sortedPosts = [...posts].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <SiteNav />
      <main id="main-content">
        <section className="hero" aria-labelledby="site-title">
          <div className="hero__copy">
            <p className="eyebrow">Lab Notes</p>
            <h1 id="site-title">{indexMeta.title}</h1>
            <p className="hero__lead">{indexMeta.tagline}</p>
            <div className="hero__actions">
              <a className="button button--primary" href="#explore">
                Explore the research
              </a>
              <a className="button button--ghost" href="#articles">
                Read the articles
              </a>
            </div>
          </div>
          <HeroVisual />
        </section>

        <section className="prose" aria-labelledby="what-this-is">
          <h2 id="what-this-is">What this is</h2>
          {renderMarkdown(sections["What this is"] ?? "")}
        </section>

        <section className="prose" aria-labelledby="why-this-exists">
          <h2 id="why-this-exists">Why this exists</h2>
          {renderMarkdown(sections["Why this exists"] ?? "")}
        </section>

        <ResearchExplorer />

        <section className="study-guide" id="study" aria-labelledby="study-title">
          <div className="section-heading">
            <p className="eyebrow">A reusable method</p>
            <h2 id="study-title">How to read a scientific result</h2>
            <p>
              Each lab uses the same four-part discipline. Use it here, then carry it into
              any paper, chart, model, or headline you encounter.
            </p>
          </div>
          <ol className="study-steps">
            <li>
              <span aria-hidden="true">01</span>
              <h3>Ask a bounded question</h3>
              <p>Replace a broad topic with a claim that data could genuinely contradict.</p>
            </li>
            <li>
              <span aria-hidden="true">02</span>
              <h3>Inspect the evidence</h3>
              <p>Check where the data came from, what was excluded, and what was measured.</p>
            </li>
            <li>
              <span aria-hidden="true">03</span>
              <h3>Read uncertainty first</h3>
              <p>Look at intervals, sample structure, robustness checks, and null results.</p>
            </li>
            <li>
              <span aria-hidden="true">04</span>
              <h3>Stop at the boundary</h3>
              <p>A result supports only the population, method, and conditions actually tested.</p>
            </li>
          </ol>
        </section>

        <section className="articles" id="articles" aria-labelledby="articles-heading">
          <h2 id="articles-heading">The articles</h2>
          <ul className="post-list">
            {sortedPosts.map((post) => (
              <li key={post.slug} className="post-card">
                <Link className="post-card__link" href={`/posts/${post.slug}`}>
                  <span className="post-card__field">{post.field}</span>
                  <h3 className="post-card__title">{post.title}</h3>
                  <p className="post-card__teaser">{teasers[post.slug]}</p>
                  <span className="post-card__project">{post.project} →</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="prose" aria-labelledby="explore-further">
          <h2 id="explore-further">Explore further</h2>
          {renderMarkdown(sections["Explore further"] ?? "")}
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
