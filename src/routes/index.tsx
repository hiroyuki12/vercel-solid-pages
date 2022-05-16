import Counter from "~/components/Counter";
import CounterPage from "~/components/CounterPage";
import "./index.css";

export default function Home() {
  return (
    <main>
      <h1>Hello world!</h1>
      <Counter />
      <CounterPage />
      <p>
        Visit{" "}
        <a href="https://solidjs.com" target="_blank">
          solidjs.com
        </a>{" "}
        to learn how to build Solid apps.
      </p>
      <p>
        <a href="https://mbp.hatenablog.com/entry/2022/05/16/213132" target="_blank">
          環境構築 
        </a>
      </p>
    </main>
  );
}
