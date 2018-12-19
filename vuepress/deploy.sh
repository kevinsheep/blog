#!/usr/bin/env sh
set -e

yarn run docs:build

cd ..
cd docs
echo 'ceil.top' > CNAME
cd -

git init
git add -A
git commit -m 'bash auto deploy'
git push

exit 0