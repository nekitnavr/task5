require('dotenv').config()
const cors = require('cors')
const express = require('express')
const app = express()
const port = 3000
const {fakerEN} = require('@faker-js/faker')
const {customFakerRU, generateSongDescription} = require('./customFakerRU')
const { default: random } = require('random')
const axios = require('axios');
const sharp = require('sharp')
const MidiWriter = require('midi-writer-js')

const localeMap = {
    'en': fakerEN,
    'ru': customFakerRU,
};

app.use(cors({
    origin: [
        'http://localhost:5173',
        'http://localhost:4173/',
        process.env.FRONT_URL
    ]
}))

app.use(express.json());

function genLikes(likes) {
    if (Number.isInteger(likes)) {
        return likes
    }
    
    const integerPart = Math.floor(likes)
    const fractionalPart = likes - integerPart
    
    const extra = random.float() < fractionalPart ? 1 : 0
    
    return (integerPart + extra).toFixed(0)
}

app.get('/api/generateSongPage', (req, res) => {
    const {seed, language, likes, page, pageSize} = req.query

    const currentFaker = localeMap[language]
    currentFaker.seed(seed === undefined ? '' : seed)
    
    const songs = []

    const startIndex = (page - 1) * pageSize
    for (let i = 1; i <= pageSize; i++) {
        const song = {
            id: startIndex + i, 
            songName: currentFaker.music.songName(), 
            artist: currentFaker.music.artist(), 
            album: currentFaker.music.album(), 
            genre: currentFaker.music.genre(),
            likes: genLikes(parseFloat(likes)),
            onPage: page,
        }
        song.desc = generateSongDescription(song.artist, song.album)
        songs.push(song)
    }

    res.send(songs)
})

function escapeXml(unsafe) {
    return unsafe.replace(/[<>&'"]/g, function (c) {
        switch (c) {
            case '<': return '&lt;';
            case '>': return '&gt;';
            case '&': return '&amp;';
            case '\'': return '&apos;';
            case '"': return '&quot;';
        }
    });
}
function wrapText(text, maxChars) {
    const words = text.split(' ')
    let lines = [];
    let currentLine = words[0]

    for (let i = 1; i < words.length; i++) {
        if ((currentLine + ' ' + words[i]).length < maxChars) {
            currentLine += ' ' + words[i];
        } else {
            lines.push(currentLine)
            currentLine = words[i]
        }
    }
    lines.push(currentLine);
    return lines;
}
function generateSeededMidi(seed) {
    random.use(seed)
    
    const track = new MidiWriter.Track();
    track.addEvent(new MidiWriter.ProgramChangeEvent({instrument: 1}))
    
    const scale = ['A2', 'B2', 'F2','C4', 'D4', 'E4', 'G4', 'A4', 'F4']
    for (let i = 0; i < 16; i++) {
        const noteIndex = random.int(0, scale.length-1);
        
        track.addEvent(new MidiWriter.NoteEvent({
            pitch: [scale[noteIndex]],
            duration: '4'
        }));
    }

    const write = new MidiWriter.Writer(track);
    const midiBuffer = Buffer.from(write.buildFile());
    return midiBuffer    
}

app.get('/api/generateSongData', async (req,res)=>{
    let {seed, songName, artist} = req.query

    
    const url = `https://picsum.photos/seed/${seed}-${encodeURIComponent(songName)}-${encodeURIComponent(artist)}/300/300`
    let input
    try{
        input = (await axios.get(url, { responseType: 'arraybuffer' })).data;
    } catch(error){
        console.log(error);
    }

    songName = escapeXml(songName)
    artist = escapeXml(artist)

    const songLines = wrapText(songName, 25);
    const songTspans = songLines.map((line, i) => `<tspan x="50%" dy="${i == 0 ? 0 : '1.2em'}">${line}</tspan>`).join('');
    const artistLines = wrapText(artist, 25);
    const artistTspans = artistLines.map((line, i) => `<tspan x="50%" dy="${i == 0 ? 0 : '1.2em'}">${line}</tspan>`).join('');

    const svgText = `
        <svg width="300" height="300">
            <style> .title { 
                    fill: white; 
                    stroke: black;    
                    stroke-width: 2px;
                    stroke-linejoin: round;
                    paint-order: stroke fill;
                    font-size: 20px; 
                    font-weight: bold; 
                    font-family: sans-serif; 
                }</style>
            <text x="50%" y="10%" text-anchor="middle" class="title">
                ${songTspans}
            </text>
            <text x="50%" y="85%" text-anchor="middle" class="title">
                ${artistTspans}
            </text>
        </svg>`

    const outputBuffer = await sharp(input)
        .composite([{ input: Buffer.from(svgText), top: 0, left: 0 }])
        .toBuffer()
    const base64Image = outputBuffer.toString('base64')
    const base64Song = generateSeededMidi(`${seed}-${songName}-${artist}`).toString('base64')

    res.json({ 
        image: `data:image/png;base64,${base64Image}`,
        song: `data:audio/midi;base64,${base64Song}`,
    });
})

app.listen(port, () => {
    console.log(`http://localhost:3000`)
})
