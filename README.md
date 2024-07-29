# Hotel Application Back End

Backend developed with Node JS to provide data to the Front End

## Prerequisites

- Node.js (v14 or later)
- PostgreSQL

## Setup Instructions

### Clone the Repository

```bash
git clone https://github.com/miraz-ezaz/NodeJS-React-Assignment-BackEnd.git
cd NodeJS-React-Assignment-BackEnd
```

### Install Dependencies

```bash
npm install
```

### Configure Database

Create a `config.json` file in the `db` folder with your PostgreSQL credentials:

```json
{
  "host": "localhost",
  "port": 5432,
  "database": "hotel_db",
  "user": "yourusername",
  "password": "yourpassword"
}
```

### Create Database and Tables

Run the following SQL commands to create the database and tables:

```sql
-- Create the database
CREATE DATABASE hotel_db;

-- Connect to the newly created database
\c hotel_db;

-- Create the hotels table
CREATE TABLE hotels (
    slug VARCHAR(255) PRIMARY KEY,
    images TEXT[],  -- Assuming images are stored as an array of URLs
    title VARCHAR(255) NOT NULL,
    description TEXT,
    guest_count INT,
    bedroom_count INT,
    bathroom_count INT,
    amenities TEXT[],  -- Assuming amenities are stored as an array of strings
    host_information JSONB,  -- Assuming host information is stored as a JSON object
    address VARCHAR(255),
    latitude DECIMAL(9, 6),
    longitude DECIMAL(9, 6)
);

-- Create the rooms table
CREATE TABLE rooms (
    hotel_slug VARCHAR(255),
    room_slug VARCHAR(255) PRIMARY KEY,
    room_image TEXT,  -- Assuming room image is stored as a URL
    room_title VARCHAR(255) NOT NULL,
    bedroom_count INT,
    FOREIGN KEY (hotel_slug) REFERENCES hotels (slug) ON DELETE CASCADE
);

-- Insert sample data into the hotels table
INSERT INTO hotels (
    slug, images, title, description, guest_count, bedroom_count, bathroom_count, amenities, host_information, address, latitude, longitude
) VALUES (
    'apt-pueblo-libre',
    ARRAY[
        '/images/apt-pueblo-libre_room_1.jpg',
        '/images/apt-pueblo-libre_room_2.jpg',
        '/images/apt-pueblo-libre_room_3.jpg',
        '/images/apt-pueblo-libre_room_4.jpg',
        '/images/apt-pueblo-libre_room_5.jpg',
        '/images/apt-pueblo-libre_room_6.jpg'
    ],
    'Comfy New Apt. in Pueblo Libre!',
    'Welcome to our brand-new 1 bedroom apartment, in a quiet and central location next to a park! It''s conveniently located in Pueblo Libre, just 25min. away from the airport. Steps away from Clínica Stella Maris, Universidad Antonio Ruiz de Montoya, Instituto Británico, Hospital Santa Rosa, YMCA Peru and Alas Peruanas University. 2 guests, 1 bedroom, 1 bed, 1 bath.',
    2,
    1,
    1,
    ARRAY['Kitchen', 'Wifi', 'TV', 'Elevator', 'Washer', 'Dryer', 'Hair dryer', 'Refrigerator'],
    '{
        "name": "Fernando",
        "category": "Superhost",
        "years": 7,
        "reviews": 312,
        "rating": 4.92,
        "about": "Hello world! I love traveling and I also love welcoming guests in my home country, Perú, meeting new people.",
        "work": "Hospitality",
        "hobby": "Editing Videos",
        "response_rate": "100%",
        "response_time": "An Hour",
        "co_hosts": ["Percy", "Raul"],
        "image": "/images/host_Fernando.jpg"
    }',
    'Lima, Peru',
    -12.0464,
    -77.0428
);

-- Insert data into the rooms table
INSERT INTO rooms (
    hotel_slug, room_slug, room_image, room_title, bedroom_count
) VALUES
('apt-pueblo-libre', 'apt-pueblo-libre-room1', '/images/apt-pueblo-libre_room_1.jpg', 'Room 1', 1),
('apt-pueblo-libre', 'apt-pueblo-libre-room2', '/images/apt-pueblo-libre_room_2.jpg', 'Room 2', 1),
('apt-pueblo-libre', 'apt-pueblo-libre-room3', '/images/apt-pueblo-libre_room_3.jpg', 'Room 3', 1),
('apt-pueblo-libre', 'apt-pueblo-libre-room4', '/images/apt-pueblo-libre_room_4.jpg', 'Room 4', 1),
('apt-pueblo-libre', 'apt-pueblo-libre-room5', '/images/apt-pueblo-libre_room_5.jpg', 'Room 5', 1),
('apt-pueblo-libre', 'apt-pueblo-libre-room6', '/images/apt-pueblo-libre_room_6.jpg', 'Room 6', 1);
```

### Run the Node.js Backend

```bash
npm start
```

The backend server should now be running on `http://localhost:3000`.

### API Endpoints

- **Get Hotel Details by Slug:**

  ```http
  GET /hotel/:slug
  ```

  Example: `http://localhost:3000/hotel/apt-pueblo-libre`

- **Get Room Details by Hotel Slug:**
  ```http
  GET /hotel/:slug/rooms
  ```
  Example: `http://localhost:3000/hotel/apt-pueblo-libre/rooms`

### Directory Structure

```
hotel-management-system/
│
├── db/
│   ├── config.json
│   ├── db.js
│   └── hotelQueries.js
│
├── routes/
│   └── hotel.js
│
├── images/  # Place your image files here
├── app.js
└── package.json
```

### Notes

- Ensure PostgreSQL is running and the database credentials in the `config.json` file are correct.
- The image files should be placed in the `images` folder in the root directory of the project.
