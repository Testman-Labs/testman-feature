import { FeatureToJSON } from "../src";

function FeatureToJson() {
    const doc = FeatureToJSON("tests/example.feature");
    console.log(doc)
}

FeatureToJson();