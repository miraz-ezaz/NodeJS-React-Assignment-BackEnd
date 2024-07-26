const express = require('express');
const router = express.Router();
const hotelQueries = require('../db/hotelQueries');

// Get hotel details by slug
router.get('/:slug', async (req, res) => {
    try {
        const { slug } = req.params;
        const hotel = await hotelQueries.getHotelBySlug(slug);
        console.log('Errrro')
        if (!hotel) {
            return res.status(404).json({ error: 'Hotel not found' });
        }
        res.status(200).json(hotel);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get room details by hotel slug
router.get('/:slug/rooms', async (req, res) => {
    try {
        const { slug } = req.params;
        const rooms = await hotelQueries.getRoomsByHotelSlug(slug);
        if (rooms.length === 0) {
            return res.status(404).json({ error: 'Rooms not found for this hotel' });
        }
        res.status(200).json(rooms);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
