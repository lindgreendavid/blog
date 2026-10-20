import Link from "next/link";
import ThemeToggle from "./theme-toggle";

export default function SiteNav() {
  return (
    <nav className="nav" aria-label="Primary navigation">
      <Link className="brand" href="/" aria-label="Lab Notes home">Lab Notes</Link>
      <div className="nav__links">
        <Link href="/#featured">Featured</Link>
        <Link href="/#notes">All notes</Link>
        <Link href="/#evidence-index">Evidence</Link>
        <Link href="/#study">Study guide</Link>
        <a className="nav__keep" href="https://github.com/lindgreendavid">GitHub</a>
        <ThemeToggle />
      </div>
    </nav>
  );
}
