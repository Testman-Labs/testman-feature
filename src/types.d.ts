export type FieldMaps = {
    [key: string]: string | string[];
};

export interface FeatuteElement {
    background: Background | undefined;
    scenario: FeatureScenario;
}

export interface FeatureScenario {
    name: string;
    description: string;
    fields?: FieldMaps;
}

export interface FeatureToJSON extends FeatureScenario {
    elements: FeatuteElement[];
}