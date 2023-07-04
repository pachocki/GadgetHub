import React from 'react'
import Head from "next/head";

const head = () => {
  return (
    <div>
         <Head>
          <title>Dashboard</title>
          <meta name="description" content="Eccomercy dashboard" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
    </div>
  )
}

export default head