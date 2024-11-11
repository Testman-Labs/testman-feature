import { Background } from "@cucumber/messages";
export type IFieldMaps = {
    [key: string]: string | string[];
};
export interface IFeatuteElement {
    background: Background | undefined;
    scenario: IFeatureScenario;
}
export interface IFeatureScenario {
    name: string;
    description: string;
    fields?: IFieldMaps;
}
export interface IFeatureToJSON extends IFeatureScenario {
    elements: IFeatuteElement[];
}
//# sourceMappingURL=types.d.ts.map