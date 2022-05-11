const _ = require('lodash')

const a = [1,2,3,4,5,6,6,7,8,9,9,1];

const test = _.sortedUniq(a);

console.log(test)