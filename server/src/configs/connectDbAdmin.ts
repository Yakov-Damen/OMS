import { config } from 'dotenv';
import pkg from 'pg';
const { Pool } = pkg;
config()

const pool = new Pool();

export const connectToPg = async () => {
    try {
        await pool.connect();
        console.log('Connected to postgres');
    } catch (err) {
        console.error('Error connecting to DB', err);
    }
};

export default pool;
