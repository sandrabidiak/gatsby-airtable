import React, { FunctionComponent } from 'react'
import { makeStyles } from '@material-ui/styles'
import { Theme, Typography, Grid, Box } from '@material-ui/core'
import { graphql } from 'gatsby'
import Layout from '../components/layout'

const useStyles = makeStyles((theme: Theme) =>({
    media: {
        objectFit: 'cover',
        width: '100%',
        height: '100%'
    }
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
                thumbnails: {
                    full: {
                        url: string
                    },
                    large: {
                        url: string
                        width: number
                    }
                }
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
    const siteTitle = props.data.site.siteMetadata.title
    const post = props.data && props.data.airtable
    const { date, title, image, PostMarkdown, author } = post && post.data
    const { large, full } = image[0] && image[0].thumbnails
    const largeImg = large && large.url
    const largeImgWidth = large && large.width
    const fullImg = full && full.url

    const classes = useStyles()
    return (
        <Layout location={window.location} title={siteTitle}> 
            <div>
                {title &&
                    <Typography 
                        variant="h3" 
                        style={{
                            fontWeight: 'bold'
                        }}
                    >
                        {title}
                    </Typography>
                }
                {date &&
                    <Typography variant="overline" display="block">
                        {date}
                    </Typography>
                }
                {author &&                        
                    <Typography 
                        variant="subtitle2" 
                        gutterBottom
                        style={{
                            fontWeight: 'bold',
                            fontStyle: 'normal'
                        }}
                    >
                        {author}
                    </Typography>
                }
                {(largeImg || fullImg) && 
                <Grid container item xs={12} justify="center">
                    <Box style={{ maxHeight: 500 }}>
                        <img
                            src={largeImg || fullImg} 
                            srcSet={`${largeImg} ${largeImgWidth}, ${fullImg} 1000w`}                        
                            sizes="(min-width: 600px) 1000px, 100vw"
                            alt={title}
                            className={classes.media}
                        />
                    </Box>
                </Grid>
                    
                }
                {PostMarkdown &&
                    <Typography
                        variant='body1'
                        display='block' 
                        dangerouslySetInnerHTML={{ __html: PostMarkdown }}
                    />
                }
            </div>           
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
                    thumbnails {
                        full {
                            url
                        }
                        large {
                            url
                            width
                        }
                    }
                }
            }
        }
    }
`