"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.replaceTags = replaceTags;
function replaceTags(name, theader, tbody) {
    theader.cells.forEach((cell, index) => {
        const placeholder = `<${cell.value}>`;
        name = name.replace(placeholder, tbody.cells[index].value);
    });
    return name;
}
