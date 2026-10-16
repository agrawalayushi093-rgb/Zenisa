import mysql from 'mysql2/promise';
import {readFile} from 'node:fs/promises';
import {config} from './config.js';
if(!/^[a-zA-Z0-9_]+$/.test(config.db.database))throw Error('Database name may contain letters, numbers and underscores only.');
let connection;
try{const {database,...options}=config.db;connection=await mysql.createConnection(options);await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);await connection.changeUser({database});const schema=await readFile(new URL('./schema.sql',import.meta.url),'utf8');for(const statement of schema.replace(/^--.*$/gm,'').split(';').map(x=>x.trim()).filter(Boolean))await connection.query(statement);const [[counts]]=await connection.query('SELECT (SELECT COUNT(*) FROM categories) AS categories,(SELECT COUNT(*) FROM subcategories) AS subcategories');console.log(`Database and tables ready: ${database}. No rows were inserted. Current counts: categories=${counts.categories}, subcategories=${counts.subcategories}.`)}catch(error){console.error(`Database setup failed: ${error.code||error.message}. Check MySQL and server/.env.`);process.exitCode=1}finally{await connection?.end()}
