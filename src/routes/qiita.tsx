import type { Component } from "solid-js";
import { createResource, For, createSignal, Suspense } from "solid-js";
import { Qiita } from "../qiita-types";
import moment from "moment";
import "./QiitaApp.css";

const fetchData = async(page: number) =>
  (await fetch(`https://qiita.com/api/v2/tags/react/items?page=${page}`)).json();

const QiitaPage: Component = () => {
  const [page, setPage] = createSignal(1);
  const [data, { refetch }] = createResource<Qiita[], number>(page, fetchData);

  let input!: HTMLInputElement;

  const onNextPage= () => {
    //if (!input.value.trim()) return;
    //if (isNaN(Number(input.value))) return;
    //setPage(Number(input.value));
    setPage((prevCount) => prevCount + 1);
  };
  const onPrevPage= () => {
    //if (!input.value.trim()) return;
    //if (isNaN(Number(input.value))) return;
    //setPage(Number(input.value));
    setPage((prevCount) => prevCount - 1);
  };

  return (
    <>
    <header className="QiitaApp-header">
      <h1>Qiita Page</h1>
      <p>
        <a className="QiitaApp-link" href="https://mbp.hatenablog.com/entry/2022/05/16/221120" target="_blank">VercelでSolidJS</a>
      </p>
      <p>
        <a className="QiitaApp-link" href="https://mbp.hatenablog.com/entry/2021/07/15/214300" target="_blank">ReactでQiita APIから記事情報を取得して表示</a>
      </p>
      <input type="number" placeholder="Enter Skip Number" ref={input} />
      <button onClick={() => onNextPage()}>next page</button>
      <button onClick={() => onPrevPage()}>prev page</button>
      <button onClick={() => refetch()}>refetch</button>
      page: {page}
      <Suspense fallback={<div>Loading...</div>}>
        <ul>
          <For each={data()}>
            {(qiita) => (
              <li>
                  <img src={qiita.user.profile_image_url} width="50" height="50" loading="lazy" />
                  <a className="QiitaApp-link" href={qiita.url} target="_blank">{qiita.title}</a> {moment(qiita.created_at).fromNow()}
              </li>
            )}
          </For>
        </ul>
      </Suspense>
    </header>
    </>
  );
};

export default QiitaPage;
