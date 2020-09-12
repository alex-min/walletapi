import { Connection, getConnectionManager } from 'typeorm';
import { Card } from '../models/Card';
import { User } from '../models/User';
import { Wallet } from '../models/Wallet';

const connectionManager = getConnectionManager();

const options = ({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'walletapi-dev',
    entities: [
        Wallet, Card, User
    ],
    synchronize: false,
    logging: true,
});

/**
 * Taken from https://github.com/typeorm/typeorm/issues/6241
 * makes Typeorm works with next.js hot module reload
 */

function entitiesChanged(prevEntities: any[], newEntities: any[]): boolean {
    if (prevEntities.length !== newEntities.length) return true;

    for (let i = 0; i < prevEntities.length; i++) {
        if (prevEntities[i] !== newEntities[i]) return true;
    }

    return false;
}

async function updateConnectionEntities(connection: Connection, entities: any[]) {
    if (!entitiesChanged(connection.options.entities || [], entities)) return;

    // @ts-ignore
    connection.options.entities = entities;

    // @ts-ignore
    connection.buildMetadatas();

    if (connection.options.synchronize) {
        await connection.synchronize();
    }
}

export default async function database(name: string = 'default'): Promise<Connection> {
    const connectionManager = getConnectionManager();

    if (connectionManager.has(name)) {
        const connection = connectionManager.get(name);

        if (process.env.NODE_ENV !== 'production') {
            await updateConnectionEntities(connection, options.entities);
        }

        return connection;
    }

    // @ts-ignore
    return await connectionManager.create({ name, ...options }).connect();
}