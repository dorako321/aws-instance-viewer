/// <reference path="typings/tsd.d.ts" />

var express = require('express');
var AWS = require('aws-sdk');
//var log4js = require('log4js');

var router = express.Router();

AWS.config.loadFromPath('credentials.json');
AWS.config.update({ region: 'ap-northeast-1' });

router.get('/', function (req, res, next) {
    res.render('ips.html', { title: 'Express' });
});


/**
 * GET EC2 instance list
 */
router.get('/api/v1/ec2-list', function (req, res, next) {
    var ec2 = new AWS.EC2();
    ec2.describeInstances({}, function (err, data) {
        res.json(data);
    });
});

/**
 * GET EC2 instance list
 */
router.get('/api/v1/rds-list', function (req, res, next) {

    var rds = new AWS.RDS({ apiVersion: '2014-10-31' });
    rds.describeDBInstances({}, function (err, data) {
        res.json(data);
    });

});

module.exports = router;

