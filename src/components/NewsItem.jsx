
import React, { Component } from 'react'
import "../index.css";

export default class NewsItem extends Component {
    render() {
        let { title, desc, imgUrl, url } = this.props
        return (
            <div className="card " >
                <img src={imgUrl} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{title}...</h5>
                    <p className="card-text">{desc}...</p>
                    <p className="card-text p-0 m-0 my-1"><small className="text-muted">by {this.props.author ? this.props.author : "unknown"} on {new Date(this.props.time).toGMTString()}</small></p>
                    <span><a href={url} target='_blank' className="btn btn-sm btn-primary">Read more</a></span>
                </div>
            </div>
        )
    }
}
