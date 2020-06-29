import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'

export default ({ data, location }) => {
    const { airtable: post } = data
    const siteTitle = data.site.siteMetadata.title
    return (
        <Layout location={location} title={siteTitle}>
            <div>
                {post.data && post.data.title &&
                    <h1>{post.data.title}</h1>
                }
                {post.data && post.data.author &&
                    <h3>{post.data.author}</h3>
                }
                {post.data && post.data.image && 
                    <img src={post.data.image[0].url} alt=''/>
                }
                {post.data && post.data.PostMarkdown &&
                    <div 
                        dangerouslySetInnerHTML={{ __html: post.data.PostMarkdown }}
                    />
                }
            </div>
        </Layout>        
    )
}

export const query = graphql`
    query getAirtable($slug: String) {
        site {
            siteMetadata {
              title
            }
        }
        airtable ( data: {slug: { eq: $slug }}) {
            recordId
            data {
                slug
                title
                author
                PostMarkdown
                date(formatString: "")
                image {
                    url
                }
            }
        }
    }
`