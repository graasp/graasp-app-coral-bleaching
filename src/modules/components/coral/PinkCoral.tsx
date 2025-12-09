import { useCallback, useEffect } from 'react';

import { mapValue, motion, motionValue } from 'motion/react';

import { CoralStatus, useContext, useMaxValue, useStatus } from '@/utils/hooks';

const PinkCoral = (props) => {
  const {
    data: { reset, showStatus },
  } = useContext();
  const { kelpAmount, status } = useStatus('pink', {
    initialKelpAmount: props.initialKelpAmount,
    maxTempThreshould: 25,
  });
  const [maxKelpAmount, setMax] = useMaxValue(
    props.initialKelpAmount,
    kelpAmount,
  );

  const recover = useCallback(() => {
    // eslint-disable-next-line no-restricted-syntax
    for (const p of document.getElementsByClassName('yellowToBeReset')) {
      (p as SVGAnimateTransformElement).beginElement();
    }
  }, []);

  // animate branches falling on death
  useEffect(() => {
    if (status === CoralStatus.Dead) {
      // eslint-disable-next-line no-restricted-syntax
      for (const p of document.getElementsByClassName('yellowToBeBroken')) {
        (p as SVGAnimateTransformElement).beginElement();
      }
    }
  }, [status]);

  // reset animations
  useEffect(() => {
    recover();
    setMax(0);
  }, [reset]);

  const pathLength = mapValue(motionValue(maxKelpAmount), [80, 95], [0, 1]);
  const subPathLength = mapValue(motionValue(maxKelpAmount), [90, 100], [0, 1]);

  const lightColor = mapValue(
    motionValue(kelpAmount),
    [80, 10],
    ['rgb(250, 167, 146)', 'rgb(255,255,255)'],
  );

  const darkColor = mapValue(
    motionValue(kelpAmount),
    [80, 10],
    ['rgb(205,9,76)', 'rgb(205,205,205)'],
  );

  return (
    <>
      {showStatus && (
        <div
          style={{
            position: 'absolute',
            ...props.style,
            bottom: props.style.bottom + 200,
            paddingLeft: '2%',
            paddingRight: '2%',
            background: 'white',
          }}
        >
          {status}: {kelpAmount.toFixed(0)}%
        </div>
      )}
      <motion.svg
        width={props.scale}
        height={props.scale}
        viewBox="0 0 565 440"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        xmlSpace="preserve"
        {...props}
        style={{
          fillRule: 'evenodd',
          clipRule: 'evenodd',
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          strokeMiterlimit: 1.5,
          ...props.style,
        }}
      >
        <motion.g transform="matrix(1,0,0,1,-8.001789,-375.534159)">
          <motion.g transform="matrix(0.24,0,0,0.24,-118.235294,27.439558)">
            <path
              d="M1753.937,3194.087C1751.394,3191.543 1614.096,3157.161 1579.162,3139.694C1524.658,3071.564 1559.896,2974.045 1474.465,2951.924C1429.125,2940.184 1280.774,2713.959 995.911,2589.435"
              style={{
                fill: 'none',
                stroke: 'url(#_Linear1)',
                strokeWidth: '174.34px',
              }}
            />
            <path
              d="M790.531,2618.413C801.2,2629.082 992.191,2916.136 1106.222,2926.503C1115.168,2927.316 1113.794,2928.926 1215.775,2951.096C1316.559,2973.006 1412.861,2949.198 1557.849,3094.186C1569.784,3106.12 1565.682,3108.726 1577.971,3121.015"
              style={{
                fill: 'none',
                stroke: 'url(#_Linear2)',
                strokeWidth: '123.41px',
              }}
            />
            <path
              d="M1224.718,2977.925C1203.827,2982.104 1049.297,3012.528 1043.62,3015.934C1006.357,3038.291 873.004,3038.291 858.051,3038.291"
              style={{
                fill: 'none',
                stroke: 'url(#_Linear3)',
                strokeWidth: '60.85px',
              }}
            />
            <path
              d="M1014.555,2897.438C961.711,2888.63 668.68,2823.569 621.506,2729.22"
              style={{
                fill: 'none',
                stroke: 'url(#_Linear4)',
                strokeWidth: '84.13px',
              }}
            />
            <path
              d="M1243.027,2729.22C1220.613,2684.392 1284.902,2682.972 1083.146,2367.024C1006.382,2246.811 855.551,2218.063 756.746,2075.876"
              style={{
                fill: 'none',
                stroke: 'url(#_Linear5)',
                strokeWidth: '110.32px',
              }}
            />
            <path
              d="M1120.758,2432.281C1087.793,2424.039 788.885,2349.312 710.283,2323.112C606.311,2288.454 615.105,2272.491 566.181,2174.642"
              style={{
                fill: 'none',
                stroke: 'url(#_Linear6)',
                strokeWidth: '80.39px',
              }}
            />
            <path
              d="M1173.159,2528.349C1173.787,2510.768 1179.541,2349.648 1199.36,2310.012C1220.881,2266.968 1416.223,1952.98 1417.173,1937.79"
              style={{
                fill: 'none',
                stroke: 'url(#_Linear7)',
                strokeWidth: '80.39px',
              }}
            />
            <motion.path
              d="M1753.937,3147.659C1778.618,3098.298 2124.285,3011.169 2208.079,2759.787C2362.813,2295.585 2621.347,2159.535 2736.456,1986.872"
              style={{
                fill: 'none',
                stroke: 'url(#_Linear8)',
                strokeWidth: '137.96px',
                pathLength,
              }}
            >
              {/* <animate
            fill="freeze"
            values="M1753.94 3147.66C1768.83 3117.88 1900.56 3074.35 2021.13 2989.29;M1753.94 3147.66C1770.9 3113.73 1939.51 3061.96 2070.5 2951.27;M1753.94 3147.66C1772.95 3109.64 1982.39 3049.21 2115.91 2908.58;M1753.94 3147.66C1774.98 3105.58 2029.3 3036.05 2155.78 2860.7;M1753.94 3147.66C1776.99 3101.56 2080 3022.52 2188.2 2807.51;M1753.94 3147.66C1778.62 3098.3 2124.28 3011.17 2208.08 2759.79C2209.2 2756.42 2210.33 2753.06 2211.47 2749.72;M1753.94 3147.66C1778.62 3098.3 2124.28 3011.17 2208.08 2759.79C2216 2736.04 2224.18 2713.15 2232.61 2691.07;M1753.94 3147.66C1778.62 3098.3 2124.28 3011.17 2208.08 2759.79C2223.14 2714.62 2239.17 2672.56 2255.97 2633.26;M1753.94 3147.66C1778.62 3098.3 2124.28 3011.17 2208.08 2759.79C2230.65 2692.07 2255.43 2631.34 2281.65 2576.46;M1753.94 3147.66C1778.62 3098.3 2124.28 3011.17 2208.08 2759.79C2238.57 2668.32 2273.09 2589.59 2309.75 2520.81;M1753.94 3147.66C1778.62 3098.3 2124.28 3011.17 2208.08 2759.79C2246.93 2643.25 2292.31 2547.39 2340.33 2466.45;M1753.94 3147.66C1778.62 3098.3 2124.28 3011.17 2208.08 2759.79C2255.74 2616.8 2313.25 2504.95 2373.39 2413.57;M1753.94 3147.66C1778.62 3098.3 2124.28 3011.17 2208.08 2759.79C2265.05 2588.88 2336.08 2462.46 2408.85 2362.31;M1753.94 3147.66C1778.62 3098.3 2124.28 3011.17 2208.08 2759.79C2274.88 2559.38 2361.03 2420.13 2446.64 2312.7;M1753.94 3147.66C1778.62 3098.3 2124.28 3011.17 2208.08 2759.79C2285.28 2528.19 2388.32 2378.27 2486.49 2264.74;M1753.94 3147.66C1778.62 3098.3 2124.28 3011.17 2208.08 2759.79C2296.28 2495.19 2418.2 2337.21 2528.07 2218.29;M1753.94 3147.66C1778.62 3098.3 2124.28 3011.17 2208.08 2759.79C2307.95 2460.18 2451.05 2297.28 2570.93 2172.99;M1753.94 3147.66C1778.62 3098.3 2124.28 3011.17 2208.08 2759.79C2320.35 2422.97 2487.27 2258.91 2614.4 2128.28;M1753.94 3147.66C1778.62 3098.3 2124.28 3011.17 2208.08 2759.79C2333.58 2383.27 2527.38 2222.65 2657.53 2083.26;M1753.94 3147.66C1778.62 3098.3 2124.28 3011.17 2208.08 2759.79C2347.74 2340.82 2571.95 2189.16 2698.95 2036.64;M1753.94 3147.66C1778.62 3098.3 2124.28 3011.17 2208.08 2759.79C2362.81 2295.58 2621.35 2159.53 2736.46 1986.87;M1753.94 3147.66C1778.62 3098.3 2124.28 3011.17 2208.08 2759.79C2362.81 2295.58 2621.35 2159.53 2736.46 1986.87"
            dur="10s"
            calcMode="discrete"
            attributeName="d"
            keyTimes="0;0.00333333;0.00666667;0.01;0.0133333;0.0166667;0.02;0.0233333;0.0266667;0.03;0.0333333;0.0366667;0.04;0.0433333;0.0466667;0.05;0.0533333;0.0566667;0.06;0.0633333;0.0666667;1"
          /> */}
            </motion.path>
            <motion.path
              d="M2313.3,2537.083C2352.787,2458.11 2545.828,2535.951 2596.72,2497.782C2684.055,2432.281 2693.961,2422.375 2701.522,2414.814"
              style={{
                pathLength: subPathLength,
                fill: 'none',
                stroke: 'url(#_Linear9)',
                strokeWidth: '60.85px',
              }}
              strokeLinecap={subPathLength.get() ? 'round' : 'butt'}
            >
              {/* <animate
            id="GROW"
            begin="indefinite"
            fill="freeze"
            values="M0 0;M0 0;M2313.3 2537.08C2321.51 2520.66 2336.37 2511.01 2355.21 2505.7;M2313.3 2537.08C2328.32 2507.04 2365.57 2499.69 2408.76 2500.02;M2313.3 2537.08C2334.36 2494.96 2399.11 2497.45 2462.67 2503.15;M2313.3 2537.08C2340.46 2482.77 2440.24 2502.63 2516.47 2507.91;M2313.3 2537.08C2347.66 2468.36 2498.32 2518.39 2570.37 2507.38;M2313.3 2537.08C2352.79 2458.11 2545.83 2535.95 2596.72 2497.78C2604.1 2492.24 2610.93 2487.11 2617.25 2482.33;M2313.3 2537.08C2352.79 2458.11 2545.83 2535.95 2596.72 2497.78C2625.27 2476.37 2645.55 2460.9 2660.17 2449.51;M2313.3 2537.08C2352.79 2458.11 2545.83 2535.95 2596.72 2497.78C2684.05 2432.28 2693.96 2422.38 2701.52 2414.81;M2313.3 2537.08C2352.79 2458.11 2545.83 2535.95 2596.72 2497.78C2684.05 2432.28 2693.96 2422.38 2701.52 2414.81"
            dur="10s"
            calcMode="discrete"
            attributeName="d"
            keyTimes="0;0.0366667;0.04;0.0433333;0.0466667;0.05;0.0533333;0.0566667;0.06;0.0633333;1"
          /> */}
            </motion.path>
            <path
              d="M2046.509,2969.391C2293.7,2876.695 2420.244,2844.562 2430.784,2834.022C2589.76,2675.045 2712.14,2657.071 2761.869,2647.125"
              style={{
                fill: 'none',
                stroke: 'url(#_Linear10)',
                strokeWidth: '139.42px',
              }}
            />
            <path
              d="M1784.015,3187.379C1805.696,3181.185 2078.604,2973.329 2107.644,2799.088C2143.638,2583.125 2190.175,2289.357 2274.279,2247.306"
              style={{
                fill: 'none',
                stroke: 'url(#_Linear11)',
                strokeWidth: '80.39px',
              }}
            />
            <path
              d="M2116.377,2834.022C2158.101,2708.85 2350.099,2736.822 2383.972,2702.949"
              style={{
                fill: 'none',
                stroke: 'url(#_Linear12)',
                strokeWidth: '80.39px',
              }}
            />
            <path
              d="M1714.636,3165.895C1776.967,2885.406 1702.67,2677.374 1688.436,2637.518C1641.414,2505.856 1597.041,2129.441 1640.401,1912.637C1668.331,1772.989 1677.581,1777.144 1740.837,1650.632"
              style={{
                fill: 'none',
                stroke: 'url(#_Linear13)',
                strokeWidth: '174.34px',
              }}
            />
            <path
              d="M1614.201,1995.606C1561.8,1969.405 1518.873,1748.039 1518.873,1716.666"
              style={{
                fill: 'none',
                stroke: 'url(#_Linear14)',
                strokeWidth: '56.48px',
              }}
            />
            <path
              d="M1681.786,2537.083C1684.391,2496.709 1546.567,2544.178 1816.993,2270.187C1893.849,2192.317 2007.927,2170.521 2014.858,2011.099"
              style={{
                fill: 'none',
                stroke: 'url(#_Linear15)',
                strokeWidth: '68.12px',
              }}
            />
            <path
              d="M1781.888,2072.12C1794.075,2092.433 1790.314,2205.813 1790.902,2177.184C1791.267,2159.453 1790.323,2268.768 1791.654,2274.091"
              style={{
                fill: 'none',
                stroke: 'url(#_Linear16)',
                strokeWidth: '52.12px',
              }}
            />
            <g transform="matrix(0.995623,-0.093466,0.093466,0.995623,-260.223263,143.463017)">
              <path
                d="M1650.078,3141.93C1633.762,2734.019 1368.687,2745.98 1374.03,1860.236C1374.43,1793.792 1371.111,1783.148 1351.933,1670.99C1341.5,1609.976 1292.459,1525.743 1292.459,1525.743"
                style={{
                  fill: 'none',
                  stroke: 'url(#_Linear17)',
                  strokeWidth: '130.69px',
                }}
              />
            </g>
            <path
              d="M1763.534,3200.319C1954.924,3157.788 2065.002,3082.103 2202.506,3082.103C2252.51,3082.103 2345.414,3010.482 2394.297,2998.261"
              style={{
                fill: 'none',
                stroke: 'url(#_Linear18)',
                strokeWidth: '92.86px',
              }}
            />
            <path
              d="M2333.656,3184.961C2314.575,3183.768 2154.794,3173.782 2103.092,3122.079"
              style={{
                fill: 'none',
                stroke: 'url(#_Linear19)',
                strokeWidth: '60.85px',
              }}
            />
            <path
              d="M2541.785,2758.614C2550.36,2775.765 2617.434,2819.146 2622.133,2821.495C2629.962,2825.41 2631.276,2821.05 2726.935,2852.936"
              style={{
                fill: 'none',
                stroke: 'url(#_Linear20)',
                strokeWidth: '38.16px',
              }}
            >
              <animateTransform
                className="yellowToBeBroken"
                attributeName="transform"
                begin="indefinite"
                dur="1s"
                type="translate"
                from="0 0"
                to="0 250"
                fill="freeze"
              />
              <animateTransform
                className="yellowToBeReset"
                attributeName="transform"
                begin="indefinite"
                dur="0.5s"
                type="translate"
                to="0 0"
                fill="freeze"
              />
            </path>
            <g transform="matrix(0.995623,-0.093466,0.093466,0.995623,-260.223263,143.463017)">
              <path
                d="M1459.475,2550.892C1449.583,2541 1441.227,2421.941 1475.125,2354.144C1514.066,2276.263 1505.566,2272.28 1510.898,2266.949"
                style={{
                  fill: 'none',
                  stroke: 'url(#_Linear21)',
                  strokeWidth: '80.39px',
                }}
              />
            </g>
            <path
              d="M670.246,2441.339C686.778,2435.828 808.849,2431.656 860.287,2414.51C867.669,2412.049 921.82,2397.158 922.888,2396.624"
              style={{
                fill: 'none',
                stroke: 'url(#_Linear22)',
                strokeWidth: '55.03px',
              }}
            />
            <motion.path
              d="M2411.103,2282.192C2397.995,2300.762 2407.444,2191.186 2415.168,2149.977C2422.42,2111.284 2481.733,2044.287 2494.944,2018.269"
              style={{
                fill: 'none',
                stroke: 'url(#_Linear23)',
                strokeWidth: '57.94px',
                pathLength: subPathLength,
              }}
              strokeLinecap={subPathLength.get() ? 'round' : 'butt'}
            />
            <g transform="matrix(0.995623,-0.093466,0.093466,0.995623,-260.223263,143.463017)">
              <path
                d="M1379.117,1846.963C1442.733,1719.731 1469.275,1702.028 1469.275,1702.028L1515.85,1485.537"
                style={{
                  fill: 'none',
                  stroke: 'url(#_Linear24)',
                  strokeWidth: '60.85px',
                }}
              />
            </g>
            <g transform="matrix(0.995623,-0.093466,0.093466,0.995623,-260.223263,143.463017)">
              <path
                d="M1395.759,2284.23C1379.816,2262.974 1345.121,2262.379 1243.027,1973.772C1216.146,1897.783 1154.874,1759.552 1129.492,1737.967"
                style={{
                  fill: 'none',
                  stroke: 'url(#_Linear25)',
                  strokeWidth: '80.39px',
                }}
              />
            </g>
            <g>
              <g transform="matrix(0.995623,-0.093466,0.093466,0.995623,-260.223263,143.463017) ">
                <path
                  d="M1297.245,2131.289C1264.716,2149.431 1019.882,1932.087 1025.144,1875.712"
                  style={{
                    fill: 'none',
                    stroke: 'url(#_Linear26)',
                    strokeWidth: '62.3px',
                  }}
                >
                  <animateTransform
                    className="yellowToBeBroken"
                    attributeName="transform"
                    begin="indefinite"
                    dur="1.5s"
                    type="translate"
                    from="0 0"
                    to="0 1100"
                    fill="freeze"
                  />
                  <animateTransform
                    className="yellowToBeReset"
                    attributeName="transform"
                    begin="indefinite"
                    dur="0.5s"
                    type="translate"
                    to="0 0"
                    fill="freeze"
                  />
                </path>
              </g>
            </g>
            <path
              d="M1758.304,3174.628C1783.401,3164.59 2008.832,2977.641 1985.375,2637.518C1984.865,2630.119 1896.641,2160.625 1893.673,2056.74C1892.444,2013.726 1880.937,1610.967 1967.908,1523.996"
              style={{
                fill: 'none',
                stroke: 'url(#_Linear27)',
                strokeWidth: '105.95px',
              }}
            />
            <path
              d="M1898.04,1965.038C1925.989,1959.454 2091.058,1747.808 2095.941,1668.518"
              style={{
                fill: 'none',
                stroke: 'url(#_Linear28)',
                strokeWidth: '53.57px',
              }}
            />
            <path
              d="M1972.275,2681.186C1862.502,2534.822 1687.537,2502.11 1675.091,2402.548"
              style={{
                fill: 'none',
                stroke: 'url(#_Linear29)',
                strokeWidth: '80.39px',
              }}
            />
            <path
              d="M2081.443,2868.956C2076.832,2850.511 2034.865,2682.641 1998.475,2646.252"
              style={{
                fill: 'none',
                stroke: 'url(#_Linear30)',
                strokeWidth: '80.39px',
              }}
            />
            <path
              d="M1941.707,2419.18C1953.222,2390.393 2070.465,2316.872 2133.844,1999.972C2145.275,1942.822 2248.302,1650.759 2250.175,1648.885"
              style={{
                fill: 'none',
                stroke: 'url(#_Linear31)',
                strokeWidth: '80.39px',
              }}
            />
            <path
              d="M2063.976,2200.843C2101.208,2126.38 2247.02,2148.476 2334.715,2021.806C2397.715,1930.807 2377.885,1922.365 2391.483,1895.17"
              style={{
                fill: 'none',
                stroke: 'url(#_Linear32)',
                strokeWidth: '80.39px',
              }}
            />
            <g>
              <path
                d="M2177.512,1895.17C2197.37,1855.453 2426.564,1755.14 2522.485,1563.297"
                style={{
                  fill: 'none',
                  stroke: 'url(#_Linear33)',
                  strokeWidth: '80.39px',
                }}
              />
            </g>
            <path
              d="M1676.294,3010.054C1578.561,3037.594 1449.756,2899.865 1417.173,2813.329"
              style={{
                fill: 'none',
                stroke: 'url(#_Linear34)',
                strokeWidth: '80.39px',
              }}
            />
            <path
              d="M2365.073,1729.234C2343.239,1696.483 2352.182,1522.499 2352.182,1502.163"
              style={{
                fill: 'none',
                stroke: 'url(#_Linear35)',
                strokeWidth: '53.57px',
              }}
            >
              <animateTransform
                className="yellowToBeBroken"
                attributeName="transform"
                begin="indefinite"
                dur="1.5s"
                type="translate"
                from="0 0"
                to="0 1400"
                fill="freeze"
              />
              <animateTransform
                className="yellowToBeReset"
                attributeName="transform"
                begin="indefinite"
                dur="0.5s"
                type="translate"
                to="0 0"
                fill="freeze"
              />
            </path>
            <motion.path
              d="M2529.612,2240.458C2602.533,2234.117 2580.55,2240.928 2753.923,2179.009C2762.311,2176.014 2815.058,2157.175 2854.358,2130.975"
              style={{
                fill: 'none',
                stroke: 'url(#_Linear36)',
                strokeWidth: '49.21px',
                pathLength: subPathLength,
              }}
              strokeLinecap={subPathLength.get() ? 'round' : 'butt'}
            />
            <path
              d="M1187.799,3153.52C1334.354,3169.818 1418.697,3174.911 1534.726,3153.52C1543.176,3151.962 1707.304,3203.814 1731.321,3227.831"
              style={{
                fill: 'none',
                stroke: 'url(#_Linear37)',
                strokeWidth: '111.77px',
              }}
            />
            <path
              d="M1838.712,2845.173C1793.235,2917.603 1769.854,2986.598 1763.534,3023.364C1757.922,3056.01 1745.237,3092.69 1740.837,3099.29"
              style={{
                fill: 'none',
                stroke: 'url(#_Linear38)',
                strokeWidth: '84.13px',
              }}
            />
          </motion.g>
        </motion.g>
        <defs>
          <motion.linearGradient
            id="_Linear1"
            x1={0}
            y1={0}
            x2={1}
            y2={0}
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(323.916484,284.901379,-284.901379,323.916484,982.221279,2628.579382)"
          >
            <motion.stop
              offset={0}
              style={{
                stopColor: lightColor,
                stopOpacity: 1,
              }}
            />
            <motion.stop
              offset={1}
              style={{
                stopColor: darkColor,
                stopOpacity: 1,
              }}
            />
          </motion.linearGradient>
          <linearGradient
            id="_Linear2"
            x1={0}
            y1={0}
            x2={1}
            y2={0}
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(488.761993,474.364492,-474.364492,488.761993,879.375601,2673.294894)"
          >
            <motion.stop
              offset={0}
              style={{
                stopColor: lightColor,
                stopOpacity: 1,
              }}
            />
            <motion.stop
              offset={1}
              style={{
                stopColor: darkColor,
                stopOpacity: 1,
              }}
            />
          </linearGradient>
          <linearGradient
            id="_Linear3"
            x1={0}
            y1={0}
            x2={1}
            y2={0}
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(1291.073235,-119.61399,119.61399,1291.073235,843.469314,3044.433644)"
          >
            <motion.stop
              offset={0}
              style={{
                stopColor: lightColor,
                stopOpacity: 1,
              }}
            />
            <motion.stop
              offset={1}
              style={{
                stopColor: darkColor,
                stopOpacity: 1,
              }}
            />
          </linearGradient>
          <linearGradient
            id="_Linear4"
            x1={0}
            y1={0}
            x2={1}
            y2={0}
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(703.783934,422.56158,-422.56158,703.783934,670.245692,2641.994036)"
          >
            <motion.stop
              offset={0}
              style={{
                stopColor: lightColor,
                stopOpacity: 1,
              }}
            />
            <motion.stop
              offset={1}
              style={{
                stopColor: darkColor,
                stopOpacity: 1,
              }}
            />
          </linearGradient>
          <linearGradient
            id="_Linear5"
            x1={0}
            y1={0}
            x2={1}
            y2={0}
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(654.753384,1111.179401,-1111.179401,654.753384,774.809002,1955.610927)"
          >
            <motion.stop
              offset={0}
              style={{
                stopColor: lightColor,
                stopOpacity: 1,
              }}
            />
            <motion.stop
              offset={1}
              style={{
                stopColor: darkColor,
                stopOpacity: 1,
              }}
            />
          </linearGradient>
          <linearGradient
            id="_Linear6"
            x1={0}
            y1={0}
            x2={1}
            y2={0}
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(583.246505,257.667351,-257.667351,583.246505,546.245037,2189.814207)"
          >
            <motion.stop
              offset={0}
              style={{
                stopColor: lightColor,
                stopOpacity: 1,
              }}
            />
            <motion.stop
              offset={1}
              style={{
                stopColor: darkColor,
                stopOpacity: 1,
              }}
            />
          </linearGradient>
          <linearGradient
            id="_Linear7"
            x1={0}
            y1={0}
            x2={1}
            y2={0}
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(-35.77241,508.8091,-508.8091,-35.77241,1243.807024,2058.456604)"
          >
            <motion.stop
              offset={0}
              style={{
                stopColor: lightColor,
                stopOpacity: 1,
              }}
            />
            <motion.stop
              offset={1}
              style={{
                stopColor: darkColor,
                stopOpacity: 1,
              }}
            />
          </linearGradient>
          <linearGradient
            id="_Linear8"
            x1={0}
            y1={0}
            x2={1}
            y2={0}
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(-772.128118,1090.534855,-1090.534855,-772.128118,2761.869224,1948.9036)"
          >
            <motion.stop
              offset={0}
              style={{
                stopColor: lightColor,
                stopOpacity: 1,
              }}
            />
            <motion.stop
              offset={1}
              style={{
                stopColor: darkColor,
                stopOpacity: 1,
              }}
            />
          </linearGradient>
          <linearGradient
            id="_Linear9"
            x1={0}
            y1={0}
            x2={1}
            y2={0}
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(-499.556297,219.739435,-219.739435,-499.556297,2726.935218,2384.246415)"
          >
            <motion.stop
              offset={0}
              style={{
                stopColor: lightColor,
                stopOpacity: 1,
              }}
            />
            <motion.stop
              offset={1}
              style={{
                stopColor: darkColor,
                stopOpacity: 1,
              }}
            />
          </linearGradient>
          <linearGradient
            id="_Linear10"
            x1={0}
            y1={0}
            x2={1}
            y2={0}
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(-616.44562,393.751455,-393.751455,-616.44562,2779.784861,2648.701363)"
          >
            <motion.stop
              offset={0}
              style={{
                stopColor: lightColor,
                stopOpacity: 1,
              }}
            />
            <motion.stop
              offset={1}
              style={{
                stopColor: darkColor,
                stopOpacity: 1,
              }}
            />
          </linearGradient>
          <linearGradient
            id="_Linear11"
            x1={0}
            y1={0}
            x2={1}
            y2={0}
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(-412.930933,934.554201,-934.554201,-412.930933,2153.767693,2380.408291)"
          >
            <motion.stop
              offset={0}
              style={{
                stopColor: lightColor,
                stopOpacity: 1,
              }}
            />
            <motion.stop
              offset={1}
              style={{
                stopColor: darkColor,
                stopOpacity: 1,
              }}
            />
          </linearGradient>
          <linearGradient
            id="_Linear12"
            x1={0}
            y1={0}
            x2={1}
            y2={0}
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(-344.309442,252.642643,-252.642643,-344.309442,2384.05258,2695.65265)"
          >
            <motion.stop
              offset={0}
              style={{
                stopColor: lightColor,
                stopOpacity: 1,
              }}
            />
            <motion.stop
              offset={1}
              style={{
                stopColor: darkColor,
                stopOpacity: 1,
              }}
            />
          </linearGradient>
          <linearGradient
            id="_Linear13"
            x1={0}
            y1={0}
            x2={1}
            y2={0}
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(-21.204948,1441.558223,-1441.558223,-21.204948,1731.474446,1635.895016)"
          >
            <motion.stop
              offset={0}
              style={{
                stopColor: lightColor,
                stopOpacity: 1,
              }}
            />
            <motion.stop
              offset={1}
              style={{
                stopColor: darkColor,
                stopOpacity: 1,
              }}
            />
          </linearGradient>
          <linearGradient
            id="_Linear14"
            x1={0}
            y1={0}
            x2={1}
            y2={0}
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(111.474791,788.095141,-788.095141,111.474791,1563.616516,1591.179504)"
          >
            <motion.stop
              offset={0}
              style={{
                stopColor: lightColor,
                stopOpacity: 1,
              }}
            />
            <motion.stop
              offset={1}
              style={{
                stopColor: darkColor,
                stopOpacity: 1,
              }}
            />
          </linearGradient>
          <linearGradient
            id="_Linear15"
            x1={0}
            y1={0}
            x2={1}
            y2={0}
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(-61.85705,581.008616,-581.008616,-61.85705,1753.937008,2013.741092)"
          >
            <motion.stop
              offset={0}
              style={{
                stopColor: lightColor,
                stopOpacity: 1,
              }}
            />
            <motion.stop
              offset={1}
              style={{
                stopColor: darkColor,
                stopOpacity: 1,
              }}
            />
          </linearGradient>
          <linearGradient
            id="_Linear16"
            x1={0}
            y1={0}
            x2={1}
            y2={0}
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(36.595089,412.053598,-1479.647011,131.409637,1755.058437,2034.559432)"
          >
            <motion.stop
              offset={0}
              style={{
                stopColor: lightColor,
                stopOpacity: 1,
              }}
            />
            <motion.stop
              offset={1}
              style={{
                stopColor: darkColor,
                stopOpacity: 1,
              }}
            />
          </linearGradient>
          <linearGradient
            id="_Linear17"
            x1={0}
            y1={0}
            x2={1}
            y2={0}
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(337.718254,1992.116163,-1992.116163,337.718254,1330.886134,1372.033391)"
          >
            <motion.stop
              offset={0}
              style={{
                stopColor: lightColor,
                stopOpacity: 1,
              }}
            />
            <motion.stop
              offset={1}
              style={{
                stopColor: darkColor,
                stopOpacity: 1,
              }}
            />
          </linearGradient>
          <linearGradient
            id="_Linear18"
            x1={0}
            y1={0}
            x2={1}
            y2={0}
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(-524.991775,195.564697,-195.564697,-524.991775,2511.491789,3004.75479)"
          >
            <motion.stop
              offset={0}
              style={{
                stopColor: lightColor,
                stopOpacity: 1,
              }}
            />
            <motion.stop
              offset={1}
              style={{
                stopColor: darkColor,
                stopOpacity: 1,
              }}
            />
          </linearGradient>
          <linearGradient
            id="_Linear19"
            x1={0}
            y1={0}
            x2={1}
            y2={0}
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(-315.38167,15.358983,-4.188813,-86.013183,2394.29707,3184.960505)"
          >
            <motion.stop
              offset={0}
              style={{
                stopColor: lightColor,
                stopOpacity: 1,
              }}
            />
            <motion.stop
              offset={1}
              style={{
                stopColor: darkColor,
                stopOpacity: 1,
              }}
            />
          </linearGradient>
          <linearGradient
            id="_Linear20"
            x1={0}
            y1={0}
            x2={1}
            y2={0}
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(-266.057413,130.403976,-130.403976,-266.057413,2761.869224,2876.750474)"
          >
            <motion.stop
              offset={0}
              style={{
                stopColor: lightColor,
                stopOpacity: 1,
              }}
            />
            <motion.stop
              offset={1}
              style={{
                stopColor: darkColor,
                stopOpacity: 1,
              }}
            />
          </linearGradient>
          <linearGradient
            id="_Linear21"
            x1={0}
            y1={0}
            x2={1}
            y2={0}
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(-50.159559,345.030308,-345.030308,-50.159559,1500.921218,2267.33974)"
          >
            <motion.stop
              offset={0}
              style={{
                stopColor: lightColor,
                stopOpacity: 1,
              }}
            />
            <motion.stop
              offset={1}
              style={{
                stopColor: darkColor,
                stopOpacity: 1,
              }}
            />
          </linearGradient>
          <linearGradient
            id="_Linear22"
            x1={0}
            y1={0}
            x2={1}
            y2={0}
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(275.000399,-29.514636,29.514636,275.000399,666.976919,2432.280683)"
          >
            <motion.stop
              offset={0}
              style={{
                stopColor: lightColor,
                stopOpacity: 1,
              }}
            />
            <motion.stop
              offset={1}
              style={{
                stopColor: darkColor,
                stopOpacity: 1,
              }}
            />
          </linearGradient>
          <linearGradient
            id="_Linear23"
            x1={0}
            y1={0}
            x2={1}
            y2={0}
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(-81.42231,638.450264,-638.450264,-81.42231,2475.719379,2013.741092)"
          >
            <motion.stop
              offset={0}
              style={{
                stopColor: lightColor,
                stopOpacity: 1,
              }}
            />
            <motion.stop
              offset={1}
              style={{
                stopColor: darkColor,
                stopOpacity: 1,
              }}
            />
          </linearGradient>
          <linearGradient
            id="_Linear24"
            x1={0}
            y1={0}
            x2={1}
            y2={0}
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(-164.124329,845.12363,-845.12363,-164.124329,1548.699691,1340.592792)"
          >
            <motion.stop
              offset={0}
              style={{
                stopColor: lightColor,
                stopOpacity: 1,
              }}
            />
            <motion.stop
              offset={1}
              style={{
                stopColor: darkColor,
                stopOpacity: 1,
              }}
            />
          </linearGradient>
          <linearGradient
            id="_Linear25"
            x1={0}
            y1={0}
            x2={1}
            y2={0}
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(279.47195,657.318026,-657.318026,279.47195,1125.310917,1729.797591)"
          >
            <motion.stop
              offset={0}
              style={{
                stopColor: lightColor,
                stopOpacity: 1,
              }}
            />
            <motion.stop
              offset={1}
              style={{
                stopColor: darkColor,
                stopOpacity: 1,
              }}
            />
          </linearGradient>
          <linearGradient
            id="_Linear26"
            x1={0}
            y1={0}
            x2={1}
            y2={0}
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(342.073667,330.894789,-330.894789,342.073667,1006.81481,1863.944127)"
          >
            <motion.stop
              offset={0}
              style={{
                stopColor: lightColor,
                stopOpacity: 1,
              }}
            />
            <motion.stop
              offset={1}
              style={{
                stopColor: darkColor,
                stopOpacity: 1,
              }}
            />
          </linearGradient>
          <linearGradient
            id="_Linear27"
            x1={0}
            y1={0}
            x2={1}
            y2={0}
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(-43.667516,1274.392168,-1274.392168,-43.667516,1941.707332,1754.037114)"
          >
            <motion.stop
              offset={0}
              style={{
                stopColor: lightColor,
                stopOpacity: 1,
              }}
            />
            <motion.stop
              offset={1}
              style={{
                stopColor: darkColor,
                stopOpacity: 1,
              }}
            />
          </linearGradient>
          <linearGradient
            id="_Linear28"
            x1={0}
            y1={0}
            x2={1}
            y2={0}
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(-55.981752,831.429496,-831.429496,-55.981752,2095.940994,1648.885465)"
          >
            <motion.stop
              offset={0}
              style={{
                stopColor: lightColor,
                stopOpacity: 1,
              }}
            />
            <motion.stop
              offset={1}
              style={{
                stopColor: darkColor,
                stopOpacity: 1,
              }}
            />
          </linearGradient>
          <linearGradient
            id="_Linear29"
            x1={0}
            y1={0}
            x2={1}
            y2={0}
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(177.845614,284.816863,-284.816863,177.845614,1809.237561,2455.756327)"
          >
            <motion.stop
              offset={0}
              style={{
                stopColor: lightColor,
                stopOpacity: 1,
              }}
            />
            <motion.stop
              offset={1}
              style={{
                stopColor: darkColor,
                stopOpacity: 1,
              }}
            />
          </linearGradient>
          <linearGradient
            id="_Linear30"
            x1={0}
            y1={0}
            x2={1}
            y2={0}
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(303.84492,1087.44375,-1087.44375,303.84492,1992.79185,2628.784503)"
          >
            <motion.stop
              offset={0}
              style={{
                stopColor: lightColor,
                stopOpacity: 1,
              }}
            />
            <motion.stop
              offset={1}
              style={{
                stopColor: darkColor,
                stopOpacity: 1,
              }}
            />
          </linearGradient>
          <linearGradient
            id="_Linear31"
            x1={0}
            y1={0}
            x2={1}
            y2={0}
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(-240.779899,898.677345,-898.677345,-240.779899,2177.511916,1782.508177)"
          >
            <motion.stop
              offset={0}
              style={{
                stopColor: lightColor,
                stopOpacity: 1,
              }}
            />
            <motion.stop
              offset={1}
              style={{
                stopColor: darkColor,
                stopOpacity: 1,
              }}
            />
          </linearGradient>
          <linearGradient
            id="_Linear32"
            x1={0}
            y1={0}
            x2={1}
            y2={0}
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(-382.212767,535.713043,-535.713043,-382.212767,2413.316334,1944.601918)"
          >
            <motion.stop
              offset={0}
              style={{
                stopColor: lightColor,
                stopOpacity: 1,
              }}
            />
            <motion.stop
              offset={1}
              style={{
                stopColor: darkColor,
                stopOpacity: 1,
              }}
            />
          </linearGradient>
          <linearGradient
            id="_Linear33"
            x1={0}
            y1={0}
            x2={1}
            y2={0}
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(-368.797892,567.118731,-567.118731,-368.797892,2465.368042,1673.339288)"
          >
            <motion.stop
              offset={0}
              style={{
                stopColor: lightColor,
                stopOpacity: 1,
              }}
            />
            <motion.stop
              offset={1}
              style={{
                stopColor: darkColor,
                stopOpacity: 1,
              }}
            />
          </linearGradient>
          <linearGradient
            id="_Linear34"
            x1={0}
            y1={0}
            x2={1}
            y2={0}
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(355.861468,275.535001,-275.535001,355.861468,1398.07554,2729.219789)"
          >
            <motion.stop
              offset={0}
              style={{
                stopColor: lightColor,
                stopOpacity: 1,
              }}
            />
            <motion.stop
              offset={1}
              style={{
                stopColor: darkColor,
                stopOpacity: 1,
              }}
            />
          </linearGradient>
          <linearGradient
            id="_Linear35"
            x1={0}
            y1={0}
            x2={1}
            y2={0}
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(20.427675,344.89834,-344.89834,20.427675,2350.368521,1570.982623)"
          >
            <motion.stop
              offset={0}
              style={{
                stopColor: lightColor,
                stopOpacity: 1,
              }}
            />
            <motion.stop
              offset={1}
              style={{
                stopColor: darkColor,
                stopOpacity: 1,
              }}
            />
          </linearGradient>
          <linearGradient
            id="_Linear36"
            x1={0}
            y1={0}
            x2={1}
            y2={0}
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(-418.090006,358.073639,-358.073639,-418.090006,2896.045192,2122.241322)"
          >
            <motion.stop
              offset={0}
              style={{
                stopColor: lightColor,
                stopOpacity: 1,
              }}
            />
            <motion.stop
              offset={1}
              style={{
                stopColor: darkColor,
                stopOpacity: 1,
              }}
            />
          </linearGradient>
          <linearGradient
            id="_Linear37"
            x1={0}
            y1={0}
            x2={1}
            y2={0}
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(554.576688,0,0,78.927439,1135.397819,3057.654775)"
          >
            <motion.stop
              offset={0}
              style={{
                stopColor: lightColor,
                stopOpacity: 1,
              }}
            />
            <motion.stop
              offset={1}
              style={{
                stopColor: darkColor,
                stopOpacity: 1,
              }}
            />
          </linearGradient>
          <linearGradient
            id="_Linear38"
            x1={0}
            y1={0}
            x2={1}
            y2={0}
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(-65.379184,348.913693,-649.516258,-121.705865,1823.68295,2845.172994)"
          >
            <motion.stop
              offset={0}
              style={{
                stopColor: lightColor,
                stopOpacity: 1,
              }}
            />
            <motion.stop
              offset={1}
              style={{
                stopColor: darkColor,
                stopOpacity: 1,
              }}
            />
          </linearGradient>
        </defs>
      </motion.svg>
    </>
  );
};
export default PinkCoral;
