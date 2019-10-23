function scrollToElement (target, offset) {
  var scroll_offset = $(target).offset();
  $("body,html").animate({
    scrollTop: scroll_offset.top + (offset || 0),
    easing: 'swing'
  })
}

function scrollToBoard () {
  scrollToElement('#board', -$("#navbar").height());
}

document.getElementById('board').onload = scrollToBoard;


$(document).ready(function () {
  var navbar = $("#navbar");
  if (navbar.offset().top > 0) {
    navbar.addClass("navbar-custom");
    navbar.removeClass("navbar-dark");
  }
  $(window).scroll(function () {
    if (navbar.offset().top > 0) {
      navbar.addClass("navbar-custom");
      navbar.removeClass("navbar-dark");
    } else {
      navbar.addClass("navbar-dark");
    }
  });
  $('#navbar-toggler-btn').on('click', function () {
    $('.animated-icon').toggleClass('open');
    $('#navbar').toggleClass('navbar-col-show');
  });

  var oldLoad = window.onload;
  window.onload = function () {
    oldLoad && oldLoad();
  };

  // 向下滚动箭头的点击
  $(".scroll-down-bar").on("click", scrollToBoard);

  // 向顶部滚动箭头
  var topArrow = $("#scroll-top-button");
  var posDisplay = false;
  var scrollDisplay = false;
  // 位置
  var setTopArrowPos = function () {
    var boardRight = document.getElementById('board').getClientRects()[0].right;
    var bodyWidth = document.body.offsetWidth;
    var right = bodyWidth - boardRight;
    posDisplay = right >= 50;
    topArrow.css({
      "bottom": posDisplay && scrollDisplay ? "20px" : "-60px",
      "right": right - 64 + "px"
    });
  };
  setTopArrowPos();
  $(window).resize(setTopArrowPos);
  // 显示
  var headerHeight = $("#board").offset().top;
  $(window).scroll(function () {
    var scrollHeight = document.body.scrollTop + document.documentElement.scrollTop;
    scrollDisplay = scrollHeight >= headerHeight;
    topArrow.css({
      "bottom": posDisplay && scrollDisplay ? "20px" : "-60px"
    });
  });
  // 点击
  topArrow.on("click", function () {
    $("body,html").animate({
      scrollTop: 0,
      easing: 'swing'
    })
  });
});

const getScrollTop = function () {
  var scroll_top = 0;
  if (document.documentElement && document.documentElement.scrollTop) {
    scroll_top = document.documentElement.scrollTop
  }
  else if (document.body) {
    scroll_top = document.body.scrollTop
  }
  return scroll_top
}

const throttle = function (func, delay) {
  var prev = Date.now()
  return function () {
    var context = this
    var args = arguments
    var now = Date.now()
    if (now - prev >= delay) {
      func.apply(context, args)
      prev = Date.now()
    }
  }
}

class Queue {
  constructor() {
    this.list = []
    this.lock = false
    setInterval(() => {
      if (!this.lock) {
        const handle = this.list.pop()
        handle && handle()
        this.list = []
      }
    }, 50)
  }
  add (handle) {
    this.lock = true
    this.list.push(handle)
    this.lock = false
  }
}

const queue = new Queue()

const scrollHandle = function () {
  const baseTop = document.querySelector('header').offsetHeight - 50
  const dom = document.querySelector('#toc')
  dom.setAttribute('style', `margin-top:${Math.max(0, getScrollTop() - baseTop)}px`)
}

// window.addEventListener('scroll', throttle(scrollHandle, 25))