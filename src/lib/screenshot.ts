import domtoimage from "dom-to-image";
import saveAs from "file-saver";

export function takeScreenshot() {
  domtoimage.toPng(document.body).then((dataUrl) => {
    const link = document.createElement("a");
    link.download = "annual-anime-log.jpeg";
    link.href = dataUrl;
    link.click();
  });
}
