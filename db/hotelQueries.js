const pool = require('./db');

const getHotelBySlug = async (slug) => {
    const result = await pool.query('SELECT * FROM hotels WHERE slug = $1', [slug]);
    return result.rows[0];
};

const getRoomsByHotelSlug = async (hotelSlug) => {
    const result = await pool.query('SELECT * FROM rooms WHERE hotel_slug = $1', [hotelSlug]);
    return result.rows;
};

module.exports = {
    getHotelBySlug,
    getRoomsByHotelSlug,
};
