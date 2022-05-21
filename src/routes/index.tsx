import Counter from "~/components/counter/Counter";
import CounterPage from "~/components/CounterPage";
import "./index.css";

export default function Home() {
  return (
    <main>
      <h1>Hello world!</h1>
      <Counter />
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
      <p>
        <a href="https://mbp.hatenablog.com/entry/2022/05/16/221120" target="_blank">
          VercelでSolidJS 
        </a>
      </p>
      <p>
        <a href="qiita">
           Qiita Page(API)
        </a>
      </p>
      <p>
        <a href="todo">
           TODO PAGE
        </a>
      </p>
      <p>
        <a href="cats">
           CATS PAGE
        </a>
      </p>
      <p>
        <a href="counter">
           COUNTER PAGE
        </a>
      </p>
    </main>
  );
}
