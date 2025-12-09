import { useCallback, useEffect } from 'react';

import { mapValue, motion, motionValue } from 'motion/react';

import { CoralStatus, useContext, useMaxValue, useStatus } from '@/utils/hooks';

const YellowCoral = (props) => {
  const {
    data: { reset, showStatus },
  } = useContext();
  const { kelpAmount, status } = useStatus('yellow', {
    initialKelpAmount: props.initialKelpAmount,
    deathSpeed: 0.9,
    maxTempThreshould: 28,
  });
  const [maxKelpAmount, setMax] = useMaxValue(
    props.initialKelpAmount,
    kelpAmount,
  );

  const recover = useCallback(() => {
    // eslint-disable-next-line no-restricted-syntax
    for (const p of document.getElementsByClassName('toBeReset')) {
      (p as SVGAnimateTransformElement).beginElement();
    }
  }, []);

  // animate branches falling on death
  useEffect(() => {
    if (status === CoralStatus.Dead) {
      // eslint-disable-next-line no-restricted-syntax
      for (const p of document.getElementsByClassName('toBeBroken')) {
        (p as SVGAnimateTransformElement).beginElement();
      }
    }
  }, [status]);

  // reset animations
  useEffect(() => {
    recover();
    setMax(0);
  }, [reset]);

  const pathLength = mapValue(motionValue(maxKelpAmount), [80, 100], [0, 1]);

  const lightColor = mapValue(
    motionValue(kelpAmount),
    [100, 10],
    ['rgb(253,213,91)', 'rgb(255,255,255)'],
  );

  const darkColor = mapValue(
    motionValue(kelpAmount),
    [100, 10],
    ['rgb(194,115,61)', 'rgb(205,205,205)'],
  );

  return (
    <>
      {showStatus && (
        <div
          style={{
            position: 'absolute',
            ...props.style,
            bottom: props.style.bottom + 250,
            marginLeft: '5%',
            paddingLeft: '2%',
            paddingRight: '2%',
            background: 'white',
          }}
        >
          {status}
        </div>
      )}
      <svg
        width={props.scale}
        height={props.scale}
        viewBox="0 0 338 479"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        xmlSpace="preserve"
        style={{
          fillRule: 'evenodd',
          clipRule: 'evenodd',
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          strokeMiterlimit: 1.5,
          ...props.style,
        }}
        {...props}
      >
        <g transform="matrix(1,0,0,1,-574.440728,-332.940435)">
          <g transform="matrix(1,0,0,1,-196.234552,141.295253)">
            <g transform="matrix(0.99766,-0.068364,0.068364,0.99766,1.408014,69.836766)">
              <path
                d="M839.219,289.924C842.258,344.627 855.559,420.906 856.811,425.197C860.828,438.971 889.468,554.269 895.55,560.351"
                style={{
                  fill: 'none',
                  stroke: 'url(#_Yellow1)',
                  strokeWidth: '63.33px',
                }}
                strokeLinecap="round"
              />
            </g>
            <g transform="matrix(0.9814,-0.191974,0.133499,0.682464,-54.733742,341.932689)">
              <clipPath id="_clip2">
                <path d="M912.003,539.791C918.398,550.364 919.257,566.22 913.443,578.244C906.575,592.444 892.983,595.956 883.107,586.081C880.745,583.718 874.905,574.432 869.77,558.374C859.109,525.031 839.953,448.428 836.713,437.318C835.372,432.719 820.752,351.055 817.494,292.42C816.536,275.178 825.493,260.062 837.483,258.684C849.473,257.307 859.985,270.187 860.943,287.429C863.764,338.2 875.746,409.093 876.908,413.075C880.329,424.804 910.286,533.556 912.003,539.791Z" />
              </clipPath>
              <g clipPath="url(#_clip2)">
                <g transform="matrix(0.9814,0.276064,-0.191974,1.411277,838.907716,15.768079)">
                  <use
                    xlinkHref="#_Image3"
                    x={15.107}
                    y={165.244}
                    width="135px"
                    height="218px"
                  />
                </g>
              </g>
            </g>
            <path
              d="M1047.139,329.225C1047.139,346.871 1027.033,368.714 996.609,475.199C995.51,479.047 983.509,521.05 981.637,522.922"
              style={{
                fill: 'none',
                stroke: 'url(#_Yellow4)',
                strokeWidth: '44.98px',
              }}
              strokeLinecap="round"
            />
            <g id="av" transform="matrix(1,0,0,1,12.164517,0)">
              <motion.path
                d="M940.559,618.312C944.402,645.211 965.023,478.864 964.087,505.675C963.767,514.86 971.344,425.605 971.344,425.605C977.653,425.576 986.29,286.826 976.688,249.599"
                style={{
                  fill: 'none',
                  stroke: 'url(#_Yellow5)',
                  strokeWidth: '63.33px',
                  pathLength,
                }}
                strokeLinecap={pathLength.get() ? 'round' : 'butt'}
              />
            </g>
            <g transform="matrix(0.934393,-0.356243,0.356243,0.934393,-89.330001,455.685958)">
              <path
                d="M1047.139,329.225C1047.139,346.871 1027.033,368.714 996.609,475.199C995.51,479.047 983.509,521.05 981.637,522.922"
                style={{
                  fill: 'none',
                  stroke: 'url(#_Yellow6)',
                  strokeWidth: '63.33px',
                }}
                strokeLinecap="round"
              />
            </g>
            <path
              d="M938.594,318.932C942.971,388.968 942.337,388.562 942.337,470.521C942.337,507.736 966.853,576.798 966.853,627.948"
              style={{
                fill: 'none',
                stroke: 'url(#_Yellow7)',
                strokeWidth: '79.05px',
              }}
              strokeLinecap="round"
            />
            <g transform="matrix(0.869287,-0.494308,0.494308,0.869287,-194.400359,640.046066)">
              <motion.path
                d="M974.657,541.502C968.813,560.755 991.281,468.651 991.281,468.651C986.66,472.408 1013.491,378.453 1029.979,345.37"
                style={{
                  fill: 'none',
                  stroke: 'url(#_Yellow8)',
                  strokeWidth: '51.11px',
                  pathLength,
                }}
                strokeLinecap={pathLength.get() ? 'round' : 'butt'}
              />
            </g>
            <path
              d="M1067.725,453.677C1066.692,460.903 1055.138,509.13 1047.139,521.144C1042.252,528.483 1021.216,595.631 997.919,619.864"
              style={{
                fill: 'none',
                stroke: 'url(#_Yellow9)',
                strokeWidth: '80.79px',
              }}
              strokeLinecap="round"
            />
            <g transform="matrix(0.997232,-0.074353,0.074353,0.997232,-10.836983,64.564625)">
              <path
                d="M783.058,504.715C800.695,547.14 823.5,576.826 823.5,576.826C823.5,576.826 866.793,628.85 867.849,628.712"
                style={{
                  fill: 'none',
                  stroke: 'url(#_Yellow10)',
                  strokeWidth: '73.81px',
                }}
                strokeLinecap="round"
              />
            </g>
            <g transform="matrix(0.528598,0,0,0.748024,406.164617,166.463235)">
              <clipPath id="_clip11">
                <path d="M1010.426,415.036C1014.296,387.944 1048.564,368.169 1086.902,370.904C1125.239,373.639 1153.223,397.855 1149.352,424.946C1148.299,432.317 1128.573,529.69 1128.573,529.69C1128.387,530.602 1128.166,531.51 1127.909,532.413C1127.909,532.413 1099.723,622.425 1072.138,651.119C1050.484,673.642 1007.027,679.505 975.154,664.203C943.281,648.902 934.985,618.192 956.638,595.669C973.515,578.114 987.519,526.556 990.462,515.155C991.978,507.707 1009.458,421.81 1010.426,415.036Z" />
              </clipPath>
              <g clipPath="url(#_clip11)">
                <g transform="matrix(1.891795,-0,-0,1.336856,689.579462,33.664635)">
                  <use
                    xlinkHref="#_Image12"
                    x={134.791}
                    y={252.074}
                    width="109px"
                    height="226px"
                  />
                </g>
              </g>
            </g>
          </g>
        </g>
        <defs>
          <linearGradient
            id="_Yellow1"
            x1={0}
            y1={0}
            x2={1}
            y2={0}
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(16.176338,164.501481,-701.649173,68.997035,847.552129,313.98777)"
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
          <image
            id="_Image3"
            width="135px"
            height="218px"
            xlinkHref="data:image/png;base64,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"
          />
          <linearGradient
            id="_Yellow4"
            x1={0}
            y1={0}
            x2={1}
            y2={0}
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(-20.866743,167.12183,-846.69941,-105.71844,1053.688574,318.932005)"
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
            id="_Yellow5"
            x1={0}
            y1={0}
            x2={1}
            y2={0}
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(17.364261,269.116684,-2878.074013,185.702455,959.628139,221.615764)"
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
            id="_Yellow6"
            x1={0}
            y1={0}
            x2={1}
            y2={0}
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(-73.88114,190.026838,-962.744429,-374.308476,1050.87354,330.649056)"
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
            id="_Yellow7"
            x1={0}
            y1={0}
            x2={1}
            y2={0}
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(10.354557,240.76382,-12243.302541,526.549113,942.368528,342.325287)"
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
            id="_Yellow8"
            x1={0}
            y1={0}
            x2={1}
            y2={0}
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(-47.110912,185.488812,-939.753155,-238.680854,1024.103312,335.187082)"
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
            id="_Yellow9"
            x1={0}
            y1={0}
            x2={1}
            y2={0}
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(-78.672384,170.444024,-300.077507,-138.507719,1067.724651,437.769998)"
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
            id="_Yellow10"
            x1={0}
            y1={0}
            x2={1}
            y2={0}
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(94.411834,211.316391,-294.820449,131.719737,787.220025,448.887345)"
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
          <image
            id="_Image12"
            width="109px"
            height="226px"
            xlinkHref="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAUDBAQEAwUEBAQFBQUGBwwIBwcHBw8LCwkMEQ8SEhEPERETFhwXExQaFRERGCEYGh0dHx8fExciJCIeJBweHx7/2wBDAQUFBQcGBw4ICA4eFBEUHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wAARCADiAG0DAREAAhEBAxEB/8QAGwABAQADAQEBAAAAAAAAAAAAAgABAwYFBAj/xAAYEAEBAQEBAAAAAAAAAAAAAAAAAgFhEv/EABsBAQEAAwEBAQAAAAAAAAAAAAABAgQFAwYH/8QAFREBAQAAAAAAAAAAAAAAAAAAABH/2gAMAwEAAhEDEQA/AP0K/En2CBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIGvKZRYWUkQkECBAgQIECBAgQPkm3pGRzSRDykhDykiM5uEGUECBAgQIECB5uU94zPKSEObSIeUkDykiQ8pIhZqQZQQIECBAgeNNtmPSHlJA8pIh5SQObSJDm0geUkQ8pIQspIhIIECBA5/Kbkex5SRDy0iQ8tIHlJEPKYwPLSJDmyBzTGIeUkIWUkQs3CDKCBzGW3o94eWkQ8pIHlJEPLSBzaRIeUkQ8pIFNJCNk2kQ8pIHlJEh5SRC9YkHJZToRsHlJAspIkbJtIHlJEPKSBZXWMRsm0iQ8pIHlJELK6kGzLSJDy0geV1IjkJp0Gy2TZEh5TGIeUkCmkiHlpBsykiHlJAspIh5aRGzLSB5SRCykgeUkI5HLdCNiHlpEPK6kDm0iRsy0iHlJAspIHlpEjZNsYhzSQLKSIeUkGybSJCyupByOU6EbB5SRDykDm0iQ5pIHlojZNpCHlJELKSBzSRIc2kGzKSIWUkDyupEcjlN+NiHNgeUkSHlMYh5QHlpEh5bGB5SBzZEjZlMYhZSQPK6kQ8tIQ8tIjkct0I2DykgeUkIc2iHlpEh5SRDykDykhDm0iHldQPLSIeWkI2ZSRCysSDkcp0I2Dy2MSHlpA8pIh5SQh5SRDm0iQ8pIHlJEPKQObSJDykgeWiHlpCORm3QjYh5SRDykgeUkIc2kQ8pIh5SQOaSJDm0Dy0iQ8pjEPKA5tIQ8tIjkcp0I2Dykgc2kQ8pjCHlJEPKSB5aRIeWkQ8pIHlJCHloh5aRIeUkQ8pByM26EbB5SQPKSJDykgc2kQ5tIQ8pIh5SQPLSJDm0geUxiHlJCHlJEPLRHI5ToxsnlJEh5aRDy0geUxiQ8pIHlpA5tIkPKSIeUkDykhDm0iQ8pIh5SQcjluhGweWgeUkQ8pIkPLSBzaRDykhDykiHlJA5tIh5TGEPKSIeUkCy0iRyzfe7IM5W4kDy0geUkQ8pIh5SQPLSIeWkDykiQ8pIHlpEPLSEPK6kRzjceyBAgZzdwgeWkDy0iHlJAspIkPLSDZNpEPKYxIeUkCyiDxGy9ECBAgQM5oFlJA8tIHlJELKSJDykg2TaRCykhHlvdmgQIECBAgZBnK3EgU2kGzKSIeUkCyuokfE9WSBAgQIECBAgQM5u4QLLSB5SRGlkqBAgQIECBAgQIEDIMAgQIECBAgQIECBAgQIECBAgQIECBAgQIH//Z"
          />
        </defs>
      </svg>
    </>
  );
};
export default YellowCoral;
