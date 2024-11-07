import { TableRow } from "@cucumber/messages";

export function replaceTags(
    name: string, 
    theader: TableRow, 
    tbody: TableRow
) {
    theader.cells.forEach((cell, index) => {
        const placeholder = `<${cell.value}>`;
        name = name.replace(placeholder, tbody.cells[index].value);
    });
    return name;
}