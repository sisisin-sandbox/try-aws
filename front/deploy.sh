#!/bin/sh

yarn build --prod
aws s3 sync dist/* s3://simenyan-ta/ --delete
