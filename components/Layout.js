import React from 'react';
import Head from 'next/head';
import Header from '../components/Header';

export default (props) => {
  return (
    <div>
      <Head>
        <title>KickSmarter</title>
        <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"></link>
      </Head>
      <div>
        <Header/>
        {props.children}
      </div>
    </div>
  )
}
