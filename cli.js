#!/usr/bin/env node

'use strict';

var chalk = require('chalk');
var moment = require('moment');
var meow = require('meow');
var tmg = require('tmg');

var cli = meow({
  help: [
    'Usage',
    '  tmg [date] [time]',
    '',
    'Examples',
    '  tmg',
    '  tmg 12:15',
    '  tmg 2015.02.11 12:00:00'
  ]
});

var len = cli.input.length;
var date = moment();
var timeRegExp = /(\d+):(\d+):(\d+)/g;
var time;
if (len === 1) time = cli.input[0].split(':');

if (len === 2) {
  date = moment(cli.input[0].replace(/(\.)/g, '-'));
  time = cli.input[1].split(':');
}

if (len > 0) {
  time.push(0);

  date
    .hours(time[0])
    .minutes(time[1])
    .seconds(time[2]);
}

var timer = tmg(date.toDate())
  .format('hh:mm:ss');

print(0);

function print(len) {
  var str = timer
    .toString()
    .replace(timeRegExp, function(match) {
      return chalk.bold(match);
    });

  process.stdout.write('\x1b[' + len + 'D' + str);

  setTimeout(function() {
    print(str.length);
  }, 1000);
}
