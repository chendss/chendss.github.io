$(document).ready(function () {
  var navHeight = $("#navbar").height();
  var toc = $("#toc");
  var main = $("main");
  var tocT = navHeight + (toc.offset().top - main.offset().top);
  var tocLimMin = main.offset().top - navHeight;
  var tocLimMax = $("#comments").offset().top - navHeight;
  $(window).scroll(function () {
    const navH = document.querySelector('#navbar').offsetHeight
    var scroH = document.body.scrollTop + document.documentElement.scrollTop;
    if (document.querySelector('.container-fluid').getBoundingClientRect().y <= navH) {
      toc.css({
        "display": "block",
        "position": "fixed",
        "top": navH
      })
    } else {
      toc.css({
        "position": "",
        "top": ''
      })
    }
  });
  tocbot.init({
    tocSelector: '#tocbot',
    contentSelector: '.post-content',
    headingSelector: 'h1, h2, h3, h4, h5, h6',
    linkClass: 'tocbot-link',
    activeLinkClass: 'tocbot-active-link',
    listClass: 'tocbot-list',
    isCollapsedClass: 'tocbot-is-collapsed',
    collapsibleClass: 'tocbot-is-collapsible',
    scrollSmooth: true,
  });
});
