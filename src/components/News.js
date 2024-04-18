import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

export class News extends Component {
  
  static defaultProps = {
    country: "in",
    pageSize: 15,
    category: "general",
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }

  capatalizeFirstLetter = (string) =>{
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  constructor(props){
    super(props);
    console.log("Constructor")
    this.state = {
      articles: [],
      loading: false,
      page : 1,
      totalResults : 0
    }
    document.title = `${this.capatalizeFirstLetter(this.props.category)} - News`;
  }

  async updateNews(){
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey={YOUR_API_KEY}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({loading : true});
    let data = await fetch(url);
    this.props.setProgress(30);
    let parseData = await data.json();
    this.props.setProgress(70);
    this.setState({ articles: parseData.articles,
                    totalResults:parseData.totalResults,
                    loading : false})
    this.props.setProgress(100);
  }

  async componentDidMount(){
    this.updateNews();
  }

  handlePrevClick = async () =>{
    console.log(`prev ${this.state.page}`);
    await this.setState({ page : this.state.page - 1});
    this.updateNews();
  }

  handleNextClick = async () =>{
    console.log(`next ${this.state.page}`);
    await this.setState({ page : this.state.page + 1});
    this.updateNews();
  }


  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center" style={{margin: "35px 0px"}}>Top {this.capatalizeFirstLetter(this.props.category)}  Headlines</h1>
        {this.state.loading && <Spinner/>}
    
        <div className="row">
          {!this.state.loading && this.state.articles.map((element) =>{    
            return <div className="col-md-4" key={element.url}>
                <NewsItem title={element.title ? element.title.slice(0,45) : ""} 
                          description={element.description ? element.description.slice(0,88) : ""}
                          imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} 
                          date={element.publishedAt} source={element.source.name}/>
            </div>
          })}
        </div>

        <div className="container d-flex justify-content-between">
          <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
          <button disabled={Math.ceil(this.state.totalResults/this.props.pageSize) < this.state.page+1} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div>
    )
  }
}

export default News
