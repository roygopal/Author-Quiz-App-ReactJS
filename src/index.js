import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AuthorQuiz from './AuthorQuiz';
import * as serviceWorker from './serviceWorker';
import {shuffle, sample} from 'underscore';
import AuthorList from './Authors';
import {BrowserRouter, Route, withRouter} from "react-router-dom";
import AddAuthorForm from './AddAuthorForm';

let propData = resetState();
function resetState() {
    return {
        data: getData(AuthorList["authors"]),
        highlight: ''
    };
}

function getData(authors) {
    const allBooks = authors.reduce((prevItem, item) => {
        return prevItem.concat(item.books);
    }, []);
    const fourRandomBooks = shuffle(allBooks).slice(0, 4);
    const answer = sample(fourRandomBooks);
    return {
        books: fourRandomBooks,
        author: authors.find((author) => author.books.some((name) => name === answer))
    }
}

function onAnswerSelected(answer) {
    let isCorrect = propData.data.books.some(book => book === answer);
    propData.highlight = isCorrect ? 'correct' : 'wrong';
    render();
}

const AuthorWrapper = withRouter(({history}) => {
    return <AddAuthorForm onAddAuthor={(author) => {
        AuthorList["authors"].push(author);
        history.push('/');
    }}/>;
});

function App() {
    return (
        <AuthorQuiz {...propData} onAnswerSelected={onAnswerSelected} onContinue={() => {
            propData = resetState();
            render();
        }} />
    );
}
function render() {
    ReactDOM.render(
        <BrowserRouter>
            <React.Fragment>
                <Route exact path="/" component={App}/>
                <Route exact path="/add" component={AuthorWrapper}/>
            </React.Fragment>
        </BrowserRouter>,
        document.getElementById('root')
    );
}
render();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
