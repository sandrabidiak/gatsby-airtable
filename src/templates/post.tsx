import React, { FunctionComponent } from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'

interface Props {
  data: {
    airtable: {        
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
    site: {
      siteMetadata: {
        title: string
      }
    }
  }
}

const Post: FunctionComponent<Props> = (props) => {
    const post = props.data && props.data.airtable && props.data.airtable
    const siteTitle = props.data.site.siteMetadata.title

    return (
        <Layout location={window.location} title={siteTitle}>
            {post && post.data && 
                <div>
                    {post.data.title &&
                        <h1>{post.data.title}</h1>
                    }
                    {post.data.date &&
                        <h6>{post.data.date}</h6>
                    }
                    {post.data.author &&
                        <h3>{post.data.author}</h3>
                    }
                    {post.data.image && 
                        <img src={post.data.image[0].url} alt=''/>
                    }
                    {post.data.PostMarkdown &&
                        <div 
                            dangerouslySetInnerHTML={{ __html: post.data.PostMarkdown }}
                        />
                    }
                </div>
            }            
        </Layout>        
    )
}

export default Post

export const query = graphql`
    query getAirtable($slug: String) {
        site {
            siteMetadata {
              title
            }
        }
        airtable ( data: {slug: { eq: $slug }}) {
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
`