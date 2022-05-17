import type { Component } from "solid-js";
import { createResource, For, createSignal, Suspense } from "solid-js";
import { Cat } from "../types";
import { Qiita } from "../qiita-types";
import moment from "moment";

const fetchData = async (skip: number) =>
  (await fetch(`https://qiita.com/api/v2/tags/react/items`)).json();

const CatsPage: Component = () => {
  const [skip, setSkip] = createSignal(0);
  const [data, { refetch }] = createResource<Qiita[], number>(skip, fetchData);

  let input!: HTMLInputElement;

  const onSetSkip = () => {
    if (!input.value.trim()) return;
    if (isNaN(Number(input.value))) return;
    setSkip(Number(input.value));
  };

  return (
    <>
      <h1>Qiita Page</h1>
      <input type="number" placeholder="Enter Skip Number" ref={input} />
      <button onClick={() => onSetSkip()}>set skip</button>
      <button onClick={() => refetch()}>refetch</button>
      <Suspense fallback={<div>Loading...</div>}>
        <ul>
          <For each={data()}>
            {(qiita) => (
              <li>
                  <a href={qiita.url}>{qiita.title}</a> {moment(qiita.created_at).fromNow()}
              </li>
            )}
          </For>
        </ul>
      </Suspense>
    </>
  );
};

export default CatsPage;
