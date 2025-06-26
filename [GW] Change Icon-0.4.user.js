// ==UserScript==
// @name         [GW] Change Icon
// @namespace    http://tampermonkey.net/
// @version      0.4
// @description  Замена иконки синдиката
// @author       Respawn
// @match        https://www.gwars.io/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=gwars.io
// @grant        none
// ==/UserScript==

const synd = 456;
const icon = "data:image/gif;base64,R0lGODlhFAAOAPcAAP//////zP//mf//Zv//M///AP/M///MzP/Mmf/MZv/MM//MAP+Z//+ZzP+Zmf+ZZv+ZM/+ZAP9m//9mzP9mmf9mZv9mM/9mAP8z//8zzP8zmf8zZv8zM/8zAP8A//8AzP8Amf8AZv8AM/8AAMz//8z/zMz/mcz/Zsz/M8z/AMzM/8zMzMzMmczMZszMM8zMAMyZ/8yZzMyZmcyZZsyZM8yZAMxm/8xmzMxmmcxmZsxmM8xmAMwz/8wzzMwzmcwzZswzM8wzAMwA/8wAzMwAmcwAZswAM8wAAJn//5n/zJn/mZn/Zpn/M5n/AJnM/5nMzJnMmZnMZpnMM5nMAJmZ/5mZzJmZmZmZZpmZM5mZAJlm/5lmzJlmmZlmZplmM5lmAJkz/5kzzJkzmZkzZpkzM5kzAJkA/5kAzJkAmZkAZpkAM5kAAGb//2b/zGb/mWb/Zmb/M2b/AGbM/2bMzGbMmWbMZmbMM2bMAGaZ/2aZzGaZmWaZZmaZM2aZAGZm/2ZmzGZmmWZmZmZmM2ZmAGYz/2YzzGYzmWYzZmYzM2YzAGYA/2YAzGYAmWYAZmYAM2YAADP//zP/zDP/mTP/ZjP/MzP/ADPM/zPMzDPMmTPMZjPMMzPMADOZ/zOZzDOZmTOZZjOZMzOZADNm/zNmzDNmmTNmZjNmMzNmADMz/zMzzDMzmTMzZjMzMzMzADMA/zMAzDMAmTMAZjMAMzMAAAD//wD/zAD/mQD/ZgD/MwD/AADM/wDMzADMmQDMZgDMMwDMAACZ/wCZzACZmQCZZgCZMwCZAABm/wBmzABmmQBmZgBmMwBmAAAz/wAzzAAzmQAzZgAzMwAzAAAA/wAAzAAAmQAAZgAAMwAAAP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAANgALAAAAAAUAA4AQAi2ALEJFGgl0MBAgVixMjhQYMI6EFlda0Wx1TVTECGaYmUFWitTpq5dDAkK1B5oF0GZitYQGytTdvYsW5gwGquWDQNh/BTtGh8+EEHdPPhSJStoiVwQwIIlGjSJIhkOZBVtTx1Q0UBevWatFU5sgbK2UggSVB2bLVcUlGiWrVk7Emm6xJgxZLSxEluZvTrUSk9WFE0RWIolMMiNQ8eujKbSWkm7GEGdavkS4p5Z0aoK/XrwqVTOAQEAOw=="

function replaceImageSrc(img) {
    if (img.src.endsWith(`/${synd}.gif`)) {
        img.src = icon // можно заменить на знак другого синдиката img.src.replace(synd, '3321');
    }
}

const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
            if (node.nodeName === 'img') {
                replaceImageSrc(node);
            }
            if (node.querySelectorAll) {
                const images = node.querySelectorAll(`img[src$="/${synd}.gif"]`);
                images.forEach(replaceImageSrc);
            }
        });
    });
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});

document.querySelectorAll(`img[src$="/${synd}.gif"]`).forEach(replaceImageSrc);