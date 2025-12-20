build: build-macos build-linux

build-macos:
    GOOS=darwin GOARCH=arm64 go build
    tar -acf monopack-darwin.tar.xz monopack
    rm monopack

build-linux:
    GOOS=linux GOARCH=amd64 go build
    tar -acf monopack-linux.tar.xz monopack
    rm monopack

clean:
    rm monopack-*.tar.xz
