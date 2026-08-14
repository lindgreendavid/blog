import Link from "next/link";

export default function SiteNav() {
  return (
    <nav className="nav" aria-label="Primary navigation">
      <Link className="brand" href="/" aria-label="David Lindgreen — Lab Notes home">
        <span className="brand__mark" aria-hidden="true">LN</span>
        <span>Lab Notes</span>
      </Link>
      <div className="nav__links">
        <Link href="/">Home</Link>
        <Link href="/#explore">Explore</Link>
        <Link href="/#evidence-index">Evidence index</Link>
        <Link href="/#study">Study guide</Link>
        <Link href="/#articles">Articles</Link>
        <a href="https://github.com/lindgreendavid">GitHub</a>
      </div>
    </nav>
  );
}
