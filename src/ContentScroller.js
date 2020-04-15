import React, { useState, useEffect } from 'react'
import './ContentScroller.scss'
import Summary from './components/Summary'
import Content from './components/Content'

const ContentScroller = ({data}) => {
    const liHeight = 100; // according to css li definition
    const detectorY = window.innerWidth <= 468 ? 160 : 300;
    const summaryOffset = window.innerWidth <= 468 ? 160 : 140;
    const [ summaryPos, setSummaryPos ] = useState(0);
    const [ scrolled, setScrolled ] = useState(false);

    const summaries = data.map((item, index) =>
        <Summary key={index} id={index} date={item.publishedAt}/>
    );

    const content = data.map((item, index) =>
        <Content
            key={index} 
            author={item.author}
            title={item.title}
            date={item.publishedAt}
            description={item.description}
            content={item.content}
            url={item.url}
            imgUrl={item.urlToImage}
            source={item.source.name}
        />
    );

    const collision = () => {
        for (let i = 0; i < data.length; i++) {
            const contentLiEl = document.getElementsByClassName('content-li')[i];
            const summaryLiEl = document.getElementsByClassName('summary-li')[i];
            const liY = contentLiEl.getBoundingClientRect().y;
            const collision = detectorY >= liY && detectorY <= liY + contentLiEl.offsetHeight;
    
            if(collision) {
                contentLiEl.classList.add('readable');
                summaryLiEl.classList.add('readable');
                setSummaryPos(i);
            } else {
                contentLiEl.classList.remove('readable');
                summaryLiEl.classList.remove('readable');
            }
        }
    }


    useEffect(() => {
        window.addEventListener('scroll', collision);
        if(!scrolled) { // force scroll on loading
            const offset = window.innerWidth <= 468 ? 2 : 60
            window.scrollTo(0,offset);
            setScrolled(true);
        }
        // cleanup function occurs on unmount
        return () => window.removeEventListener('scroll', collision);
    });

    return(
        <div className="content-scroller">
            {/* <div className="detector"></div> */}
            <ul style={{top: -summaryPos * liHeight + summaryOffset + 'px'}} className="summary">{summaries}</ul>
            <ul className="content">{content}</ul>
        </div>
    )
}

export default ContentScroller;