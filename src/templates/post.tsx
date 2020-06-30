import React, { FunctionComponent } from 'react'
import { makeStyles } from '@material-ui/styles'
import { Theme, Typography } from '@material-ui/core'
import { graphql } from 'gatsby'
import Layout from '../components/layout'

const useStyles = makeStyles((theme: Theme) =>({
    
}))

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

    const classes = useStyles()
    return (
        <Layout location={window.location} title={siteTitle}>
            {post && post.data && 
                <div>
                    {post.data.title &&
                        <Typography 
                            variant="h3" 
                            style={{
                                fontWeight: 'bold'
                            }}
                        >
                            {post.data.title}
                        </Typography>
                    }
                    {post.data.date &&
                        <Typography variant="overline" display="block">
                            {post.data.date}
                        </Typography>
                    }
                    {post.data.author &&                        
                        <Typography 
                            variant="subtitle2" 
                            gutterBottom
                            style={{
                                fontWeight: 'bold',
                                fontStyle: 'normal'
                            }}
                        >
                            {post.data.author}
                        </Typography>
                    }
                    {post.data.image && 
                        <img src={post.data.image[0].url} alt=''/>
                    }
                    {post.data.PostMarkdown &&
                        <Typography
                            variant='body1'
                            display='block' 
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