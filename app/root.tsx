import { Link, LiveReload, Outlet, Links, Meta } from '@remix-run/react'
import globalStyles from './styles/global.css'
import type { DocumentProps, ErrorProps, LayoutProps } from './typings'

export const links = () => [{ rel: 'stylesheet', href: globalStyles }]

export const meta = () => {
  const description = 'Cool Blog built with Remix'
  const keywords = 'remix, react, javascript'

  return {
    description,
    keywords
  }
}

function App() {
  return (
    <Document title='Home'>
      <Layout>
        <Outlet />
      </Layout>
    </Document>
  )
}

export default App



function Document({ children, title }: DocumentProps) {
  return (

    <html lang='en'>
      <head>
        <title>{title ? title : 'Remix Tutorial'}</title>
        <Links />
        <Meta />
      </head>
      <body>
        {children}
        {process.env.NODE_ENV === 'development' ? <LiveReload /> : null}
      </body>
    </html>
  )
}

function Layout({ children }: LayoutProps) {
  return (
    <>
      <nav className='navbar'>
        <Link to={'/'}>
          Remix
        </Link>
        <ul className="nav">
          <li>
            <Link to={'/posts'}>
              Posts
            </Link>
          </li>
        </ul>
      </nav>
      <div className="container">
        {children}
      </div>
    </>
  )
}

export const ErrorBoundary = ({ error }: ErrorProps) => {
  console.log(error);
  return (
    <Document>
      <Layout>
        <h1>Error</h1>
        <p>{error.message}</p>
      </Layout>
    </Document>
  )
}
