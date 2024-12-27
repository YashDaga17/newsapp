import InfiniteScroll from 'react-infinite-scroll-component'; 
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react';

const News = (props) =>{

  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  
  
  const capitalizeFL = (string) =>  {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  // articles = []


  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     articles: this.articles,
  //     loading: true,
  //     page: 1,
  //     totalResults: 0
  //   }
  //   document.title = `${this.capitalizeFirstletter(props.category)}- NewsMonkey`;
  // }

  const updateNews = async () => {
    props.setProgress(10)
    // console.log("Progress set to 10");
    const url = `https://newsapi.org/v2/everything?q=${props.category}&apiKey=72989467a2264083bc8107f46a82f6e6&page=${page}pageSize=${props.PageSize}`;
    // this.setState({ loading: true })
    setLoading(true)
    let data = await fetch(url);
    props.setProgress(30)
    let parsedData = await data.json()
    // console.log(parsedData);
    props.setProgress(50)
    setArticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    setLoading(false)

    // this.setState({
    //   articles: parsedData.articles,
    //   totalResults: parsedData.totalResults,
    //   loading: false
    // })
    props.setProgress(100)
    console.log("Progress set to 100");
  }

 useEffect(() =>{
//  document.title = `${this.capitalizeFL(props.category)}- NewsMonkey`;
  updateNews();
}, [])

  //const componentDidMount = async() => {
    //let url = `https://newsapi.org/v2/everything?q=apple&from=2024-10-17&to=2024-10-17&sortBy=popularity&apiKey=72989467a2264083bc8107f46a82f6e6&page=1&pageSize=${props.PageSize}`
    // let url = `https://newsapi.org/v2/everything?q=${props.category}&apiKey=72989467a2264083bc8107f46a82f6e6&page=1&pageSize=${props.PageSize}`;
    // this.setState({ loading: true })
    // let data = await fetch(url);
    // let parsedData = await data.json()
    // // console.log(parsedData);
    // this.setState({
    //   articles: parsedData.articles,
    //   totalResults: parsedData.totalResults,
    //   loading: false
    // })
  //  this.updateNews();
  //}

  //const handleNextClick = async () => {
    //console.log("Next")
    // if (!(this.page + 1 > Math.ceil(this.state.totalResults / props.PageSize))) {
    //let url = `https://newsapi.org/v2/everything?q=apple&from=2024-10-17&to=2024-10-17&sortBy=popularity&apiKey=72989467a2264083bc8107f46a82f6e6&page=${this.state.page+1}&pageSize=${props.PageSize}`
    //   let url = `https://newsapi.org/v2/everything?q=${props.category}&apiKey=72989467a2264083bc8107f46a82f6e6&page=${this.state.page+1}&pageSize=${props.PageSize}`; 
    //   this.setState({loading:true})
    //   let data = await fetch(url);
    //   let parsedData = await data.json();
    //   console.log(parsedData);
    //   this.setState({  
    //     page:this.state.page+1,
    //     articles: parsedData.articles,
    //     loading:false
    //   })
    // }
    // this.setState({ page: this.state.page + 1 });
    //setPage(page+1)
    //updateNews();
  //}

 // const handlePrevClick = async () => {
   // console.log("Previous")
    //  // let url = `https://newsapi.org/v2/everything?q=apple&from=2024-10-17&to=2024-10-17&sortBy=popularity&apiKey=72989467a2264083bc8107f46a82f6e6&page=${this.state.page-1}&pageSize=${props.PageSize}`
    //  let   url = `https://newsapi.org/v2/everything?q=${props.category}&apiKey=72989467a2264083bc8107f46a82f6e6&page=${this.state.page-1}&pageSize=${props.PageSize}`; 
    //  this.setState({loading:true})
    //  let data = await fetch(url);
    //   let parsedData = await data.json()
    //   this.setState({  
    //     page:this.state.page-1,
    //     articles: parsedData.articles,
    //     loading:false
    //   })
    // this.setState({ page: this.state.page - 1 });
     // setPage(page-1)
    //updateNews();
  //}

  const fetchMoreData = async () => {
    // this.setState({page: this.state.page+1})
    const url = `https://newsapi.org/v2/everything?q=${props.category}&apiKey=${props.apiKey}&page=${page+1}pageSize=${props.PageSize}`;
    setPage(page+1)
    let data = await fetch(url);
    let parsedData = await data.json()
    setArticles(articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults)
    setLoading(false)
    // this.setState({
    //   articles: articles.concat(parsedData.articles),
    //   totalResults: parsedData.totalResults,
    //   loading: false
    // })
  };

    return (
      <div className='container my-3'>
        <h1 className='text-center' style={{margin:'35px 0px', marginTop:'90px'}}>NewsMonkey - Top {capitalizeFL(props.category)}  Headlines</h1>
        {loading && <Spinner />}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length!==totalResults}
          loader={<Spinner/>}
        >
          <div className='container'>
         <div className='row'>
            {!loading && articles.map((element,index) => {
            return( <div className='col-md-4' key={`${element.url}-${index}`}>
              <NewsItem title={element.title ? element.title.slice(0, 45) : "hello"} description={element.description ? element.description.slice(0, 80) : ""}
                ImageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt}
                source={element.source.name} />
            </div>
            );
          })}
          </div>
        </div>
        </InfiniteScroll>
      
   
        {/* <div className='container d-flex justify-content-between'>
          <button disabled={this.state.page <= 1} type='button' className='btn btn-dark' onClick={this.handlePrevClick}>&larr; Previous </button>
          <button disabled={this.page + 1 > Math.ceil(this.state.totalResults / 20)} type='button' className='btn btn-dark' onClick={this.handleNextClick}>Next &rarr;</button>

        </div> */}
      </div>
    )
  }

News.defaultProps = {
  PageSize: 8,
  category: 'general',
}

News.propTypes = {
  PageSize: PropTypes.number,
  category: PropTypes.string,
}

export default News
