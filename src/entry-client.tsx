import { hydrate } from "solid-js/web";
import { StartClient } from "solid-start/entry-client";

hydrate(() => <StartClient />, document);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js");
  });
}
