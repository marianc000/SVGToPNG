srcDiv.innerHTML = await fetch(srcDiv.dataset.src).then(r => r.text())
const svg = srcDiv.firstElementChild;

const svg2 = svg.cloneNode(true);

function elAndChildren(el) {
    return [el, ...el.querySelectorAll('*')];
}

function copyStyles(el1, el2) {
    const styles = getComputedStyle(el1);
    [...styles].forEach(n => el2.style[n] = styles.getPropertyValue(n));
}

const copyEls = elAndChildren(svg2);

elAndChildren(svg).forEach((el, i) => copyStyles(el, copyEls[i]));

const data = new XMLSerializer().serializeToString(svg2);
const blob = new Blob([data], { type: "image/svg+xml;charset=utf-8" });

const img = new Image();
img.src = URL.createObjectURL(blob);

img.onload = async function () {
    const canvas = new OffscreenCanvas(svg.clientWidth, svg.clientHeight)
    canvas.getContext("2d").drawImage(img, 0, 0);

    const blob2 = await canvas.convertToBlob();
    srcDiv.insertAdjacentHTML('afterend', `<img src='${URL.createObjectURL(blob2)}'/>`);
};

