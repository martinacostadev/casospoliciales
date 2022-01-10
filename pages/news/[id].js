export default function Post({ post }) {
    return (
      <div className="post">
            <h3>{post?.title?.rendered}</h3>
            <div dangerouslySetInnerHTML={{ __html: post?.content?.rendered }}></div>
      </div>
    )
}

export async function getStaticPaths() {
    const res = await fetch('https://casospoliciales.net/wp-json/wp/v2/posts')
    const posts = await res.json()

    const paths = posts.map((post) => ({
        params: { id: post.id.toString() },
    }))

    return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
    const res = await fetch(`https://casospoliciales.net/wp-json/wp/v2/posts/${params.id}`)
    const post = await res.json()

    return {
      props: {
        post
      }
    }
  }