#!/usr/bin/env bash
# forever start -l forever.log -o access.log -e err.log www
# mongod -f /etc/mongodb.conf
mongod -f /luneice/soft/MongoDB/mongod.conf
redis-server /luneice/soft/Redis/redis.conf
