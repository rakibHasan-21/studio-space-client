# StudioSpace – Creative Studio Rental Marketplace

**Live Website:** https://studio-space-client-lake.vercel.app/

StudioSpace is a peer-to-peer creative studio rental marketplace designed for photographers, filmmakers, podcasters, musicians, and other creative professionals. Users can explore creative spaces, view studio details, and book their preferred workspaces. Studio owners can also list and manage their studios.

## 🚀 Live Project & Repositories

- **Live Website:** https://studio-space-client-lake.vercel.app/
- **Client Repository:** https://github.com/rakibHasan-21/studio-space-client
- **Server Repository:** https://github.com/rakibHasan-21/studio-space-server-

## ✨ Key Features

- **User Authentication:** Secure registration and login using Better Auth with Google authentication.
- **Studio Listings:** Add, update, delete, and manage studio listings.
- **Explore Studios:** Browse creative spaces with categories, pricing, ratings, and locations.
- **Studio Details:** View complete studio information and amenities.
- **Booking System:** Reserve studios and manage booking requests.
- **My Bookings:** View booking history and reservation status.
- **My Listings:** Manage personally listed studios.
- **Protected Routes:** Restrict private pages and protected operations to authenticated users.
- **JWT Security:** Secure API requests using JWT authentication.
- **Double Booking Prevention:** Check existing confirmed bookings to prevent overlapping reservations.
- **Theme Customization:** Light and dark mode support.
- **Responsive Design:** Optimized for desktop, tablet, and mobile devices.
- **Toast Notifications:** Modern success and error notifications.

## 🛠️ Technology Stack

### Frontend
- Next.js
- React
- JavaScript
- Tailwind CSS
- Shadcn UI
- Lucide React

### Authentication
- Better Auth
- JWT
- Google OAuth

### Backend
- Node.js
- Express.js
- MongoDB
- JSON Web Token (JWT)

### Deployment
- Vercel

## 📂 Project Structure

**Client Side**
```text
studio-space-client/
├── app/
├── components/
├── lib/
├── public/
├── package.json
└── next.config.js
```

**Server Side**
```text
studio-space-server/
├── index.js
├── package.json
├── .env
└── node_modules/
```

## ⚙️ Local Installation & Setup

### 1. Clone Client Repository

```bash
git clone https://github.com/rakibHasan-21/studio-space-client.git

cd studio-space-client
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the client root directory.

Add your required environment variables:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

Add other required authentication and OAuth credentials according to your project configuration.

### 4. Run Client Application

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

### 5. Clone Server Repository

Open another terminal:

```bash
git clone https://github.com/rakibHasan-21/studio-space-server-.git

cd studio-space-server-
```

### 6. Install Server Dependencies

```bash
npm install
```

### 7. Configure Server Environment Variables

Create a `.env` file in the server root directory.

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
MONGODB_PASS=your_mongodb_password
JWT_SECRET=your_jwt_secret
```

Add any other environment variables required by your server configuration.

### 8. Run Backend Server

```bash
npm start
```

## 🔐 Security Features

- JWT-based API authentication.
- HTTPOnly cookie-based token protection.
- Protected server-side operations.
- Unauthorized requests receive appropriate error responses.
- Booking conflict checking against confirmed reservations.

## 📋 Main Application Routes

| Route | Description |
|---|---|
| `/` | Home Page |
| `/studios` | Explore Studios |
| `/studios/[id]` | Studio Details |
| `/add-studio` | Add New Studio |
| `/my-listings` | Manage My Listings |
| `/my-bookings` | Manage My Bookings |
| `/login` | User Login |
| `/register` | User Registration |

## 👨‍💻 Developer

**Rakib Hasan**

Frontend Developer | Next.js Developer

- **GitHub:** https://github.com/rakibHasan-21
- **Portfolio:** https://portfolio-mauve-seven-13.vercel.app/

---

*StudioSpace – Find Your Space. Create Your Story.*