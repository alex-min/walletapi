#!/usr/bin/env node
const { exec } = require('child_process');
const child_process = require('child_process');
const dbConfig = require("../database.json")["dev"];

console.log('regenerating models...');
child_process.execSync(`node ${__dirname}/../node_modules/typeorm-model-generator/bin/typeorm-model-generator
      -h ${dbConfig["host"] || "localhost"}
      -p ${dbConfig["post"] || "5432"}
      -u ${dbConfig["user"] || "postgres"}
      -d ${dbConfig["database"] || "walletapi-dev"}
      -x ${dbConfig["password"] || "postgres"}
      -e postgres --noConfig --ce pascal -o ${__dirname}/../models`.replace(/\n/g, ''));
child_process.execSync('./node_modules/.bin/tsc ./models/*.ts');
console.log('models regenerated under the models directory')