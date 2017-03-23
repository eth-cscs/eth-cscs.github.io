/*
 * @author Victor Holanda Rusu (CSCS)
 *
 */
var __cscsMarkDown = "";

// this function reads file contents based on http request
// it should be used by all markdown based pages
function cscs_read_file_contents(filename, callback)
{
  var rawFile = new XMLHttpRequest();
  rawFile.open("GET", filename, false);

  var __fileContent = "";
  rawFile.onreadystatechange = function ()
  {
    if(rawFile.readyState === 4) {
      if(rawFile.status === 200 || rawFile.status == 0) {
        __fileContent = rawFile.responseText;
        if(typeof callback == 'function'){
          callback(__fileContent);
        }
      }
    }
  }
  rawFile.send(null);
}

// this function gets the base html and parses the sidebar using the same markdown used by remark.js
// before changing the markdown one needs to verify if it is compatible with the
// presentation mode
function cscs_setup_site_content(navbarfile, sidebarfile) {

  cscs_read_file_contents(navbarfile, function __populate_site_content(argument) {
    document.getElementById("cscs-site-content").innerHTML = argument;
  });

  cscs_read_file_contents(sidebarfile, function cscs_populate_site_content(argument) {

    marked.setOptions({
      gfm: true,
      tables: true,
      breaks: false,
      pedantic: true,
      sanitize: false,
      smartLists: true,
      langPrefix: '',
    });
    marked(argument, function (err, content) {
      if (err) throw err;
      document.getElementById("cscs-leftbar-markdown").innerHTML = content;
    });

  });

  // presentation mode is hidden if remark.js is not included
  try {
    if(remark != null) {
      $('#start-cscs-presenter-mode').show();
    } else {
      $('#start-cscs-presenter-mode').hide();
    }
  } catch(msg) {
    $('#start-cscs-presenter-mode').hide();
  }

  var presenterMode = document.getElementById('start-cscs-presenter-mode');
  presenterMode.click(function(e){e.preventDefault();});
  presenterMode.onclick = __cscs_show_in_presenter_mode;

  __cscs_email_protector();
  __cscs_prepend_domain_to_links();
}

// this function parses the markdown using the same markdown used by remark.js
// before changing the markdown one needs to verify if it is compatible with the
// presentation mode
function cscs_setup_markdown_page_content(markdownFile) {
  __cscsMarkDown = markdownFile;

  cscs_read_file_contents(markdownFile, function __populate_site_content(argument) {

    marked.setOptions({
      gfm: true,
      tables: true,
      breaks: false,
      pedantic: true,
      sanitize: false,
      smartLists: true,
      langPrefix: '',
    });
    marked(argument, function (err, content) {
      if (err) throw err;
      document.getElementById("cscs-markdown-content").innerHTML = content;
    });
  });
  __cscs_mouseover_link();
  __cscs_create_toc();
  __cscs_change_table_layout();
  __cscs_highlight_code();
}

function cscs_two_column_mode(markdownFile) {

  var markdown_div = $('#cscs-markdown-content');
  if (markdown_div.hasClass('col-md-7') == true) {
    markdown_div.removeClass('col-md-7');
  }
  markdown_div.addClass('col-md-9');

  $('#cscs-rightbar').hide();

}

// function cscs_get_modulelist(link, regex, shash_at = 0, elementid = "cscs-markdown-content")
// {
//   cscs_read_file_contents(link, function __populate_site_content(argument) {
//     var pattern = regex;
//     var parsed_module = "";

//     var result = pattern.exec(argument);
//     while (result) {
//       var holder = result + '';
//       holder = holder.replace('.eb', '');
//       var splitter = holder.split('-');
//       holder = "";
//       cat = '-';
//       for (var i = 0; i < splitter.length; i++) {
//         if(i == shash_at) {
//           cat = '/';
//         } else if(i == splitter.length -1){
//           cat = '';
//         } else {
//           cat = '-';
//         }
//         holder += splitter[i] + cat;
//       }
//       parsed_module += holder + '\n';
//       result = pattern.exec(argument);
//     }
//     document.getElementById(elementid).innerHTML += parsed_module;
//   });
// }

