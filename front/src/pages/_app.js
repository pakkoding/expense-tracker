import React from 'react'
import { Provider } from 'react-redux'
import withRedux, { createWrapper } from 'next-redux-wrapper'
import store from '../store'
import '../styles/globals.css'
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'
import ReduxToastr from 'react-redux-toastr'
import Head from 'next/head'
import Link from 'next/link'

function MyApp ({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Head>
        <title>Expense Tracker</title>
        <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            as="font"
            crossOrigin=""
          />
        <link
            rel="preload"
            href="https://fonts.googleapis.com/css2?family=Kanit&display=swap"
            as="font"
            crossOrigin=""
          />
      </Head>
      <ReduxToastr
        newestOnTop
        preventDuplicates
        position="top-center"
        transitionIn="bounceInDown"
        transitionOut="bounceOutUp"
        progressBar
        closeOnToastrClick />
      <Component {...pageProps} />
    </Provider>

  )
}
const makestore = () => store
const wrapper = createWrapper(makestore)

export default wrapper.withRedux(MyApp)
