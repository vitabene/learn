#!/bin/bash
# build directory located in parent directory
DIRECTORY="../www"
if [ -d "$DIRECTORY" ]; then
  rm -rf $DIRECTORY
fi
mkdir $DIRECTORY
# copying relevant data
GENERAL_STYLESHEET="style"
cp -r ./assets $DIRECTORY/assets
mkdir $DIRECTORY/css
cp -r ./css/$GENERAL_STYLESHEET.css.map $DIRECTORY/css/$GENERAL_STYLESHEET.css.map
cp -r ./css/$GENERAL_STYLESHEET.css $DIRECTORY/css/$GENERAL_STYLESHEET.css
cp -r ./js $DIRECTORY/js
cp -r ./includes $DIRECTORY/includes
cp ./add.php $DIRECTORY/add.php
cp ./connect.php $DIRECTORY/connect.php
cp ./index.php $DIRECTORY/index.php
cp ./outline.php $DIRECTORY/outline.php
cp ./results.php $DIRECTORY/results.php
cp ./set.php $DIRECTORY/set.php
find /opt/lampp/htdocs/www -path '*/.*' -prune -o -type f -print | zip ~/learn.zip -@
