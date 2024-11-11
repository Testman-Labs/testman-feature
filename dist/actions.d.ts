import { FeatureChild, GherkinDocument } from '@cucumber/messages';
import { IFeatuteElement } from './types';
export declare function open(filePath: string): string;
export declare function parse(document: string): GherkinDocument;
export declare function elements(children: FeatureChild[]): IFeatuteElement[];
//# sourceMappingURL=actions.d.ts.map