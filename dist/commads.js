"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeatureToJSON = FeatureToJSON;
const actions_1 = require("./actions");
function FeatureToJSON(filePath) {
    filePath = (0, actions_1.open)(filePath.replace(/['"]/g, ''));
    const document = (0, actions_1.parse)(filePath);
    const { name, description, children } = document.feature;
    const feature = {
        name: name,
        description: description.trim(),
        elements: (0, actions_1.elements)([...children]),
        fields: {}
    };
    return feature;
}
