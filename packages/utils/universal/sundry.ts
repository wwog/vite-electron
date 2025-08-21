export function isDev() {
  return process.env.NODE_ENV === "development";
}
export function isProd() {
  return process.env.NODE_ENV === "production";
}
export function getPort() {
  return Number(process.env.PORT) || 8163;
}
export function isMac() {
  return process.platform === "darwin";
}
export function isWin() {
  return process.platform === "win32";
}
export function isLinux() {
  return process.platform === "linux";
}
