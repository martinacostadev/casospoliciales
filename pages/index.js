import Head from 'next/head'

export default function Home({news}) {
  return (
    <div className='container'>
      <Head>
        <title>Casos Policiales Pergamino y Zona</title>
        <meta name="description" content="Casos Policiales Pergamino y Zona" />
        <link rel="icon" href="https://casospoliciales.net/wp-content/uploads/2021/09/cropped-LOGO-CP-32x32.png" sizes="32x32" />
      </Head>

      <main className='main'>
        {news.length > 0 && news.map((noticia) => {
          return (
            <a href={`/news/${noticia.id}`} key={noticia.id}>
              <h3>{noticia?.title?.rendered}</h3>
              <p>{noticia?.excerpt?.rendered?.replace('[&hellip;]', '').replace('<p>', '').replace('</p>', '').substr(0,250)} ...</p>
            </a>
          )
        })}
      </main>

      <footer>
        <a
          href="mailto:pmartinacosta@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Realizado por Martín Acosta
        </a>
      </footer>
    </div>
  )
}

export async function getServerSideProps(context) {
  const res = await fetch(`https://casospoliciales.net/wp-json/wp/v2/posts?&per_page=10`)
  const news = await res.json()

  if (!news) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      news
    },
  }
}