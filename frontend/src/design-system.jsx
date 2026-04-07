import { useState, useRef, useEffect, useCallback } from "react";
import { useTheme } from "./context/ThemeContext";

/*─────────────────────────────────────────────────────────────
  SLURP DESIGN SYSTEM
  Campus food delivery — warm, refined, icon-only (no emojis)
─────────────────────────────────────────────────────────────*/

/*─── RAW PALETTE ───*/
const pal = {
  stone: {
    0:   "#FFFFFF",
    25:  "#FAFAF8",
    50:  "#F5F2EF",
    100: "#EDE8E3",
    200: "#DDD7CF",
    300: "#C8C1B8",
    400: "#A89F96",
    500: "#857C73",
    600: "#6B6259",
    700: "#514A42",
    800: "#35302B",
    900: "#1C1814",
    950: "#0E0C09",
  },
  rust: {
    50:  "#FEF4EF",
    100: "#FDE5D8",
    200: "#FACAAF",
    300: "#F7A57B",
    400: "#F37843",
    500: "#E85A25",
    600: "#C94B1D",
    700: "#A33C16",
    800: "#7B2E10",
    900: "#57200B",
  },
  sage: {
    50:  "#EDFAF4",
    100: "#D2F3E5",
    200: "#A5E7CA",
    300: "#6DD3A8",
    400: "#3AB883",
    500: "#2D9E6D",
    600: "#26845B",
    700: "#1E6A48",
    800: "#165135",
    900: "#0E3823",
  },
  amber: {
    50:  "#FFFBEF",
    100: "#FEF3CF",
    200: "#FCE69C",
    300: "#F9D05E",
    400: "#F5B927",
    500: "#E8A314",
    600: "#C48710",
    700: "#9A690C",
    800: "#704C09",
    900: "#4E3506",
  },
  crim: {
    50:  "#FFF2F2",
    100: "#FFE2E2",
    200: "#FFC5C5",
    300: "#FF9595",
    400: "#F85555",
    500: "#EE2C2C",
    600: "#D11B1B",
    700: "#A81616",
    800: "#7D1111",
    900: "#560B0B",
  },
  azure: {
    50:  "#EFF6FF",
    100: "#DBE9FF",
    200: "#BAD3FF",
    300: "#87B2FF",
    400: "#5288FF",
    500: "#2C60F6",
    600: "#1E4DE0",
    700: "#163AB8",
    800: "#112D8D",
    900: "#0C2167",
  },
};

const avatarPool = [
  pal.rust[500], pal.sage[500], pal.amber[500],
  pal.azure[500], pal.rust[700], pal.sage[600], pal.amber[600],
];

/*─────────────────────────────────────────────────────────────
  LIGHT TOKENS
─────────────────────────────────────────────────────────────*/
export const t = {
  color: {
    bg:         pal.stone[25],
    bgAlt:      pal.stone[50],
    surface:    pal.stone[0],
    surfaceAlt: pal.stone[25],
    border:     pal.stone[200],
    borderStr:  pal.stone[300],
    text:       pal.stone[900],
    textSec:    pal.stone[600],
    textMut:    pal.stone[500],
    muted:      pal.stone[100],
    subtle:     pal.stone[50],
    req:        pal.rust[600],

    pri:        pal.rust[600],
    priHov:     pal.rust[700],
    priSub:     pal.rust[50],
    priMut:     pal.rust[100],
    priText:    pal.stone[0],

    suc:        pal.sage[500],
    sucSub:     pal.sage[50],
    sucText:    pal.sage[700],
    sucBor:     pal.sage[200],

    wrn:        pal.amber[600],
    wrnSub:     pal.amber[50],
    wrnText:    pal.amber[700],
    wrnBor:     pal.amber[200],

    err:        pal.crim[600],
    errSub:     pal.crim[50],
    errBor:     pal.crim[200],

    inf:        pal.azure[600],
    infSub:     pal.azure[50],
    infText:    pal.azure[700],
    infBor:     pal.azure[200],
  },

  sp: [0, 2, 4, 6, 8, 10, 12, 16, 20, 24, 32, 40, 48, 64, 80],

  r: { xs: 4, sm: 6, md: 8, lg: 12, xl: 16, xxl: 20, xxxl: 24, full: 9999 },

  shadow: {
    xs:       "0 1px 2px rgba(28,24,20,0.04)",
    sm:       "0 1px 3px rgba(28,24,20,0.06), 0 1px 2px rgba(28,24,20,0.04)",
    md:       "0 4px 12px rgba(28,24,20,0.07), 0 1px 4px rgba(28,24,20,0.04)",
    lg:       "0 8px 24px rgba(28,24,20,0.08), 0 2px 8px rgba(28,24,20,0.04)",
    xl:       "0 16px 48px rgba(28,24,20,0.10), 0 4px 12px rgba(28,24,20,0.05)",
    focus:    `0 0 0 3px ${pal.rust[100]}`,
    focusPri: `0 0 0 3px ${pal.rust[200]}`,
  },

  font: {
    display: "'Plus Jakarta Sans', system-ui, sans-serif",
    body:    "'Inter', system-ui, sans-serif",
    mono:    "'JetBrains Mono', 'SF Mono', monospace",
  },

  ease: {
    standard: "cubic-bezier(0.4, 0, 0.2, 1)",
    spring:   "cubic-bezier(0.34, 1.56, 0.64, 1)",
  },
};

