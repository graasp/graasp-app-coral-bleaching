// eslint-disable-next-line react/function-component-definition
export function Bubble({
  duration = '4s',
  x,
  y = 380,
  r = 18,
}: {
  duration?: number;
  x: number | string;
  y?: number | string;
  r?: number;
}) {
  console.log(duration);

  return (
    <>
      <defs>
        <radialGradient id="bubbleGrad" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.95)" />
          <stop offset="40%" stopColor="rgba(200,230,255,0.6)" />
          <stop offset="100%" stopColor="rgba(140,190,255,0.18)" />
        </radialGradient>
        <linearGradient id="hi" x1={0} x2={1}>
          <stop offset={0} stopColor="white" stopOpacity={0.9} />
          <stop offset={1} stopColor="white" stopOpacity={0} />
        </linearGradient>
        <filter id="soft" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation={0.6} result="b" />
          <feBlend in="SourceGraphic" in2="b" />
        </filter>
      </defs>
      <rect width="100%" height="100%" fill="transparent" />
      <g id="bubble" transform-box="fill-box" transform-origin="50% 50%">
        <circle
          id="main"
          cx={x}
          cy={y}
          r={r}
          fill="url(#bubbleGrad)"
          stroke="rgba(255,255,255,0.35)"
          strokeWidth={1.2}
          filter="url(#soft)"
        >
          <animate
            attributeName="cy"
            values="700;-50"
            dur={duration}
            repeatCount="indefinite"
            calcMode="spline"
            keySplines="0.42 0 0.58 1"
          />
          <animate
            attributeName="opacity"
            values="1;0.5"
            dur={duration}
            repeatCount="indefinite"
            calcMode="spline"
            keySplines="0.42 0 0.58 1"
          />
        </circle>
        <ellipse
          cx={x - 10}
          cy={y}
          rx={6.5}
          ry={3.8}
          fill="url(#hi)"
          opacity={0.95}
        >
          <animate
            attributeName="cy"
            values="700;-50"
            dur={duration}
            repeatCount="indefinite"
            calcMode="spline"
            keySplines="0.42 0 0.58 1"
          />
          <animate
            attributeName="rx"
            values="6.5;4.8"
            dur={duration}
            repeatCount="indefinite"
            calcMode="spline"
            keySplines="0.42 0 0.58 1"
          />
        </ellipse>
        <animateTransform
          attributeName="transform"
          type="scale"
          values="1;1.06;0.98;1"
          dur={duration}
          repeatCount="indefinite"
          additive="replace"
          calcMode="spline"
          keyTimes="0;0.4;0.8;1"
          keySplines="0.42 0 0.58 1;0.42 0 0.58 1;0.42 0 0.58 1"
        />
      </g>
    </>
  );
}
