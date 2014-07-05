
/** Register X-Link element */
xtag.register('x-link', {
  extends: 'link',
  lifecycle: {
    created: getCachedData,
    removed: sendReadyEvent
  }
})

/** Fetching & appending cached/fresh data */
function getCachedData() {
  var that = this,
      url = that.getAttribute('data-href'),
      cached = JSON.parse(localStorage.getItem(url));
  getHeaderData(url, function (xhr) {
    var headers = formatHeaderData(xhr.getAllResponseHeaders());
    if ( !cached ||
      headers['Last-Modified'].getTime() > cached['Last-Modified'] ||
      headers['Content-Length'] != cached['Content-Length'] ) {
      getNewStyles(url, function (styles) {
        appendStyles(that, styles);
      });
      return;
    }
    appendStyles(that, cached.content);
  });
}

/**
 * The detachment of the element from the DOM
 * marks the moment when the CSS is appended
 * to the DOM. Thus the `ready`-event is dispatched.
 */
function sendReadyEvent() {
  xtag.fireEvent(this, 'ready');
};

/**
 * Replaces the `x-link`-element with a `style`-
 * element that contains the fetched CSS.
 */
function appendStyles(elem, styles) {
  var style = document.createElement('style');
  style.type = 'text/css';
  style.textContent = styles;
  elem.parentNode.replaceChild(style, elem);
}

/** Fetching & storing new styles */
function getNewStyles(url, cb) {
  getAsyncData(url, function (xhr) {
    var headers = formatHeaderData(xhr.getAllResponseHeaders()),
        styles = xhr.responseText.replace(/(\r\n|\t+?)/g, '');
    localStorage.setItem(url, JSON.stringify({
      'Content-Type': headers['Content-Type'],
      'Content-Length': headers['Content-Length'],
      'Last-Modified': headers['Last-Modified'].getTime(),
      'content': styles
    }));
    cb(styles);
  });
}

/**
 * Takes a header data string and converts
 * it into an object.
 */
function formatHeaderData(str) {
  var rows = str.split(/\r\n/),
      ret = {};
  rows.forEach(function (row) {
    var tmp = row.split(': ');
    if ( !tmp[0] ) {
      return;
    }
    if ( tmp[0] === 'Date' || tmp[0] === 'Last-Modified' ) {
      ret[tmp[0]] = new Date(tmp[1]);
      return;
    }
    ret[tmp[0]] = tmp[1];
  });
  return ret;
}

/** Fetches async data */
function fetch(type, url, cb, state) {
  var http = new XMLHttpRequest(),
      state = state || 'DONE';
  http.open(type, url);
  http.onreadystatechange = function () {
    if ( this.readyState == this[state] ) {
      cb.call(null, this);
    }
  };
  http.send();
}

/** Takes  URL and fetches the header data. */
function getHeaderData(url, cb) {
  fetch('HEAD', url, cb, 'HEADERS_RECEIVED');
}

/** Takes a URL and fetches the content */
function getAsyncData(url, cb) {
  fetch('GET', url, cb);
}