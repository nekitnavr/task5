import Button from 'react-bootstrap/Button'
import Navbar from 'react-bootstrap/Navbar'
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container'
import Pagination from 'react-bootstrap/Pagination'
import TableView from './TableView.jsx';

import { Fragment, useEffect, useState } from 'react';
import axiosInstance from '../api/axiosConfig.js'
import InfiniteScroll from "react-infinite-scroll-component";

function Main() {
    const [activeView, setActiveView] = useState(1)
    const [likeText, setLikeText] = useState(3)
    const [likeValue, setLikeValue] = useState(3)
    const [currentPage, setCurrentPage] = useState(1)
    const [songs, setSongs] = useState([])
    const [seed, setSeed] = useState('')
    const [language, setLanguage] = useState('en')
    const [hasMore, setHasMore] = useState(true)
    const pageSize = 25
    const maxPages = 25;

    const madSeed = (page)=>{
        let newSeed = seed || 0n
        const mult = 1103515245n
        const add = 12345n
        let combined = BigInt(newSeed) ^ BigInt(page)
        combined = (combined * mult + add)
        return combined.toString();
    }

    const getSongs = (page, append = false)=>{
        const calculatedSeed = madSeed(page)
        axiosInstance.get(`/api/generateSongPage?pageSize=${pageSize}&page=${page}&seed=${calculatedSeed}&language=${language}&likes=${likeValue}`)
            .then(res=>{
                if (append) {
                    setSongs(prev => [...prev, ...res.data]);
                } else {
                    setSongs(res.data);
                }
            }).catch(err=>{
                console.log(err);
            })
    }
    const getMoreSongs = () => {
        const nextPage = currentPage + 1
        if (nextPage <= maxPages) {
            setCurrentPage(nextPage);
            getSongs(nextPage, true);
        }
        if (nextPage >= maxPages) {
            setHasMore(false);
        }
    }
    const changePage = (pageTo)=>{
        setCurrentPage(pageTo)
        getSongs(pageTo, false)
        window.scrollTo(0,0)
    }

    useEffect(()=>{
        setHasMore(true)
        getSongs(1, false)
        setCurrentPage(1)
    }, [seed, language, activeView, likeValue])
    
    return ( <>
        <Navbar>
            <Container>
                <Form className='d-flex gap-4 w-75' >
                    <Form.Select className='d-flex gap-3 align-items-center w-25' id='select' 
                            onChange={(e)=>{setLanguage(e.target.value)}}>
                        <option value="en">English</option>
                        <option value="ru">Russian</option>
                    </Form.Select>
                    <Form.Group >
                        <Form.Control step={1} min={1} required value={seed}
                            className='border border-dark' type="number" placeholder="Enter seed" 
                                onChange={(e)=>{setSeed(e.target.value)}} />
                    </Form.Group>
                    <Button onClick={()=>{setSeed(Math.floor(Math.random() * (99999999999999 - 0 + 1)) + 0)}}>Random</Button>
                    <Form.Group className='d-flex align-items-center gap-1' style={{width:'300px'}}>
                        <Form.Range step={0.1} min={0} max={10} value={likeText} list='range-markers' id='range'
                            onChange={(e)=>{setLikeText(parseFloat(e.target.value).toFixed(1))}} 
                            onMouseUp={(e)=>{setLikeValue(e.target.value)}}
                        />
                        <Form.Label htmlFor="range" className='ps-1 mb-0' >{likeText}</Form.Label>
                    </Form.Group>
                </Form>
                
                <Pagination>
                    <Pagination.Item active={activeView == 1} onClick={()=>{setActiveView(1)}}><i className="bi bi-table"></i></Pagination.Item>
                    <Pagination.Item active={activeView == 2} onClick={()=>{setActiveView(2)}}><i className="bi bi-layout-text-sidebar-reverse"></i></Pagination.Item>
                </Pagination>
            </Container>
        </Navbar>
        {activeView == 1 && <>
            <TableView songs={songs} madSeed={madSeed} activeView={activeView}></TableView>
            <Container>
                <Pagination className='d-flex justify-content-center' style={{marginBottom: '200px'}}>
                    <Pagination.First onClick={()=>{changePage(1)}}/>
                    {currentPage-1>0 && <Pagination.Item onClick={()=>{changePage(currentPage-1)}}>{currentPage-1}</Pagination.Item>}
                    <Pagination.Item active>{currentPage}</Pagination.Item>
                    {currentPage<maxPages && <Pagination.Item onClick={()=>{changePage(currentPage+1)}}>{currentPage+1}</Pagination.Item>}
                </Pagination>
            </Container>
        </>}
        {activeView == 2 && <>
            <InfiniteScroll 
                dataLength={songs.length}
                next={getMoreSongs}
                hasMore={hasMore}
                loader={<h4>Loading...</h4>}
                endMessage={
                    <p style={{ textAlign: 'center' }}>
                        <b>Yay! You have seen it all</b>
                    </p>
                }>
                <TableView songs={songs} madSeed={madSeed} activeView={activeView} />
            </InfiniteScroll>
        </>}
    </> );
}

export default Main;