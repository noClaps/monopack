# Monopack

A bundler using [esbuild](https://esbuild.github.io) and [`net/html`](https://pkg.go.dev/golang.org/x/net/html) that bundles together assets into a single HTML file.

## Installation

You can install it from source using [Go](https://go.dev):

```bash
go install codeberg.org/noclaps/monopack@latest
```

## Usage

```
Usage of monopack:
  -o string
    	The output directory for the built assets (default "dist")
```

You can pass in paths to the HTML files you'd like to bundle and it will bundle all of the HTML, CSS and JS in the file, and output it as a single file. For example:

```bash
monopack src/path/to/index.html src/path/to/other.html
# output to dist/path/to/index.html dist/path/to/other.html
```

You can specify the output directory with the `-o` option:

```bash
monopack -o _site src/index.html
# output to _site/index.html
```
