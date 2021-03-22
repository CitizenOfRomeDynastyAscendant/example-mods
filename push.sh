#!/bin/bash

cd "`dirname $0`"

MESSAGE='Uh...'
[ -n "${1}" ] && MESSAGE=${1}

yarn run lint-fix
git add . -A
git commit -am "$MESSAGE" --no-verify
git pull
git push
