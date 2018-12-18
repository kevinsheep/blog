#!/usr/bin/env sh
set -e

cd vuepress

# 生成静态文件
npm run docs:build

# 进入生成的文件夹
cd -
cd docs

# 如果是发布到自定义域名
echo 'ceil.top' > CNAME

cd -

git init
git add -A
git commit -m 'auto deploy'
git push

#git push -f git@github.com:kevinsheep/kevinsheep.github.io.git master
