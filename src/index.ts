import { Feature } from "@cucumber/messages";
import { elements, open, parse } from "./actions";
import { IFeatureToJSON } from "./types";

export function FeatureToJSON(filePath: string) {
    filePath = open(filePath.replace(/['"]/g, ''));
    const document = parse(filePath);

    const {
        name,
        description,
        children
    } = document.feature as Feature;

    const feature = {
        name: name,
        description: description.trim(),
        elements: elements([...children]),
        fields: {}
    };
    return feature as IFeatureToJSON;
}