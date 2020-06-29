import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
// import SEO from "../components/seo"
// import { rhythm } from "../utils/typography"

const BlogIndex = ({ data, location }) => {
  const { edges: posts } = data.allAirtable

  return (
    <Layout location={location}>
       <div>
        {
          posts.map(({ node: post }, index) => {
            return (
              <div key={index}>
                {post && (
                  <>
                    <h3>{post.data.title}</h3>
                    {post.data && post.data.author &&
                      <h5>{post.data.author}</h5>
                    }
                    {post && post.data.image && 
                      <Link to={post.data && post.data.slug}>
                        <img src={post.data.image[0].url} alt=''/>
                      </Link>
                    }
                  </>
                )}                
              </div>
            )  
          })
        }
      </div>
     {/*  <SEO title="All posts" />
      {posts.map(({ node }) => {
        const title = node.title || node.slug
        return (
          <article key={node.slug}>
            <header>
              <h3
                style={{
                  marginBottom: rhythm(1 / 4),
                }}
              >
                <Link style={{ boxShadow: `none` }} to={node.slug}>
                  {title}
                </Link>
              </h3>
              <small>{node.author}</small>
            </header>
            <section>
              <p
                dangerouslySetInnerHTML={{
                  __html: node.PostMarkdown,
                }}
              />
            </section>
          </article>
        )
      })} */}
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    allAirtable {
      edges {
        node {
          recordId
          data {
            slug
            title
            author
            PostMarkdown
            image {
              url
            }
          }
        }
      }      
    }
  }
`
