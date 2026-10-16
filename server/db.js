import mysql from 'mysql2/promise';
import {config} from './config.js';
export const pool=mysql.createPool({...config.db,waitForConnections:true,connectionLimit:5,queueLimit:20,connectTimeout:5000,charset:'utf8mb4',multipleStatements:false});
