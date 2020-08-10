import React, { useEffect, useState } from 'react';
import { Card } from '@material-ui/core';

function News() {
    const [data, setData] = useState([]);
    useEffect(() => {
        const newsFetch = () => {
            fetch("https://rss.app/feeds/6u90B324SbERpG73.json")
            .then(response => response.json())
            .then(data => {
                setData(data.items);
            })
        }
        newsFetch();
    }, [])
    return (
        <div>
            {data.map(element => (
                <Card key={Math.random()} className="news-box">
                    <a href={element.url} target="_blank" rel="noopener noreferrer">
                        <div className="news-image">
                            <img src={element.enclosure === null || 
                                element.enclosure.url.includes("https://storage.googleapis.com/afs-prod/media/ee56d67") ? 
                                "https://cdn.pixabay.com/photo/2015/02/15/09/33/news-636978_960_720.jpg" : 
                                element.enclosure} alt="news" 
                            />
                        </div>  
                        <div className="news-info-cont">
                            <div className="hour-box">
                                <span>
                                    <i className="fas fa-circle"></i> 
                                    {
                                        new Date(element.date).getMinutes() < "10" ? // IF condition is true
                                        new Date(element.date).getHours() + ":0" +  // do this
                                        new Date(element.date).getMinutes() : // Else
                                        new Date(element.date).getHours() < "10" ? // If this condition is true
                                        "0" + new Date(element.date).getHours() + // do this
                                        ":" + new Date(element.date).getMinutes() : // else
                                        new Date(element.date).getHours() + // do this
                                        ":" + new Date(element.date).getMinutes()
                                    }
                                </span>
                            </div>
                            <div className="news-title">
                                {element.title}
                            </div>
                            <div className="news-description">
                                {element.description.includes("<div>") ? element.title : element.description}
                            </div>
                        </div>
                    </a>
                </Card>
            ))}
        </div>
    )
}

export default News
