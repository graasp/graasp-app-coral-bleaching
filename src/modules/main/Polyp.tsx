import { useCallback, useEffect } from 'react';

import { animate, mapValue, motion, motionValue } from 'motion/react';

import { DEATH_DAY, KELP_SPEED } from '@/config/constants';
import { CoralStatus, useContext, useMaxValue, useStatus } from '@/utils/hooks';

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
    animate('circle', { fill: '#499f29' }, { duration: 1 });
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
      animate('circle', { fill: 'rgba(0, 0, 0, 0)' }, { duration: 4 });
      // eslint-disable-next-line no-restricted-syntax
      for (const c of document.getElementsByClassName('zooAnimate')) {
        (c as SVGAnimateTransformElement).beginElement();
      }
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

  const zooOpacity = 1; //mapValue(motionValue(kelpAmount), [50, 75], [0, 1]);

  return (
    <svg
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
      <g transform="matrix(-.02391 .84262 1.81158 .05141 -201.37 -483.471)">
        <clipPath id="p">
          <path d="M856.077 348.281c-77.554 21.833 41.797 81.351-18.308 146.501-39.402 4.191-7.824 18.63 10.96 4.488 42.588-30.742 31.181-41.66 43.373-118.478l-36.025-32.511Z" />
        </clipPath>
        <g clipPath="url(#p)">
          <use
            xlinkHref="#q"
            width={286}
            height={56}
            x={409.1}
            y={232.307}
            transform="matrix(-.03365 .55156 1.18583 .01565 566.536 118.635)"
          />
        </g>
      </g>
      <motion.use
        xlinkHref="#r"
        width={106}
        height={28}
        x={318.541}
        y={245.26}
        opacity={opacity}
      />
      <g transform="matrix(.33505 .66459 -1.06435 .53659 383.95 -512.487)">
        <clipPath id="s">
          <path d="M860.283 349.33c-40.539 31.537-76.021 113.287-173.581 177.165l10.221.007c51.424-17.926 191.683-91.603 194.918-176.673-9.016-5.477-27.742-4.744-31.558-.499Z" />
        </clipPath>
        <g clipPath="url(#s)">
          <use
            xlinkHref="#t"
            width={258}
            height={59}
            x={53.658}
            y={226.396}
            transform="matrix(.60486 -.74914 1.19976 .37768 382.626 481.188)"
          />
        </g>
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
      <motion.circle
        cx={875.504}
        cy={459.578}
        r={4.504}
        fill="#499f29"
        transform="matrix(.96335 .1783 -.1783 .96335 -661.314 -364.914)"
      />
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
      <motion.circle
        cx={875.504}
        cy={459.578}
        r={4.504}
        fill="#499f29"
        transform="matrix(.96868 .14663 -.14663 .96868 -662.45 -336.758)"
      />
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
      <motion.circle
        cx={875.504}
        cy={459.578}
        r={4.504}
        fill="#499f29"
        transform="matrix(.97296 .11482 -.11482 .97296 -662.696 -308.589)"
      />
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
      <motion.circle
        cx={875.504}
        cy={459.578}
        r={4.504}
        fill="#31641e"
        transform="matrix(.97617 .0832 -.0832 .97617 -661.747 -280.68)"
      />
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
      <motion.circle
        cx={875.504}
        cy={459.578}
        r={4.504}
        fill="#31641e"
        transform="matrix(.97828 .05286 -.05286 .97828 -659.288 -253.97)"
      />
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
      <motion.circle
        cx={875.504}
        cy={459.578}
        r={4.504}
        fill="#499f29"
        transform="matrix(.9794 .0245 -.0245 .9794 -654.978 -229.076)"
      />
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
      <path
        d="M889 458.806v7.463c0 2.059-1.543 3.731-3.444 3.731h-19.112c-1.901 0-3.444-1.672-3.444-3.731v-7.463c0-2.06 1.543-3.732 3.444-3.732h19.112c1.901 0 3.444 1.672 3.444 3.732Z"
        style={{
          fill: 'none',
          stroke: '#79738c',
          strokeWidth: '1.59px',
        }}
        transform="matrix(.65198 .04937 -.04556 .60176 -340.605 -34.41)"
      />
      <g transform="matrix(-1.25552 0 0 1.22954 1529.131 -197.363)">
        <clipPath id="v">
          <path d="M865.767 361.367c-116.612 18.443-153.045 59.246-171.808 124.358-8.449 29.32 18.725 16.566 10.004 1.123C733.225 403.295 845.55 453.247 894 375c-5.843-7.171-17.548-13.69-28.233-13.633Z" />
        </clipPath>
        <g clipPath="url(#v)">
          <use
            xlinkHref="#w"
            width={254}
            height={175}
            x={406.699}
            y={246.954}
            transform="matrix(-.79648 0 0 .8133 1217.93 160.517)"
          />
        </g>
      </g>
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
        <image
          xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAR4AAAA4CAYAAAArS5dJAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAFXUlEQVR4nO2dUXLbMAxEkRkfuzfoCXqAntP5cJvEFmGRICntE7GfHaG7SsTtgqDUj/ufv3dTxMfH2Qrq0CXz4HsM053wuzicMkh4ymPK13qz+yDfGW0Uo3SVMFJrl8yK4pFmEdY6U6dTPPOfw6LWIGF12UizmKl1tKmVSW8xltLfPzk4DTULiKmZiZrFaKMgaW2n6yI93CyOMeD9xKPS8lDMAmXAEwtlEtCFTM2hlDQ1t/RBup94KAu+B6R7pGhdIgGRDDhG10X4prR9j2fVdBAF6R4ppmYmahbZgtZStu/xoB5OkNYoKPeIMuDJhRJmcbCpvVD+SDwCIzrUwwnSGgXF1MxgWicWQkztR+IR3KAavfZQDydIawQk40ZpnVg4cL/qzR4Pb0TXjExr46Fgamase6RoHbhfdbO7XWZE14xMaw9QTM1Mw9hI9yj63DxarYuM6HZIg2WCptZZuoHow1kESWsUlHvs0FlutSQ2qOKUkmaBN+AgMh08kKb2hPI4XXKDan9ENxwUU3NLBbVmCzoHCsbWcI91BwglEhDpjESMjpWAcmDQhcVb0Nv2SaAcUnKKJbVmC9peRtIaACkBTdB62/6iSAuQopVkwDE6VgK6uKmZySeg2GcxlliAFFOrLJbR2k7XRZotaFdZEQNMbcyHwEQPKRUhsQDTgN3CbEF3SgW1BsrGfAhMPNY9YYkFSNFKMuAYXQ4MyoTjPn36xKG9sfUEibRGWoAUU6ssltEao+QkoNIrEx0cRaASEETrEguQdGQiz6y5qCj7HqeL9YAuUAkIYmpmiyzANGC38GBTK4zT/Ys5sa4DFLNAGfDkQokFmO2yW1igKxwg9C+uIgmX5RiyGxRjWzWtZbv8RecnnsLFIZJwWZ6EbQbFLFAGPLFw4QTkJJ7ze0BWAhI0tc7SDSimZsbRunACchIP5abilJJmgT8HEgQqAUFMzUw6Afl7PHsswjcVoQyDYmpuqaDWbEHnQCKtPQor93goCYg0BYnRsRKQoKl1lm5AMTUzKa0D/+/0iYUyCYhiwHFKSbPAG3AQqATUpnXOKxNmUrFuFxJmQZqCxOhyYPCWcFqZixMT0LPxUPrVhTbhWul8kLS203WRUtLahc6sPbdaFLNARdCJhTIJ6EKm5lByTK2aNFg2Ruv7VotiFhfehHuLJRIQyYBjdKwENEbr+81lzAIkJSDIz9RM1CyyBW2lVExA9a9MxDnKQC1AiFaUAU8slElApIltlDJGWHmAsIVDf2OrGxSzWNaAJxdLJCDSxHaLtsTzCkisu9IYsglpwN+QMDZSApqrtS3xvCLHkF1lRVBMzSy1/gfF1MxEEtC9M/G8Ap+ASFoDQKWK1Gpmlx0YdCSeHEO2lQmaWmfpBqgFCNGKMuD6SzsSD2UTLkbXRUppQatLM601gWJqZqdpfXllootl+0dpai6lpKm5pYJac2AwBwdpfXllootl/xIJsyBtwsXoWAlI0NQ6SzegmJrZYVqPe2XCjJOAKinDhRRTcyglzQJvwEFAE9B5r0yY5RiyGaRTuzE6SVNzSwW1QlrQ9u/xUPrVVdPaEu1yjI6VgEgT23a0f4GQYhaZ1h6QSUAXMjWHkpWAztX6L/HkJlwzKFqXSEAkA47RsRLQPumt9kIXlH4VlYAgpmYmahbZgrbQdZEG17+zx5ObcM2gmAXKgCcWyiSgC5maQ1kidfZ4SAlI0NQ6SzegmJoZR+sSCUh3Yls51Vo1AZEMOAhUAoKYmhknAVVShgsdysqpFmkBXmsTrgiKqZlxzAJlwJMLD0hAQ34a91+/Z3eOHRBZgDNJU+scjE5Bs0DRafb1+/8E9xrcGh9nOI4AAAAASUVORK5CYII="
          id="q"
          width={286}
          height={56}
        />
        <image
          xlinkHref="data:image/png;base64,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"
          id="r"
          width={106}
          height={28}
        />
        <motion.image
          xlinkHref="data:image/png;base64,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"
          id="t"
          width={258}
          height={59}
          opacity={opacity}
        />
        <image
          xlinkHref="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAUDBAQEAwUEBAQFBQUGBwwIBwcHBw8LCwkMEQ8SEhEPERETFhwXExQaFRERGCEYGh0dHx8fExciJCIeJBweHx7/2wBDAQUFBQcGBw4ICA4eFBEUHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wAARCACvAP4DAREAAhEBAxEB/8QAFwABAQEBAAAAAAAAAAAAAAAAAAEEB//EABYQAQEBAAAAAAAAAAAAAAAAAAARYf/EABoBAQEBAQEBAQAAAAAAAAAAAAABBAIDBQf/xAAVEQEBAAAAAAAAAAAAAAAAAAAAEf/aAAwDAQACEQMRAD8A7ZXz36JEoQoqUChAWJQhQSilCJQhRYUEAosShChEoFFEpEFhQiUCipQhQiUIClQiUIUWJQjXXTPCgUVKEShChAVKBRYUIlCJQKKVKRCkKLEoFFShChEoQFKCVCFFiUIUEooEKESiwoNddM6AUIUWJQhQSilKREpCiwoJQSiwoQoRKKAlQhRYlCFBKKUIBEosKCUCixKEKESlClVrrpnKUiVKQFhQSgUWJQhQiCgFQiUWFCJQKKlCARKEKKUEosShChEpQpVKlECFFiUIUCg1108IlCFCJQBSoRKLChEoFFShAIlCFFKCUWFCJQiUoUqlSiUIBCixKBQSiwoRKEASilBrqs8KLEoQoJRYBAIlFKCUIUWJQhQSlUqUSlIBCixKBQSilCJQgEBUoFCJRYUIlABBWxWeJRYUEoFFiUIUIlKFKqVKQCFFiUCglAosShAIUVKBQShCixKEKAKlCFCJUIUqpQKEa66eESlClUqUiUICxKBQSgUWJQhQgKlAoJQhRYlCFAFSgUIlCFSrEpQoQosQIUEopUIlCNldPCJQKCUWFCJQgCUUoFCJRYlCFABKKUIUIlSrEpQoAsShChCipQiVCFFiUCgUWJQhQjW6Z4lFKBQiUWFCJQKCUUoQoRKlWFKJQKLECFCFBKKVCJQhRYlAoqUIUIlCFFShChEosKEa66ZyggpQhQiVCFKqUCixAhQhQSilQiUIUWJdAoqUIUIlCFFSgUIlFhQiAUUpSJQhUWJQbK6rOlKFCAsShCglFKhEoQosSgUEosKEKESipQKESiwoQBBShEoQosSoFAFiBChEopQa66ZyhEqEKLEoFAosShChEopQShEosKEAQUoRKEKESopQKLECFCJQKKlCFCJRYAUVKEbKrPEoQoRKBRUoQosShCggpQhQiUIlRSgUWIEKEKCUqpQhQhRYgAqUIUIlCFFSgUICxrqs0SiwoRAKLClIlCFRUoFCILAIUEopQiUIUWIBQKLEoQoRKKUEoQFiVCFKFKJRShEqEa67Z4UWJUCggsKEKESilCJQhRYlAAosShChEoFFShAWJUIUoUolFKEShCosSgUCixLoQoRrrpniUUoJQhRYlCAFFShChEoQoqUIUWARKgUolFKESoQoRKKUCixKEKESgUVKEKESiwoNbpnBUoQoRKEKKlACFFiVCFKFKqUIVCJQhRUoFCJRYUIlAoqUIUIlFhQKCUWFCJQhRUoNddM5QgLEqEKUKVUoFCJUIUWJQKESiwoRKBRUoQoRKLCgAlFhQiUIUVKBQgLEqEKCUUoRrrpnKEShCosSgUCixLoQoRKKUEoQosSgAlFhQhQiUEopQgLEqEKBRUoRKEKEBUKFFhUI110zxKEKESgUVKEKESiwBKKUIUIlCFFShClIlFhUCglFhQiUIUVChQhUWJQiUCilBAAa66Z4lFgACUWFCJQhRUoFCCVYlCFBKKUIlCFFgCUCosShCglFKCAAAAAAAA//2Q=="
          id="w"
          width={254}
          height={175}
        />
      </defs>
    </svg>
  );
};
export default SvgComponent;
