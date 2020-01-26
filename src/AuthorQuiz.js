import React, {Component} from 'react';
import logo from './logo.svg';
import './AuthorQuiz.css';
import './bootstrap.min.css';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";

function Hero() {
    return (
        <div className="row">
            <div className="jumbotron col-10 offset-1">
                <h1>Author Quiz</h1>
                <p>Select the book written by author shown:</p>
            </div>
        </div>
    )
}

function Book({title, highlight, onClick}) {
    return (
        <div className="answer" style={{backgroundColor: highlightToBGColor(highlight)}} onClick={() => onClick(title)}>
            <h4>{title}</h4>
        </div>
    )
}

function highlightToBGColor(highlight) {
    const mapping = {
        'none': '',
        'correct': 'green',
        'wrong': 'red'
    };
    return mapping[highlight];

}

function Turn({author, books, highlight, onAnswerSelected}) {
    return (
        <div className="row turn">
            <div className="col-4 offset-1">
                <img src={author.imageUrl} className="authorImage" alt="Author" />
            </div>
            <div className="col-6">
                {books.map((name) => <Book title={name} key={name} onClick={onAnswerSelected} highlight={highlight} /> )}
            </div>
        </div>
    );
}
Turn.propTypes = {
    author: PropTypes.shape({
        name: PropTypes.string.isRequired,
        imageUrl: PropTypes.string.isRequired,
        imageSource: PropTypes.string.isRequired,
        books: PropTypes.arrayOf(PropTypes.string).isRequired
    }),
    books: PropTypes.arrayOf(PropTypes.string).isRequired,
    highlight: PropTypes.string.isRequired,
    onAnswerSelected: PropTypes.func
};

function Continue({show, onContinue}) {
    return (
        <div className="row continue">
            {show ?
                <div className="col-11">
                    <button className="btn btn-primary btn-lg float-right" onClick={onContinue}>Continue</button>
                </div> : null
            }
        </div>
    );
}

function Footer() {
    return (
        <div id="footer" className="row">
            <div className="col-12">
                <p className="text-muted credit">
                    All images are from: <a href="http://wikimedia.org/wiki/Main_Page">Wikimedia Commons</a> and are in the public domain
                </p>
            </div>
        </div>
    );
}

class AuthorQuiz extends Component {
  render() {
    return (
        <div className="container-fluid">
            <Hero />
            <Turn {...this.props.data} highlight={this.props.highlight} onAnswerSelected={this.props.onAnswerSelected} />
            <Continue show={this.props.highlight === 'correct'} onContinue={this.props.onContinue} />
            <p><Link to="/add">ADD AN AUTHOR</Link></p>
            <Footer />
        </div>
    );
  }

}

export default AuthorQuiz;