/*─────────────────────────────────────────────────────────────
  DARK TOKENS
─────────────────────────────────────────────────────────────*/
export const td = {
  ...t,
  color: {
    bg:         "#161412",
    bgAlt:      "#1C1A17",
    surface:    "#232018",
    surfaceAlt: "#2A2622",
    border:     "#373230",
    borderStr:  "#4A4540",
    text:       "#F0EDE8",
    textSec:    "#B8B2AB",
    textMut:    "#857C73",
    muted:      "#2A2622",
    subtle:     "#1C1A17",
    req:        pal.rust[400],

    pri:        pal.rust[400],
    priHov:     pal.rust[300],
    priSub:     "#2A1D16",
    priMut:     "#3D2A1E",
    priText:    pal.stone[0],

    suc:        pal.sage[400],
    sucSub:     "#142B1E",
    sucText:    pal.sage[300],
    sucBor:     "#1E4030",

    wrn:        pal.amber[400],
    wrnSub:     "#2A2010",
    wrnText:    pal.amber[300],
    wrnBor:     "#3D3018",

    err:        pal.crim[400],
    errSub:     "#2A1414",
    errBor:     "#3D2020",

    inf:        pal.azure[400],
    infSub:     "#142040",
    infText:    pal.azure[300],
    infBor:     "#1E3060",
  },
  shadow: {
    xs:       "0 1px 2px rgba(0,0,0,0.20)",
    sm:       "0 1px 3px rgba(0,0,0,0.25), 0 1px 2px rgba(0,0,0,0.15)",
    md:       "0 4px 12px rgba(0,0,0,0.30), 0 1px 4px rgba(0,0,0,0.20)",
    lg:       "0 8px 24px rgba(0,0,0,0.35), 0 2px 8px rgba(0,0,0,0.20)",
    xl:       "0 16px 48px rgba(0,0,0,0.40), 0 4px 12px rgba(0,0,0,0.25)",
    focus:    `0 0 0 3px ${pal.rust[900]}`,
    focusPri: `0 0 0 3px ${pal.rust[800]}`,
  },
};

/*─── TOKEN HOOK ───*/
export const useT = () => {
  try {
    const { isDark } = useTheme();
    return isDark ? td : t;
  } catch {
    return t;
  }
};

