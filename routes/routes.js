const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


// Homepage (get all artists)
router.get('/', async (req, res) => {
    try {
        // Fetch all artists from the liked_artists table
        const artists = await prisma.liked_artists.findMany({
            orderBy: {
                likes: 'desc'
            }
        });
        
        // Render the index page, passing the artists data to the template
        res.render("index", {
            title: "Homepage",
            artists: artists
        });
        // If theres and error fetching data from the database
    } catch (err) {
        console.error('Error fetching artists:', err);
        res.status(500).json({ message: err.message });
    }
});

// Add artist to the list (form)
router.get('/add', (req, res) => {
    res.render("add_artist", { title: "Add Artist" });
});

// Insert an artist into the database route
router.post('/add', async (req, res) => {
    try {
        const artist = await prisma.liked_artists.create({ 
            data: { 
                artists: req.body.artist,
                likes: 0 
            }
        });

        // Store a success message in the session
        req.session.message = 'Artist added successfully';
        
        // Redirect to the homepage (or any desired page)
        res.redirect('/');

    } catch (error) {
        console.error('Error adding artist:', error);

        // Store an error message in the session
        req.session.message = 'Failed to add artist';

        // Redirect to an error page or the homepage
        res.redirect('/');
    }
});

// Edit an artist from the list (form)
router.get('/edit/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        // Fetch the artist by the primary key (id) from the URL parameter
        const artist = await prisma.liked_artists.findUnique({
            where: {
                id: id
            }
        });
        
        // Check if the artist exists
        if (!artist) {
            req.session.message = 'Failed to find artist'
            return res.status(404).json({ message: 'Artist not found' });
        }
        
        // Render the edit_artist page, passing the artist data to the template
        res.render("edit_artist", {
            title: "Edit Artist",
            artist: artist
        });
        
    } catch (err) {
        console.error('Error fetching artist:', err);
        // Store an error message in the session
        req.session.message = 'Failed to edit artist';
        res.redirect('/');
    }
});

// Update an artist in the database
router.post("/edit/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const { artist,likes } = req.body;

    try {
        // Update the artist in the database
        const updatedArtist = await prisma.liked_artists.update({
            where: {
                id: id
            },
            data: {
                artists: artist,  // Update artist name
                likes: parseInt(likes) // Update likes
            }
        });

        // Store a success message in the session
        req.session.message = 'Artist updated successfully';
        
        // Redirect to the homepage 
        res.redirect('/');

    } catch (error) {
        console.error('Error updating artist:', error);

        // Store an error message in the session
        req.session.message = 'Failed to update artist';

        // Redirect to the homepage
        res.redirect('/');
    }
});

/// Delete an artist route
router.delete('/delete/:id', async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        // Delete the artist from the database
        await prisma.liked_artists.delete({
            where: {
                id: id
            }
        });

        // Store a success message in the session
        req.session.message = 'Artist deleted successfully';

        // Respond with a success message
        return res.status(200).json({ message: req.session.message });
        
    } catch (error) {
        console.error('Error deleting artist:', error);

        // Store an error message in the session
        req.session.message = 'Failed to delete artist';

        // Respond with an error message
        return res.status(500).json({ message: req.session.message });
    }
});

// Add a like route
router.post("/like/:id", async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        // Fetch the existing artist data first
        const artist = await prisma.liked_artists.findUnique({
            where: { id: id }
        });

        // Check if the artist exists
        if (!artist) {
            req.session.message = 'Failed to find artist'
            return res.status(404).json({ message: 'Artist not found' });
        }

        // Update the likes in the database by adding 1 to the current value
        const updatedArtist = await prisma.liked_artists.update({
            where: {
                id: id
            },
            data: {
                likes: artist.likes + 1,  // Increment the likes by 1
            }
        });

        // Store a success message in the session
        req.session.message = 'Like added successfully';
        
        // Redirect to the homepage (or any desired page)
        res.redirect('/');

    } catch (error) {
        console.error('Error liking artist:', error);

        // Store an error message in the session
        req.session.message = 'Failed to like artist';

        // Redirect to an error page or the homepage
        res.redirect('/');
    }
});

    
module.exports = router;