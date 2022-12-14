import React , {useEffect , useState}from 'react'
import "./Poster.css"
import axios from '../../axios'
import {Api_key, imageUrl} from '../constants/constant'
import Popup from 'reactjs-popup'
import {FaBookmark} from "react-icons/fa"

function Poster(props) {
  const[originals , setoriginals] = useState([])
  const [link , setlink] = useState("")

  useEffect(() => {
    axios.get(props.URL).then(response =>{
      setoriginals(response.data.results)
      console.log(response.data)
    })
    
  }, [])

  function checkBookMark(movie) {
    for( var i = 0 ;i<props.name.length;i++ ) {
        if( props.name[i].id===movie.id ) return true ;
    }
    return false ;
}

const removeBookMark = (movie) => {
  let newList = props.name.filter( m => m?.id!==movie?.id )
  props.setName(newList);
}
console.log(props.name)
  
useEffect(()=>{
  localStorage.setItem("str", JSON.stringify(props.name))
},[props.name])

 

 const handlemovie = (id)=>{
  console.log(id)
  axios.get(`movie/${id}/videos?api_key=${Api_key}&language=en-US`).then(response => {
    if(response.data.results.length!==0){
    setlink(response.data)
    }else{
      console.log("video not avalaible")
    }
  })
}


  


  return (
    <div className='rowPoster'>
        <h2 className='rowm'>{props.title}</h2>
        <div className='rowp'>
            {originals.map(movie => {
              return(
                <main>
                <Popup 
                 trigger={ <img  onClick={()=>handlemovie(movie.id)}  src= {`${imageUrl+movie.backdrop_path}`} alt='netflixOriginals' className={props.isSmall ? 'imn' : "imh"}/> }
                modal>
                  <div className='contevt'>
                    <h1>{movie.name||movie.title}</h1>
                    <div className='over'>
                      <h3>OverView :</h3>
                      {movie.overview}
                    </div>
                    <div className='dtail'> {  movie?.release_date ? ( "Relase Date : "+movie?.release_date ) : ("") } </div>
                    <div className='rating'>
                      <div className='prating'>
                      Ratings : {movie?.vote_average}/10
                      </div>
                      <div className="bookmark">
                          { 
                              checkBookMark(movie) ? (
                                  <div>
                                      <h3>Remove from the List</h3>
                                      <FaBookmark className="maga" onClick={
                                          ()=>{removeBookMark(movie)}
                                      } />
                                  </div>
                              ) : (
                                  <div>
                                      <h3>Add to List</h3>
                                      <FaBookmark  className="maga" onClick={()=>props.setName([...props.name,movie])}/>
                                  </div>
                              )
                          }      
                          
                      </div>

                    </div>
                    

                  </div>
                </Popup>
              </main>
                 )
                 


            })}
        </div>
        
        
          
        
    </div>
  )
}

export default Poster