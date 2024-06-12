const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/songlist', { useNewUrlParser: true, useUnifiedTopology: true });

const songSchema = new mongoose.Schema({
    songID: String,
    songName: String,
    timeStart: Number,
    duration: Number
});

const Song = mongoose.model('Song', songSchema);

// Routes
app.get('/songs', async (req, res) => {
    const songs = await Song.find();
    res.json(songs);
});

app.post('/songs', async (req, res) => {
    const song = new Song(req.body);
    await song.save();
    res.json(song);
});

app.delete('/songs/:id', async (req, res) => {
    await Song.findByIdAndDelete(req.params.id);
    res.json({ message: 'Song deleted' });
});

app.put('/songs/:id', async (req, res) => {
    const song = await Song.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(song);
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
