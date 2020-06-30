import React from 'react'
import { Link, graphql, PageProps } from "gatsby"
import Layout from "../components/layout"

interface Props {
    data: {
        allAirtable: {
            edges: [{
                node: {
                    data: {
                        slug: string
                        title: string
                        author: string
                        PostMarkdown: string
                        image: [{
                            url: string
                        }]
                    }
                }
            }]
        }
        site: {
            siteMetadata: {
              title: string
            }
        }
    }
}

class BlogIndex extends React.Component<Props> {
    render() {
        const { edges } = this.props.data.allAirtable
        const siteTitle = this.props.data.site.siteMetadata.title

        return (
            <Layout location={window.location} title={siteTitle}>
                <div>
                    {edges.map(({ node: post }, index) => {
                        return (
                            <div key={index}>
                                {post && post.data && (
                                    <>
                                        <h3>{post.data.title}</h3>
                                        {post.data.author &&
                                            <h5>{post.data.author}</h5>
                                        }
                                        {post.data.image && 
                                            <Link to={post.data.slug}>
                                                <img src={post.data.image[0].url} alt=''/>
                                            </Link>
                                        }                                
                                    </>
                                )}
                            </div>
                        )}
                    )}
                </div>
            </Layout>
        )
    }    
}

export default BlogIndex

export const pageQuery = graphql`
    query {
        allAirtable {
            edges {
                node {
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
        site {
            siteMetadata {
              title
            }
        }
    }
`
