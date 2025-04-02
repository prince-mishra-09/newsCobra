import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import '../index.css'
export class NewsCompo extends Component {
  constructor() {
    super()
    this.state = {
      articles: [],
      page: 1,
      loading: false,
      q: 'all'
    }
    console.log("I'm constuctor" + this.state.q)

  }
  async componentDidMount() {
    console.log("I'm copenentDid Mount" + this.state.q)
    let api = `https://newsapi.org/v2/top-headlines?q=${this.state.q}&apiKey=d1a91cc764604836922abeb7893cce34&page=${this.state.page}&pageSize=20`
    this.setState({ loading: true })
    let data = await fetch(api)
    let parseData = await data.json()
    this.setState({ articles: parseData.articles, loading: false })
  }

  nextPage = async () => {
    let api = `https://newsapi.org/v2/top-headlines?q=${this.state.q}&apiKey=d1a91cc764604836922abeb7893cce34&page=${this.state.page + 1}&pageSize=20`;
    this.setState({ loading: true })
    let data = await fetch(api);
    let parseData = await data.json()
    console.log("helloji")
    this.setState({
      articles: parseData.articles,
      page: this.state.page + 1,
      totalResults: parseData.totalResults,
      loading: false
    })
  }

  prevPage = async () => {
    let api = `https://newsapi.org/v2/top-headlines?q=${this.state.q}&apiKey=d1a91cc764604836922abeb7893cce34&page=${this.state.page - 1}&pageSize=12`
    this.setState({ loading: true })
    let data = await fetch(api)
    let parseData = await data.json()
    // console.log(parseData)
    this.setState({
      articles: parseData.articles,
      page: this.state.page - 1,
      loading: false
    })
  }

  changeInterest = async (event) => {
    const newQ = event.target.value;
    const list = document.querySelectorAll('.category-btn')
    let arr = Array.from(list)
    arr.map((e,i)=>{
      if(list[i].value == newQ){
        list[i].style.backgroundColor = "white"
        list[i].style.color = "black"
      }else{
        list[i].style.backgroundColor = "#333"
        list[i].style.color = "white"
        
      }
    })
    this.setState({ q: newQ }, async () => { 
      console.log("Updated q: " + this.state.q);
      this.fetchNews()
    })
  }
  fetchNews = async () => {
    let api = `https://newsapi.org/v2/everything?q=${this.state.q}&apiKey=d1a91cc764604836922abeb7893cce34&page=${this.state.page}&pageSize=20`;
    
    this.setState({ loading: true });
    
    let data = await fetch(api);
    let parseData = await data.json();

    this.setState({ articles: parseData.articles, loading: false });
};
  render() {
    return (
      <>
        <div className="container-fluid navbar py-0">
          <div className="category-bar w-100  d-flex flex-row justify-content-between px-3">
            <button className="category-btn active" onClick={this.changeInterest} value={"all"}>All</button>
            <button className="category-btn" onClick={this.changeInterest} value={"business"}>Business </button>
            <button className="category-btn" onClick={this.changeInterest} value={"entertainment"}>Entertainment </button>
            <button className="category-btn" onClick={this.changeInterest} value={"general"}>General </button>
            <button className="category-btn" onClick={this.changeInterest} value={"health"}>Health </button>
            <button className="category-btn" onClick={this.changeInterest} value={"science"}>Science </button>
            <button className="category-btn" onClick={this.changeInterest} value={"sports"}>Sports </button>
            <button className="category-btn" onClick={this.changeInterest} value={"technology"}>Technology </button>
            <button className="category-btn" onClick={this.changeInterest} value={"world"}>World </button>
            <button className="category-btn" onClick={this.changeInterest} value={"politics"}>Politics </button>
            <button className="category-btn" onClick={this.changeInterest} value={"food"}>Food </button>
            <button className="category-btn" onClick={this.changeInterest} value={"travel"}>Travel </button>
          </div>
        </div>


        <div className='container my-3  '>
          <h1 className='my-3'>{this.state.q=='all'?"NewsCobra- Top headlines":"News: " + this.state.q[0].toUpperCase() + this.state.q.slice(1,this.state.q.length)}</h1>
          {this.state.loading && <Spinner />}
          {/* <Spinner/> */}
          <div className="row  d-flex justify-content-center align-items-center">
            {!this.state.loading && this.state.articles.map((e, index) => {
              return <div className="col-md-4" key={index}>
                <NewsItem title={e.title ? e.title.slice(0.40) : ""} desc={e.description ? e.description.slice(0, 80) : ""} imgUrl={e.urlToImage ? e.urlToImage : "https://t3.ftcdn.net/jpg/04/62/93/66/360_F_462936689_BpEEcxfgMuYPfTaIAOC1tCDurmsno7Sp.jpg"} url={e.url} author={e.author} source={e.source.name} time={e.publishedAt}/>
              </div>
            })}
          </div>
          <div className="container d-flex justify-content-between">
            <button type="button" disabled={this.state.page < 2} onClick={this.prevPage} className="btn btn-primary">&larr;Previous  </button>
            <button type="button" onClick={this.nextPage} disabled={Math.ceil(this.state.totalResults / 20) >= this.state.page} className="btn btn-primary">Next &rarr; </button>
          </div>
        </div>
      </>
    )
  }
}

export default NewsCompo
