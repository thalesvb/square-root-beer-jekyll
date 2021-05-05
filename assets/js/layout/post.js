// https://developers.google.com/web/updates/2017/09/sticky-headers
// https://stackoverflow.com/questions/16302483/event-to-detect-when-positionsticky-is-triggered
function rewritePost() {
  document.getElementsByTagName("article")[0].querySelectorAll("a").forEach(anchor => {
    anchor.classList.add("link");
  });
}
rewritePost();
works_done();
