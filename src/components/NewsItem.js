import React, { Component } from 'react'

export class NewsItem extends Component {

  render() {
    let {title, description, imageUrl, newsUrl, author, date, source} = this.props;
    return (
      <div className="my-3">
        <div className="card" >
        <span className="position-absolute badge rounded-pill bg-danger" style={{right:'0'}}>{source}
        </span>
          <img src={!imageUrl ? "https://www.indiantelevision.com/sites/default/files/styles/smartcrop_800x800/public/images/tv-images/2020/06/16/news.jpg?itok=AzhxsDE7" : imageUrl} className="card-img-top" alt="..." style={{height:"200px"}}/>
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
              
            <p className="card-text">{description}...</p>
            <p className="card-text"><small className="text-muted"> By {!author ? "Unknown" : author} on {new Date(date).toGMTString()}</small></p>
            <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
          </div>
        </div>
      </div>
    )
  }
}

export default NewsItem