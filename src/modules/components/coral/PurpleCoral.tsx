import { useCallback, useEffect } from 'react';

import { mapValue, motion, motionValue } from 'motion/react';

import { CoralStatus, useContext, useMaxValue, useStatus } from '@/utils/hooks';

const YellowCoral = (props) => {
  const {
    data: { reset },
  } = useContext();
  const { kelpAmount, status } = useStatus('purple', {
    initialKelpAmount: props.initialKelpAmount,
    deathSpeed: 0.7,
    maxTempThreshould: 30,
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

  const lightColor = mapValue(
    motionValue(kelpAmount),
    [100, 10],
    ['rgb(226,166,255)', 'rgb(255,255,255)'],
  );

  const darkColor = mapValue(
    motionValue(kelpAmount),
    [100, 10],
    ['rgb(70,0,109)', 'rgb(205,205,205)'],
  );

  return (
    <>
      <div
        style={{
          position: 'absolute',
          top: 370,
          left: 600,
        }}
      >
        {status}
      </div>
      <svg
        width={props.scale}
        height={props.scale}
        viewBox="0 0 399 272"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        xmlSpace="preserve"
        xmlns:serif="http://www.serif.com/"
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
        <g transform="matrix(1,0,0,1,-978.325356,-548.014035)">
          <g transform="matrix(1.714711,0,0,1.714711,-760.34287,186.526643)">
            <g transform="matrix(0.603315,0,0,0.683455,448.836015,100.730428)">
              <ellipse
                cx={1133.48}
                cy={270.595}
                rx={154.005}
                ry={90.329}
                style={{
                  fill: 'url(#_Purple1)',
                }}
              />
              <clipPath id="_clip2">
                <path d="M1133.48,179.84C1184.614,179.84 1229.971,194.462 1258.079,216.947C1276.877,231.984 1287.968,250.538 1287.968,270.595C1287.968,290.653 1276.877,309.207 1258.079,324.244C1229.971,346.729 1184.614,361.351 1133.48,361.351C1082.346,361.351 1036.989,346.729 1008.881,324.244C990.083,309.207 978.991,290.653 978.991,270.595C978.991,250.538 990.083,231.984 1008.881,216.947C1036.989,194.462 1082.346,179.84 1133.48,179.84ZM1133.48,180.693C1082.616,180.693 1037.489,195.213 1009.53,217.579C990.949,232.442 979.958,250.77 979.958,270.595C979.958,290.421 990.949,308.749 1009.53,323.612C1037.489,345.978 1082.616,360.498 1133.48,360.498C1184.344,360.498 1229.471,345.978 1257.43,323.612C1276.011,308.749 1287.002,290.421 1287.002,270.595C1287.002,250.77 1276.011,232.442 1257.43,217.579C1229.471,195.213 1184.344,180.693 1133.48,180.693Z" />
              </clipPath>
              <g clipPath="url(#_clip2)">
                <g transform="matrix(0.966641,-0,-0,0.853295,936.717918,161.071275)">
                  <use
                    xlinkHref="#_Image3"
                    x={43.732}
                    y={21.995}
                    width="320px"
                    height="213px"
                  />
                </g>
              </g>
            </g>
            <g transform="matrix(0.822982,-0.568067,0.568067,0.822982,107.004683,692.105613)">
              <path
                d="M1109.229,194.24C1107.942,185.23 1101.679,187.259 1090.856,181.847C1075.188,174.014 1084.548,176.05 1073.975,181.336"
                style={{
                  fill: 'none',
                  stroke: 'url(#_Purple4)',
                  strokeWidth: '15.44px',
                }}
                strokeLinecap="round"
              />
            </g>
            <g transform="matrix(1,0,0,1,0.55172,33.403376)">
              <path
                d="M1080.284,202.225C1068.167,205.015 1059.851,208.286 1054.427,211.681C1032.437,225.446 1057.966,241.239 1070.303,235.162C1082.721,229.046 1084.845,241.86 1085.275,243.147"
                style={{
                  fill: 'none',
                  stroke: 'url(#_Purple5)',
                  strokeWidth: '20.12px',
                }}
                strokeLinecap="round"
              />
            </g>
            <g transform="matrix(0.948827,0.315796,-0.315796,0.948827,124.710256,-312.67747)">
              <path
                d="M1135.831,188.528C1152.401,180.242 1167.595,186.454 1170.075,188.935"
                style={{
                  fill: 'none',
                  stroke: 'url(#_Purple6)',
                  strokeWidth: '21.55px',
                }}
                strokeLinecap="round"
              />
            </g>
            <g transform="matrix(0.987766,-0.155946,0.155946,0.987766,-49.693711,235.520734)">
              <path
                d="M1215.048,202.394C1219.486,198.721 1232.959,193.561 1239.576,217.249"
                style={{
                  fill: 'none',
                  stroke: 'url(#_Purple7)',
                  strokeWidth: '19.51px',
                }}
                strokeLinecap="round"
              />
            </g>
            <g transform="matrix(0.889948,0.456063,-0.456063,0.889948,246.131563,-496.56605)">
              <path
                d="M1209.806,231.2C1251.086,239.456 1218.624,237.999 1218.805,245.902C1219.216,263.848 1220.097,266.652 1196.541,278.429"
                style={{
                  fill: 'none',
                  stroke: 'url(#_Purple8)',
                  strokeWidth: '26.85px',
                }}
              />
            </g>
            <g transform="matrix(0.563266,0.320782,-0.494877,0.868963,668.647965,-343.989195)">
              <path
                d="M1223.957,269.927C1222.973,293.545 1263.382,281.7 1247.967,299.042C1235.766,312.767 1222.785,311.326 1216.027,313.015"
                style={{
                  fill: 'none',
                  stroke: 'url(#_Purple9)',
                  strokeWidth: '31.86px',
                }}
                strokeLinecap="round"
              />
            </g>
            <g transform="matrix(0.837867,0,0,1.483889,202.030377,-34.721082)">
              <path
                d="M1112.713,201.225C1111.426,192.215 1100.271,189.879 1089.026,184.748C1085.366,183.077 1133.348,181.882 1122.775,187.169"
                style={{
                  fill: 'none',
                  stroke: 'url(#_Purple10)',
                  strokeWidth: '17.04px',
                }}
                strokeLinecap="round"
              />
            </g>
            <g transform="matrix(1,0,0,1,-12.012611,30.527303)">
              <path
                d="M1091.417,217.036C1099.773,228.176 1115.385,220.677 1121.72,233.347"
                style={{
                  fill: 'none',
                  stroke: 'url(#_Purple11)',
                  strokeWidth: '19.51px',
                }}
                strokeLinecap="round"
              />
            </g>
            <g transform="matrix(1,0,0,1,2.670387,20.329017)">
              <path
                d="M1160.82,222.802C1190.921,228.886 1171.562,236.859 1162.089,240.017C1162.089,240.017 1161.915,250.88 1153.555,258.667"
                style={{
                  fill: 'none',
                  stroke: 'url(#_Purple12)',
                  strokeWidth: '21.75px',
                }}
                strokeLinecap="round"
              />
            </g>
            <g transform="matrix(1,0,0,1.026837,15.433987,20.082542)">
              <path
                d="M1012.786,235.767C1013.409,237.144 1015.006,238.534 1014.778,240.26C1012.803,255.229 1034.966,269.599 1034.049,273.848"
                style={{
                  fill: 'none',
                  stroke: 'url(#_Purple13)',
                  strokeWidth: '26.49px',
                }}
                strokeLinecap="round"
              />
            </g>
            <g transform="matrix(1,0,0,1,0,16.625825)">
              <path
                d="M1195.769,247.322C1187.738,260.041 1170.524,259.356 1174.525,271.307C1175.121,273.089 1171.543,268.583 1185.517,282.557"
                style={{
                  fill: 'none',
                  stroke: 'url(#_Purple14)',
                  strokeWidth: '20.53px',
                }}
                strokeLinecap="round"
              />
            </g>
            <path
              d="M1178.099,325.991C1172.527,295.714 1172.929,297.649 1163.49,319.673"
              style={{
                fill: 'none',
                stroke: 'url(#_Purple15)',
                strokeWidth: '26.85px',
              }}
              strokeLinecap="round"
            />
            <g transform="matrix(1.121315,-0.313082,0.419292,1.501709,-251.082058,225.848721)">
              <path
                d="M1134.881,252.04C1130.548,257.514 1127.717,259.284 1127.159,260.545C1117.11,283.243 1163.3,258.503 1150.546,265.498"
                style={{
                  fill: 'none',
                  stroke: 'url(#_Purple16)',
                  strokeWidth: '16.99px',
                }}
                strokeLinecap="round"
              />
            </g>
            <g transform="matrix(-0.119671,0.992814,-0.992814,-0.119671,1547.024161,-656.142307)">
              <path
                d="M994.472,288.02C1009.952,302.881 1012.911,311.398 1021.101,291.705"
                style={{
                  fill: 'none',
                  stroke: 'url(#_Purple17)',
                  strokeWidth: '28.27px',
                }}
                strokeLinecap="round"
              />
            </g>
            <g transform="matrix(-0.248284,0.968687,-0.968687,-0.248284,1694.153132,-634.95875)">
              <path
                d="M1090.598,298.382C1080.994,291.902 1086.206,305.021 1090.605,305.421"
                style={{
                  fill: 'none',
                  stroke: 'url(#_Purple18)',
                  strokeWidth: '26.85px',
                }}
                strokeLinecap="round"
              />
            </g>
            <g transform="matrix(0.917609,-0.397485,0.397485,0.917609,-7.086113,456.696865)">
              <path
                d="M1045.51,245.902C1055.229,284.778 1063.235,257.297 1082.416,258.667"
                style={{
                  fill: 'none',
                  stroke: 'url(#_Purple19)',
                  strokeWidth: '21.75px',
                }}
                strokeLinecap="round"
              />
            </g>
            <g transform="matrix(-0.999975,-0.007032,0.007032,-0.999975,2065.517901,624.523951)">
              <path
                d="M1013.458,291.767C1032.822,302.909 988.437,295.302 1009.418,312.017C1014.165,315.799 1012.34,313.487 1034.879,324.756"
                style={{
                  fill: 'none',
                  stroke: 'url(#_Purple20)',
                  strokeWidth: '37.95px',
                }}
                strokeLinecap="round"
              />
            </g>
            <path
              d="M1092.836,280.463C1105.955,288.92 1100.742,294.656 1097.943,306.201"
              style={{
                fill: 'none',
                stroke: 'url(#_Purple21)',
                strokeWidth: '28.27px',
              }}
              strokeLinecap="round"
            />
            <g transform="matrix(0.710975,-0.703217,0.703217,0.710975,94.066844,890.40921)">
              <path
                d="M1085.275,291.767C1102.575,300.418 1097.811,326.039 1102.21,326.439"
                style={{
                  fill: 'none',
                  stroke: 'url(#_Purple22)',
                  strokeWidth: '41.01px',
                }}
                strokeLinecap="round"
              />
            </g>
            <g transform="matrix(1,0,0,1,0,9.62756)">
              <path
                d="M1223.611,310.899C1199.14,328.379 1223.795,314 1200.159,315.97"
                style={{
                  fill: 'url(#_Radial23)',
                  stroke: 'url(#_Purple24)',
                  strokeWidth: '33.88px',
                }}
                strokeLinecap="round"
              />
            </g>
            <g transform="matrix(0.127017,0.991901,-0.991901,0.127017,1338.944186,-774.527952)">
              <path
                d="M1080.011,286.952C1097.311,295.602 1094.22,311.93 1088.445,317.622"
                style={{
                  fill: 'none',
                  stroke: 'url(#_Purple25)',
                  strokeWidth: '41.01px',
                }}
                strokeLinecap="round"
              />
            </g>
          </g>
        </g>
        <defs>
          <linearGradient
            id="_Purple1"
            x1={0}
            y1={0}
            x2={1}
            y2={0}
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(0,171.057284,-236.786188,0,1146.066312,225.295706)"
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
            width="320px"
            height="213px"
            xlinkHref="data:image/jpeg;base64,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"
          />
          <linearGradient
            id="_Purple4"
            x1={0}
            y1={0}
            x2={1}
            y2={0}
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(-21.949228,43.687784,-40.987808,-20.59273,1099.018225,180.391849)"
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
            id="_Purple5"
            x1={0}
            y1={0}
            x2={1}
            y2={0}
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(2.669134,-0.000002,-47.930123,-0,1068.069427,202.224799)"
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
            id="_Purple6"
            x1={0}
            y1={0}
            x2={1}
            y2={0}
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(25.398329,57.585189,6.26489,-2.763171,1154.585997,175.584172)"
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
            id="_Purple7"
            x1={0}
            y1={0}
            x2={1}
            y2={0}
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(-10.265525,39.075141,1.784271,0.46875,1241.133671,197.751411)"
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
            id="_Purple8"
            x1={0}
            y1={0}
            x2={1}
            y2={0}
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(-17.039945,85.188018,-2.596007,-0.519273,1208.975564,210.209694)"
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
            id="_Purple9"
            x1={0}
            y1={0}
            x2={1}
            y2={0}
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(5.88779,62.861788,-62.561364,2.462045,1234.244675,256.122839)"
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
            id="_Purple10"
            x1={0}
            y1={0}
            x2={1}
            y2={0}
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(-0.681969,31.704003,-4.577147,-0.03139,1101.357636,179.664298)"
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
            id="_Purple11"
            x1={0}
            y1={0}
            x2={1}
            y2={0}
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(5.282978,50.267802,-1.230507,0.129322,1101.285738,209.038729)"
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
            id="_Purple12"
            x1={0}
            y1={0}
            x2={1}
            y2={0}
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(-2.584568,46.92598,0.028552,0.001573,1161.169648,215.935319)"
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
            id="_Purple13"
            x1={0}
            y1={0}
            x2={1}
            y2={0}
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(7.649591,42.695064,-1.606092,0.272915,1017.514524,234.560069)"
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
            id="_Purple14"
            x1={0}
            y1={0}
            x2={1}
            y2={0}
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(-3.892658,54.699653,-3.106568,-0.221077,1184.009426,249.280634)"
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
            id="_Purple15"
            x1={0}
            y1={0}
            x2={1}
            y2={0}
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(-0.326894,36.721113,-66.675799,-0.593552,1159.062614,296.461953)"
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
            id="_Purple16"
            x1={0}
            y1={0}
            x2={1}
            y2={0}
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(-14.356465,38.393526,-3.895084,-0.812063,1130.961631,250.247136)"
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
            id="_Purple17"
            x1={0}
            y1={0}
            x2={1}
            y2={0}
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(45.653796,-7.299174,0.298995,1.87011,989.317031,305.576329)"
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
            id="_Purple18"
            x1={0}
            y1={0}
            x2={1}
            y2={0}
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(34.60119,-3.214614,0.022887,0.246345,1081.762625,302.028678)"
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
            id="_Purple19"
            x1={0}
            y1={0}
            x2={1}
            y2={0}
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(-9.953781,42.096761,-2.390652,-0.56527,1062.489536,253.655062)"
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
            id="_Purple20"
            x1={0}
            y1={0}
            x2={1}
            y2={0}
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(8.442934,-67.936461,2.969611,0.369054,1038.972234,324.778989)"
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
            id="_Purple21"
            x1={0}
            y1={0}
            x2={1}
            y2={0}
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(-3.387448,43.491369,-0.405243,-0.031563,1078.956127,278.000368)"
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
            id="_Purple22"
            x1={0}
            y1={0}
            x2={1}
            y2={0}
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(-41.921981,30.861297,-1.458903,-1.981773,1099.988791,286.907899)"
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
          <radialGradient
            id="_Radial23"
            cx={0}
            cy={0}
            r={1}
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(10.914908,48.019463,-88.035683,5.953586,1188.72338,335.971789)"
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
          </radialGradient>
          <linearGradient
            id="_Purple24"
            x1={0}
            y1={0}
            x2={1}
            y2={0}
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(-4.765239,51.760086,-2.284,-0.210274,1218.231035,299.440327)"
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
            id="_Purple25"
            x1={0}
            y1={0}
            x2={1}
            y2={0}
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(52.677672,-1.428829,0.128481,4.736794,1069.675522,317.543864)"
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
      </svg>
    </>
  );
};
export default YellowCoral;
