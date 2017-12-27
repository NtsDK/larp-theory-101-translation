function nl2array(nodeList) {
    return Array.prototype.slice.call(nodeList);
}

function queryEls(sel) {
    return nl2array(document.querySelectorAll(sel));
}

function getAttr(el, name) {
    return el.getAttribute(name);
}

function queryElEls(el, sel) {
    return nl2array(el.querySelectorAll(sel));
}

var sections = queryEls('section');

var data = sections.map(function(section){
    return {
        label: getAttr(section, 'label'),
        header: queryElEls(section, 'h2:nth-child(2)')[0].innerHTML.replace(/\s\s+/g, ' ')
    }
});

console.log(data.filter(function(obj){
    return obj.label !== obj.header
}));

