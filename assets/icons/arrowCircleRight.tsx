const ArrowCircleRightSVG = () => (
  <svg
    width="84"
    height="84"
    viewBox="0 0 84 84"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g filter="url(#filter0_d_18_2862)">
      <circle
        cx="42"
        cy="38"
        r="31.25"
        stroke="#767494"
        stroke-width="1.5"
        shape-rendering="crispEdges"
      />
    </g>
    <path
      d="M36.75 48.5L47.25 38L36.75 27.5"
      stroke="black"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <defs>
      <filter
        id="filter0_d_18_2862"
        x="0"
        y="0"
        width="84"
        height="84"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood
          flood-opacity="0"
          result="BackgroundImageFix"
        />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="4" />
        <feGaussianBlur stdDeviation="5" />
        <feComposite
          in2="hardAlpha"
          operator="out"
        />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.290196 0 0 0 0 0.227451 0 0 0 0 1 0 0 0 0.06 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_18_2862"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_18_2862"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);

export default ArrowCircleRightSVG;