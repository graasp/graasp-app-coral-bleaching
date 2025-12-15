import { useCallback, useEffect } from 'react';

import { animate, mapValue, motion, motionValue } from 'motion/react';

import { DEATH_DAY, KELP_SPEED } from '@/config/constants';
import { CoralStatus, useContext, useMaxValue, useStatus } from '@/utils/hooks';

const zooxanthelesAnimations = (
  <>
    <animateTransform
      className="zooAnimate"
      attributeName="transform"
      begin="indefinite"
      dur="6s"
      type="translate"
      from="0 0"
      to="0 -150"
      fill="freeze"
    />
    <animateTransform
      className="zooAnimateReset"
      attributeName="transform"
      begin="indefinite"
      dur="1s"
      type="translate"
      to="0 0"
      fill="freeze"
    />
  </>
);

const SvgComponent = (props) => {
  const {
    data: { reset },
  } = useContext();
  const { kelpAmount, status, dyingFactor } = useStatus('id', {
    initialKelpAmount: props.initialKelpAmount,
    deathSpeed: props.deathSpeed,
  });

  const maxKelpAmount = useMaxValue(props.initialKelpAmount, kelpAmount);

  const recover = useCallback(() => {
    animate('#polyp #zooGroup circle', { fill: '#499f29' }, { duration: 1 });
    // eslint-disable-next-line no-restricted-syntax
    for (const c of document.getElementsByClassName('zooAnimateReset')) {
      (c as SVGAnimateTransformElement).beginElement();
    }
  }, []);

  // reset animations
  useEffect(() => {
    recover();
  }, [reset]);

  console.log(Math.abs(kelpAmount - 75), status, KELP_SPEED * 2);

  useEffect(() => {
    // on loosing 75%, loose kelp animation
    if (
      Math.abs(kelpAmount - 75) <= KELP_SPEED &&
      status === CoralStatus.Dying
    ) {
      // zooxantheles in polyp
      animate(
        '#polyp #zooGroup circle',
        { fill: 'rgba(0, 0, 0, 0)' },
        { duration: 4 },
      );
      // eslint-disable-next-line no-restricted-syntax
      for (const c of document.getElementsByClassName('zooAnimate')) {
        (c as SVGAnimateTransformElement).beginElement();
      }

      // free zooxantheles
      animate([
        [
          '#polyp #zooFree circle',
          { fill: '#499f29' },
          {
            duration: 1,
          },
        ],
        [
          '#polyp #zooFree circle',
          { fill: 'rgba(0, 0, 0, 0)' },
          { duration: 4 },
        ],
      ]);

      // on recovering 75%, recover kelp animation
    } else if (
      Math.abs(kelpAmount - 75) <= KELP_SPEED &&
      status === CoralStatus.Growing
    ) {
      // eslint-disable-next-line no-restricted-syntax
      recover();
    }
  }, [status, kelpAmount]);

  const lightColor = mapValue(
    motionValue(kelpAmount),
    [100, 60],
    ['rgba(255, 179, 188, 1)', 'rgb(255,255,255)'],
  );

  const darkColor = mapValue(
    motionValue(kelpAmount),
    [100, 60],
    ['rgba(255, 110, 127, 1)', 'rgb(205,205,205)'],
  );

  const opacity = mapValue(motionValue(kelpAmount), [0, 75], [0, 1]);
  const centerOpacity = mapValue(motionValue(kelpAmount), [10, 75], [0, 1]);

  const zooOpacity = 1; //mapValue(motionValue(kelpAmount), [50, 75], [0, 1]);

  const zooxantheles = [
    { cx: 130, cy: 370 },
    { cx: 150, cy: 360 },
    { cx: 180, cy: 350 },
    { cx: 180, cy: 200 },
    { cx: 160, cy: 170 },
    { cx: 120, cy: 100 },
    { cx: 80, cy: 110 },
    { cx: 250, cy: 140 },
    { cx: 270, cy: 150 },
    { cx: 320, cy: 130 },
    { cx: 340, cy: 150 },
    { cx: 420, cy: 120 },
    { cx: 400, cy: 130 },
    { cx: 600, cy: 150 },
    { cx: 650, cy: 320 },
    { cx: 670, cy: 350 },
    { cx: 550, cy: 350 },
    { cx: 600, cy: 450 },
  ];

  return (
    <svg
      id="polyp"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      xmlSpace="preserve"
      style={{
        fillRule: 'evenodd',
        clipRule: 'evenodd',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        strokeMiterlimit: 1.5,
      }}
      viewBox="0 0 695 509"
      {...props}
    >
      <g id="zooFree">
        {zooxantheles.map(({ cx, cy }) => (
          <motion.circle
            cx={cx}
            cy={cy}
            r={4.504}
            fill="transparent"
            opacity={zooOpacity}
          >
            <animateTransform
              className="zooAnimate"
              attributeName="transform"
              begin="indefinite"
              dur={(cx % 2) + 5 + 's'}
              type="translate"
              from="0 0"
              to="0 -150"
              fill="freeze"
            />
            <animateTransform
              className="zooAnimateReset"
              attributeName="transform"
              begin="indefinite"
              dur="1s"
              type="translate"
              to="0 0"
              fill="freeze"
            />
          </motion.circle>
        ))}
      </g>
      <g transform="matrix(0.33505,0.664587,-1.064345,0.536587,385.251678,-511.850197)">
        <path
          d="M860.283,349.33C819.744,380.867 784.262,462.617 686.702,526.495L696.923,526.502C748.347,508.576 888.606,434.899 891.841,349.829C882.825,344.352 864.099,345.085 860.283,349.33Z"
          style={{
            fill: 'url(#x)',
          }}
        />
      </g>
      <path
        d="M552 675c-1.213-2.259 27.725-45.734 39-57-4.323-4.175 8.673-81.825 19-81-7.205-73.525-9.724-91.214 32-89 5.572-7.389 40.331-16.534 46-8 4.946-9.223 53.698-3.756 53 4 4.833-5.821 45.538-2.108 48 9 12.704-6.049 29.427 3.331 32 7 45.484-7.169 23.843 60.164 15 88 8.119 21.569 9.377 37.365 5 60.144 10.937 3.121 32.737 50.71 38 66.856H552Z"
        style={{
          fill: 'url(#a)',
          stroke: '#fff',
          strokeWidth: 1,
        }}
        transform="translate(-353.448 -168.02)"
      />
      <path
        d="M591 618c6.765-4.702 14.071-.347 24 0 16.709-4.063 32.494-4.152 50 2 8.896-5.774 35.491-2.198 56 5 6.227-6.309 39.431-7.303 52-4 14.942-5.903 23.776-7.795 41-6 13.864-7.22 18.007-8.785 28-7"
        style={{
          fill: 'none',
          stroke: 'url(#b)',
          strokeWidth: 4,
        }}
        transform="translate(-353.448 -168.02)"
      />
      <path
        d="M641 448c-11.74 18.683-7.706 45.876-8 91-10.208 31.725-14.767 56.659-18 80-9.763 5.473-21.633 39.302-28 56"
        style={{
          fill: 'none',
          stroke: 'url(#c)',
          strokeWidth: 4,
        }}
        transform="translate(-353.448 -168.02)"
      />
      <path
        d="M610 537c7.868-1.581 13.828 2.042 22.033 4.839 16.392-5.294 39.292-4.096 46.967.161 15.124-4.5 41.19-7.995 55 3.753 14.781-3.965 33.319-5.632 47 .144 17.947-4.72 25.436-4.155 33-.144 13.693-2.652 18.445-1.158 22 2.247"
        style={{
          fill: 'none',
          stroke: 'url(#d)',
          strokeWidth: 4,
        }}
        transform="translate(-353.448 -168.02)"
      />
      <path
        d="M688 440c-7.331 22.438-5.705 50.872-7 95-8.209 27.53-14.142 57.42-16 84-12.118 23.093-12.855 37.63-17 56"
        style={{
          fill: 'none',
          stroke: 'url(#e)',
          strokeWidth: 4,
        }}
        transform="translate(-353.448 -168.02)"
      />
      <path
        d="M741 444c6.784 36.554-2.484 59.696-8 99 .206 29.461-4.06 57.887-14 85-.529 20.362-4.267 35.351-10 47"
        style={{
          fill: 'none',
          stroke: 'url(#f)',
          strokeWidth: 4,
        }}
        transform="translate(-353.448 -168.02)"
      />
      <path
        d="M790 453c9.597 30.596-1.08 71.853-9 92.897.514 27.963-1.89 46.511-8 73.103-.187 20.544 1.13 41.967-3 56"
        style={{
          fill: 'none',
          stroke: 'url(#g)',
          strokeWidth: 4,
        }}
        transform="translate(-353.448 -168.02)"
      />
      <path
        d="M822 460c8.838 38.248 1.932 51.876-8 87 4.257 9.597 5.804 27.299 0 67 3.781 20.605 14.714 41.488 10 61"
        style={{
          fill: 'none',
          stroke: 'url(#h)',
          strokeWidth: 4,
        }}
        transform="translate(-353.448 -168.02)"
      />
      <path
        d="m273 618 4 13.891-6 8.109-5-11 7-11Z"
        style={{
          fill: '#bcbcbf',
        }}
        transform="translate(108.552 -254.014)"
      />
      <path
        d="m273 618 4 8.891L270 640l-4-12 7-10Z"
        style={{
          fill: '#bcbcbf',
        }}
        transform="translate(157.552 -251.123)"
      />
      <path
        d="m276 618 1 13.891-4 8.109-7-8 10-14Z"
        style={{
          fill: '#b2b2b4',
        }}
        transform="translate(146.552 -180.123)"
      />
      <path
        d="m273 618 5 10.891L269 641l-3-12 7-11Z"
        style={{
          fill: '#b2b2b4',
        }}
        transform="translate(96.033 -174.123)"
      />
      <path
        d="m274 615 5 9.891L271 636l-3-12 6-9Z"
        style={{
          fill: '#bcbcbf',
        }}
        transform="translate(53.033 -251.123)"
      />
      <path
        d="m273 614 4 14.891L269 641l-3-12 7-15Z"
        style={{
          fill: '#bcbcbf',
        }}
        transform="translate(7.033 -257.123)"
      />
      <path
        d="m273 618 4 11-13 11 1-11 8-11Z"
        style={{
          fill: '#b2b2b4',
        }}
        transform="translate(-8.967 -180.123)"
      />
      <path
        d="m271 618 6 11-11 11v-11l5-11Z"
        style={{
          fill: '#b2b2b4',
        }}
        transform="translate(42.033 -180.123)"
      />
      <path
        d="m273 618 5 9.891L273 640l-7-12 7-10Z"
        style={{
          fill: '#bcbcbf',
        }}
        transform="translate(190.033 -251.123)"
      />
      <path
        d="m272 619 6 10-5 11.5-7-8.5 6-13Z"
        style={{
          fill: '#b2b2b4',
        }}
        transform="translate(190.033 -185.123)"
      />
      <path
        d="M874.395 347.514c-75.256 90.724-45.047 125.954-96.424 190.053-34.953 16.707 5.652 31.393 7.913 6.436 123.402-106.152 89.515-111.224 114.693-177.722l-26.182-18.767Z"
        style={{
          fill: 'url(#i)',
        }}
        transform="matrix(-.82688 .50765 -.5953 -.96965 1323.853 149.692)"
      />
      <path
        d="M855.767 340.769c-45.533 35.75-34.909 99.002-113.753 170.341-42.374 6.507-9.298 39.325 11.639 8.129C877.281 456.112 880.498 443.926 894 375l-38.233-34.231Z"
        style={{
          fill: 'url(#j)',
        }}
        transform="matrix(-.44007 .64386 -.84434 -.5771 1046.583 -102.834)"
      />
      <path
        d="M847.432 346.153c-42.19 11.317-30.412 99.74-164.485 156.698-33.409 14.193 4.19 29.404 10.375 6.048 66.57-30.301 154.014-29.077 182.749-141.4l-28.639-21.346Z"
        style={{
          fill: 'url(#k)',
        }}
        transform="matrix(-.23811 .96989 -1.29732 -.3185 1015.553 -464.711)"
      />
      <path
        d="M854.413 332.876c-66.973-3.758-43.006 121.554-157.74 168.54-57.656 1.692-5.84 28.472 11.639 8.129 98.417-39.159 164.399-83.892 176.077-139.86l-29.976-36.809Z"
        style={{
          fill: 'url(#l)',
        }}
        transform="matrix(.0312 .80284 -1.37354 .05336 779.356 -454.77)"
      />
      <path
        d="M868.052 343.362c-80.932 47.391-72.257 151.123-150.926 172.237-35.337-5.782-17.279 28.852 7.419 11.601C793.036 513.484 846.151 481.024 894 375l-25.948-31.638Z"
        style={{
          fill: 'url(#m)',
        }}
        transform="matrix(.42834 .84958 .8086 -.40768 -276.22 -350.038)"
      />
      <path
        d="M849.983 334.739c-125.689 84.847-56.012 201.579-121.564 260.541-51.884 6.149-16.972 30.693 8.465 8.607C840.787 544.968 872.707 483.742 894 375l-44.017-40.261Z"
        style={{
          fill: 'url(#n)',
        }}
        transform="matrix(.25815 .51202 .91313 -.46037 -140.392 -33.644)"
      />

      <path
        d="M840.699 341.645c-70.494 11.291 11.255 145.044-81.432 185.814-48.198 2.895-9.268 23.067 6.784 8.496C789.159 530.529 859.483 483.628 894 375l-53.301-33.355Z"
        style={{
          fill: 'url(#o)',
        }}
        transform="matrix(.15052 .83725 1.44746 -.26022 -221.03 -368.017)"
      />
      <filter id="blur">
        <feGaussianBlur stdDeviation="3.5" edgeMode="duplicate" />
      </filter>
      <motion.ellipse
        cx="371.541"
        cy="255.26"
        rx="50px"
        ry="15px"
        fill="darkred"
        filter="url('#blur')"
        opacity={centerOpacity}
      />
      <g transform="matrix(-0.023913,0.842616,1.811582,0.051411,322.931706,-380.833951)">
        <path
          d="M856.077,348.281C778.523,370.114 897.874,429.632 837.769,494.782C798.367,498.973 829.945,513.412 848.729,499.27C891.317,468.528 879.91,457.61 892.102,380.792L856.077,348.281Z"
          style={{
            fill: 'url(#o1)',
          }}
        />
      </g>

      <g transform="matrix(-1.25552 0 0 1.22954 1529.131 -197.363)">
        <path
          d="M865.767,361.367C749.155,379.81 712.722,420.613 693.959,485.725C685.51,515.045 712.684,502.291 703.963,486.848C733.225,403.295 845.55,453.247 894,375C888.157,367.829 876.452,361.31 865.767,361.367Z"
          style={{
            fill: 'url(#_20)',
          }}
        />
      </g>
      <g id="zooGroup">
        <motion.use
          xlinkHref="#r"
          width={106}
          height={28}
          x={318.541}
          y={245.26}
          opacity={opacity}
        />
        <g transform="matrix(-1.255517,0,0,1.229544,2053.432189,-94.725521)">
          <path
            d="M865.767,361.367C749.155,379.81 712.722,420.613 693.959,485.725C685.51,515.045 712.684,502.291 703.963,486.848C733.225,403.295 845.55,453.247 894,375C888.157,367.829 876.452,361.31 865.767,361.367Z"
            style={{
              fill: 'url(#_20)',
            }}
          />
        </g>
        <motion.path
          d="M995.687 464.082c7.584.796 11.779 4.982 8.776 17.41-151.058 62.636-279.243-14.387-328.451-51.829-38.972 1.123-16.713-47.987 9.304-10.763 221.162 57.112 239.567-11.071 310.371 45.182Zm-40.361-9.087c-47.148-10.019-146.048 10.266-246.723-20.295l3.418 6.796c36.308 24.557 161.72 78.237 253.347 34.74 2.809-8.931-4.245-20.983-10.042-21.241Z"
          style={{
            fill: 'url(#u)',
          }}
          transform="translate(-654.945 -208.304)"
          opacity={opacity}
        />
        <g transform="matrix(.94232 .26807 -.26807 .94232 -655.187 -445.98)">
          <motion.circle
            cx={875.504}
            cy={459.578}
            r={4.504}
            style={{
              fill: '#31641e',
            }}
            opacity={zooOpacity}
          >
            {zooxanthelesAnimations}
          </motion.circle>
        </g>
        <motion.path
          d="M889 458.806v7.463c0 2.059-1.543 3.731-3.444 3.731h-19.112c-1.901 0-3.444-1.672-3.444-3.731v-7.463c0-2.06 1.543-3.732 3.444-3.732h19.112c1.901 0 3.444 1.672 3.444 3.732Z"
          style={{
            fill: 'none',
            stroke: '#79738c',
            strokeWidth: '1.59px',
          }}
          transform="matrix(.6289 .1789 -.16513 .58045 -429.729 -204.025)"
          opacity={opacity}
        />
        <g transform="matrix(.95004 .23926 -.23927 .95004 -657.455 -419.701)">
          <motion.circle
            cx={875.504}
            cy={459.578}
            r={4.504}
            fill="#499f29"
            opacity={zooOpacity}
          >
            <animateTransform
              className="zooAnimate"
              attributeName="transform"
              begin="indefinite"
              dur="6s"
              type="translate"
              from="0 0"
              to="0 -150"
              fill="freeze"
            />
            <animateTransform
              className="zooAnimateReset"
              attributeName="transform"
              begin="indefinite"
              dur="1s"
              type="translate"
              to="0 0"
              fill="freeze"
            />
          </motion.circle>
        </g>
        <motion.path
          d="M889 458.806v7.463c0 2.059-1.543 3.731-3.444 3.731h-19.112c-1.901 0-3.444-1.672-3.444-3.731v-7.463c0-2.06 1.543-3.732 3.444-3.732h19.112c1.901 0 3.444 1.672 3.444 3.732Z"
          style={{
            fill: 'none',
            stroke: '#79738c',
            strokeWidth: '1.59px',
          }}
          transform="matrix(.63405 .15968 -.14738 .5852 -424.737 -184.721)"
          opacity={opacity}
        />
        <motion.circle
          cx={875.504}
          cy={459.578}
          r={4.504}
          fill="#499f29"
          transform="matrix(.9571 .2093 -.2093 .9571 -659.566 -392.659)"
        />
        <motion.path
          d="M889 458.806v7.463c0 2.059-1.543 3.731-3.444 3.731h-19.112c-1.901 0-3.444-1.672-3.444-3.731v-7.463c0-2.06 1.543-3.732 3.444-3.732h19.112c1.901 0 3.444 1.672 3.444 3.732Z"
          style={{
            fill: 'none',
            stroke: '#79738c',
            strokeWidth: '1.59px',
          }}
          transform="matrix(.63875 .13968 -.12892 .58955 -419.58 -165.107)"
          opacity={opacity}
        />
        <g transform="matrix(.96335 .1783 -.1783 .96335 -661.314 -364.914)">
          <motion.circle cx={875.504} cy={459.578} r={4.504} fill="#499f29">
            {zooxanthelesAnimations}
          </motion.circle>
        </g>
        <motion.path
          d="M889 458.806v7.463c0 2.059-1.543 3.731-3.444 3.731h-19.112c-1.901 0-3.444-1.672-3.444-3.731v-7.463c0-2.06 1.543-3.732 3.444-3.732h19.112c1.901 0 3.444 1.672 3.444 3.732Z"
          style={{
            fill: 'none',
            stroke: '#79738c',
            strokeWidth: '1.59px',
          }}
          transform="matrix(.64293 .11899 -.10982 .5934 -414.107 -145.228)"
          opacity={opacity}
        />
        <g transform="matrix(.96868 .14663 -.14663 .96868 -662.45 -336.758)">
          <motion.circle cx={875.504} cy={459.578} r={4.504} fill="#499f29">
            {zooxanthelesAnimations}
          </motion.circle>
        </g>
        <motion.path
          d="M889 458.806v7.463c0 2.059-1.543 3.731-3.444 3.731h-19.112c-1.901 0-3.444-1.672-3.444-3.731v-7.463c0-2.06 1.543-3.732 3.444-3.732h19.112c1.901 0 3.444 1.672 3.444 3.732Z"
          style={{
            fill: 'none',
            stroke: '#79738c',
            strokeWidth: '1.59px',
          }}
          transform="matrix(.64648 .09786 -.09032 .59668 -408.178 -125.29)"
          opacity={opacity}
        />
        <g transform="matrix(.97296 .11482 -.11482 .97296 -662.696 -308.589)">
          <motion.circle cx={875.504} cy={459.578} r={4.504} fill="#499f29">
            {zooxanthelesAnimations}
          </motion.circle>
        </g>
        <motion.path
          d="M889 458.806v7.463c0 2.059-1.543 3.731-3.444 3.731h-19.112c-1.901 0-3.444-1.672-3.444-3.731v-7.463c0-2.06 1.543-3.732 3.444-3.732h19.112c1.901 0 3.444 1.672 3.444 3.732Z"
          style={{
            fill: 'none',
            stroke: '#79738c',
            strokeWidth: '1.59px',
          }}
          transform="matrix(.64934 .07663 -.07072 .59932 -401.632 -105.564)"
          opacity={opacity}
        />
        <g transform="matrix(.97617 .0832 -.0832 .97617 -661.747 -280.68)">
          <motion.circle cx={875.504} cy={459.578} r={4.504} fill="#31641e">
            {zooxanthelesAnimations}
          </motion.circle>
        </g>
        <motion.path
          d="M889 458.806v7.463c0 2.059-1.543 3.731-3.444 3.731h-19.112c-1.901 0-3.444-1.672-3.444-3.731v-7.463c0-2.06 1.543-3.732 3.444-3.732h19.112c1.901 0 3.444 1.672 3.444 3.732Z"
          style={{
            fill: 'none',
            stroke: '#79738c',
            strokeWidth: '1.59px',
          }}
          transform="matrix(.65149 .05553 -.05125 .6013 -394.235 -86.23)"
          opacity={opacity}
        />
        <g transform="matrix(.97828 .05286 -.05286 .97828 -659.288 -253.97)">
          <motion.circle
            cx={875.504}
            cy={459.578}
            r={4.504}
            fill="#31641e"
            transform="matrix(.97828 .05286 -.05286 .97828 -659.288 -253.97)"
          >
            {zooxanthelesAnimations}
          </motion.circle>
        </g>
        <path
          d="M889 458.806v7.463c0 2.059-1.543 3.731-3.444 3.731h-19.112c-1.901 0-3.444-1.672-3.444-3.731v-7.463c0-2.06 1.543-3.732 3.444-3.732h19.112c1.901 0 3.444 1.672 3.444 3.732Z"
          style={{
            fill: 'none',
            stroke: '#79738c',
            strokeWidth: '1.59px',
          }}
          transform="matrix(.6529 .03528 -.03256 .6026 -385.87 -67.915)"
          opacity={opacity}
        />
        <g transform="matrix(.9794 .0245 -.0245 .9794 -654.978 -229.076)">
          <motion.circle cx={875.504} cy={459.578} r={4.504} fill="#499f29">
            {zooxanthelesAnimations}
          </motion.circle>
        </g>
        <motion.path
          d="M889 458.806v7.463c0 2.059-1.543 3.731-3.444 3.731h-19.112c-1.901 0-3.444-1.672-3.444-3.731v-7.463c0-2.06 1.543-3.732 3.444-3.732h19.112c1.901 0 3.444 1.672 3.444 3.732Z"
          style={{
            fill: 'none',
            stroke: '#79738c',
            strokeWidth: '1.59px',
          }}
          transform="matrix(.65364 .01636 -.0151 .6033 -376.287 -51.018)"
          opacity={opacity}
        />
        <motion.circle
          cx={875.504}
          cy={459.578}
          r={4.504}
          fill="#31641e"
          transform="matrix(.97965 .01095 -.01095 .97965 -643.082 -217.136)"
        />
        <motion.path
          d="M889 458.806v7.463c0 2.059-1.543 3.731-3.444 3.731h-19.112c-1.901 0-3.444-1.672-3.444-3.731v-7.463c0-2.06 1.543-3.732 3.444-3.732h19.112c1.901 0 3.444 1.672 3.444 3.732Z"
          style={{
            fill: 'none',
            stroke: '#79738c',
            strokeWidth: '1.59px',
          }}
          transform="matrix(.6538 .0073 -.00674 .60344 -361.952 -42.954)"
          opacity={opacity}
        />
        <motion.circle
          cx={875.504}
          cy={459.578}
          r={4.504}
          fill="#31641e"
          transform="matrix(.97948 -.02128 .02128 .97948 -639.387 -189.237)"
        />
        <path
          d="M889 458.806v7.463c0 2.059-1.543 3.731-3.444 3.731h-19.112c-1.901 0-3.444-1.672-3.444-3.731v-7.463c0-2.06 1.543-3.732 3.444-3.732h19.112c1.901 0 3.444 1.672 3.444 3.732Z"
          style={{
            fill: 'none',
            stroke: '#79738c',
            strokeWidth: '1.59px',
          }}
          transform="matrix(.6537 -.0142 .01311 .60334 -352.68 -24.396)"
        />
        <motion.circle
          cx={875.504}
          cy={459.578}
          r={4.504}
          fill="#31641e"
          transform="matrix(.97906 -.03582 .03582 .97906 -627.114 -176.935)"
        />
        <path
          d="M889 458.806v7.463c0 2.059-1.543 3.731-3.444 3.731h-19.112c-1.901 0-3.444-1.672-3.444-3.731v-7.463c0-2.06 1.543-3.732 3.444-3.732h19.112c1.901 0 3.444 1.672 3.444 3.732Z"
          style={{
            fill: 'none',
            stroke: '#79738c',
            strokeWidth: '1.59px',
          }}
          transform="matrix(.65341 -.0239 .02207 .60308 -337.99 -16.37)"
        />
        <motion.circle
          cx={875.504}
          cy={459.578}
          r={4.504}
          fill="#499f29"
          transform="matrix(.97881 -.04193 .04193 .97881 -611.187 -172.257)"
        />
        <path
          d="M889 458.806v7.463c0 2.059-1.543 3.731-3.444 3.731h-19.112c-1.901 0-3.444-1.672-3.444-3.731v-7.463c0-2.06 1.543-3.732 3.444-3.732h19.112c1.901 0 3.444 1.672 3.444 3.732Z"
          style={{
            fill: 'none',
            stroke: '#79738c',
            strokeWidth: '1.59px',
          }}
          transform="matrix(.65325 -.02798 .02583 .60293 -321.068 -13.498)"
        />
        <motion.circle
          cx={875.504}
          cy={459.578}
          r={4.504}
          fill="#31641e"
          transform="matrix(.979 -.0371 .0371 .979 -590.432 -177.334)"
        />
        <path
          d="M889 458.806v7.463c0 2.059-1.543 3.731-3.444 3.731h-19.112c-1.901 0-3.444-1.672-3.444-3.731v-7.463c0-2.06 1.543-3.732 3.444-3.732h19.112c1.901 0 3.444 1.672 3.444 3.732Z"
          style={{
            fill: 'none',
            stroke: '#79738c',
            strokeWidth: '1.59px',
          }}
          transform="matrix(.65338 -.02476 .02285 .60305 -301.1 -17.143)"
        />
        <motion.circle
          cx={875.504}
          cy={459.578}
          r={4.504}
          fill="#31641e"
          transform="matrix(.97956 -.01729 .01729 .97956 -567.86 -194.17)"
        />
        <path
          d="M889 458.806v7.463c0 2.059-1.874 3.731-4.182 3.731h-17.636c-2.308 0-4.182-1.672-4.182-3.731v-7.463c0-2.06 1.874-3.732 4.182-3.732h17.636c2.308 0 4.182 1.672 4.182 3.732Z"
          style={{
            fill: 'none',
            stroke: '#79738c',
            strokeWidth: '1.75px',
          }}
          transform="matrix(.53837 -.0095 .01065 .60339 -177.345 -29.922)"
        />
        <motion.circle
          cx={875.504}
          cy={459.578}
          r={4.504}
          fill="#31641e"
          transform="matrix(.96331 .17849 -.17849 .96331 -585.812 -315.607)"
        />
        <path
          d="M889 458.806v7.463c0 2.059-1.543 3.731-3.444 3.731h-19.112c-1.901 0-3.444-1.672-3.444-3.731v-7.463c0-2.06 1.543-3.732 3.444-3.732h19.112c1.901 0 3.444 1.672 3.444 3.732Z"
          style={{
            fill: 'none',
            stroke: '#79738c',
            strokeWidth: '1.59px',
          }}
          transform="matrix(.6429 .11912 -.10994 .59338 -338.65 -95.87)"
        />
        <motion.circle
          cx={875.504}
          cy={459.578}
          r={4.504}
          fill="#31641e"
          transform="matrix(.93047 .30669 -.30669 .93047 -533.003 -421.001)"
        />
        <path
          d="M889 458.806v7.463c0 2.059-1.543 3.731-3.444 3.731h-19.112c-1.901 0-3.444-1.672-3.444-3.731v-7.463c0-2.06 1.543-3.732 3.444-3.732h19.112c1.901 0 3.444 1.672 3.444 3.732Z"
          style={{
            fill: 'none',
            stroke: '#79738c',
            strokeWidth: '1.59px',
          }}
          transform="matrix(.62099 .20468 -.18891 .57315 -317.71 -169.959)"
        />
        <motion.circle
          cx={875.504}
          cy={459.578}
          r={4.504}
          fill="#31641e"
          transform="matrix(.8611 .46726 -.46726 .8611 -481.475 -567.485)"
        />
        <path
          d="M889 458.806v7.463c0 2.059-1.543 3.731-3.444 3.731h-19.112c-1.901 0-3.444-1.672-3.444-3.731v-7.463c0-2.06 1.543-3.732 3.444-3.732h19.112c1.901 0 3.444 1.672 3.444 3.732Z"
          style={{
            fill: 'none',
            stroke: '#79738c',
            strokeWidth: '1.59px',
          }}
          transform="matrix(.5747 .31184 -.28782 .53042 -314.253 -282.16)"
        />
        <motion.circle
          cx={875.504}
          cy={459.578}
          r={4.504}
          fill="#31641e"
          transform="matrix(.90948 .36424 -.36424 .90948 -505.102 -467.62)"
        />
        <path
          d="M889 458.806v7.463c0 2.059-1.543 3.731-3.444 3.731h-19.112c-1.901 0-3.444-1.672-3.444-3.731v-7.463c0-2.06 1.543-3.732 3.444-3.732h19.112c1.901 0 3.444 1.672 3.444 3.732Z"
          style={{
            fill: 'none',
            stroke: '#79738c',
            strokeWidth: '1.59px',
          }}
          transform="matrix(.60698 .24309 -.22436 .56022 -305.92 -203.612)"
        />
        <motion.circle
          cx={875.504}
          cy={459.578}
          r={4.504}
          fill="#499f29"
          transform="matrix(.89001 .40953 -.40953 .89001 -483.986 -505.287)"
        />
        <path
          d="M889 458.806v7.463c0 2.059-1.543 3.731-3.444 3.731h-19.112c-1.901 0-3.444-1.672-3.444-3.731v-7.463c0-2.06 1.543-3.732 3.444-3.732h19.112c1.901 0 3.444 1.672 3.444 3.732Z"
          style={{
            fill: 'none',
            stroke: '#79738c',
            strokeWidth: '1.59px',
          }}
          transform="matrix(.59398 .27331 -.25226 .54823 -298.336 -231.595)"
        />
        <motion.circle
          cx={875.504}
          cy={459.578}
          r={4.504}
          fill="#499f29"
          transform="matrix(.97907 .03545 -.03545 .97907 -611.347 -192.771)"
        />
        <path
          d="M889 458.806v7.463c0 2.059-1.543 3.731-3.444 3.731h-19.112c-1.901 0-3.444-1.672-3.444-3.731v-7.463c0-2.06 1.543-3.732 3.444-3.732h19.112c1.901 0 3.444 1.672 3.444 3.732Z"
          style={{
            fill: 'none',
            stroke: '#79738c',
            strokeWidth: '1.59px',
          }}
          transform="matrix(.65342 .02366 -.02184 .60309 -334.662 -11.61)"
        />
        <motion.circle
          cx={875.504}
          cy={459.578}
          r={4.504}
          fill="#31641e"
          transform="matrix(.97063 .13305 -.13305 .97063 -595.288 -276.636)"
        />
        <path
          d="M889 458.806v7.463c0 2.059-1.543 3.731-3.444 3.731h-19.112c-1.901 0-3.444-1.672-3.444-3.731v-7.463c0-2.06 1.543-3.732 3.444-3.732h19.112c1.901 0 3.444 1.672 3.444 3.732Z"
          style={{
            fill: 'none',
            stroke: '#79738c',
            strokeWidth: '1.59px',
          }}
          transform="matrix(.64779 .0888 -.08195 .59789 -338.078 -68.75)"
        />
        <motion.circle
          cx={875.504}
          cy={459.578}
          r={4.504}
          fill="#31641e"
          transform="matrix(.87513 .44043 -.44043 .87513 -473.262 -533.29)"
        />
        <path
          d="M889 458.806v7.463c0 2.059-1.543 3.731-3.444 3.731h-19.112c-1.901 0-3.444-1.672-3.444-3.731v-7.463c0-2.06 1.543-3.732 3.444-3.732h19.112c1.901 0 3.444 1.672 3.444 3.732Z"
          style={{
            fill: 'none',
            stroke: '#79738c',
            strokeWidth: '1.59px',
          }}
          transform="matrix(.58405 .29393 -.2713 .53906 -297.304 -253.268)"
        />
        <motion.circle
          cx={875.504}
          cy={459.578}
          r={4.504}
          fill="#499f29"
          transform="matrix(.86567 .45874 -.45874 .86567 -473.026 -553.39)"
        />
        <path
          d="M889 458.806v7.463c0 2.059-1.543 3.731-3.444 3.731h-19.112c-1.901 0-3.444-1.672-3.444-3.731v-7.463c0-2.06 1.543-3.732 3.444-3.732h19.112c1.901 0 3.444 1.672 3.444 3.732Z"
          style={{
            fill: 'none',
            stroke: '#79738c',
            strokeWidth: '1.59px',
          }}
          transform="matrix(.57774 .30616 -.28257 .53324 -302.998 -269.728)"
        />
        <motion.circle
          cx={875.504}
          cy={459.578}
          r={4.504}
          fill="#499f29"
          transform="matrix(.94934 .24204 -.24204 .94934 -561.918 -368.35)"
        />
        <path
          d="M889 458.806v7.463c0 2.059-1.543 3.731-3.444 3.731h-19.112c-1.901 0-3.444-1.672-3.444-3.731v-7.463c0-2.06 1.543-3.732 3.444-3.732h19.112c1.901 0 3.444 1.672 3.444 3.732Z"
          style={{
            fill: 'none',
            stroke: '#79738c',
            strokeWidth: '1.59px',
          }}
          transform="matrix(.63358 .16153 -.14909 .58477 -329.886 -132.692)"
        />
        <motion.circle
          cx={875.504}
          cy={459.578}
          r={4.504}
          fill="#31641e"
          transform="matrix(.97691 .07397 -.07397 .97691 -609.943 -226.324)"
        />
      </g>
      <path
        d="M889 458.806v7.463c0 2.059-1.543 3.731-3.444 3.731h-19.112c-1.901 0-3.444-1.672-3.444-3.731v-7.463c0-2.06 1.543-3.732 3.444-3.732h19.112c1.901 0 3.444 1.672 3.444 3.732Z"
        style={{
          fill: 'none',
          stroke: '#79738c',
          strokeWidth: '1.59px',
        }}
        transform="matrix(.65198 .04937 -.04556 .60176 -340.605 -34.41)"
      />

      <path
        d="M835.539 355.901c-43.734 7.331-31.244 49.882-143.341 122.78-38.281 4.049-1.884 25.872 9.901 3.007 114.094-59.213 144.869-41.972 185.57-116.431-22.108-17.922-47.293-9.533-52.13-9.356Z"
        style={{
          fill: 'url(#x)',
        }}
        transform="matrix(-1.0013 0 0 1.4248 1256.71 -248.298)"
      />
      <path
        d="M858.025 350.916c-69.957 11.731-34.729 45.482-142.998 124.839-30.096-4.499-13.711 30.872 4.209 9.143 121.926-33.753 130.43-94.827 176.905-114.013-17.169-19.95-23.667-16.664-38.116-19.969Z"
        style={{
          fill: 'url(#y)',
        }}
        transform="matrix(1.2644 0 0 1.21155 -762.38 -178.198)"
      />
      <defs>
        <linearGradient
          id="a"
          x1={0}
          x2={1}
          y1={0}
          y2={0}
          gradientTransform="rotate(89.695 106.554 632.157) scale(162.47851)"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset={0}
            style={{
              stopColor: 'white',
              stopOpacity: 1,
            }}
          />
          <stop
            offset={0.62}
            style={{
              stopColor: '#fbfbfb',
              stopOpacity: 1,
            }}
          />
          <stop
            offset={0.82}
            style={{
              stopColor: '#f1f1f1',
              stopOpacity: 1,
            }}
          />
          <stop
            offset={1}
            style={{
              stopColor: '#e7e7e7',
              stopOpacity: 1,
            }}
          />
        </linearGradient>
        <linearGradient
          id="b"
          x1={0}
          x2={1}
          y1={0}
          y2={0}
          gradientTransform="scale(-301.78302) rotate(-85.168 -1.915 .654)"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset={0}
            style={{
              stopColor: '#dcdbe1',
              stopOpacity: 1,
            }}
          />
          <stop
            offset={1}
            style={{
              stopColor: '#9f9f9f',
              stopOpacity: 1,
            }}
          />
        </linearGradient>
        <linearGradient
          id="c"
          x1={0}
          x2={1}
          y1={0}
          y2={0}
          gradientTransform="scale(-301.78302) rotate(-85.168 -1.915 .654)"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset={0}
            style={{
              stopColor: '#dcdbe1',
              stopOpacity: 1,
            }}
          />
          <stop
            offset={1}
            style={{
              stopColor: '#9f9f9f',
              stopOpacity: 1,
            }}
          />
        </linearGradient>
        <linearGradient
          id="d"
          x1={0}
          x2={1}
          y1={0}
          y2={0}
          gradientTransform="scale(-301.78302) rotate(-85.168 -1.915 .654)"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset={0}
            style={{
              stopColor: '#dcdbe1',
              stopOpacity: 1,
            }}
          />
          <stop
            offset={1}
            style={{
              stopColor: '#9f9f9f',
              stopOpacity: 1,
            }}
          />
        </linearGradient>
        <linearGradient
          id="e"
          x1={0}
          x2={1}
          y1={0}
          y2={0}
          gradientTransform="scale(-301.78302) rotate(-85.168 -1.915 .654)"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset={0}
            style={{
              stopColor: '#dcdbe1',
              stopOpacity: 1,
            }}
          />
          <stop
            offset={1}
            style={{
              stopColor: '#9f9f9f',
              stopOpacity: 1,
            }}
          />
        </linearGradient>
        <linearGradient
          id="f"
          x1={0}
          x2={1}
          y1={0}
          y2={0}
          gradientTransform="scale(-301.78302) rotate(-85.168 -1.915 .654)"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset={0}
            style={{
              stopColor: '#dcdbe1',
              stopOpacity: 1,
            }}
          />
          <stop
            offset={1}
            style={{
              stopColor: '#9f9f9f',
              stopOpacity: 1,
            }}
          />
        </linearGradient>
        <linearGradient
          id="g"
          x1={0}
          x2={1}
          y1={0}
          y2={0}
          gradientTransform="scale(-301.78302) rotate(-85.168 -1.915 .654)"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset={0}
            style={{
              stopColor: '#dcdbe1',
              stopOpacity: 1,
            }}
          />
          <stop
            offset={1}
            style={{
              stopColor: '#9f9f9f',
              stopOpacity: 1,
            }}
          />
        </linearGradient>
        <linearGradient
          id="h"
          x1={0}
          x2={1}
          y1={0}
          y2={0}
          gradientTransform="scale(-301.78302) rotate(-85.168 -1.915 .654)"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset={0}
            style={{
              stopColor: '#dcdbe1',
              stopOpacity: 1,
            }}
          />
          <stop
            offset={1}
            style={{
              stopColor: '#9f9f9f',
              stopOpacity: 1,
            }}
          />
        </linearGradient>
        <motion.linearGradient
          id="i"
          x1={0}
          x2={1}
          y1={0}
          y2={0}
          gradientTransform="matrix(72.96382 -74.15855 4.31747 3.08904 800.503 442.121)"
          gradientUnits="userSpaceOnUse"
          opacity={opacity}
        >
          <motion.stop
            offset={0}
            style={{
              stopColor: lightColor,
              stopOpacity: opacity,
            }}
          />
          <motion.stop
            offset={1}
            style={{
              stopColor: darkColor,
              stopOpacity: opacity,
            }}
          />
        </motion.linearGradient>
        <motion.linearGradient
          id="j"
          x1={0}
          x2={1}
          y1={0}
          y2={0}
          gradientTransform="matrix(96.54976 -52.69064 69.0972 73.62482 772.053 444.233)"
          gradientUnits="userSpaceOnUse"
          opacity={opacity}
        >
          <motion.stop
            offset={0}
            style={{
              stopColor: lightColor,
              stopOpacity: opacity,
            }}
          />
          <motion.stop
            offset={1}
            style={{
              stopColor: darkColor,
              stopOpacity: opacity,
            }}
          />
        </motion.linearGradient>
        <linearGradient
          id="k"
          x1={0}
          x2={1}
          y1={0}
          y2={0}
          gradientTransform="matrix(103.50028 -11.28821 15.09912 77.37754 758.245 401.03)"
          gradientUnits="userSpaceOnUse"
          opacity={opacity}
        >
          <motion.stop
            offset={0}
            style={{
              stopColor: lightColor,
              stopOpacity: opacity,
            }}
          />
          <motion.stop
            offset={1}
            style={{
              stopColor: darkColor,
              stopOpacity: opacity,
            }}
          />
        </linearGradient>
        <linearGradient
          id="l"
          x1={0}
          x2={1}
          y1={0}
          y2={0}
          gradientTransform="matrix(67.32042 3.7129 -6.3522 39.34929 782.187 365.488)"
          gradientUnits="userSpaceOnUse"
          opacity={opacity}
        >
          <motion.stop
            offset={0}
            style={{
              stopColor: lightColor,
              stopOpacity: opacity,
            }}
          />
          <motion.stop
            offset={1}
            style={{
              stopColor: darkColor,
              stopOpacity: opacity,
            }}
          />
        </linearGradient>
        <linearGradient
          id="m"
          x1={0}
          x2={1}
          y1={0}
          y2={0}
          gradientTransform="matrix(149.96187 -100.46121 -95.61646 -157.56023 757.854 498.815)"
          gradientUnits="userSpaceOnUse"
          opacity={opacity}
        >
          <motion.stop
            offset={0}
            style={{
              stopColor: lightColor,
              stopOpacity: opacity,
            }}
          />
          <motion.stop
            offset={1}
            style={{
              stopColor: darkColor,
              stopOpacity: opacity,
            }}
          />
        </linearGradient>
        <linearGradient
          id="n"
          x1={0}
          x2={1}
          y1={0}
          y2={0}
          gradientTransform="matrix(263.45004 -42.75234 -1.03452 -2.00442 686.463 474.345)"
          gradientUnits="userSpaceOnUse"
        >
          <motion.stop
            offset={0}
            style={{
              stopColor: lightColor,
              stopOpacity: opacity,
            }}
          />
          <motion.stop
            offset={1}
            style={{
              stopColor: darkColor,
              stopOpacity: opacity,
            }}
          />
        </linearGradient>
        <linearGradient
          id="o"
          x1={0}
          x2={1}
          y1={0}
          y2={0}
          gradientTransform="matrix(135.92728 -23.807 -1.14226 -2.18204 790.14 461.389)"
          gradientUnits="userSpaceOnUse"
        >
          <motion.stop
            offset={0}
            style={{
              stopColor: lightColor,
              stopOpacity: opacity,
            }}
          />
          <motion.stop
            offset={1}
            style={{
              stopColor: darkColor,
              stopOpacity: opacity,
            }}
          />
        </linearGradient>
        <motion.linearGradient
          id="u"
          x1={0}
          x2={1}
          y1={0}
          y2={0}
          gradientTransform="matrix(6.21773 131 -131 6.21773 827.687 386.767)"
          gradientUnits="userSpaceOnUse"
          opacity={opacity}
        >
          <motion.stop
            offset={0}
            style={{
              stopColor: lightColor,
              stopOpacity: opacity,
            }}
          />
          <motion.stop
            offset={1}
            style={{
              stopColor: darkColor,
              stopOpacity: opacity,
            }}
          />
        </motion.linearGradient>
        <linearGradient
          id="x"
          x1={0}
          x2={1}
          y1={0}
          y2={0}
          gradientTransform="matrix(-37.90528 167.2616 -1.20325 -.13467 839.515 330.568)"
          gradientUnits="userSpaceOnUse"
        >
          <motion.stop
            offset={0}
            style={{
              stopColor: lightColor,
              stopOpacity: opacity,
            }}
          />
          <motion.stop
            offset={1}
            style={{
              stopColor: darkColor,
              stopOpacity: opacity,
            }}
          />
        </linearGradient>
        <linearGradient
          id="y"
          x1={0}
          x2={1}
          y1={0}
          y2={0}
          gradientTransform="matrix(-7.9089 242.66503 -.9789 -.03475 855.048 283.655)"
          gradientUnits="userSpaceOnUse"
        >
          <motion.stop
            offset={0}
            style={{
              stopColor: lightColor,
              stopOpacity: opacity,
            }}
          />
          <motion.stop
            offset={1}
            style={{
              stopColor: darkColor,
              stopOpacity: opacity,
            }}
          />
        </linearGradient>
        <linearGradient
          xmlns="http://www.w3.org/2000/svg"
          id="_Linear16"
          x1="0"
          y1="0"
          x2="1"
          y2="0"
          gradientUnits="userSpaceOnUse"
          gradientTransform="matrix(184.037404,-1.627676,0.006676,0.163306,740.346053,419.337524)"
        >
          <motion.stop
            offset={0}
            style={{
              stopColor: lightColor,
              stopOpacity: opacity,
            }}
          />
          <motion.stop
            offset={1}
            style={{
              stopColor: darkColor,
              stopOpacity: opacity,
            }}
          />
        </linearGradient>
        <linearGradient
          id="_20"
          x1="0"
          y1="0"
          x2="1"
          y2="0"
          gradientUnits="userSpaceOnUse"
          gradientTransform="matrix(-43.519738,225.685261,0.563932,0.113388,838.708727,284.241021)"
        >
          <motion.stop
            offset={0}
            style={{
              stopColor: lightColor,
              stopOpacity: opacity,
            }}
          />
          <motion.stop
            offset={1}
            style={{
              stopColor: darkColor,
              stopOpacity: opacity,
            }}
          />
        </linearGradient>
      </defs>
    </svg>
  );
};
export default SvgComponent;
