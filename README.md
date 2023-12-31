# Learning Jazzer

Just one of the things I'm learning. https://github.com/hchiam/learning

[Jazzer.js](https://github.com/CodeIntelligenceTesting/jazzer.js) ([Jazzer](https://github.com/CodeIntelligenceTesting/jazzer)) for fuzzing, AKA fuzz testing.

## With node.js

https://www.youtube.com/watch?v=KyIhxEiNnfc

```sh
npm install -DE @jazzer.js/core
```

You can fuzz test FuzzTarget.js directly in the CLI:

```sh
npx jazzer FuzzTarget
```

```sh
# npx jazzer FuzzTarget crash-s0m3cr4sh5tr1ng1d # Base64 code to reproduce a specific error

# still triggers ==54827== Uncaught Exception after Running:
npx jazzer FuzzTarget crash-eff8ec10351afe6a12d58df3e9c71e363a37ee55

# this one no longer shows error after Running:
npx jazzer FuzzTarget crash-ca6ca17b1b8bc4b9e134f498f97a406593824b90
```

## and with [jest](https://github.com/hchiam/learning-jest)

https://www.youtube.com/watch?v=akSBP4fwgjg

```sh
npm install -DE @jazzer.js/jest-runner
```

You can fuzz test FuzzTarget.js with jest test FuzzTarget.fuzz.js and the following fuzz and jest options in your package.json:

```json
{
  "scripts": {
    "fuzz": "JAZZER_FUZZ=1 jest --testNamePattern=\"fuzz\"",
    "fuzz_regression": "JAZZER_FUZZ=0 jest --testNamePattern=\"fuzz\"", // checks against previously-found failures since jazzer stores bugs it found earlier
    "test": "jest --bail --findRelatedTests *.test.js", // for NON-fuzz tests. or for both test and fuzz: jest --testPathMatch=\"integration.test.js\"
    ...
  },
  ...
  "jest": {
    "projects": [
      {
        "displayName": "test"
      },
      {
        "testRunner": "@jazzer.js/jest-runner",
        "displayName": {
          "name": "Jazzer.js",
          "color": "cyan"
        },
        "testMatch": ["<rootDir>/**/*.fuzz.js"]
      }
    ]
  },
  ...
}
```

```sh
npm run fuzz
```

```sh
# check against previously-found failures since jazzer stores bugs it found earlier:
npm run fuzz_regression
```

```sh
# for NON-fuzz tests:
npm run test
# or for both test and fuzz: jest --testPathMatch=\"integration.test.js\"
```