
find . -type d -print0 | xargs -0 -L1 sh -c 'cd "$0" && pwd && react-doc-generator . -o ./DOCS.md'
