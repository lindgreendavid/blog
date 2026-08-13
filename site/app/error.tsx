"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Lab Notes render failure", error);
  }, [error]);

  return (
    <main className="status-page">
      <span className="brand__mark" aria-hidden="true">LN</span>
      <p>Page interrupted</p>
      <h1>This page could not be rendered.</h1>
      <p>Nothing you entered was lost. Try again or return to the home page.</p>
      <div className="hero__actions">
        <button className="button button--primary" type="button" onClick={reset}>
          Try again
        </button>
        <Link className="button button--ghost" href="/">
          Return to Lab Notes
        </Link>
      </div>
    </main>
  );
}
