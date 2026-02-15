(function () {
  'use strict';

  var toggleDrawer = function toggleDrawer() {
    document.body.classList.toggle('is-drawer-active');
  };
  document.getElementById('drawer_btn').addEventListener('click', toggleDrawer);
  document.getElementById('drawer_shade').addEventListener('click', toggleDrawer);

  document.querySelectorAll("[data-mv-play]").forEach(function (el) {
    var volElement = el.querySelector("[data-mv-vol]");
    var videoElement = el.querySelector("[data-mv-video]");
    if (volElement && videoElement) {
      var toggleVol = function toggleVol() {
        volElement.classList.toggle("-off");
        if (volElement.classList.contains("-off")) {
          videoElement.removeAttribute("muted", "");
          videoElement.muted = false;
          videoElement.volume = 0.5;
          console.log(videoElement.volume);
          videoElement.setAttribute("controls", "");
        }
      };
      volElement.addEventListener("click", toggleVol);
      var params = new URLSearchParams(location.search);
      var seekToEnd = params.has("seekEnd"); // ?seekEnd がある時だけ

      if (seekToEnd) {
        videoElement.addEventListener("loadedmetadata", function () {
          videoElement.currentTime = Math.max(0, videoElement.duration - 0.1);
        });
      }
    }
  });

  (function () {
    var root = document.querySelector(".js-yt-root");
    var modal = document.querySelector(".js-yt-modal");
    var body = document.getElementById("js-yt-body");
    if (!root || !modal || !body) return;
    var open = function open(videoId) {
      body.innerHTML = "\n      <div class=\"v-modal__ratio\">\n        <iframe\n          class=\"v-modal__iframe\"\n          src=\"https://www.youtube-nocookie.com/embed/".concat(videoId, "?autoplay=1&mute=1&rel=0\"\n          title=\"YouTube video\"\n          allow=\"autoplay; encrypted-media; picture-in-picture\"\n          allowfullscreen\n        ></iframe>\n      </div>\n    ");
      modal.hidden = false;
      document.documentElement.classList.add("is-modal-open");
    };
    var close = function close() {
      modal.hidden = true;
      body.innerHTML = ""; // これで再生停止
      document.documentElement.classList.remove("is-modal-open");
    };

    // どのサムネをクリックしても動く（イベント委譲）
    root.addEventListener("click", function (e) {
      var btn = e.target.closest(".js-yt-open");
      if (!btn) return;
      var id = btn.dataset.ytid;
      if (!id) return;
      open(id);
    });

    // モーダル閉じる（背景 or ×）
    modal.addEventListener("click", function (e) {
      if (e.target.closest(".js-yt-close")) close();
    });

    // Escで閉じる
    document.addEventListener("keydown", function (e) {
      if (!modal.hidden && e.key === "Escape") close();
    });
  })();

})();
