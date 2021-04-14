import React from 'react'
import { Provider } from 'react-redux'
import withRedux, { createWrapper } from 'next-redux-wrapper'
import store from '../store'
import '../styles/globals.css'
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'
import ReduxToastr from 'react-redux-toastr'

function MyApp ({ Component, pageProps }) {
  return (
    <Provider store={store}>
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
