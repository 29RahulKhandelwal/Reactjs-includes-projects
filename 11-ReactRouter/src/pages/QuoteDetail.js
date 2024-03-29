import React, { useEffect } from 'react'
import { Link, Route, useParams, useRouteMatch } from 'react-router-dom'
import Comments from '../components/comments/Comments';
import HighlightedQuote from '../components/quotes/HighlightedQuote';
import useHttp from '../hooks/use-http';
import { getSingleQuote } from '../lib/api';
import LoadingSpinner from '../components/UI/LoadingSpinner';

const QuoteDetail = () => {
  const match=useRouteMatch();
  const params=useParams();
  const {quoteId}=params;
  const {sendRequest, status, data:loadedQuoute, error}=useHttp(getSingleQuote,true);
  
  useEffect(()=>{
    sendRequest(quoteId);
  },[sendRequest,quoteId]);

  if(status==='pending'){
    return <div className="centered"><LoadingSpinner /></div>
  }

  if(error){
    return <p className="centered">{error}</p>
  }

  if(!loadedQuoute.text){
    return <p>No quote found!</p>
  }
  return (
    <>
      <HighlightedQuote text={loadedQuoute.text} author={loadedQuoute.author} />
      <Route exact path={match.path}>
        <div className="centered">
          <Link className='btn--flat' to={`${match.url}/comments`}>Load Comments</Link>
        </div>
      </Route>
      <Route exact path={`${match.path}/comments`}><Comments /></Route>
    </>
  )
}

export default QuoteDetail