import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"

const BlogIndex = ({ data, location }) => {
    const { edges: posts } = data.allAirtable

    return (
        <Layout location={location}>
            <div>
                {posts.map(({ node: post }, index) => {
                    return (
                        <>
                            {post && post.data && (
                                <div key={index}>
                                    <h3>{post.data.title}</h3>
                                    {post.data.author &&
                                        <h5>{post.data.author}</h5>
                                    }
                                    {post.data.image && 
                                        <Link to={post.data.slug}>
                                            <img src={post.data.image[0].url} alt=''/>
                                        </Link>
                                    }                                
                                </div>
                            )}
                        </>
                    )}
                )}
            </div>
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
