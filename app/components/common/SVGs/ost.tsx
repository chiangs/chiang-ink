export const ostFramework = () => {
  return (
    <svg width="100%" viewBox="0 0 680 620">
      <defs>
        <marker
          id="arrow"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path
            d="M2 1L8 5L2 9"
            fill="none"
            stroke="context-stroke"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </marker>
      </defs>

      {/* OKR block — top, full width */}
      <g>
        <rect x="200" y="32" width="280" height="56" rx="0" fill="#1a1a1a" stroke="#FFB77D" strokeWidth="1" />
        <text fontFamily="sans-serif" fontSize="11" fontWeight="500" fill="#737371" letterSpacing="0.12em" textAnchor="middle" x="340" y="53" dominantBaseline="central">
          DESTINATION
        </text>
        <text fontFamily="sans-serif" fontSize="14" fontWeight="700" fill="#FFB77D" textAnchor="middle" x="340" y="71" dominantBaseline="central">
          OKRs
        </text>
      </g>

      {/* Down arrow from OKR */}
      <line x1="340" y1="88" x2="340" y2="136" stroke="#FFB77D" strokeWidth="1" markerEnd="url(#arrow)" strokeOpacity="0.6" />

      {/* Human */}
      <g>
        <rect x="60" y="140" width="164" height="64" rx="0" fill="#1a1a1a" stroke="#333331" strokeWidth="0.5" />
        <text fontFamily="sans-serif" fontSize="10" fontWeight="500" fill="#737371" letterSpacing="0.1em" textAnchor="middle" x="142" y="159" dominantBaseline="central">
          HUMAN
        </text>
        <text fontFamily="sans-serif" fontSize="12" fontWeight="400" fill="#E5E2E1" textAnchor="middle" x="142" y="178" dominantBaseline="central">
          Users &amp; behaviours
        </text>
      </g>

      {/* Organisational */}
      <g>
        <rect x="258" y="140" width="164" height="64" rx="0" fill="#1a1a1a" stroke="#333331" strokeWidth="0.5" />
        <text fontFamily="sans-serif" fontSize="10" fontWeight="500" fill="#737371" letterSpacing="0.1em" textAnchor="middle" x="340" y="159" dominantBaseline="central">
          ORGANISATIONAL
        </text>
        <text fontFamily="sans-serif" fontSize="12" fontWeight="400" fill="#E5E2E1" textAnchor="middle" x="340" y="178" dominantBaseline="central">
          Systems &amp; constraints
        </text>
      </g>

      {/* Technical — accent border */}
      <g>
        <rect x="456" y="140" width="164" height="64" rx="0" fill="#1a1a1a" stroke="#FFB77D" strokeWidth="1" />
        <text fontFamily="sans-serif" fontSize="10" fontWeight="500" fill="#FFB77D" letterSpacing="0.1em" textAnchor="middle" x="538" y="159" dominantBaseline="central">
          TECHNICAL
        </text>
        <text fontFamily="sans-serif" fontSize="12" fontWeight="400" fill="#E5E2E1" textAnchor="middle" x="538" y="178" dominantBaseline="central">
          Constraints &amp; opportunities
        </text>
      </g>

      {/* Connectors from three perspectives converging to OST */}
      <line x1="142" y1="204" x2="142" y2="232" stroke="#333331" strokeWidth="0.5" />
      <line x1="142" y1="232" x2="340" y2="232" stroke="#333331" strokeWidth="0.5" />
      <line x1="340" y1="204" x2="340" y2="228" stroke="#333331" strokeWidth="0.5" />
      <line x1="538" y1="204" x2="538" y2="232" stroke="#FFB77D" strokeWidth="0.8" strokeOpacity="0.7" />
      <line x1="538" y1="232" x2="340" y2="232" stroke="#FFB77D" strokeWidth="0.8" strokeOpacity="0.7" />

      {/* Arrow from convergence to OST */}
      <line x1="340" y1="232" x2="340" y2="264" stroke="#737371" strokeWidth="1" markerEnd="url(#arrow)" />

      {/* OST block */}
      <g>
        <rect x="160" y="268" width="360" height="64" rx="0" fill="#1a1a1a" stroke="#333331" strokeWidth="0.5" />
        <text fontFamily="sans-serif" fontSize="10" fontWeight="500" fill="#737371" letterSpacing="0.1em" textAnchor="middle" x="340" y="287" dominantBaseline="central">
          PATH
        </text>
        <text fontFamily="sans-serif" fontSize="14" fontWeight="700" fill="#E5E2E1" textAnchor="middle" x="340" y="308" dominantBaseline="central">
          Opportunity Solution Tree
        </text>
      </g>

      {/* Down arrow from OST */}
      <line x1="340" y1="332" x2="340" y2="372" stroke="#737371" strokeWidth="1" markerEnd="url(#arrow)" />

      {/* Experimentation block */}
      <g>
        <rect x="160" y="376" width="360" height="64" rx="0" fill="#1a1a1a" stroke="#333331" strokeWidth="0.5" />
        <text fontFamily="sans-serif" fontSize="10" fontWeight="500" fill="#737371" letterSpacing="0.1em" textAnchor="middle" x="340" y="395" dominantBaseline="central">
          VALIDATE BEFORE COMMITTING
        </text>
        <text fontFamily="sans-serif" fontSize="14" fontWeight="700" fill="#E5E2E1" textAnchor="middle" x="340" y="416" dominantBaseline="central">
          Experimentation
        </text>
      </g>

      {/* AI accelerator callout */}
      <line x1="520" y1="408" x2="570" y2="408" stroke="#333331" strokeWidth="0.5" strokeDasharray="3 3" />
      <rect x="570" y="393" width="88" height="30" rx="0" fill="#131313" stroke="#222220" strokeWidth="0.5" />
      <text fontFamily="sans-serif" fontSize="10" fontWeight="500" fill="#737371" textAnchor="middle" x="614" y="412" dominantBaseline="central">
        AI-accelerated
      </text>

      {/* Down arrow from Experimentation */}
      <line x1="340" y1="440" x2="340" y2="480" stroke="#737371" strokeWidth="1" markerEnd="url(#arrow)" />

      {/* Validated backlog block */}
      <g>
        <rect x="160" y="484" width="360" height="64" rx="0" fill="#1a1a1a" stroke="#333331" strokeWidth="0.5" />
        <text fontFamily="sans-serif" fontSize="10" fontWeight="500" fill="#737371" letterSpacing="0.1em" textAnchor="middle" x="340" y="503" dominantBaseline="central">
          DELIVERABLE
        </text>
        <text fontFamily="sans-serif" fontSize="14" fontWeight="700" fill="#E5E2E1" textAnchor="middle" x="340" y="524" dominantBaseline="central">
          Validated backlog
        </text>
      </g>

      {/* Down arrow to delivery */}
      <line x1="340" y1="548" x2="340" y2="582" stroke="#737371" strokeWidth="1" markerEnd="url(#arrow)" strokeOpacity="0.4" />

      {/* Delivery terminal */}
      <g>
        <rect x="240" y="585" width="200" height="24" rx="0" fill="#161616" stroke="#222220" strokeWidth="0.5" />
        <text fontFamily="sans-serif" fontSize="11" fontWeight="500" fill="#737371" letterSpacing="0.1em" textAnchor="middle" x="340" y="601" dominantBaseline="central">
          DELIVERY
        </text>
      </g>

      {/* Often absent annotation */}
      <text fontFamily="sans-serif" fontSize="10" fontWeight="500" fill="#FFB77D" textAnchor="middle" x="538" y="226" dominantBaseline="central">
        often absent
      </text>
    </svg>
  );
};
