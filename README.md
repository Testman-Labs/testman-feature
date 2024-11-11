# Testman Feature

A feature management library for Testman Labs. This library helps in processing feature files for test case management with custom fields.

[![Build App](https://github.com/Testman-Labs/testman-feature/actions/workflows/build.yml/badge.svg)](https://github.com/Testman-Labs/testman-feature/actions/workflows/build.yml)

[![Test App](https://github.com/Testman-Labs/testman-feature/actions/workflows/test.yml/badge.svg)](https://github.com/Testman-Labs/testman-feature/actions/workflows/test.yml)



## Installation

```sh
npm install @testmanlabs/testman-feature
```

## Usage
```ts
import { FeatureToJSON, IFieldMaps, IFeatureElement, IFeatureScenario, IFeatureToJSON } from '@testmanlabs/testman-feature';

// Example usage
const featureData: IFeatureToJSON = FeatureToJSON('path/to/feature/file');
console.log(featureData);
```

## API

**Functions**

***FeatureToJSON(filePath: string): IFeatureToJSON**
Converts a feature file to a JSON object.

- `filePath:` The path to the feature file.

**Interfaces**

`**IFieldMaps**` Represents a map of fields.

`**IFeatureElement**` Represents a feature element.

`**IFeatureScenario**` Represents a feature scenario.

`**IFeatureToJSON**` Extends IFeatureScenario and includes an array of IFeatureElement.


## License

[MIT](/LICENSE.txt)