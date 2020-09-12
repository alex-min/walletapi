'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function (db, cb) {
  return db.createTable('transfer', {
    id: { type: 'int', primaryKey: true, autoIncrement: true, },
    timestamp: { type: 'datetime', notNull: true },
    amount_transfered: { type: 'bigint', notNull: true },
    origin_currency: { type: 'string', notNull: true },
    target_currency: { type: 'string', notNull: true },
    conversion_fee: 'decimal',
    origin_entity_identifier: { type: 'int', notNull: true },
    origin_entity_type: { type: 'string', notNull: true },
    target_entity_identifier: { type: 'int', notNull: true },
  }, cb);
};

exports.down = function (db) {
  return db.dropTable('transfer');
};

exports._meta = {
  "version": 1
};
