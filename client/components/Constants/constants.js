import Constants from "expo-constants";
const { manifest } = Constants;

const url =
  typeof manifest.packagerOpts === `object` && manifest.packagerOpts.dev
    ? manifest.debuggerHost.split(`:`).shift().concat(`:8080`)
    : `api.example.com`;

export const api = `http://${url}`
export const ip = typeof manifest.packagerOpts === `object` && manifest.packagerOpts.dev
? manifest.debuggerHost.split(`:`).shift()
: `api.example.com`;