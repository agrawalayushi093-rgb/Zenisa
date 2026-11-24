import {headerDefaults} from '../src/data/headerSettings.js';
export const announcementSchema=`CREATE TABLE IF NOT EXISTS announcement_bar (id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,text TEXT NOT NULL,is_active TINYINT(1) NOT NULL DEFAULT 1,sort_order INT UNSIGNED NOT NULL DEFAULT 0,created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,INDEX idx_announcements_active_order (is_active,sort_order,id)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`;
export async function migrateAnnouncements(connection){
 const [tables]=await connection.execute("SHOW TABLES LIKE 'announcement_bar'");if(tables.length)return;
 let messages=headerDefaults.announcements;
 const [headerTables]=await connection.execute("SHOW TABLES LIKE 'header_settings'");if(headerTables.length){const [rows]=await connection.execute('SELECT settings_json FROM header_settings WHERE id=1');if(rows.length){const settings=JSON.parse(rows[0].settings_json);if(Array.isArray(settings.announcements))messages=settings.announcements}}
 await connection.execute(announcementSchema);await connection.beginTransaction();try{for(const [index,text] of messages.entries())if(typeof text==='string'&&text.trim())await connection.execute('INSERT INTO announcement_bar (text,is_active,sort_order) VALUES (?,1,?)',[text.trim(),index]);await connection.commit()}catch(error){await connection.rollback();throw error}
}
export async function activeAnnouncements(connection){const [rows]=await connection.execute('SELECT id,text FROM announcement_bar WHERE is_active=1 ORDER BY sort_order,id');return rows}
