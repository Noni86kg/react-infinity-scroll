import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [page, setCount] = useState(12);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [display, setDisplay] = useState("grid");

  const handleDisplay = (e) => {
    if(e.target.closest('.grid-btn')) {
      setDisplay("grid")
    } else if (e.target.closest('.list-btn')) {
      setDisplay("list")
    }
  }

  const handleScroll = (event) => {
    const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
    console.log(scrollHeight, scrollTop, clientHeight)
    if (scrollHeight - scrollTop === clientHeight) {
      setCount(prev => prev + 12);
    }
  };

  // const apiKey = 'sKsS-XhQlQXt5HWfo02fvokD299VpqfTTSW-elPdT_k';
  const apiKey = 'G6Hq0QhS7F6QMUoXWu7tyCgNLK0LdU_iKJy5K2JqgNA';
  const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${page}`;  

  useEffect(() => {
    async function getPhotos() {
      setLoading(true);
      try {
          const response = await axios.get(apiUrl);
          const photosArr = response.data
          setUsers((prev) => [...prev, ...photosArr]);
          setLoading(false);
      }   catch (error) {
          console.log(error)
      }
  }
    getPhotos();
  }, [page]);
 
  return (
    <>
    <header>
      <div className='left-header'></div>
      <div className="center-header">
        <h1>Infinity Scroll</h1>
      </div>
      <div className="right-header">
        <h2>View</h2>
        <div className='grid-btn' onClick={handleDisplay}>
          <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="th" className="svg-inline--fa fa-th fa-w-16" role="img" viewBox="0 0 512 512"><path xmlns="http://www.w3.org/2000/svg" fill={display === "grid" ? 'black' : "white"} d="M149.333 56v80c0 13.255-10.745 24-24 24H24c-13.255 0-24-10.745-24-24V56c0-13.255 10.745-24 24-24h101.333c13.255 0 24 10.745 24 24zm181.334 240v-80c0-13.255-10.745-24-24-24H205.333c-13.255 0-24 10.745-24 24v80c0 13.255 10.745 24 24 24h101.333c13.256 0 24.001-10.745 24.001-24zm32-240v80c0 13.255 10.745 24 24 24H488c13.255 0 24-10.745 24-24V56c0-13.255-10.745-24-24-24H386.667c-13.255 0-24 10.745-24 24zm-32 80V56c0-13.255-10.745-24-24-24H205.333c-13.255 0-24 10.745-24 24v80c0 13.255 10.745 24 24 24h101.333c13.256 0 24.001-10.745 24.001-24zm-205.334 56H24c-13.255 0-24 10.745-24 24v80c0 13.255 10.745 24 24 24h101.333c13.255 0 24-10.745 24-24v-80c0-13.255-10.745-24-24-24zM0 376v80c0 13.255 10.745 24 24 24h101.333c13.255 0 24-10.745 24-24v-80c0-13.255-10.745-24-24-24H24c-13.255 0-24 10.745-24 24zm386.667-56H488c13.255 0 24-10.745 24-24v-80c0-13.255-10.745-24-24-24H386.667c-13.255 0-24 10.745-24 24v80c0 13.255 10.745 24 24 24zm0 160H488c13.255 0 24-10.745 24-24v-80c0-13.255-10.745-24-24-24H386.667c-13.255 0-24 10.745-24 24v80c0 13.255 10.745 24 24 24zM181.333 376v80c0 13.255 10.745 24 24 24h101.333c13.255 0 24-10.745 24-24v-80c0-13.255-10.745-24-24-24H205.333c-13.255 0-24 10.745-24 24z"/></svg>
        <h3 style={display === "grid" ? {color : "black"} :{ color : "white"}}>Grid</h3>
        </div>
        <div className='list-btn' onClick={handleDisplay}>
          <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="bars" className="svg-inline--fa fa-bars fa-w-14" role="img" viewBox="0 0 448 512"><path xmlns="http://www.w3.org/2000/svg" fill={display === "list" ? 'black' : "white"} d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"/></svg>
        <h3 style={display === "list" ? {color : "black"} :{ color : "white"}}>List</h3>
        </div>
    </div>
    </header>
      <div className={display === "grid" ? "contener" : "contener display-list"} onScroll={handleScroll}>
        {users && users.map((photo, id) => (
          <div key={id} className='card'>
            <a href={photo.links.download} className='img-href'><img src={photo.links.download} alt="" /></a>
            <div className='text'>
              <h2><a href={`${photo.user.portfolio_url ? photo.user.portfolio_url : '' }`}>{photo.user.username ? "Photography by " + photo.user.username  : ''}</a></h2>
              <p>{`${photo.exif.make ? photo.exif.make : ""}`} {`${photo.exif.model ? photo.exif.model : ""}`}</p>
              <p>{`${photo.location.title ? "Location: " + photo.location.title : ''}`} </p>
              <h5>views: {photo.views} </h5>
            </div>

          </div>
        ))}
      {loading && <p>Loading ...</p>}
      </div>
      </>
  );
}

export default App;
