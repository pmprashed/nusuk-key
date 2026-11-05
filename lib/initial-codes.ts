import { CodeItem } from "./types";

export const INITIAL_CODES_DATA = [
  "NG-CXEVbXwR", "NG-0T7hIPaU", "NG-1OAsde5G", "NG-1akEAHuB", "NG-1rXwRlIu",
  "NG-2eii8ife", "NG-3EVtEBHz", "NG-3YYWVFKI", "NG-3rq5hX38", "NG-41DRSH6C",
  "NG-45pgFqQ2", "NG-4YBx2Hg1", "NG-55Tb0bry", "NG-5DkIAGPB", "NG-5GOYeADD",
  "NG-5NIA5pyf", "NG-5fhcpKMs", "NG-6CcVwh6s", "NG-6hFqXM9r", "NG-6wHKS7lU",
  "NG-7rrJd58v", "NG-82jkJTbU", "NG-837JyTOF", "NG-8BwrNL0A", "NG-8FBN1Ckh",
  "NG-9CxtPlrP", "NG-Au1o7GIA", "NG-B7SBJ2B4", "NG-BzOi5jCI", "NG-D22cJu0a",
  "NG-DOQY3Fzj", "NG-DTrRy5Bb", "NG-DwzqN2ws", "NG-DxxRuZaO", "NG-EVOxpJpM",
  "NG-FByp9Qok", "NG-FDGviieQ", "NG-FQKDbUDG", "NG-Fa9Mwf8O", "NG-HJqagp7g",
  "NG-I6tNLzIf", "NG-IGBEcwiK", "NG-ISYW2iba", "NG-IfM7lEEq", "NG-JTCvVsHJ",
  "NG-K8gw1Fsg", "NG-KiNliOHZ", "NG-Km2ZWkkP", "NG-LA0QFVZp", "NG-LurUJ4J1",
  "NG-NGIVcnKK", "NG-NqAt7qKQ", "NG-Nsn3Ge4c", "NG-OY3SXTle", "NG-OuDqk5FB",
  "NG-PZtZG3nM", "NG-Pal1ARsE", "NG-QNOQzzPe", "NG-QPGZIN1V", "NG-QfmYdMwG",
  "NG-QpXHQC3R", "NG-SyI1J7Br", "NG-TGcS7u0X", "NG-U7eoM8AW", "NG-UNm7HbrU",
  "NG-UdWc2ITM", "NG-X9fNFmK9", "NG-XIIjOcO5", "NG-ZbG92qFi", "NG-ZjMfFxDe",
  "NG-aKmJM32Y", "NG-awLJnrtb", "NG-bENmFlH4", "NG-bbcrbD9b", "NG-cC1TyIFG",
  "NG-cwCNfLRV", "NG-czpU2pJQ", "NG-dGG9uqCR", "NG-dJeqPCxd", "NG-dSsT5RaJ",
  "NG-eonVNpgr", "NG-fNNJ9ZSB", "NG-fSJUJ6AI", "NG-fUbhMc87", "NG-fb272AYE",
  "NG-fsCJPpEB", "NG-gdm6pciy", "NG-hbS3l5Iy", "NG-jQwjfdxv", "NG-jx8obdTX",
  "NG-jxKMO8E2", "NG-kMWheLTy", "NG-l5ps6pa5", "NG-lMNKlXDB", "NG-lxZwbMUx",
  "NG-m7ICv6kc", "NG-mSqu2CbH", "NG-nGR7YAKL", "NG-nT76NFUr", "NG-npIFIht5",
  "NG-nudX15b5", "NG-oF9wolAq", "NG-ofxJonL3", "NG-pWuTUhyU", "NG-pZTDM8rf",
  "NG-qFavnW0P", "NG-qSLctYH9", "NG-qu8xcObO", "NG-r5Fk0vo5", "NG-rCGvurd8",
  "NG-rGZ0DPZU", "NG-rPy6IJUn", "NG-rbb3qd1O", "NG-t6nkgHbr", "NG-u5dFeraN",
  "NG-uUK1Ibbq", "NG-ugTEjK4M", "NG-uiYrymMW", "NG-ulVDhddS", "NG-uz3ulLfj",
  "NG-v4J2Hftr", "NG-w5MHBZvg", "NG-xcuysAKz", "NG-xdh1ywzS", "NG-xpWzdQif",
  "NG-yJwBGsh2", "NG-yKsxqbkQ", "NG-yNpE3aSU", "NG-z3ngVeix", "NG-zRQSDC8N"
];

export const INITIAL_FALLBACK_CODES: CodeItem[] = INITIAL_CODES_DATA.map((code, index) => ({
  id: `20000000-0000-0000-0000-${String(index + 1).padStart(12, "0")}`,
  code,
  display_name: code === "NG-CXEVbXwR" ? "Rashed" : `Key ${index + 1}`,
  created_at: new Date(Date.now() - 3600000 * (130 - index)).toISOString(),
  use_count: code === "NG-CXEVbXwR" ? 200 : Math.floor(Math.random() * 5),
  report_count: 0,
  status: "active",
  last_served_at: null,
}));
