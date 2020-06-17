import fs from 'fs'
import util from 'util'
import path from 'path'
import Markdown from 'react-markdown'
import Head from 'next/head'
import matter from 'gray-matter'

const readdir = util.promisify(fs.readdir)
const readFile = util.promisify(fs.readFile)

const PostPage = ({title, author, description, keywords, content, banner}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords.join(', ')} />
      </Head>

      <main className="center">
        <h1>{title}</h1>

        <img src={banner} alt={title} />

        <Markdown source={content}></Markdown>
      </main>
    </>
  )
}

export const getStaticPaths = async () => {
  const filenames = await readdir(path.join('content', 'blog'))
  const paths = filenames.map((filename) => ({
    params: {slug: filename.replace('.md', '')},
  }))
  console.log(paths)

  return {paths, fallback: false}
}

export const getStaticProps = async ({params: {slug}}) => {
  const fileBuffer = await readFile(path.join('content', 'blog', `${slug}.md`))
  const fileContent = fileBuffer.toString()
  const {content, data} = matter(fileContent)
  return {props: {...data, content}}
}

export default PostPage
