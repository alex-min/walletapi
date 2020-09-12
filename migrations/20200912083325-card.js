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
  return db.createTable('card', {
    id: { type: 'int', primaryKey: true, autoIncrement: true, },
    name: 'string',
    currency: 'string',
    current_balance: 'bigint',
    digits: 'string',
    expiration_date: 'date',
    ccv: 'string',
    status: 'string',
    wallet_id: {
      type: 'int',
      foreignKey: {
        name: 'card_wallet_id_fk',
        table: 'wallet',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
        },
        mapping: 'id'
      }
    }
  }, cb);
};

exports.down = function (db) {
  return db.dropTable('card');
};

exports._meta = {
  "version": 1
};
