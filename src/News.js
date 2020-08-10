import React, { useEffect, useState } from 'react';
import { Card } from '@material-ui/core';

function News() {
    const [data, setData] = useState([]);
    const newsArr = [
        "https://pbs.twimg.com/profile_images/1108430392267280389/ufmFwzIn_400x400.png",
        "https://ichef.bbci.co.uk/news/490/cpsprodpb/121A2/production/_111764147_breaking_news_bigger-nc.png",
        "https://static9.depositphotos.com/1011646/1236/i/450/depositphotos_12369509-stock-photo-breaking-news-screen.jpg",
        "https://ewscripps.brightspotcdn.com/dims4/default/e2788f7/2147483647/strip/true/crop/640x360+0+60/resize/1280x720!/quality/90/?url=http%3A%2F%2Fmedia2.kjrh.com%2Fphoto%2F2017%2F04%2F23%2FBreaking_News_1492988662299_58757041_ver1.0_640_480.JPG",
        "https://i2.wp.com/jagmedia.org/wp-content/uploads/2019/09/breaking-news.jpg?fit=1199%2C637&ssl=1",
        "https://lh3.googleusercontent.com/proxy/JD-wLYkff9kGcQtdofEMlqoh4xcw3Z6fGFGz2f70St5jf09d02KNipkTpok97BYS3nEbYA37fc4OuTQmCCj2p_z1nsO8NRzQftTI1sZUvPO44li2pg"
    ]
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
                            <img src=
                                {
                                    element.description.match(/<img.*?src="(.*?)"/) ? 
                                    element.description.match(/<img.*?src="(.*?)"/)[1] :
                                    newsArr[Math.floor(Math.random() * newsArr.length)]
                                } 
                                alt="news"
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
                                {
                                    element.description.match(/><div>(.*?).<\/div>/) ? 
                                    element.description.match(/><div>(.*?).<\/div>/)[1] :
                                    element.title
                                }
                            </div>
                        </div>
                    </a>
                </Card>
            ))}
        </div>
    )
}

export default News
