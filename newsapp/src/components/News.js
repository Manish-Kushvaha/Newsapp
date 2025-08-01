import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


export default class news extends Component {
  static defaultProps = {
    pageSize: 8,
    category: 'general',
  }

  static propTypes = {
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  constructor(props) {
    super(props);
    // console.log("Hey I am constructor from news component");
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0
    }
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - Aja Ki Khabar`;
  }

  async updateNews() {
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?q=us&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`
    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedData = await data.json()
    this.props.setProgress(70);
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    })
    this.props.setProgress(100);
  }
  async componentDidMount() {
    // let url = `https://newsapi.org/v2/top-headlines?q=us&category=${this.props.category}&apiKey=3b787b81bf54483a8183fe77f6ad4a78&page1&pageSize=${this.props.pageSize}`
    // this.setState({ loading: true });
    // let data = await fetch(url);
    // let parsedData = await data.json()
    // // console.log(parsedData);
    // this.setState({
    //     articles: parsedData.articles,
    //     totalResults: parsedData.totalResults,
    //     loading: false
    //   })
      this.updateNews();
    
  }

  // handlePrevClick = async () => {
    // let url = `https://newsapi.org/v2/top-headlines?q=us&category=${this.props.category}&apiKey=3b787b81bf54483a8183fe77f6ad4a78&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`
    // this.setState({ loading: true })
    // let data = await fetch(url);
    // let parsedData = await data.json()
    // console.log(parsedData);
    // this.setState({
    //   page: this.state.page - 1,
    //   articles: parsedData.articles,
    //   loading: false
    // })
  //   this.setState({ page: this.state.page - 1 });
  //   this.updateNews();
  // }

  // handleNextClick = async () => {
  //   if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {
  //     let url = `https://newsapi.org/v2/top-headlines?q=us&category=${this.props.category}&apiKey=3b787b81bf54483a8183fe77f6ad4a78&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`
      // this.setState({ loading: true })
      // let data = await fetch(url);
      // let parsedData = await data.json()
      // console.log(parsedData);

      // this.setState({
      //   page: this.state.page + 1,
      //   articles: parsedData.articles,
      //   loading: false
      // })
  //     this.setState({ page: this.state.page + 1 });
  //     this.updateNews();
  //   }
  // }

  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 })
    const url = `https://newsapi.org/v2/top-headlines?q=us&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`
    let data = await fetch(url);
    let parsedData = await data.json()
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      loading:false,
    })
  };

  render() {
    return (
      <>
        <h1 className='text-center mt-4 mb-5'>Aja Ki Khabar - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          // loader={<Spinner />}
        >
          <div className="container">
            <div className="row text-center" >
              {this.state.articles.map((element) => {
                return <div className="col md4" key={element.url}>
                  <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                </div>
              })}
            </div>
          </div>
        </InfiniteScroll >
        {/* <div className="container d-flex justify-content-between mb-2">
            <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
            <button disabled={(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
          </div> */}
      </>
    )
  }
}
