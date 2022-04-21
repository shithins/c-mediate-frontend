import './gif.css'
import homeGif from '../../images/home.gif'
import { useEffect } from 'react'
export default function Gif(){
    
    return (
        <div className='gif-main' id='gitRotate'>
            <img src={homeGif}/>
        </div>
    )
} 