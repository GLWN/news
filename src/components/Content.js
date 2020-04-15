import React, {useState} from 'react'
import Loader from './Loader'
import './Content.scss'
// import Moment from 'react-moment'
import 'moment-timezone'
import 'moment/locale/fr'
import imgSVG3 from '../img/news-3.svg'

const Content = ({title, url, description, content, date, imgUrl, source}) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isRatioOk, setIsRatioOk] = useState(true);
    const imgRef = React.createRef();

    const loadImage = () => {
        // remove annoying formats
        const ratio = imgRef.current.offsetWidth / imgRef.current.offsetHeight;
        if(ratio < 1.2) {
            setIsRatioOk(false);
        } else {
            setIsRatioOk(true);
        }
        // remove loader and display img
        setIsLoaded(true);
    }

    return(
        <li className="content-li">
            <h2>
                {title}
            </h2>
            <p className="date">
                {/* <Moment format='LLLL' locale='fr'>
                    {date}
                </Moment> */}
                <span>Source : {source}</span>
            </p>
            <h4>{description}</h4>
            <div className="content-wrapper">
                {imgUrl && isRatioOk &&
                    <div className={content ? 'img-wrapper width-alt-1' : 'img-wrapper width-alt-2'} >
                        <img
                            ref={imgRef}
                            src={imgUrl} alt=""
                            onLoad={loadImage}
                        />
                        {!isLoaded && <Loader />}
                    </div>
                }
                {content &&  
                    <div className="article-wrapper">
                        <p className=''>
                            {content}
                        </p>
                        <a href={url} target="_blank"> 
                            <img src={imgSVG3} />
                            Voir l'article
                        </a>
                    </div> 
                }
                {!content &&
                    <a href={url} target="_blank"> 
                        <img src={imgSVG3} />
                        Voir l'article
                    </a>
                }
            </div>
        </li>
    )
}

export default Content