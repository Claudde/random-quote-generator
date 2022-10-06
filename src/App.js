import './App.scss';
import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareTwitter, faSquareTumblr } from '@fortawesome/free-brands-svg-icons';
import COLORS_ARRAY from './colors'

class App extends Component {
  
  constructor() {
    super();
    this.state = {
      quoteArr: [],
      quote: "",
      author: "",
      accentColor: '#282c34',
      twitterLink: "",
      tumblrLink: ""
    }
    this.getTwitterLink = this.getTwitterLink.bind(this);
    this.getTumblrLink = this.getTumblrLink.bind(this);
    this.getNewQuote = this.getNewQuote.bind(this);
  }

  getTwitterLink(quote, author) {
    return encodeURI("https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=" +
                      "\"" +
                      quote +
                      "\" -" +
                      author);
  }
  
  getTumblrLink(quote, author) {
    return encodeURI("https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=" +
                      author + 
                      "&content=" +
                      quote + 
                      "&canonicalUrl=https://www.tumblr.com/buttons&shareSource=tumblr_share_button");
  }
  
  componentDidMount() {
    fetch('https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json')
      .then(res => res.json())
      .then(json => {
        const genRand = Math.floor(Math.random() * Object.keys(json.quotes).length);
        this.setState({ 
          quoteArr: json.quotes,
          quote: json.quotes[genRand].quote,
          author: json.quotes[genRand].author,
          twitterLink: this.getTwitterLink(json.quotes[genRand].quote, json.quotes[genRand].author),
          tumblrLink: this.getTumblrLink(json.quotes[genRand].quote, json.quotes[genRand].author),
          accentColor: COLORS_ARRAY[Math.floor(Math.random() * COLORS_ARRAY.length)]
        })
      })
  }

  getNewQuote() {
    
    const inQuoteArr = this.state.quoteArr;
    const genRand = Math.floor(Math.random() * Object.keys(inQuoteArr).length);
    const randColor = Math.floor(Math.random() * COLORS_ARRAY.length);
    this.setState({ 
      quote: inQuoteArr[genRand].quote,
      author: inQuoteArr[genRand].author,
      twitterLink: this.getTwitterLink(inQuoteArr[genRand].quote, inQuoteArr[genRand].author),
      tumblrLink: this.getTumblrLink(inQuoteArr[genRand].quote, inQuoteArr[genRand].author),
      accentColor: COLORS_ARRAY[randColor]
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header"
                style={{backgroundColor: this.state.accentColor,
                        color: this.state.accentColor}}>
          <div id="quote-box">
            <p id="text">
              "{ this.state.quote }"
            </p>
            <p id="author">
              - { this.state.author }
            </p>
            <div id='button-box'>
              <div className='sns-btn' >
                <a id="tweet-quote" href={ this.state.twitterLink } title="Tweet this quote!" target="_blank">
                  <FontAwesomeIcon icon={faSquareTwitter} size="xl" className='icons' style={{color: this.state.accentColor}}></FontAwesomeIcon>
                </a>
                <a id="post-quote" href={ this.state.twitterLink } title="Post this on Tumblr!" target="_blank">
                  <FontAwesomeIcon icon={faSquareTumblr} size='xl' className='icons' style={{color: this.state.accentColor}}></FontAwesomeIcon>
                </a>
              </div>
              <button id="new-quote" 
                      onClick={this.getNewQuote} 
                      className="btn"
                      style={{backgroundColor: this.state.accentColor}}>
                        New Quote
              </button>
            </div>
          </div>
        </header>
      </div>
    );
  }

}

export default App;

//ReactDOM.render(<App />, document.getElementById("app"));


