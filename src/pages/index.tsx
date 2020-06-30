import React from 'react'
import { Typography } from '@material-ui/core'
import { Link, graphql } from "gatsby"
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
                        date: string
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
                {edges.map(({ node: post }, index) => {
                    return (
                        <div key={index}>
                            {post && post.data && (
                                <>
                                    {post.data.date &&
                                        <Typography variant="overline" display="block" gutterBottom>
                                            {post.data.date}
                                        </Typography>                                                
                                    }
                                    <Typography 
                                        variant="h5" 
                                        display="block" 
                                        gutterBottom
                                        style={{
                                            fontWeight: 'bold'
                                        }}
                                    >
                                        {post.data.title}
                                    </Typography>
                                    {post.data.image && 
                                        <Link 
                                            to={post.data.slug}
                                            style={{
                                                boxShadow: `none`,
                                                color: `inherit`,
                                            }}
                                        >
                                            <img src={post.data.image[0].url} alt=''/>
                                        </Link>
                                    }                                
                                </>
                            )}
                        </div>
                    )}
                )}
            </Layout>
        )
    }    
}

export default BlogIndex

export const pageQuery = graphql`
    query {
        allAirtable(sort: {fields: [data___date], order: DESC}) {
            edges {
                node {
                    data {
                        slug
                        title
                        author
                        PostMarkdown
                        date(formatString: "MMMM DD, YYYY")
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
