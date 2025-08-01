import React, { Component } from 'react'

export default class NewsItem extends Component {
  render() {

    let { title, description, imageUrl, newsUrl, author, date, source } = this.props;

    return (
      <div className='my-3' style={{ display: 'flex', justifyContent: 'center' }}>
        <div className="card" style={{ width: '35vw' }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end', position: 'absolute', right:'0'}}>
            <span className="badge rounded-pill bg-danger"> {source}</span>
          </div>
          <img src={imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text"><small className="text-body-secondary">By {!author ? "Unknown" : author} on 3 {new Date(date).toGMTString()}</small></p>
            <a href={newsUrl} target='_blank' className="btn btn-primary btn-sm btn-dark">Read More</a>
          </div>
        </div>
      </div>
    )
  }
}
