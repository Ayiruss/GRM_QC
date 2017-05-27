'use strict';

var pageNo = 0;
var doc = "hell.pdf";
//SystemJS.import('pdfjs/display/api');
//SystemJS.import('pdfjs/display/global');
// In production, the bundled pdf.js shall be used instead of SystemJS.
Promise.all([SystemJS.import('pdfjs/display/api'),
             SystemJS.import('pdfjs/display/global')])
       .then(function (modules) {
  var api = modules[0], global = modules[1];
  // In production, change this to point to the built `pdf.worker.js` file.

  global.PDFJS.workerSrc = '../../src/worker_loader.js';
  //pageNo ++;
  // Fetch the PDF document from the URL using promises.
  api.getDocument(doc).then(function (pdf) {
    // Fetch the page.

    //alert(noOfPages);
    pageNo++;
    //noinspection JSAnnotator
    //but.onclick() = function() {
      pdf.getPage(1).then(function (page) {
        var scale = 1.5;
        var viewport = page.getViewport(scale);

        // Prepare canvas using PDF page dimensions.
        var canvas = document.getElementById('the-canvas');
        var context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        // Render PDF page into canvas context.s
        var renderContext = {
          canvasContext: context,
          viewport: viewport
        };
        page.render(renderContext);
      });
    //}
  });
});
function nextPage() {
 // alert("yes");
  Promise.all([SystemJS.import('pdfjs/display/api'),
    SystemJS.import('pdfjs/display/global')])
    .then(function (modules) {
      var api = modules[0], global = modules[1];
      // In production, change this to point to the built `pdf.worker.js` file.
      global.PDFJS.workerSrc = '../../src/worker_loader.js';

      // Fetch the PDF document from the URL using promises.
      api.getDocument(doc).then(function (pdf) {
        pageNo++;
        var noOfPages = pdf.numPages;
        var but = document.getElementById("next");
        but.disabled = true;
        pdf.getPage(pageNo).then(function (page) {
          var scale = 1.5;
          var viewport = page.getViewport(scale);

          // Prepare canvas using PDF page dimensions.
          var canvas = document.getElementById('the-canvas');
          var context = canvas.getContext('2d');
          canvas.height = viewport.height;
          canvas.width = viewport.width;

          // Render PDF page into canvas context.s
          var renderContext = {
            canvasContext: context,
            viewport: viewport
          };
          page.render(renderContext);
          if(pageNo != noOfPages)
            but.disabled = false;
        });
        //}
      });
    });

}


var _getAllFilesFromFolder = function(dir) {

  var filesystem = require("browserify-fs");
  var results = [];

  filesystem.readdirSync(dir).forEach(function(file) {
    alert("IN");
    file = dir+'/'+file;
    var stat = filesystem.statSync(file);

    if (stat && stat.isDirectory()) {
      results = results.concat(_getAllFilesFromFolder(file))
      alert(results);
    } else results.push(file);

  });

  return results;

};
