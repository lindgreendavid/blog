export default function HeroVisual() {
  return (
    <div className="hero-visual" aria-hidden="true">
      <div className="hero-visual__header">
        <span>Research cycle</span>
        <span className="hero-visual__status">Live index</span>
      </div>
      <svg viewBox="0 0 560 430" focusable="false">
        <defs>
          <pattern id="lab-grid" width="32" height="32" patternUnits="userSpaceOnUse">
            <path d="M 32 0 L 0 0 0 32" className="hero-visual__grid-line" />
          </pattern>
          <path
            id="research-loop"
            d="M116 106 C218 26 376 34 452 122 C525 207 492 338 382 382 C270 426 126 378 82 278 C47 198 61 145 116 106Z"
          />
        </defs>

        <rect width="560" height="430" fill="url(#lab-grid)" />
        <use href="#research-loop" className="hero-visual__loop" />
        <use href="#research-loop" className="hero-visual__signal" />

        <g className="hero-visual__core">
          <circle cx="280" cy="218" r="84" className="hero-visual__core-ring" />
          <circle cx="280" cy="218" r="62" className="hero-visual__core-fill" />
          <text x="280" y="205" textAnchor="middle" className="hero-visual__core-kicker">
            LAB NOTE
          </text>
          <text x="280" y="232" textAnchor="middle" className="hero-visual__core-title">
            INSPECT
          </text>
          <text x="280" y="252" textAnchor="middle" className="hero-visual__core-meta">
            THE RESULT
          </text>
        </g>

        <g className="hero-visual__node hero-visual__node--one">
          <circle cx="112" cy="108" r="26" />
          <text x="112" y="112" textAnchor="middle">01</text>
          <text x="112" y="149" textAnchor="middle" className="hero-visual__node-label">QUESTION</text>
        </g>
        <g className="hero-visual__node hero-visual__node--two">
          <circle cx="449" cy="119" r="26" />
          <text x="449" y="123" textAnchor="middle">02</text>
          <text x="449" y="160" textAnchor="middle" className="hero-visual__node-label">EVIDENCE</text>
        </g>
        <g className="hero-visual__node hero-visual__node--three">
          <circle cx="410" cy="356" r="26" />
          <text x="410" y="360" textAnchor="middle">03</text>
          <text x="410" y="397" textAnchor="middle" className="hero-visual__node-label">FINDING</text>
        </g>
        <g className="hero-visual__node hero-visual__node--four">
          <circle cx="111" cy="326" r="26" />
          <text x="111" y="330" textAnchor="middle">04</text>
          <text x="111" y="367" textAnchor="middle" className="hero-visual__node-label">BOUNDARY</text>
        </g>

        <circle r="5" className="hero-visual__traveller">
          <animateMotion dur="9s" repeatCount="indefinite" rotate="auto">
            <mpath href="#research-loop" />
          </animateMotion>
        </circle>
      </svg>
      <div className="hero-visual__footer">
        <span>Bounded</span>
        <span>Reproducible</span>
        <span>Open</span>
      </div>
    </div>
  );
}
