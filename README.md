<!-- @format -->

[![Test](https://github.com/tomgrv/synology-package-builder/workflows/Test/badge.svg)](https://github.com/tomgrv/synology-package-builder/actions?query=workflow:"Test")
[![GitHub release](https://img.shields.io/github/release/tomgrv/synology-package-builder?include_prereleases=&sort=semver&color=blue)](https://github.com/tomgrv/synology-package-builder/releases/)
[![License](https://img.shields.io/badge/License-MIT-blue)](#license)
[![issues - synology-package-builder](https://img.shields.io/github/issues/tomgrv/synology-package-builder)](https://github.com/tomgrv/synology-package-builder/issues)

# Synology package builder github action

This action generates a synology package according to [Synology Developper Guide](https://help.synology.com/developer-guide/getting_started/first_package.html)

## Inputs

### `dsm`

The version of DSM to target. Defaults to `7.0`.

### `arch`

The architecture to target. Defaults to `noarch`.

### `projects`

The source of projects. Defaults to `./src`

> Must be under the `alias:./path/to/package` form if several sources with the same final package folder.
>
> ```yml
>  ...
>  projects: |-
>      front-pack:./src/front/package
>      back-pack:./src/back/package
> ```

### `output`

The output directory for the generated packages. Defaults to `./dist`

## Example usage

### Step

Default usage with one project in src folder:

```yml
- uses: tomgrv/synology-package-builder@v1
  with:
      dsm: 7.0
      arch: avoton
```

Custom usage with multiple project in arbitrary folders:

```yml
- uses: tomgrv/synology-package-builder@v1
  with:
      dsm: 7.0
      arch: avoton
      projects: |-
          ./src/web_package_example
          ./src/ExamplePackage
      output: ./dist
```

### Artifacts

To retrieve packages:

```yml
- uses: actions/upload-artifact@v4
  with:
      name: packages
      path: ./dist/*.spk
```

### Matrix

To build for multiple DSM versions and architectures, you can use a matrix strategy:

```yml
jobs:
    build:
        runs-on: ubuntu-latest
        strategy:
            matrix:
                dsm: [7.0, 7.1]
                arch: [noarch, avoton, x86_64]
        steps:
            - uses: actions/checkout@v3
            - uses: tomgrv/synology-package-builder@v1
              with:
                  dsm: ${{ matrix.dsm }}
                  arch: ${{ matrix.arch }}
```

## Project Structure

See [Project Structure](./doc/structure.md) for details on how to structure your Synology package project.

## Elevated Privileges

This action provides a way to install packages requiring elevated privileges.

See [Elevated Privileges](./doc/elevated.md) for details on how to use it.

## Exemples

See [tests results](https://github.com/tomgrv/synology-package-builder/actions/workflows/test.yaml) with [SynologyOpenSource/ExamplePackages](https://github.com/SynologyOpenSource/ExamplePackages)

See https://github.com/tomgrv/synology-github-runner

## License

This repository is licensed under the [MIT License](LICENSE).

This work is not affiliated with Synology Inc. in any way. It is an independent project that aims to facilitate the development of Synology packages using GitHub Actions. It is not an official Synology product and does not have any official support from Synology Inc. Use at your own risk.
