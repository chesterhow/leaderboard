#!/bin/sh  
  
git remote add dokku dokku@leaderboard.chester.how:leaderboard
git push dokku ci-deploy:master
