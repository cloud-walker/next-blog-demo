import util from 'util'
import path from 'path'
import fs from 'fs'
import matter from 'gray-matter'
import Link from 'next/link'

const readdir = util.promisify(fs.readdir)
const readFile = util.promisify(fs.readFile)

const HomePage = ({posts}) => {
  return (
    <ul className="center list">
      {posts.map((post) => {
        return (
          <li key={post.slug}>
            <h3>
              <Link href="/blog/[slug]" as={`/blog/${post.slug}`}>
                <a>{post.title}</a>
              </Link>
            </h3>

            <p>{post.description}</p>
          </li>
        )
      })}
    </ul>
  )
}

export const getStaticProps = async () => {
  const filenames = await readdir(path.join('content', 'blog'))
  const filesBuffers = await Promise.all(
    filenames.map((filename) =>
      readFile(path.join('content', 'blog', filename)),
    ),
  )
  const posts = filesBuffers.map((fileBuffer, i) => {
    const fileContents = matter(fileBuffer.toString())
    return {
      slug: filenames[i].replace('.md', ''),
      ...fileContents.data,
    }
  })

  return {props: {posts}}
}

export default HomePage
