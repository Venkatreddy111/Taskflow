//@ts-check
"use strict";

/**
 * @typedef {Object} DeviceConfig
 * @property {number} cssWidth
 * @property {number} cssHeight
 * @property {number} pxWidth
 * @property {number} pxHeight
 * @property {number} ratio
 * @property {string} name
 */

/**
 * @param {number} cssWidth
 * @param {number} cssHeight
 * @param {number} pxWidth
 * @param {number} pxHeight
 * @param {number} ratio
 * @param {string} name
 * @returns {DeviceConfig}
 */
const D = (cssWidth, cssHeight, pxWidth, pxHeight, ratio, name) => ({
  cssWidth,
  cssHeight,
  pxWidth,
  pxHeight,
  ratio,
  name,
});

const devices = [
  D(440, 956, 1320, 2868, 3, "iPhone_16_Pro_Max"),
  D(402, 874, 1206, 2622, 3, "iPhone_16_Pro"),
  D(430, 932, 1290, 2796, 3, "iPhone_16_Plus__iPhone_15_Pro_Max__iPhone_15_Plus__iPhone_14_Pro_Max"),
  D(393, 852, 1179, 2556, 3, "iPhone_16__iPhone_15_Pro__iPhone_15__iPhone_14_Pro"),
  D(428, 926, 1284, 2778, 3, "iPhone_14_Plus__iPhone_13_Pro_Max__iPhone_12_Pro_Max"),
  D(390, 844, 1170, 2532, 3, "iPhone_14__iPhone_13_Pro__iPhone_13__iPhone_12_Pro__iPhone_12"),
  D(375, 812, 1125, 2436, 3, "iPhone_13_mini__iPhone_12_mini__iPhone_11_Pro__iPhone_XS__iPhone_X"),
  D(414, 896, 1242, 2688, 3, "iPhone_11_Pro_Max__iPhone_XS_Max"),
  D(414, 896, 828, 1792, 2, "iPhone_11__iPhone_XR"),
  D(414, 736, 1242, 2208, 3, "iPhone_8_Plus__iPhone_7_Plus__iPhone_6s_Plus__iPhone_6_Plus"),
  D(1032, 1376, 2064, 2752, 2, "13__iPad_Pro_M4"),
  D(1024, 1366, 2048, 2732, 2, "12.9__iPad_Pro"),
  D(834, 1210, 1668, 2420, 2, "11__iPad_Pro_M4"),
  D(834, 1194, 1668, 2388, 2, "11__iPad_Pro__10.5__iPad_Pro"),
  D(820, 1180, 1640, 2360, 2, "10.9__iPad_Air"),
  D(834, 1112, 1668, 2224, 2, "10.5__iPad_Air"),
  D(810, 1080, 1620, 2160, 2, "10.2__iPad"),
  D(768, 1024, 1536, 2048, 2, "9.7__iPad_Pro__7.9__iPad_mini__9.7__iPad_Air__9.7__iPad"),
  D(744, 1133, 1488, 2266, 2, "8.3__iPad_Mini"),
];

export default devices;
