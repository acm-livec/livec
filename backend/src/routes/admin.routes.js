const express = require('express');
const router = express.Router();
const db = require('@database/database');

/**
 * POST /admin/reset
 * Reset all databases to their default state.
 */
router.post('/reset', async (req, res, next) => {
    try {
        await db.resetAll();
        res.json({ message: 'Database reset successfully' });
    } catch (err) {
        next(err);
    }
});

module.exports = router;