// this function starts the presentation mode
// this mode destroys completely the page. so we refresh the page if the exit button is clicked
function __cscs_show_in_presenter_mode() {
  document.getElementById("cscs-body-container").innerHTML = null;

  try {
    var slideshow = remark.create({sourceUrl: __cscsMarkDown});

    // the click blocks, so forcing full page reload for the click
    var presenterMode = document.getElementById('start-cscs-presenter-mode');
    presenterMode.style.display = 'none';
    var exitMode = document.getElementById('exit-cscs-presenter-mode');
    exitMode.style.display = 'block';

    // workaround to work for local and non local servers
    if(document.location.domain == null)
      exitMode.href = document.location.pathname;
    else
      exitMode.href = document.location.domain+document.location.pathname;

    slideshow.on();
  } catch(msg) {
    $('#start-cscs-presenter-mode').hide();
  }
}

// protects cscs' e-mail from robots
function __cscs_email_protector() {
  // $("#cscs-email-protector").prepend('<a href="&#109;&#97;&#105;&#108;&#116;&#111;&#58;%69%6E%66%6F%40%63%73%63%73%2E%63%68">Contact CSCS</a>');
  $("#cscs-email-protector").prepend('<a href="&#109;&#097;&#105;&#108;&#116;&#111;:&#104;&#101;&#108;&#112;&#064;&#099;&#115;&#099;&#115;&#046;&#099;&#104;">Contact us</a>');
}

// this function wraps the markdown headers with a link
// it does it on mouse hover. But it is not really needed
// We could do it immediately without the need of hovering
function __cscs_mouseover_link() {

  $('#cscs-markdown-content').children("h1, h2").each(function(index, element) {
    $(element).hover(
      function() {
        $(this).wrap(function() {
          return "<a id='" + $(this).attr('id') + "' href='#" + $( this ).attr('id') + "'></a>";
        });
      },
      function() {
        $(this).unwrap();
      }
    );
  });
}

// this function creates the toc based on the main markdown content
function __cscs_create_toc() {
  // TOC creation
  $('#toc').TOC();
  $('#toc').append('<a class="back-to-top" href="#">Back to top</a>');
  // Sidenav affixing
  setTimeout(function () {
    $('#toc').affix({
      offset: {
        // top: $('.cscs-global-nav').outerHeight(),
        top: function () {
          return $('.cscs-global-nav').outerHeight()
        },
        bottom: function () {
          return (this.bottom = $('.footer').outerHeight(true));
        }

      }
    })}, 100);
  var $window = $(window);
  var $body   = $(document.body);

  $body.scrollspy({
    target: '#toc'
  });

  $window.on('load', function () {
    $body.scrollspy('refresh');
  });

  // counting the number of h1 levels in the toc
  var tocsize = 0;
  $('#toc').children("ul").each(function(index, element) {
    var size = $(this).children("li").length;
    if(size > tocsize){
      tocsize = size;
    }
  });

  // expanding toc when there is only one h1
  if(tocsize == 1) {
    $("head").append("<style> nav[data-toggle='toc'] .nav .nav { display: block; } </style>");
  }
}

// This function destroys the remark presentation and restores the CSCS website
function __cscs_exit_presentation_mode() {
  if(document.location.domain == null)
    window.location.assign(document.location.pathname);
  else
    window.location.assign(document.location = document.location.domain+document.location.pathname);
}

// this function changes the layout of table inside the main side markdown area
function __cscs_change_table_layout() {
  $('#cscs-markdown-content').children("table").each(function(index, element) {
    $(element).addClass('table table-striped table-bordered' );
    $(this).wrap(function() {
      return "<div class='table-responsive' ></a>";
    });
  });
}

// this function adds code highlight
function __cscs_highlight_code() {
  try {
    if(hljs != null) {
      $("head").append('<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.10.0/styles/default.min.css">');
      $("head").append("<style> .hljs { background: none; } </style>");
      $('pre code').each(function(i, block) {
        hljs.highlightBlock(block);
      });
    }
  } catch(msg) {
    // no need to catch
  }
}

function __cscs_prepend_domain_to_links()
{
  var domain = "";

  if(document.location.domain != null) {
    domain = document.location.domain;
  }
  domain += "/";

  // prepending cscs domain
  $('.cscs-prepend-domain').each(function(index, element) {
    $(element).attr('href',function(i,v) {
      return domain + v;
    });
  });

  $('#cscs-leftbar-markdown').children('h1, h2, h3, h4, h5, h6').children('a').each(function(index, element) {
    $(element).attr('href',function(i,v) {
      return domain + v;
    });
  });
}
