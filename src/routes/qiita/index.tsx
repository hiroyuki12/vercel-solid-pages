import type { Component } from "solid-js";
import { createResource, For, createSignal, Suspense, createEffect } from "solid-js";
import { Qiita } from "./qiita-types";
import lodash from "lodash";
import moment from "moment";
import "./QiitaApp.css";

const fetchData = async(page: number) =>
  (await fetch(`https://qiita.com/api/v2/tags/react/items?page=${page}`)).json();
const fetchData2 = async(tag: string) =>
  (await fetch(`https://qiita.com/api/v2/tags/${tag}/items?page=1`)).json();

const QiitaPage: Component = () => {
  const [postsList, setPostsList] = createSignal([]);
  const [page, setPage] = createSignal(1);
  const [tag, setTag] = createSignal("react");
  const [error, setError] = createSignal("");
  const [data, { refetch }] = createResource<Qiita[], number>(page, fetchData);
  const [data2, { refetch2 }] = createResource<Qiita[], string>(tag, fetchData2);

  createEffect(() => {
    if(data() == null) {
      setError("Probably Rate limit exceeded");
    }
    else {
      setError("");
    }
  });

  // 一番下に到達したら 次ページに更新
  const handleScroll = lodash.throttle(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight
    ) {
      return;
    }

    // 一番下に到達した時の処理
    //if(message !== "loading...") {
      setPage((prevCount) => prevCount + 1);
    //}

  }, 500);

  createEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleClick = () => {
    const limit = 40;
    const url = `https://qiita.com/api/v2/tags/${tag}/items?page=${page}&per_page=${limit}`;
    //const url = `https://qiita.com/api/v2/tags/react/items`;

    const headers = {}
    fetch(url, { headers })
      .then(res =>
        res.json().then(data => ({
          ok: res.ok,
          data,
        }))
      )
      .then(res => {
        if (!res.ok) {
          setError(res.data.message);  // Rate limit exceeded
          //throw Error(res.data.message)
        } else {
	  setError("res.ok");
          //setPostsList(postsList.concat(res.data));
        }
      })
  }

  let input!: HTMLInputElement;

  const onNextPage= () => {
    //if (!input.value.trim()) return;
    //if (isNaN(Number(input.value))) return;
    //setPage(Number(input.value));
    //setPage((prevCount) => prevCount + 1);
    handleClick();
  };
  const onPrevPage= () => {
    //if (!input.value.trim()) return;
    //if (isNaN(Number(input.value))) return;
    //setPage(Number(input.value));
    setPage((prevCount) => prevCount - 1);
  };
  const onTagSwift= () => {
    setTag("swift");
  };
  const onTagReact= () => {
    setTag("react");
  };

  return (
    <>
    <header className="QiitaApp-header">
      <font color="red"><b>{error}</b></font>
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
      page: {page},
      tag: {tag},
      {data.loading && "Loading..."}
      {data.error && "error"}

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
