"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.open = open;
exports.parse = parse;
exports.elements = elements;
const gherkin_1 = require("@cucumber/gherkin");
const messages_1 = require("@cucumber/messages");
const fs_1 = require("fs");
const utils_1 = require("./utils");
const uuidFn = messages_1.IdGenerator.uuid();
const matcher = new gherkin_1.GherkinClassicTokenMatcher();
function open(filePath) {
    try {
        const data = (0, fs_1.readFileSync)(filePath, 'utf-8');
        return data;
    }
    catch (error) {
        throw error;
    }
}
function parse(document) {
    const builder = new gherkin_1.AstBuilder(uuidFn);
    const parser = new gherkin_1.Parser(builder, matcher);
    return parser.parse(document);
}
function elements(children) {
    let background;
    let l = [];
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
                });
            }
        }
    }
    return l;
}
function mapScenario(scenario) {
    const scenarios = [];
    if (scenario.examples.length > 0) {
        const exist_testcase = new Set();
        for (const ex of scenario.examples) {
            const { tableHeader, tableBody } = ex;
            for (const tb of tableBody) {
                const tsc = { ...scenario };
                let { name, steps } = tsc;
                if (name.includes('<') && name.includes('>')) {
                    name = (0, utils_1.replaceTags)(name, tableHeader, tb);
                    steps = steps.map(step => ({
                        ...step,
                        text: (0, utils_1.replaceTags)(step.text, tableHeader, tb)
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
    }
    else {
        scenarios.push(scenario);
    }
    return scenarios;
}
function scenario(scenario) {
    return {
        name: scenario.name,
        description: scenario.description.trim(),
        fields: {
            ...fieldsScenario(scenario)
        }
    };
}
function fieldsScenario(scenario) {
    const { steps, examples, keyword, name } = scenario;
    const step = steps.map(step => `${step.keyword}${step.text}`).join('\n');
    const stepSummary = `${keyword}: ${name}\n${step}`;
    const testData = examples.map(example => {
        if (!example.tableHeader || !example.tableBody) {
            return '';
        }
        const header = '|' + example.tableHeader.cells.map(cell => cell.value).join(' | ') + '|';
        const body = example.tableBody.map(tb => '|' + tb.cells.map(cell => cell.value).join(' | ') + '|').join('\n') + '\n';
        return `${header}\n${body}`;
    }).filter(data => data !== '');
    return {
        summary: name,
        stepSummary,
        testData
    };
}
