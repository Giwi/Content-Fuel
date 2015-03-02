#!/bin/sh

echo '****************************************************'
echo 'Script de creation des collections dans la base content-fuel'
echo '****************************************************'

pathFile=`find . -name create_all.sh`
echo $pathFile
pathDir=`expr match "$pathFile" '\(.*\)\/create_all.sh'`
echo "Change directory to : $pathDir"
cd $pathDir
echo `pwd`

mongo content-fuel **/*.js

mongo content-fuel --eval "db.printCollectionStats()" | grep '\(ns\|count\)'

echo '*************************************'
echo 'Tous les scripts JS ont été traités !'
echo '*************************************'