/*─────────────────────────────────────────────────────────────
  GLOBAL CSS INJECTION
─────────────────────────────────────────────────────────────*/
const globalCss = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; }
  html { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
  body { margin: 0; }

  @keyframes ds-spin { to { transform: rotate(360deg); } }
  @keyframes ds-pulse { 0%,100%{ opacity:1 } 50%{ opacity:0.4 } }
  @keyframes ds-bounce { 0%,100%{ transform:translateY(0) } 50%{ transform:translateY(-6px) } }
  @keyframes ds-fade-in { from{ opacity:0 } to{ opacity:1 } }
  @keyframes ds-slide-up { from{ opacity:0; transform:translateY(12px) } to{ opacity:1; transform:translateY(0) } }
  @keyframes ds-slide-down { from{ opacity:0; transform:translateY(-12px) } to{ opacity:1; transform:translateY(0) } }
  @keyframes ds-scale-in { from{ opacity:0; transform:scale(0.95) } to{ opacity:1; transform:scale(1) } }

  .ds-spin { animation: ds-spin 0.7s linear infinite; }
  .ds-pulse { animation: ds-pulse 2s ease-in-out infinite; }
  .ds-fade-in { animation: ds-fade-in 0.4s ease-out; }
  .ds-slide-up { animation: ds-slide-up 0.4s ease-out; }
  .ds-slide-down { animation: ds-slide-down 0.4s ease-out; }
  .ds-scale-in { animation: ds-scale-in 0.25s ease-out; }
`;

export const CSS = () => {
  useEffect(() => {
    const id = "slurp-ds";
    if (!document.getElementById(id)) {
      const s = document.createElement("style");
      s.id = id;
      s.textContent = globalCss;
      document.head.prepend(s);
    }
  }, []);
  return null;
};

/*─────────────────────────────────────────────────────────────
  ICON PATHS
─────────────────────────────────────────────────────────────*/
const P = {
  check:       <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/>,
  x:           <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round"/>,
  chevDown:    <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round"/>,
  chevRight:   <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round"/>,
  chevLeft:    <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round"/>,
  chevUp:      <path d="M18 15l-6-6-6 6" strokeLinecap="round" strokeLinejoin="round"/>,
  search:      <><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35" strokeLinecap="round"/></>,
  copy:        <><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></>,
  upload:      <><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" strokeLinecap="round"/><polyline points="17,8 12,3 7,8" strokeLinecap="round" strokeLinejoin="round"/><line x1="12" y1="3" x2="12" y2="15" strokeLinecap="round"/></>,
  info:        <><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01" strokeLinecap="round"/></>,
  alertTri:   <><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13" strokeLinecap="round"/><line x1="12" y1="17" x2="12.01" y2="17" strokeLinecap="round"/></>,
  checkCirc:  <><path d="M22 11.08V12a10 10 0 11-5.93-9.14" strokeLinecap="round"/><polyline points="22,4 12,14.01 9,11.01" strokeLinecap="round" strokeLinejoin="round"/></>,
  xCirc:      <><circle cx="12" cy="12" r="10"/><path d="M15 9l-6 6M9 9l6 6" strokeLinecap="round"/></>,
  home:        <><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/></>,
  settings:    <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></>,
  user:        <><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></>,
  users:       <><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></>,
  link:        <><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" strokeLinecap="round"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" strokeLinecap="round"/></>,
  inbox:       <><polyline points="22,12 16,12 14,15 10,15 8,12 2,12" strokeLinecap="round" strokeLinejoin="round"/><path d="M5.45 5.11L2 12v6a2 2 0 002 2h16a2 2 0 002-2v-6l-3.45-6.89A2 2 0 0016.76 4H7.24a2 2 0 00-1.79 1.11z"/></>,
  plus:        <path d="M12 5v14M5 12h14" strokeLinecap="round"/>,
  minus:       <path d="M5 12h14" strokeLinecap="round"/>,
  arrowR:      <><line x1="5" y1="12" x2="19" y2="12" strokeLinecap="round"/><polyline points="12,5 19,12 12,19" strokeLinecap="round" strokeLinejoin="round"/></>,
  arrowL:      <><line x1="19" y1="12" x2="5" y2="12" strokeLinecap="round"/><polyline points="12,19 5,12 12,5" strokeLinecap="round" strokeLinejoin="round"/></>,
  save:        <><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/><polyline points="17,21 17,13 7,13 7,21"/><polyline points="7,3 7,8 15,8"/></>,
  cloud:       <path d="M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z"/>,
  edit:        <><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></>,
  eye:         <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>,
  eyeOff:      <><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" strokeLinecap="round"/><line x1="1" y1="1" x2="23" y2="23" strokeLinecap="round"/></>,
  shield:      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>,
  zap:         <polygon points="13,2 3,14 12,14 11,22 21,10 12,10" strokeLinecap="round" strokeLinejoin="round"/>,
  flag:        <><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></>,
  msgSq:       <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>,
  layout:      <><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></>,
  logOut:      <><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16,17 21,12 16,7"/><line x1="21" y1="12" x2="9" y2="12"/></>,
  grid:        <><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></>,
  bell:        <><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></>,
  send:        <><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22,2 15,22 11,13 2,9"/></>,
  play:        <polygon points="5,3 19,12 5,21"/>,
  hash:        <><line x1="4" y1="9" x2="20" y2="9"/><line x1="4" y1="15" x2="20" y2="15"/><line x1="10" y1="3" x2="8" y2="21"/><line x1="16" y1="3" x2="14" y2="21"/></>,
  filter:      <polygon points="22,3 2,3 10,12.46 10,19 14,21 14,12.46"/>,
  star:        <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>,
  extLink:     <><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15,3 21,3 21,9"/><line x1="10" y1="14" x2="21" y2="3"/></>,
  refresh:     <><polyline points="23,4 23,10 17,10"/><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/></>,
  moreH:       <><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></>,
  moreV:       <><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></>,
  package:     <><line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 002 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><polyline points="3.27,6.96 12,12.01 20.73,6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></>,
  shoppingCart:<><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/></>,
  wallet:      <><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></>,
  truck:       <><rect x="1" y="3" width="15" height="13"/><polygon points="16,8 20,8 23,11 23,16 16,16 16,8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></>,
  utensils:    <><path d="M3 2v7c0 1.1.9 2 2 2 1.1 0 2-.9 2-2V2M7 2v20M21 15V2a5 5 0 00-5 5v6c0 1.1.9 2 2 2h3zm0 0v7" strokeLinecap="round"/></>,
  leaf:        <path d="M17 8C8 10 5.9 16.17 3.82 22.02L5.71 22l.49-1.7A4.5 4.5 0 0010 22c6 0 10-7 10-16A17.6 17.6 0 0017 8z"/>,
  moon:        <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>,
  sun:         <><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></>,
  creditCard:  <><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></>,
  trending:    <><polyline points="23,6 13.5,15.5 8.5,10.5 1,18"/><polyline points="17,6 23,6 23,12"/></>,
  tool:        <><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></>,
  mapPin:      <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></>,
  phone:       <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.81 19.79 19.79 0 01.12 2.18 2 2 0 012.1 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.12 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z"/>,
  mail:        <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></>,
  calendar:    <><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></>,
  clock:       <><circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/></>,
  tag:         <><path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></>,
};

/*─── ICON COMPONENT ───*/
export const Icon = ({ name, size = 18, color = "currentColor", sw = 1.7, style: s }) => (
  <svg
    width={size} height={size} viewBox="0 0 24 24"
    fill="none" stroke={color} strokeWidth={sw}
    style={{ flexShrink: 0, display: "block", ...s }}
  >
    {P[name]}
  </svg>
);

/*─────────────────────────────────────────────────────────────
  TYPOGRAPHY ATOMS
─────────────────────────────────────────────────────────────*/
export const H = ({ l = 1, children, s }) => {
  const sz = { 1: 32, 2: 26, 3: 21, 4: 17, 5: 14 };
  const fw = { 1: 700, 2: 700, 3: 600, 4: 600, 5: 500 };
  const tok = useT();
  return (
    <div style={{
      fontFamily: tok.font.display, fontSize: sz[l], fontWeight: fw[l],
      color: tok.color.text, letterSpacing: l <= 2 ? -0.4 : -0.2,
      lineHeight: 1.25, ...s,
    }}>
      {children}
    </div>
  );
};

export const Body = ({ sz = "md", muted, children, s }) => {
  const fs = { sm: 13, md: 14, lg: 15.5 };
  const tok = useT();
  return (
    <p style={{
      fontFamily: tok.font.body, fontSize: fs[sz],
      color: muted ? tok.color.textSec : tok.color.text,
      lineHeight: 1.6, margin: 0, ...s,
    }}>
      {children}
    </p>
  );
};

export const Lbl = ({ children, req, s }) => {
  const tok = useT();
  return (
    <label style={{
      fontFamily: tok.font.body, fontSize: 13, fontWeight: 500,
      color: tok.color.text, display: "inline-flex", alignItems: "center", gap: 3, ...s,
    }}>
      {children}
      {req && <span style={{ color: tok.color.req }}>*</span>}
    </label>
  );
};

export const Cap = ({ children, s }) => {
  const tok = useT();
  return (
    <span style={{
      fontFamily: tok.font.body, fontSize: 11.5, fontWeight: 500,
      color: tok.color.textMut, letterSpacing: 0.5,
      textTransform: "uppercase", lineHeight: 1.5, ...s,
    }}>
      {children}
    </span>
  );
};

export const Mono = ({ children, s }) => {
  const tok = useT();
  return (
    <code style={{
      fontFamily: tok.font.mono, fontSize: 12.5, color: tok.color.pri,
      background: tok.color.priSub, padding: "2px 6px",
      borderRadius: tok.r.xs, ...s,
    }}>
      {children}
    </code>
  );
};

/*─────────────────────────────────────────────────────────────
  BUTTON
─────────────────────────────────────────────────────────────*/
const btnVariant = (v, tok) => ({
  pri:    { bg: tok.color.pri,     hov: tok.color.priHov, c: tok.color.priText, bor: tok.color.pri },
  sec:    { bg: "transparent",     hov: tok.color.priSub, c: tok.color.pri,     bor: tok.color.pri },
  ghost:  { bg: "transparent",     hov: tok.color.muted,  c: tok.color.text,    bor: "transparent" },
  danger: { bg: tok.color.err,     hov: "#a81616",        c: "#fff",            bor: tok.color.err },
  muted:  { bg: tok.color.muted,   hov: tok.color.border, c: tok.color.textSec, bor: "transparent" },
}[v] || {});

const btnSize = (s) => ({
  sm: { fs: 12.5, pad: "5px 12px",  gap: 5, iconSz: 14 },
  md: { fs: 13.5, pad: "8px 16px",  gap: 6, iconSz: 16 },
  lg: { fs: 14.5, pad: "11px 22px", gap: 7, iconSz: 18 },
}[s] || {});

export const Btn = ({
  children, v = "pri", sz = "md", icon, iconRight,
  onClick, disabled, loading, type = "button", style: s, full,
}) => {
  const tok = useT();
  const [hov, setHov] = useState(false);
  const vt = btnVariant(v, tok);
  const st = btnSize(sz);
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        gap: st.gap, fontFamily: tok.font.body, fontSize: st.fs, fontWeight: 600,
        color: vt.c, background: hov && !disabled ? vt.hov : vt.bg,
        border: `1.5px solid ${vt.bor}`, borderRadius: tok.r.lg,
        padding: st.pad, cursor: disabled || loading ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1, width: full ? "100%" : undefined,
        transition: "background 0.15s, box-shadow 0.15s, transform 0.1s",
        transform: hov && !disabled ? "translateY(-1px)" : "none",
        boxShadow: hov && !disabled && v === "pri" ? tok.shadow.sm : "none",
        outline: "none", lineHeight: 1, ...s,
      }}
    >
      {loading ? (
        <Spin size={st.iconSz} color={vt.c} />
      ) : (
        icon && <Icon name={icon} size={st.iconSz} color={vt.c} />
      )}
      {children}
      {!loading && iconRight && <Icon name={iconRight} size={st.iconSz} color={vt.c} />}
    </button>
  );
};

/*─────────────────────────────────────────────────────────────
  LAYOUT ATOMS
─────────────────────────────────────────────────────────────*/
export const Av = ({ name, size = 32, s }) => {
  const tok = useT();
  const ini = name ? name.split(" ").map(n => n[0]).join("").slice(0, 2) : "?";
  const idx = name ? name.split("").reduce((a, c) => a + c.charCodeAt(0), 0) % avatarPool.length : 0;
  return (
    <div style={{
      width: size, height: size, borderRadius: tok.r.full,
      background: avatarPool[idx], display: "flex", alignItems: "center",
      justifyContent: "center", fontFamily: tok.font.body,
      fontSize: size * 0.37, fontWeight: 600, color: "#fff", flexShrink: 0, ...s,
    }}>
      {ini}
    </div>
  );
};

export const Spin = ({ size = 18, color: c }) => {
  const tok = useT();
  const col = c || tok.color.pri;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className="ds-spin" style={{ flexShrink: 0 }}>
      <circle cx="12" cy="12" r="10" stroke={tok.color.border} strokeWidth="2.5" />
      <path d="M12 2a10 10 0 019.8 8" stroke={col} strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
};

export const Divider = ({ label, s }) => {
  const tok = useT();
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, width: "100%", ...s }}>
      <div style={{ flex: 1, height: 1, background: tok.color.border }} />
      {label && (
        <span style={{
          fontFamily: tok.font.body, fontSize: 11, color: tok.color.textMut,
          textTransform: "uppercase", letterSpacing: 0.8,
        }}>
          {label}
        </span>
      )}
      {label && <div style={{ flex: 1, height: 1, background: tok.color.border }} />}
    </div>
  );
};

export const Dot = ({ color: c, pulse, label, s }) => {
  const tok = useT();
  const col = c || tok.color.suc;
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 6, ...s }}>
      <span style={{
        width: 7, height: 7, borderRadius: "50%", background: col, flexShrink: 0,
        animation: pulse ? "ds-pulse 2s ease-in-out infinite" : "none",
      }} />
      {label && (
        <span style={{ fontFamily: tok.font.body, fontSize: 13, color: tok.color.textSec }}>
          {label}
        </span>
      )}
    </span>
  );
};

export const Kbd = ({ children }) => {
  const tok = useT();
  return (
    <kbd style={{
      fontFamily: tok.font.mono, fontSize: 11, fontWeight: 500,
      color: tok.color.textSec, background: tok.color.subtle,
      border: `1px solid ${tok.color.border}`,
      borderBottom: `2px solid ${tok.color.border}`,
      padding: "1px 5px", borderRadius: tok.r.xs, display: "inline-block",
    }}>
      {children}
    </kbd>
  );
};

/*─────────────────────────────────────────────────────────────
  FORM ATOMS
─────────────────────────────────────────────────────────────*/
export const Inp = ({ placeholder, value, onChange, type = "text", disabled, autoComplete, name, required, s }) => {
  const tok = useT();
  const [focused, setFocused] = useState(false);
  return (
    <input
      type={type} placeholder={placeholder} value={value} onChange={onChange}
      disabled={disabled} autoComplete={autoComplete} name={name} required={required}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={{
        fontFamily: tok.font.body, fontSize: 13.5, color: tok.color.text,
        background: tok.color.surface, border: `1px solid ${focused ? tok.color.pri : tok.color.border}`,
        borderRadius: tok.r.md, padding: "9px 12px",
        outline: "none", width: "100%",
        boxShadow: focused ? tok.shadow.focusPri : "none",
        transition: "border-color 0.15s, box-shadow 0.15s",
        opacity: disabled ? 0.5 : 1, cursor: disabled ? "not-allowed" : "text",
        "::placeholder": { color: tok.color.textMut },
        ...s,
      }}
    />
  );
};

export const Txtarea = ({ placeholder, value, onChange, rows = 3, disabled, s }) => {
  const tok = useT();
  const [focused, setFocused] = useState(false);
  return (
    <textarea
      placeholder={placeholder} value={value} onChange={onChange}
      rows={rows} disabled={disabled}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={{
        fontFamily: tok.font.body, fontSize: 13.5, color: tok.color.text,
        background: tok.color.surface, border: `1px solid ${focused ? tok.color.pri : tok.color.border}`,
        borderRadius: tok.r.md, padding: "9px 12px",
        outline: "none", width: "100%", resize: "vertical", lineHeight: 1.6,
        minHeight: 72, boxShadow: focused ? tok.shadow.focusPri : "none",
        transition: "border-color 0.15s, box-shadow 0.15s",
        opacity: disabled ? 0.5 : 1, ...s,
      }}
    />
  );
};

export const Chk = ({ checked, onChange, label, ind, disabled }) => {
  const tok = useT();
  const active = checked || ind;
  return (
    <label
      style={{
        display: "inline-flex", alignItems: "center", gap: 8,
        cursor: disabled ? "not-allowed" : "pointer",
        fontFamily: tok.font.body, fontSize: 13.5,
        color: disabled ? tok.color.textMut : tok.color.text, opacity: disabled ? 0.5 : 1,
      }}
      onClick={e => { e.preventDefault(); if (!disabled) onChange?.(!checked); }}
    >
      <div style={{
        width: 18, height: 18, borderRadius: tok.r.xs, flexShrink: 0,
        border: `1.5px solid ${active ? tok.color.pri : tok.color.border}`,
        background: active ? tok.color.pri : tok.color.surface,
        display: "flex", alignItems: "center", justifyContent: "center",
        transition: "all 0.12s",
      }}>
        {checked && <Icon name="check" size={12} color="#fff" sw={2.5} />}
        {ind && !checked && <Icon name="minus" size={12} color="#fff" sw={2.5} />}
      </div>
      {label && <span>{label}</span>}
    </label>
  );
};

export const Rad = ({ checked, onChange, label, disabled }) => {
  const tok = useT();
  return (
    <label
      style={{
        display: "inline-flex", alignItems: "center", gap: 8,
        cursor: disabled ? "not-allowed" : "pointer",
        fontFamily: tok.font.body, fontSize: 13.5,
        color: disabled ? tok.color.textMut : tok.color.text, opacity: disabled ? 0.5 : 1,
      }}
      onClick={e => { e.preventDefault(); if (!disabled) onChange?.(); }}
    >
      <div style={{
        width: 18, height: 18, borderRadius: tok.r.full, flexShrink: 0,
        border: `1.5px solid ${checked ? tok.color.pri : tok.color.border}`,
        background: tok.color.surface, display: "flex", alignItems: "center",
        justifyContent: "center", transition: "all 0.12s",
      }}>
        {checked && <div style={{ width: 9, height: 9, borderRadius: tok.r.full, background: tok.color.pri }} />}
      </div>
      {label && <span>{label}</span>}
    </label>
  );
};

export const Tog = ({ checked, onChange, label, disabled, s }) => {
  const tok = useT();
  return (
    <label
      style={{
        display: "inline-flex", alignItems: "center", gap: 10,
        cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.5 : 1,
        fontFamily: tok.font.body, fontSize: 13.5, color: tok.color.text, ...s,
      }}
      onClick={e => { e.preventDefault(); if (!disabled) onChange?.(!checked); }}
    >
      <div style={{
        width: 36, height: 20, borderRadius: tok.r.full, position: "relative",
        background: checked ? tok.color.pri : tok.color.border,
        border: `1.5px solid ${checked ? tok.color.pri : tok.color.border}`,
        transition: "all 0.2s",
      }}>
        <div style={{
          width: 14, height: 14, borderRadius: tok.r.full, background: "#fff",
          position: "absolute", top: 2, left: checked ? 18 : 2,
          boxShadow: tok.shadow.sm, transition: "left 0.2s",
        }} />
      </div>
      {label && <span>{label}</span>}
    </label>
  );
};

export const Sel = ({ options = [], value, onChange, placeholder, disabled, s }) => {
  const tok = useT();
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ position: "relative", width: "100%", ...s }}>
      <select
        value={value} onChange={onChange} disabled={disabled}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          fontFamily: tok.font.body, fontSize: 13.5, color: value ? tok.color.text : tok.color.textMut,
          background: tok.color.surface, border: `1px solid ${focused ? tok.color.pri : tok.color.border}`,
          borderRadius: tok.r.md, padding: "9px 32px 9px 12px",
          outline: "none", width: "100%", appearance: "none", cursor: "pointer",
          boxShadow: focused ? tok.shadow.focusPri : "none",
          transition: "border-color 0.15s, box-shadow 0.15s",
          opacity: disabled ? 0.5 : 1,
        }}
      >
        {placeholder && <option value="" disabled>{placeholder}</option>}
        {options.map(o => <option key={o.v} value={o.v}>{o.l}</option>)}
      </select>
      <div style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
        <Icon name="chevDown" size={14} color={tok.color.textMut} />
      </div>
    </div>
  );
};

/*─────────────────────────────────────────────────────────────
  DISPLAY ATOMS
─────────────────────────────────────────────────────────────*/
export const Badge = ({ children, v = "default", dot, s }) => {
  const tok = useT();
  const vs = {
    default: { bg: tok.color.muted,   c: tok.color.textSec, b: tok.color.border },
    pri:     { bg: tok.color.priSub,  c: tok.color.pri,     b: tok.color.priMut },
    suc:     { bg: tok.color.sucSub,  c: tok.color.sucText, b: tok.color.sucBor },
    wrn:     { bg: tok.color.wrnSub,  c: tok.color.wrnText, b: tok.color.wrnBor },
    err:     { bg: tok.color.errSub,  c: tok.color.err,     b: tok.color.errBor },
    inf:     { bg: tok.color.infSub,  c: tok.color.infText, b: tok.color.infBor },
  };
  const d = vs[v] || vs.default;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 5,
      fontFamily: tok.font.body, fontSize: 11.5, fontWeight: 500,
      color: d.c, background: d.bg, border: `1px solid ${d.b}`,
      padding: "2px 8px", borderRadius: tok.r.full, whiteSpace: "nowrap",
      lineHeight: "18px", ...s,
    }}>
      {dot && <span style={{ width: 6, height: 6, borderRadius: "50%", background: d.c }} />}
      {children}
    </span>
  );
};

export const Tag = ({ children, onRemove, selected, onClick, s }) => {
  const tok = useT();
  return (
    <span
      onClick={onClick}
      style={{
        display: "inline-flex", alignItems: "center", gap: 5,
        fontFamily: tok.font.body, fontSize: 12.5, fontWeight: 500,
        color: selected ? tok.color.pri : tok.color.text,
        background: selected ? tok.color.priSub : tok.color.surface,
        border: `1px solid ${selected ? tok.color.priMut : tok.color.border}`,
        padding: "4px 10px", borderRadius: tok.r.full,
        cursor: onClick ? "pointer" : "default",
        transition: "all 0.15s", ...s,
      }}
    >
      {selected && <Icon name="check" size={12} color={tok.color.pri} sw={2.5} />}
      {children}
      {onRemove && (
        <span
          onClick={e => { e.stopPropagation(); onRemove(); }}
          style={{
            cursor: "pointer", display: "flex", marginLeft: -2,
            background: tok.color.muted, borderRadius: "50%",
            width: 16, height: 16, alignItems: "center", justifyContent: "center",
          }}
        >
          <Icon name="x" size={9} color={tok.color.textMut} sw={2.5} />
        </span>
      )}
    </span>
  );
};

/*─────────────────────────────────────────────────────────────
  CARD
─────────────────────────────────────────────────────────────*/
export const Card = ({ children, pad = 24, shadow = "md", radius = "xl", s, onClick, hoverable }) => {
  const tok = useT();
  const [hov, setHov] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => hoverable && setHov(true)}
      onMouseLeave={() => hoverable && setHov(false)}
      style={{
        background: tok.color.surface,
        border: `1px solid ${tok.color.border}`,
        borderRadius: tok.r[radius],
        padding: pad,
        boxShadow: hov ? tok.shadow.lg : tok.shadow[shadow],
        transition: "box-shadow 0.2s, transform 0.2s",
        transform: hov ? "translateY(-2px)" : "none",
        cursor: onClick ? "pointer" : "default",
        ...s,
      }}
    >
      {children}
    </div>
  );
};

/*─────────────────────────────────────────────────────────────
  ALERT
─────────────────────────────────────────────────────────────*/
export const Alert = ({ v = "inf", title, children, icon, s }) => {
  const tok = useT();
  const vs = {
    inf: { bg: tok.color.infSub, c: tok.color.infText, b: tok.color.infBor, ic: icon || "info" },
    suc: { bg: tok.color.sucSub, c: tok.color.sucText, b: tok.color.sucBor, ic: icon || "checkCirc" },
    wrn: { bg: tok.color.wrnSub, c: tok.color.wrnText, b: tok.color.wrnBor, ic: icon || "alertTri" },
    err: { bg: tok.color.errSub, c: tok.color.err,     b: tok.color.errBor, ic: icon || "xCirc" },
  };
  const d = vs[v] || vs.inf;
  return (
    <div style={{
      display: "flex", gap: 10, alignItems: "flex-start",
      background: d.bg, border: `1px solid ${d.b}`,
      borderRadius: tok.r.lg, padding: "12px 14px", ...s,
    }}>
      <Icon name={d.ic} size={17} color={d.c} style={{ marginTop: 1 }} />
      <div>
        {title && (
          <div style={{ fontFamily: tok.font.body, fontSize: 13.5, fontWeight: 600, color: d.c, marginBottom: 2 }}>
            {title}
          </div>
        )}
        {children && (
          <div style={{ fontFamily: tok.font.body, fontSize: 13, color: d.c, lineHeight: 1.5 }}>
            {children}
          </div>
        )}
      </div>
    </div>
  );
};

/*─────────────────────────────────────────────────────────────
  PAGE SHELL
─────────────────────────────────────────────────────────────*/
export const Page = ({ children, s }) => {
  const tok = useT();
  return (
    <div style={{
      minHeight: "100vh", background: tok.color.bg,
      fontFamily: tok.font.body, transition: "background 0.2s", ...s,
    }}>
      {children}
    </div>
  );
};

export const Container = ({ children, s }) => (
  <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", ...s }}>
    {children}
  </div>
);
