import React, { useEffect, useRef, useState } from 'react';
import './TitleCards.css';
// import cards_data from '../../assets/cards/Cards_data';
import { Link } from 'react-router-dom';


const TitleCards = ({title , category}) => {

  const [apiData , setApiData] = useState([])
  const cardsRef = useRef();

  

  const handleWeel = (event)=> {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY
  }

  useEffect(()=>{
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNmNiOWExYjU1YTY4ZDgxMzkwZGJlZTllNGYzZGY2NCIsIm5iZiI6MTcyNjA1Mzc5NC4xOTc1Niwic3ViIjoiNjZlMTdjNzA1ZjRlZjJjYTI5OGIzNGI2Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.-nFqVAbTH3B_8aAsDDPDRARZuGzoAnu00QpXvA3f3l0'
      }
    };
    
    fetch(`https://api.themoviedb.org/3/movie/${category ? category : "now_playing"}?language=en-US&page=1`, options)
      .then(response => response.json())
      .then(response => setApiData(response.results))
      .catch(err => console.error(err));
    cardsRef.current.addEventListener('wheel',handleWeel)
  },[category])

  return (
    <div className='title-cards'>
      <h2>{title ? title : "Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card,index)=> {
          return <Link to={`/player/${card.id}`} className="card" key={index}>
            <img src={`https://image.tmdb.org/t/p/w500` + card.backdrop_path} alt="" />
            <p> {card.original_title} </p>
          </Link>
        })}
      </div>
    </div>
  )
}

export default TitleCards;