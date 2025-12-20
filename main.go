package main

import (
	"bytes"
	"flag"
	"log"
	"os"
	"path/filepath"
	"slices"
	"strings"

	"github.com/evanw/esbuild/pkg/api"
	"golang.org/x/net/html"
)

func main() {
	outdir := "dist"
	flag.StringVar(&outdir, "o", "dist", "The output directory for the built assets")

	flag.Parse()

	files := flag.Args()

	for _, file := range files {
		file := filepath.Clean(file)

		baseDir := filepath.Dir(file)
		data, err := os.ReadFile(file)
		if err != nil {
			log.Fatalf("Error reading from %s: %v", file, err)
		}

		root, err := html.Parse(bytes.NewReader(data))
		if err != nil {
			log.Fatalf("Error parsing HTML: %v", err)
		}
		if err := processHTML(root, baseDir, outdir); err != nil {
			log.Fatalf("Error processing HTML: %v", err)
		}
		var buf bytes.Buffer
		if err := html.Render(&buf, root); err != nil {
			log.Fatalf("Error rendering HTML: %v", err)
		}

		filePath := strings.Join(strings.Split(file, "/")[1:], "/")
		outPath := filepath.Join(outdir, filePath)
		if err := os.MkdirAll(filepath.Dir(outPath), 0o750); err != nil {
			log.Fatalf("Error creating output directory: %v", err)
		}
		if err := os.WriteFile(outPath, buf.Bytes(), 0o666); err != nil {
			log.Fatalf("Error writing file: %v", err)
		}
	}
}

func processHTML(root *html.Node, baseDir string, outDir string) error {
	for node := range root.ChildNodes() {
		if node.Type != html.ElementNode {
			continue
		}
		if node.Data == "link" {
			i := slices.IndexFunc(node.Attr, func(attr html.Attribute) bool {
				return attr.Key == "rel" && attr.Val == "stylesheet"
			})
			if i == -1 {
				continue
			}

			i = slices.IndexFunc(node.Attr, func(attr html.Attribute) bool {
				return attr.Key == "href"
			})
			if i == -1 {
				continue
			}

			stylesheet := bundle("./"+filepath.Join(baseDir, node.Attr[i].Val), outDir)
			styleNode, err := html.ParseFragment(strings.NewReader("<style>"+stylesheet+"</style>"), node.Parent)
			if err != nil {
				return err
			}

			node.Parent.InsertBefore(styleNode[0], node)
			node.Parent.RemoveChild(node)
			continue
		}
		if node.Data == "script" {
			i := slices.IndexFunc(node.Attr, func(attr html.Attribute) bool {
				return attr.Key == "src"
			})
			if i == -1 {
				continue
			}

			script := bundle("./"+filepath.Join(baseDir, node.Attr[i].Val), outDir)
			scriptNode, err := html.ParseFragment(strings.NewReader("<script type=\"module\">"+script+"</script>"), node.Parent)
			if err != nil {
				return err
			}
			node.Parent.InsertBefore(scriptNode[0], node)
			node.Parent.RemoveChild(node)
			continue
		}

		for child := range node.ChildNodes() {
			processHTML(child, baseDir, outDir)
		}
	}

	return nil
}

func bundle(path, outDir string) string {
	result := api.Build(api.BuildOptions{
		EntryPoints:       []string{path},
		Bundle:            true,
		MinifySyntax:      true,
		MinifyWhitespace:  true,
		MinifyIdentifiers: true,
		Outdir:            outDir,
	})
	for _, err := range result.Errors {
		log.Fatalln("ERROR:", err)
	}
	for _, warn := range result.Warnings {
		log.Println("WARNING:", warn)
	}

	return string(result.OutputFiles[0].Contents)
}
