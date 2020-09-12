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
  return db.createTable('wallet', {
    id: { type: 'int', primaryKey: true, autoIncrement: true, },
    name: 'string',
    currency: 'string',
    is_master_wallet: 'boolean',
    user_id: {
      type: 'int',
      foreignKey: {
        name: 'wallet_user_id_fk',
        table: 'user',
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
  return db.dropTable('wallet');
};

exports._meta = {
  "version": 1
};
