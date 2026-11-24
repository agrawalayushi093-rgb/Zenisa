# Zenisa Perfumes — cPanel Deployment Guide

This package contains everything needed to deploy the **Zenisa Perfumes** store and admin panel to cPanel hosting with MySQL and Node.js.

---

## 📦 Package Contents

- **`zenisa_perfumes.sql` / `database.sql`**: Complete database dump with all 18 tables, categories, subcategories, products, variants, photos, offers, policies, and commerce settings.
- **`dist/`**: Production-ready built React single-page frontend (HTML, minified JavaScript, CSS, and media assets).
- **`server/`**: Express.js API backend (catalogue, admin authentication, orders, contact, image handlers).
- **`app.js`**: cPanel Passenger / Node.js startup file that serves both the API backend and the static frontend SPA.
- **`.htaccess`**: Apache / LiteSpeed rewrite rules for client-side routing (React Router) and caching.
- **`.env.production.example`**: Template with all required production environment variables.
- **`package.json` & `package-lock.json`**: Backend dependencies for cPanel NPM install.

---

## 🚀 Step-by-Step Deployment Instructions

### Step 1: Create MySQL Database & User in cPanel
1. Log in to your **cPanel**.
2. Under the **Databases** section, click **MySQL® Databases**.
3. Under **Create New Database**, enter a name (e.g. `zenisa`) and click **Create Database**.  
   *(Note down the full name, e.g., `yourcpaneluser_zenisa`).*
4. Under **Add New User**, create a database username (e.g. `zenisa_user`) and generate a secure password. Click **Create User**.
5. Under **Add User To Database**, select the user and database you just created, click **Add**, check **ALL PRIVILEGES**, and click **Make Changes**.

---

### Step 2: Import the Database into phpMyAdmin
1. In cPanel, click **phpMyAdmin**.
2. In the left sidebar, click on the database you created in Step 1 (e.g., `yourcpaneluser_zenisa`).
3. Click the **Import** tab at the top.
4. Click **Choose File** (or Browse) and select **`zenisa_perfumes.sql`** (or `database.sql`).
5. Click **Import** (or **Go** at the bottom).
6. You will see a success message: all 18 tables including products, categories, subcategories, variants, and policies are imported.

---

### Step 3: Upload and Extract Files
1. In cPanel, open **File Manager**.
2. Navigate to your website's root directory:
   - For your primary domain: usually **`public_html`** (or a subfolder if using cPanel Node.js App manager).
3. Click **Upload** and upload the **`zenisa-perfumes-cpanel.zip`** file.
4. Right-click the uploaded zip file and select **Extract**.

---

### Step 4: Configure Node.js Application in cPanel
1. In cPanel, search for **Setup Node.js App** (or **Node.js Selector**).
2. Click **Create Application**:
   - **Node.js Version**: Select **20.x** or **22.x** (recommended: 20 LTS or 22 LTS).
   - **Application Mode**: Select **Production**.
   - **Application Root**: The directory where you extracted the project (e.g., `/public_html` or `/zenisa-perfumes`).
   - **Application URL**: Select your domain name (e.g., `yourdomain.com`).
   - **Application Startup File**: Enter **`app.js`**.
3. Click **Create**.
4. Once created, click the **Run NPM Install** button in the Node.js App manager (or run `npm install --omit=dev` via cPanel Terminal).

---

### Step 5: Configure the `.env` Environment File
1. In cPanel **File Manager** (ensure "Show Hidden Files" is checked in Settings), locate **`.env.production.example`**.
2. Copy or rename it to **`.env`** in the application root directory (or in `server/.env`).
3. Edit **`.env`** with your database and domain details:
   ```env
   NODE_ENV=production
   API_HOST=0.0.0.0
   PORT=3001

   # Your website URL without trailing slash (used to protect admin routes)
   ADMIN_ORIGIN=https://yourdomain.com

   # Database settings from Step 1
   DB_HOST=localhost
   DB_PORT=3306
   DB_NAME=yourcpaneluser_zenisa
   DB_USER=yourcpaneluser_zenisa_user
   DB_PASSWORD=your_database_password

   # Admin Login Credentials
   ADMIN_EMAIL=admin@zenisa.local
   ADMIN_PASSWORD_HASH=scrypt:05b9496321de19af366101f45c9e3d3b:52243e53ec1fb4e882a5aca4e3ac6690a2fa5a86c3e011e395e5fc1b900e8ec1485888e245e4c5473ce7d2e03622fdd65db58016d34485b7c0477ef11398fedd
   SESSION_SECRET=6797a886fe4a06e55c79fd167494de0f2fad692ae6621047433e9d3947aeb1a8b383c290f59fdc81ce7d74cc9b630f5c
   ```
4. Save the file.

---

### Step 6: Restart and Test
1. Return to **Setup Node.js App** in cPanel and click **Restart Application**.
2. Visit `https://yourdomain.com` in your web browser:
   - The storefront will load with all categories, products, and images.
   - Test navigating between pages (routes work cleanly with `.htaccess` and `app.js`).
3. Visit `https://yourdomain.com/admin` to access the Admin Panel:
   - **Default Email**: `admin@zenisa.local`
   - **Default Password**: `_HHS7wA-JHE3iaG3cEdv4aSs`
   *(You can change your credentials anytime by running `npm run admin:setup` or updating `ADMIN_PASSWORD_HASH`)*.

---

## 💡 Troubleshooting & Notes

- **Database Connection Issues (503 Service Unavailable)**:  
  Ensure `DB_HOST=localhost` and that the database user has been granted **ALL PRIVILEGES** in cPanel -> MySQL Databases.
- **Admin Login "Origin not allowed" (403)**:  
  Make sure `ADMIN_ORIGIN` exactly matches the URL in your browser bar (e.g. `https://yourdomain.com` or `https://www.yourdomain.com`).
- **Permissions on Uploads**:  
  Ensure `dist/uploads/` and `public/uploads/` directories have standard write permissions (`755` for directories, `644` for files) so admin product image uploads succeed.
