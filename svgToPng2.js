srcDiv.innerHTML = await fetch(srcDiv.dataset.src).then(r => r.text())
const svg = srcDiv.firstElementChild;

const svg2 = svg.cloneNode(true);

function elAndChildren(el) {
    return [el,...el.querySelectorAll('*')];
}

function copyStyles(el1, el2) {
    const styles = getComputedStyle(el1);
    [...styles].forEach(n => el2.style[n] = styles.getPropertyValue(n));
}

const copyEls = elAndChildren(svg2);

elAndChildren(svg).forEach((el, i) => copyStyles(el, copyEls[i]));

const canvas = document.createElement('canvas');
canvas.width = svg.clientWidth;
canvas.height = svg.clientHeight;

const data = new XMLSerializer().serializeToString(svg2);
const blob = new Blob([data], { type: "image/svg+xml;charset=utf-8" });

const img = new Image();
img.src = URL.createObjectURL(blob);

img.onload = function () {
    const ctx = canvas.getContext("2d");

    ctx.drawImage(img, 0, 0);

    const dataUrl = canvas.toDataURL("image/png");

    srcDiv.insertAdjacentHTML('afterend', `<img src='${dataUrl}'/>`);
};

