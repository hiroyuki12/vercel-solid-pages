import type { Component } from "solid-js";
import { createResource, For, createSignal, Suspense, createEffect } from "solid-js";
import { Qiita } from "./qiita-types";
import lodash from "lodash";
import moment from "moment";
import "./QiitaApp.css";

const fetchData = async(page: number) =>
  (await fetch(`https://qiita.com/api/v2/tags/react/items?page=${page}`)).json();
//const fetchData2 = async(tag: string) =>
//  (await fetch(`https://qiita.com/api/v2/tags/${tag}/items?page=1`)).json();

const QiitaPage: Component = () => {
  //const [postsList, setPostsList] = createSignal([]);
  const [page, setPage] = createSignal(1);
  const [tag, setTag] = createSignal("React");
  const [error, setError] = createSignal("");
  const [data, { refetch }] = createResource<Qiita[], number>(page, fetchData);
  //const [data2, { refetch2 }] = createResource<Qiita[], string>(tag, fetchData2);

  createEffect(() => {
    if(data() == null) {
      //setError("Probably Rate limit exceeded");
      //handleClick();   // if rate limit show Rate limit exceeded
    }
    //else {
    //  setError("");
    //}
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
      //setPage((prevCount) => prevCount + 1);
      setPage(page() + 1);
    //}

  }, 500);

  createEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const tagButtonClick = (target) => {
    setTag(target);
    //handleClick();
  };

  const pageButtonClick = (target) => {
    const tmp = parseInt(target, 10);
    setPage(tmp);
    //handleClick();
  };

  /*
  const handleClick = () => {
    const limit = 10;
    //const url = `https://qiita.com/api/v2/tags/${tag}/items?page=${page}&per_page=${limit}`;
    //const url = `https://qiita.com/api/v2/tags/react/items`;
    //const url = `https://qiita.com/api/v2/tags/${tag}/items`;
    const url = `https://qiita.com/api/v2/tags/${tag}/items?page=${page}`;
    //document.title = `page: ${page()}, tag: ${tag()}`;

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
          //document.title = `res.ok`;
	  //todo
          //setPostsList(postsList.concat(res.data));
        }
      })
  }
  */

  //let input!: HTMLInputElement;

  const onNextPage= () => {
    setPage(page() + 1);
  };
  const onPrevPage= () => {
    setPage(page() - 1);
  };

  const renderTag = (list) => {
    const tags = list.map((item, index) => {
      return (
        <>{item.name}, </>
      );
    });
    return tags;
  }

  return (
    <>
    <header className="QiitaApp-header">
      <font color="red"><b>{error}</b></font>
      <h1>Qiita Page</h1>
      <p>
        <a className="QiitaApp-link" href="https://mbp.hatenablog.com/entry/2022/05/16/221120" target="_blank">SolidJSでQiitaAPIから記事情報を取得して表示(vercel-solid-pages)</a>
      </p>
      <button onClick={() => tagButtonClick("react")}>React</button>
      <button onClick={() => tagButtonClick("next.js")}>Next.js</button>
      <button onClick={() => onNextPage()}>next page</button>
      <button onClick={() => onPrevPage()}>prev page</button>
      <button onClick={() => refetch()}>refetch</button>
      <button onClick={() => refetch2()}>refetch2</button>
      {tag}<br />
      page:<button onClick={() => pageButtonClick("1")}>__1__</button>
      ___:<button onClick={() => pageButtonClick("20")}>__20__</button>
      ___:<button onClick={() => pageButtonClick("50")}>__50__</button>
      ___:<button onClick={() => pageButtonClick("90")}>__90__</button>
      page: {page()}/20posts,
      {data.loading && "Loading..."}
      {data.error && "error"}

      <Suspense fallback={<div>Loading...</div>}>
        <ul>
          <For each={data()}>
            {(item) => (
              <li>
	          <div class="card-container">
                    <img src={item.user.profile_image_url} width="50" height="50" loading="lazy" />
		    <div class="card-text">
                      <a className="QiitaApp-link" href={item.url} target="_blank">{item.title}</a>		      <div class="card-text2">
                        <p>{moment(item.created_at).fromNow()}
			   / {renderTag(item.tags)} / {item.likes_count}likes / {item.user.items_count}posts</p>
                      </div>
		    </div>
	          </div>
              </li>
            )}
          </For>
        </ul>
	<div className="QiitaApp-footer">{tag} Page {page}/20posts</div>
      </Suspense>
    </header>
    </>
  );
};

export default QiitaPage;
