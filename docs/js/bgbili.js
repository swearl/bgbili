(function($) {
	$.fn.bgbili = function(options) {
		var settings = $.extend({
			aid: 314,
			page: 1,
			ratio: 16 / 9
		}, options);

		const self = $(this);
		self.addClass("bgbili-player").after("<div class='bgbili-mask'></div>");
		checkMeta();

		const url = `https://api.bilibili.com/playurl?aid=${settings.aid}&page=${settings.page}&platform=html5&vtype=mp4&type=jsonp`;
		$.ajax({
			url,
			dataType: "jsonp",
			success: res => {
				console.log(res);
				const video = `<video src='${res.durl[0].url.replace("http://", "https://")}' poster='${res.img.replace("http://", "https://")}' autoplay loop muted></video>`;
				self.append(video);
				alignVideo();
			}
		});

		$(window).on("resize", function() {
			alignVideo();
		});

		function alignVideo() {
			const width = $(document).width(), height = $(document).height();
			var videoWidth = 0, videoHeight = 0, videoLeft = 0, videoTop = 0;
			if(width / height > settings.ratio) {
				videoWidth = width;
				videoHeight = videoWidth / settings.ratio;
				videoTop = 0 - (videoHeight - height) / 2;
			} else {
				videoHeight = height;
				videoWidth = videoHeight * settings.ratio;
				videoLeft = 0 - (videoWidth - width) / 2;
			}
			$(".bgbili-player video").css({
				"width": videoWidth,
				"height": videoHeight,
				"left": videoLeft,
				"top": videoTop
			})
		}

		function checkMeta() {
			if($("meta[name='referrer']").length) {
				$("meta[name='referrer']").attr("content", "no-referrer");
			} else {
				$("head").append("<meta name='referrer' content='no-referrer'>")
			}
		}
	}
})(jQuery);