import React, { Component } from 'react'
import './App.scss'
import './Header.scss'
import Search from './components/Search'
import newsSVG from './img/news.svg'
import Loader from './components/Loader'
import ContentScroller from './ContentScroller'

class App extends Component {
    constructor() {
        super();
        this.state = {
            'search': true,
            'topic': "",
            'locale': "fr",
            'isDataLoaded': false,
            'onError': false,
            'data': []
        }
        this.setSearch = this.setSearch.bind(this);
        this.fetchData = this.fetchData.bind(this);
        this.handleRefresh = this.handleRefresh.bind(this);
    }

    setErrorMessage() {
        this.setState({
            'onError': true,
            'isDataLoaded': true
        })
    }

    fetchData() {
        const { topic, locale } = this.state;

        if(topic.length <= 1) {
            this.setErrorMessage();
        } else {
            fetch("http://newsapi.org/v2/everything?q=" + topic + "&from=now&sortBy=publishedAt&language=" + locale + "&apiKey=bdd27c745f824b46bb35ff045887c109")
            .then(response => response.json())
            .then((json) => {
                console.log(json);
                if(json.articles.length < 2) {
                    this.setErrorMessage();
                } else {
                    this.setState({
                        'isDataLoaded': true,
                        'data': json.articles
                    })
                }
            })
            .catch(err => {
                this.setErrorMessage();
            });
        }
    }

    handleRefresh(e) {
        e.preventDefault();
        this.fetchData();
        window.scrollTo(0,10);
    }

    setSearch(value) {
        this.setState({
            'search': false,
            'topic': value
        }, () => this.fetchData());
    }

    render() {
        const { isDataLoaded, data, search, onError } = this.state;

        return(
            <div className="App">
                {!search && 
                    <div className="header">
                        <img src={newsSVG} className="logo" alt="news logo"/>
                        <div className="subheader">
                            <a className="search" href="">Rechercher</a>
                            <a className="refresh" href="" onClick={this.handleRefresh}>Actualiser</a>
                        </div>
                    </div>
                }
                {search ? (
                    <Search triggerParentUpdate={this.setSearch}/>
                ) : (             
                    !isDataLoaded
                        ? <Loader />
                        : <ContentScroller data={data}/>
                    )
                }
                {onError &&
                    <div className="feedback">
                        <p>Désolé, nous n'avons rien trouvé pour cette thématique.</p>
                        <p>Veuillez tenter une nouvelle recherche.</p>
                    </div>
                }
            </div>
        )
    }
}

export default App;
