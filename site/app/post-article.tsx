import type { Post } from "./content-data";
import { renderMarkdown } from "./lib/markdown";
import SiteNav from "./site-nav";
import SiteFooter from "./site-footer";

export function PostArticle({ post }: { post: Post }) {
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
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
