
import React , {useEffect , useState } from 'react'
import "./Banner.css"
import axios from '../../axios'
import {Api_key , imageUrl} from '../constants/constant' 
import {FaRegBookmark} from "react-icons/fa"
import YouTube from 'react-youtube'

function Banner(props) {
  const[Data , setData] = useState()
  const[kid ,setkid]=useState("")
  useEffect(() => {
    axios.get(`trending/all/week?api_key=${Api_key}&language=en-US`).then((response)=>{
     setData(response.data.results[Math.floor(Math.random()*response.data.results.length)])
     console.log(response.data.results)
    })
}, []) 


function close(){
  setkid("")
}

const handlemovie = (id)=>{
  console.log(id)
  axios.get(`movie/${id}/videos?api_key=${Api_key}&language=en-US`).then(response => {
    if(response.data.results.length!==0){
    setkid(response.data)
    console.log(response.data)
    }else{
      console.log("video not avalaible")
    }
  })
}

const removeBookMark = (movie) => {
  var newList = props.name.filter( m=>{
      return m.id!==movie.id
  });
  props.setName(newList) ;

}

useEffect(()=>{
  localStorage.setItem("str" , JSON.stringify(props.name))
  console.log("item")
},[props.name])


const opts = {
  height: '200',
  width: '250',
  playerVars: {
    // https://developers.google.com/youtube/player_parameters
    autoplay: 0,
  },
};
if(props.Mylist){
  return(
    <div className='saved'>
      <h1 className='savedlist'>My Saved List</h1>
      <div className='sButton'>
        <button onClick={()=>{props.display()}}>Back</button>
      </div>
      <div className='nContent'>
        {props.name.map(movie =>{
          return(
            <main>
            <div className='biw'>
              <div className='bhi'>
                <img className='brp' onClick={()=>handlemovie(movie.id)} key={movie.id} src={`${imageUrl+movie.backdrop_path}`} alt={movie.title || movie.name}/>
              </div>
              <div className='bw'>
                <div className='bh' >{movie.title||movie.name}</div>
                <div className='bo' >{movie?.overview}</div>
                <div className='br' >Ratings: {movie?.vote_average}/10</div>
                <div className='pb' >
                
                  <h3>Remove from the List</h3>
                  <FaRegBookmark  className='maga' onClick={
                      ()=>removeBookMark(movie)
                  }/>
  
            
                </div>
              </div>
            <hr />
            <div>
             {kid.id===movie.id && 
             <div className='you'>
               <YouTube opts={opts} videoId={kid.key}  className="yout"></YouTube>
               <button onClick={()=>close()} className="ybut">close</button>
             </div>}
           </div>
         
       </div>
         </main>
          )
        })}
   
      </div>
   

    </div>
  )
}






  return (
    <div className='banner'
          style={{backgroundImage:`url(${Data ? imageUrl+Data.backdrop_path : " "})`}}>
        <div className='content'>
        <h1 className='title'>{Data ? (Data.title||Data.name) : ""}</h1>
        <div className='banner-button'>
            <button className='button1'>Play</button>
            <button className='button1' onClick={props.display}>MyList</button>
        </div>
        <h5 className='descrip'>{Data ? Data.overview : ""}</h5>
        
        </div>
        <div className='fade'></div>
         
    </div>
  )
}

export default Banner