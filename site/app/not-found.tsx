import Link from "next/link";

export default function NotFound() {
  return (
    <main className="status-page">
      <span className="brand__mark" aria-hidden="true">LN</span>
      <p>404 · not one of the five articles</p>
      <h1>This page does not exist.</h1>
      <Link className="button button--primary" href="/">
        Return to Lab Notes
      </Link>
    </main>
  );
}
