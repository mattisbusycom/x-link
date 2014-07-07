X-Link
====

`x-link` extends the `<link>`-tag and provides a local-storage-caching for CSS. Actually this is more of a proof-of-concept. But nevertheless you're invited to test it.

## Installation

Clone the repository and install the dependencies:

```bash
$ git clone git@github.com:herschel666/x-link.git
$ mkdir x-link
$ bower install
```

## Usage

Include the X-Tag-Core-library and the X-Link-script into your HTML. That's it!

```html
…
<head>
  <script src="path/to/x-tag-core.js"></script>
  <script src="path/to/x-link.js"></script>
  …
  <link is="x-link" data-href="path/to/foo.css">
  <link is="x-link" data-href="path/to/bar">
</head>
…
```

## How it works

**X-Link** stores CSS in the local storage and makes asynchronous HEAD-requests to get the `Last-Modified`-date of the CSS-files. If the file on the server is newer than the version in the local storage it is fetched asynchronously. Otherwise the locally stored version is inserted into the DOM.

## License

Copyright 2014 Emanuel Kluge

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the Software), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED AS IS, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
