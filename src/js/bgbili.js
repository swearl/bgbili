(function ($) {
  $.fn.bgbili = function (options) {
    var settings = $.extend(
      {
        bvid: "BV1xx411c7XW",
        p: 1,
        ratio: 16 / 9,
      },
      options
    );

    const self = $(this);
    self.addClass("bgbili-player").after("<div class='bgbili-mask'></div>");
    checkMeta();

    getCid(settings.bvid, settings.p).then((cid) => {
      getVideo(settings.bvid, cid).then((res) => {
        const video = `<video src='${res.durl[0].url.replace(
          "http://",
          "https://"
        )}' preload autoplay muted loop playsinline></video>`;
        self.append(video);
        alignVideo();
      });
    });

    // const url = `https://api.bilibili.com/playurl?aid=${settings.aid}&page=${settings.page}&platform=html5&vtype=mp4&type=jsonp`;
    // $.ajax({
    //   url,
    //   dataType: "jsonp",
    //   success: (res) => {
    //     console.log(res);
    //     const video = `<video src='${res.durl[0].url.replace(
    //       "http://",
    //       "https://"
    //     )}' poster='${res.img.replace(
    //       "http://",
    //       "https://"
    //     )}' autoplay loop muted></video>`;
    //     self.append(video);
    //     alignVideo();
    //   },
    // });

    $(window).on("resize", function () {
      alignVideo();
    });

    function alignVideo() {
      const width = $(document).width(),
        height = $(document).height();
      var videoWidth = 0,
        videoHeight = 0,
        videoLeft = 0,
        videoTop = 0;
      if (width / height > settings.ratio) {
        videoWidth = width;
        videoHeight = videoWidth / settings.ratio;
        videoTop = 0 - (videoHeight - height) / 2;
      } else {
        videoHeight = height;
        videoWidth = videoHeight * settings.ratio;
        videoLeft = 0 - (videoWidth - width) / 2;
      }
      $(".bgbili-player video").css({
        width: videoWidth,
        height: videoHeight,
        left: videoLeft,
        top: videoTop,
        objectFit: "cover",
      });
    }

    function checkMeta() {
      if ($("meta[name='referrer']").length) {
        $("meta[name='referrer']").attr("content", "no-referrer");
      } else {
        $("head").append("<meta name='referrer' content='no-referrer'>");
      }
    }

    function getCid(bvid, p = 1) {
      const url = `https://bird.ioliu.cn/v1/?url=https://api.bilibili.com/x/web-interface/view?bvid=${bvid}`;
      return new Promise((resolve) => {
        $.ajax({
          url,
          type: "get",
          dataType: "json",
          success(res) {
            const v = res.data.pages[p - 1];
            resolve(v.cid);
          },
        });
      });
    }

    function getVideo(bvid, cid) {
      const url = `https://bird.ioliu.cn/v1/?url=https://api.bilibili.com/x/player/playurl?cid=${cid}&platform=html5&bvid=${bvid}`;
      return new Promise((resolve) => {
        $.ajax({
          url,
          type: "get",
          dataType: "json",
          success(res) {
            resolve(res.data);
          },
        });
      });
    }
  };
})(jQuery);
