import Link from "next/link";
import { indexBody, posts } from "./content-data";
import { catalog, FEATURED_SLUGS, featuredCopy, kindCopy, type Kind } from "./catalog";
import { parseSections, renderMarkdown } from "./lib/markdown";
import SiteNav from "./site-nav";
import SiteFooter from "./site-footer";
import ResearchExplorer from "./research-explorer";
import EvidenceIndex from "./evidence-index";

const kinds: Kind[] = ["release", "experiment", "proposed"];

export default function Home() {
  const sections = Object.fromEntries(
    parseSections(indexBody).map((section) => [section.heading, section.body]),
  );
  const featured = FEATURED_SLUGS.map((slug) => posts.find((post) => post.slug === slug)).filter(
    (post): post is NonNullable<typeof post> => Boolean(post),
  );

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <SiteNav />
      <main id="main-content">
        <section className="hero" aria-labelledby="site-title">
          <h1 id="site-title">Real data, honest limits.</h1>
          <p className="hero__lead">
            Public analyses with code, data and stated limits. Each note says what was tested, what was
            found and what it cannot show.
          </p>
          <div className="hero__actions">
            <a className="button button--primary" href="#featured">
              Read the featured notes
            </a>
            <a className="button button--ghost" href="#notes">
              Browse all notes
            </a>
          </div>
        </section>

        <section className="featured" id="featured" aria-labelledby="featured-title">
          <div className="section-heading">
            <h2 id="featured-title">Featured work</h2>
          </div>
          <div className="featured-grid">
            {featured.map((post, index) => {
              const copy = featuredCopy[post.slug];
              return (
                <article key={post.slug} className={`featured-card${index === 0 ? " featured-card--lead" : ""}`}>
                  <div>
                    <span className="chip">{copy.status}</span>
                  </div>
                  <div>
                    <p className="meta">{post.field}</p>
                    <h3>{copy.question}</h3>
                    <p style={{ marginTop: "0.75rem" }}>{copy.summary}</p>
                  </div>
                  <div className="featured-card__links">
                    <Link href={`/posts/${post.slug}`}>Read the note</Link>
                    <a href={post.repo}>Code</a>
                    <a href={post.tool}>Interactive lab</a>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <ResearchExplorer />

        <section className="catalog" id="notes" aria-labelledby="notes-title">
          <div className="section-heading">
            <h2 id="notes-title">All notes, by kind</h2>
            <p>
              A release is not an experiment and a proposal is not a product. The three kinds stay apart
              so nothing unfinished reads as finished.
            </p>
          </div>
          {kinds.map((kind) => (
            <div className="catalog-group" key={kind}>
              <h3>{kindCopy[kind].title}</h3>
              <p>{kindCopy[kind].blurb}</p>
              <ul className="catalog-list">
                {catalog
                  .filter((entry) => entry.kind === kind)
                  .map((entry) => {
                    const href = entry.slug ? `/posts/${entry.slug}` : entry.repo;
                    const row = (
                      <>
                        <strong>{entry.title}</strong>
                        <span>{entry.field} · {entry.status}</span>
                        <span>{entry.detail}</span>
                      </>
                    );
                    return (
                      <li key={entry.title}>
                        {href ? (
                          entry.slug ? (
                            <Link className="catalog-row" href={href}>{row}</Link>
                          ) : (
                            <a className="catalog-row" href={href}>{row}</a>
                          )
                        ) : (
                          <div className="catalog-row">{row}</div>
                        )}
                      </li>
                    );
                  })}
              </ul>
            </div>
          ))}
        </section>

        <EvidenceIndex />

        <section className="study-guide" id="study" aria-labelledby="study-title">
          <div className="section-heading">
            <h2 id="study-title">How to read a scientific result</h2>
            <p>Each lab uses the same four-part discipline. Use it here, then carry it into any paper, chart, model or headline.</p>
          </div>
          <ol className="study-steps">
            <li>
              <h3>Ask a bounded question</h3>
              <p>Replace a broad topic with a claim that data could genuinely contradict.</p>
            </li>
            <li>
              <h3>Inspect the evidence</h3>
              <p>Check where the data came from, what was excluded, and what was measured.</p>
            </li>
            <li>
              <h3>Read uncertainty first</h3>
              <p>Look at intervals, sample structure, robustness checks, and null results.</p>
            </li>
            <li>
              <h3>Stop at the boundary</h3>
              <p>A result supports only the population, method, and conditions actually tested.</p>
            </li>
          </ol>
        </section>

        <section className="how-made" aria-labelledby="how-title">
          <h2 id="how-title">How these notes are made.</h2>
          <ol>
            <li><strong>A real question</strong><span>One a dataset could contradict.</span></li>
            <li><strong>Public data</strong><span>With source, licence and fetch date.</span></li>
            <li><strong>A method anyone can rerun</strong><span>Protocol committed before results.</span></li>
            <li><strong>A result with its interval</strong><span>Failures reported with successes.</span></li>
            <li><strong>Limits as prominent as results</strong><span>And what was not checked.</span></li>
          </ol>
          <p>
            Written with substantial assistance from an AI system (Claude, Anthropic); every number is
            checked against the code that produced it, and the author is responsible for the content.
          </p>
        </section>

        <section className="prose" aria-labelledby="explore-further" style={{ paddingTop: "clamp(48px, 7vw, 88px)" }}>
          <h2 id="explore-further">Explore further</h2>
          {renderMarkdown(sections["Explore further"] ?? "")}
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
