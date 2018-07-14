window.onload = function () {
  renderPDF('sample.pdf', document.getElementById('container'));
}
function renderPDF(url, container, options) {
  var options = options || { scale: 1 };
      
  function renderPage(page) {
    var viewport = page.getViewport(options.scale);
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    var renderContext = {
      canvasContext: ctx,
      viewport: viewport
    };
    
    canvas.height = viewport.height;
    canvas.width = viewport.width;
    container.appendChild(canvas);
    
    page.render(renderContext);
  }
  
  function renderPages(pdfDoc) {
    for(var num = 1; num <= pdfDoc.numPages; num++)
      pdfDoc.getPage(num).then(renderPage);
  }

  pdfjsLib.disableWorker = true;
  pdfjsLib.getDocument(url).then(renderPages);
}

function downloadPDF() {
  var pdf = new jsPDF();
  var canvas = document.getElementsByTagName('canvas');
  $.each(canvas, (i, c) => {
    if (i > 0) {
      pdf.addPage();
    }
    pdf.setPage(i + 1);
    var imgData = c.toDataURL("image/jpeg", 1.0);
    pdf.addImage(imgData, 'JPEG', 0, 0);
  });
  pdf.save("download.pdf");
}
