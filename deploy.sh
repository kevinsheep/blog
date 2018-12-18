#!/usr/bin/env sh
set -e

# 生成静态文件
npm run docs:build

# 进入生成的文件夹
cd docs/.vuepress/dist

# 如果是发布到自定义域名
echo 'ceil.top' > CNAME

git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:kevinsheep/kevinsheep.github.io.git master

cd -