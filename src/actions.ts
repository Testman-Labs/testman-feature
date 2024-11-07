import { AstBuilder, GherkinClassicTokenMatcher, Parser } from '@cucumber/gherkin';
import { Background, FeatureChild, IdGenerator, Scenario } from '@cucumber/messages';
import { GherkinDocument } from '@cucumber/messages';
import { readFileSync } from 'fs';
import { replaceTags } from './utils';
import { FeatuteElement, FieldMaps } from './types';

const uuidFn = IdGenerator.uuid();
const matcher = new GherkinClassicTokenMatcher();

export function open(filePath: string) {
    try {
        const data = readFileSync(filePath, 'utf-8');
        return data
    } catch (error) {
        throw error;
    }
}


export function parse(document: string): GherkinDocument {
    const builder = new AstBuilder(uuidFn);
    const parser = new Parser(builder, matcher);
    return parser.parse(document);
}

export function elements(children: FeatureChild[]) {
    let background: Background | undefined;
    let l: FeatuteElement[] = [];

    for (const child of children) {
        if (child.background) {
            background = child.background;
        }
        if (child.scenario) {
            const scenarios = mapScenario(child.scenario);
            for (const sc of scenarios) {
                l.push({
                    background,
                    scenario: scenario(sc)
                })
            }
        }
    }
    return l;
}

function mapScenario(scenario: Scenario) {
    const scenarios: Scenario[] = [];
    if (scenario.examples.length > 0) {
        const exist_testcase = new Set<string>();
        for (const ex of scenario.examples) {
            const { tableHeader, tableBody } = ex;

            for (const tb of tableBody) {
                const tsc = { ...scenario };
                let { name, steps } = tsc;

                if (name.includes('<') && name.includes('>')) {
                    name = replaceTags(name, tableHeader!, tb);

                    steps = steps.map(step => ({
                        ...step,
                        text: replaceTags(step.text, tableHeader!, tb)
                    }));

                    tsc.examples = [{
                        ...ex,
                        tableHeader: tableHeader,
                        tableBody: [tb],
                    }];
                }

                if (!exist_testcase.has(name)) {
                    exist_testcase.add(name);
                    tsc.name = name;
                    tsc.steps = steps;
                    scenarios.push(tsc);
                }
            }
        }
    } else {
        scenarios.push(scenario);
    }
    return scenarios;
}

function scenario(scenario: Scenario) {
    return {
        name: scenario.name,
        description: scenario.description.trim(),
        fields: {
            ...fieldsScenario(scenario)
        }
    }
}

function fieldsScenario(scenario: Scenario) {
    const { steps, examples, keyword, name } = scenario;

    const step = steps.map(step => `${step.keyword}${step.text}`).join('\n');
    const stepSummary = `${keyword}: ${name}\n${step}`;

    const testData = examples.map(example => {
        if (!example.tableHeader || !example.tableBody) { return ''; }
    
        const header = '|' + example.tableHeader.cells.map(cell => cell.value).join(' | ') + '|';
        const body = example.tableBody.map(tb => '|' + tb.cells.map(cell => cell.value).join(' | ') + '|').join('\n') + '\n';
        return `${header}\n${body}`;
    }).filter(data => data !== '');
    
    return {
        stepSummary,
        testData
    } as FieldMaps;
}