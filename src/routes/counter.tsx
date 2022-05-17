import Counter from "~/components/Counter";
import CounterPage from "~/components/CounterPage";
import "./index.css";

export default function Home() {
  return (
    <main>
      <h1>Hello counter!</h1>
      <CounterPage />
      <p>
        Visit{" "}
        <a href="https://solidjs.com" target="_blank">
          solidjs.com
        </a>{" "}
        to learn how to build Solid apps.
      </p>
    </main>
  );
}
