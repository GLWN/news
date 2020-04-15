import React, { Component } from 'react'
import './Search.scss'
import newsSVG from '../img/news.svg'

class Search extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            value: ""
        }
    }

    handleChange(e) {
        this.setState({value: e.target.value});
    }

    render() {
        return(
            <div className="search-layer">
                <form onSubmit={() => this.props.triggerParentUpdate(this.state.value)}>
                    <img src={newsSVG} className="logo" alt="news logo"/>
                    <input onChange={this.handleChange} type="text" placeholder="Saisir un thème" />
                    <br />
                    <button onClick={() => this.props.triggerParentUpdate(this.state.value)} type="button">Valider</button>
                    <p className="feedback"></p>
                </form>
            </div>
        )
    }
}

export default Search