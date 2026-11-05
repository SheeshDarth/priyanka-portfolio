/**
 * "Rev": an original mascot. A sport-bike in a red / white / black tricolour (inspired by
 * litre-class superbikes), ridden by a helmeted, faceless rider with a laptop bag.
 * No manufacturer logos or badges, and it is not a likeness of any real person.
 *
 * Decorative: always rendered inside a labelled button, so it is aria-hidden.
 * Wheel spin / hair flutter are CSS (see globals.css) and switch off for reduced motion.
 */
function Wheel({ cx, cy }: { cx: number; cy: number }) {
  return (
    <g transform={`translate(${cx} ${cy})`}>
      <g className="bike-wheel">
        <circle r="27" fill="none" stroke="#05080f" strokeWidth="8" />
        <circle r="23" fill="none" stroke="#aab6c8" strokeWidth="1" opacity="0.6" />
        <circle r="17" fill="none" stroke="#aab6c8" strokeWidth="2" />
        {[0, 60, 120].map((a) => (
          <line key={a} x1="-17" y1="0" x2="17" y2="0" stroke="#aab6c8" strokeWidth="1.6" transform={`rotate(${a})`} />
        ))}
        <circle r="9" fill="none" stroke="#f04438" strokeWidth="2" />
        <circle r="3.5" fill="#aab6c8" />
      </g>
    </g>
  );
}

export function RiderBike({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 240 130" aria-hidden="true" focusable="false" className={className}>
      {/* ground shadow */}
      <ellipse cx="124" cy="121" rx="96" ry="3.5" fill="#0b1220" opacity="0.22" />

      <Wheel cx={56} cy={92} />
      <Wheel cx={190} cy={92} />

      <g className="bike-body">
        {/* swingarm and fork */}
        <line x1="56" y1="92" x2="104" y2="86" stroke="#334055" strokeWidth="7" strokeLinecap="round" />
        <line x1="190" y1="92" x2="164" y2="46" stroke="#aab6c8" strokeWidth="5.5" strokeLinecap="round" />

        {/* exhaust */}
        <path d="M92 90 L40 79 L37 84 L94 97 Z" fill="#aab6c8" />
        <path d="M37 79 L42 79 L40 85 L35 84 Z" fill="#334055" />

        {/* engine */}
        <path d="M84 70 L142 76 L152 91 L120 99 L92 95 Z" fill="#334055" stroke="#aab6c8" strokeWidth="0.8" />

        {/* tail + seat */}
        <path d="M44 44 L88 39 L95 46 L52 53 Z" fill="#0b1220" stroke="#aab6c8" strokeWidth="0.8" />

        {/* main bodywork (red) */}
        <path
          d="M183 69 L169 52 L151 44 L127 40 L101 42 L80 47 L40 45 L29 51 L60 59 L100 67 L141 77 L177 77 Z"
          fill="#f04438"
        />
        {/* white livery stripe */}
        <path d="M151 44 L169 52 L183 69 L172 71 L158 57 L141 49 Z" fill="#ffffff" />
        {/* dark lower fairing */}
        <path d="M100 67 L141 77 L152 83 L120 80 L96 73 Z" fill="#0b1220" opacity="0.85" />

        {/* windscreen + headlight */}
        <path d="M149 43 L159 23 L167 27 L161 49 Z" fill="#aab6c8" opacity="0.75" />
        <path d="M171 57 L183 68 L167 66 Z" fill="#ffffff" />
        <path d="M172 62 L180 66 L170 65 Z" fill="#0b1220" />

        {/* rider: legs */}
        <path d="M84 46 L112 58 L97 80" fill="none" stroke="#3a4a6b" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M91 82 L103 82" stroke="#0b1220" strokeWidth="7" strokeLinecap="round" />
        {/* rider: torso */}
        <path d="M84 46 Q104 27 128 27" fill="none" stroke="#26365a" strokeWidth="15" strokeLinecap="round" />
        <path d="M92 38 Q106 28 120 28" fill="none" stroke="#f04438" strokeWidth="2" strokeLinecap="round" />
        {/* rider: arm + glove */}
        <path d="M128 28 L146 34 L155 41" fill="none" stroke="#26365a" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="156" cy="41" r="3.8" fill="#f04438" />

        {/* laptop bag */}
        <g transform="rotate(-14 96 30)">
          <rect x="84" y="18" width="24" height="22" rx="4" fill="#aab6c8" />
          <rect x="84" y="18" width="24" height="5" rx="2" fill="#334055" />
          <text x="96" y="35" textAnchor="middle" fontSize="9" fontFamily="monospace" fontWeight="700" fill="#0b1220">
            {"</>"}
          </text>
        </g>

        {/* ponytail */}
        <g className="bike-hair">
          <path d="M123 19 C110 12 99 17 93 28" fill="none" stroke="#3b2418" strokeWidth="5" strokeLinecap="round" />
          <circle cx="119" cy="17.5" r="2.4" fill="#f04438" />
        </g>

        {/* helmet */}
        <circle cx="134" cy="17" r="11.5" fill="#ffffff" />
        <path d="M125 14 Q133 3 145 11" fill="none" stroke="#f04438" strokeWidth="3" strokeLinecap="round" />
        <path d="M139 12 Q150 14 148 23 L137 23 Z" fill="#0b1220" />
        <path d="M141 14 Q146 15 146 18" fill="none" stroke="#aab6c8" strokeWidth="1" opacity="0.8" />
      </g>
    </svg>
  );
}
