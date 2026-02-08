import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Image from 'react-bootstrap/Image'
import Table from 'react-bootstrap/Table'
import Spinner from 'react-bootstrap/Spinner'
import { useState, Fragment, useEffect, useRef } from "react";

import axiosInstance from '../api/axiosConfig';

import * as Tone from "tone";
import { Midi } from "@tonejs/midi";

function TableView({songs, madSeed, activeView}) {
    const [expandedRows, setExpandedRows] = useState(new Set())
    const [images, setImages] = useState({})
    const [songsMidi, setSongsMidi] = useState({})

    const resetTableView = ()=>{
        setExpandedRows(new Set())
        setImages({})
    }

    useEffect(()=>{
        resetTableView()
        if (activeView == 1) stopMusic()
    }, [songs])

    const toggleRow = (id, song) => {
        const newExpanded = new Set(expandedRows);
        if (newExpanded.has(id)) {
            newExpanded.delete(id);
        } else {
            newExpanded.add(id);
            getSongData(song)
        }
        setExpandedRows(newExpanded);
    };

    const getSongData = (song)=>{
        const songSeed = madSeed(song.onPage)
        axiosInstance.get(`/api/generateSongData?songName=${encodeURIComponent(song.songName)}&artist=${encodeURIComponent(song.artist)}&seed=${songSeed}`).then(res=>{
            setImages(prev => ({...prev, [song.id]: res.data.image}))
            setSongsMidi(prev=>({...prev, [song.id]: res.data.song}))
        }).catch(err=>{})
    }

    const [isPlaying, setIsPlaying] = useState(false);
    const synthRef = useRef(null);
    const startMusic = async (song) => {
        setIsPlaying(true)
        
        await Tone.start()

        const midi = await Midi.fromUrl(songsMidi[song.id]);
        const synth = new Tone.PolySynth().toDestination();
        synthRef.current = synth;
        
        midi.tracks.forEach(track => {
            track.notes.forEach(note => {
                synth.triggerAttackRelease(note.name, note.duration, note.time + Tone.now());
            });
        });

        Tone.getTransport().schedule((time) => {
            Tone.getDraw().schedule(() => {
                stopMusic()
            }, time);
        }, midi.duration);

        Tone.getTransport().start()
    };
    const stopMusic = () => {
        Tone.getTransport().stop()
        Tone.getTransport().cancel();
        if (synthRef.current) {
            synthRef.current.releaseAll();
            synthRef.current.dispose(); 
            synthRef.current = null;
        }
        setIsPlaying(false);
    }
    const toggleMusic = (song)=>{
        if (isPlaying) {
            stopMusic()
        }else{
            startMusic(song)
        }
    }

    return ( <>
    <Container>
        <Table hover style={{cursor:'pointer'}}>
            <thead>
                <tr>
                    <th></th>
                    <th>#</th>
                    <th>Song</th>
                    <th>Artist</th>
                    <th>Album</th>
                    <th>Genre</th>
                </tr>
            </thead>
            <tbody>
                {songs.map(el=>(
                <Fragment key={el.id}>
                    <tr onClick={()=>{toggleRow(el.id, el)}}>
                        <td>
                            {expandedRows.has(el.id) ? <i className="bi bi-chevron-up"></i> : <i className="bi bi-chevron-down"></i>}
                            
                        </td>
                        <td>{el.id}</td>
                        <td>{el.songName}</td>
                        <td>{el.artist}</td>
                        <td>{el.album}</td>
                        <td>{el.genre}</td>
                    </tr>
                    {expandedRows.has(el.id) && 
                        <tr style={{cursor:'auto'}}>
                            <td colSpan={6}>
                                <Container className='d-flex mt-4 mb-3'>
                                    <Container className='d-flex flex-column align-items-center w-auto'>
                                        {images[el.id] ? 
                                            <Image src={images[el.id]} style={{width:'250px'}}></Image>
                                            : <Spinner animation="border" variant="primary" />}
                                        <div>likes: {el.likes}</div>
                                    </Container>
                                    <Container>
                                        <Container className='d-flex gap-3 mb-3 p-0'>
                                            <h2 className=' d-flex m-0 align-items-center'>{el.songName}</h2>
                                            {songsMidi[el.id] && <Button onClick={()=>{toggleMusic(el)}}>{isPlaying ? "Stop" : "Play "}</Button>}
                                        </Container>
                                        <div className='mb-3'>
                                            From {el.album} by {el.artist}
                                        </div>
                                        <div>{el.desc}</div>
                                    </Container>
                                </Container>
                            </td>
                        </tr>
                    }
                </Fragment>
                ))}
            </tbody>
        </Table>
    </Container>
    </> );
}

export default TableView;