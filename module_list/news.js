function setup_news() {

  cscs_read_news($('#selectYear').val() + ".md", -1);

  $('#selectYear').change(function () {
    // removing the old news first
    var theStart = __cscs_getCommentsObject('#cscs-markdown-content', ' start-news ');
    var theEnd = __cscs_getCommentsObject('#cscs-markdown-content', ' end-news ');
    var lastOne = $(theEnd).prev();
    var toRemove = $(theStart).nextUntil(lastOne);
    toRemove.remove();
    lastOne.remove();

    // adding  the news
    cscs_read_news($(this).val() + ".md", -1);
  });
}
