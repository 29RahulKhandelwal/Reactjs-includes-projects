import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import QuoteForm from '../components/quotes/QuoteForm';
import useHttp from '../hooks/use-http';
import { addQuote } from '../lib/api';

const NewQuote = () => {
  const {sendRequest,status}=useHttp(addQuote);
  const history=useHistory();

  useEffect(()=>{
    if(status==='completed'){
      history.push("/quotes")
    }
  },[status,history])

  function addQuotehandler(quoteData){
    sendRequest(quoteData);
  }
  return (
    <QuoteForm isLoading={status==='pending'} onAddQuote={addQuotehandler} />
  )
}

export default NewQuote