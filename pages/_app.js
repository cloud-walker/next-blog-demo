import Link from 'next/link'

import './style.css'

const App = ({Component, pageProps}) => {
  return (
    <>
      <header className="center">
        <h1>
          <Link href="/">
            <a>Blog!</a>
          </Link>
        </h1>
      </header>
      <Component {...pageProps} />
    </>
  )
}

export default App
