import Link from "next/link";
import type { Post } from "./content-data";
import { catalog } from "./catalog";
import { renderMarkdown } from "./lib/markdown";
import SiteNav from "./site-nav";
import SiteFooter from "./site-footer";

export function PostArticle({ post }: { post: Post }) {
  const entry = catalog.find((item) => item.slug === post.slug);
    return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <SiteNav />
      <main id="main-content">
        <article className="post" aria-labelledby="post-title">
          <header className="post-header">
            <p className="post-kicker">
              <span className="post-field">{post.field}</span>
              <span aria-hidden="true">·</span>
              <span>{post.project}</span>
              <span aria-hidden="true">·</span>
              <time dateTime={post.date}>{post.date}</time>
            </p>
            <h1 id="post-title">{post.title}</h1>
          </header>
          {entry && (
            <p className="post-status">
              <strong>{entry.status}</strong>
              <span>{entry.detail}</span>
            </p>
          )}
          <nav className="post-resources" aria-label="Project resources">
            <a className="button button--primary" href={post.tool} target="_blank" rel="noreferrer">
              Open the interactive tool
            </a>
            <a className="button button--ghost" href={post.repo} target="_blank" rel="noreferrer">
              View the source code
            </a>
            <a className="button button--ghost" href={post.report} target="_blank" rel="noreferrer">
              Read the full report
            </a>
          </nav>
          <div className="post-body">{renderMarkdown(post.body)}</div>
          <Link className="post-back" href="/#notes">
            Back to all notes
          </Link>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
