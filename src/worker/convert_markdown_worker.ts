const worker: Worker = self as any; // web workerを変数にセット grobal変数：self
import marked from "marked";
import sanitizeHtml from "sanitize-html";

worker.addEventListener("message", (event) => {
  // メインスレッドから受け取る
  const text = event.data; // event.data メインスレッドから渡された値
  const html = sanitizeHtml(marked(text), {
    allowedTags: [...sanitizeHtml.defaults.allowedTags, "h1", "h2"], // サニタイズ→危険なコードを無力化 buttonなど
  });
  worker.postMessage({ html }); // postMessageでメインスレッドに送信
});
