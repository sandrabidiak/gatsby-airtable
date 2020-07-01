import React, { FunctionComponent } from 'react'
import { makeStyles } from '@material-ui/styles'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import { Theme, Typography, Grid, Box, MobileStepper, Button } from '@material-ui/core'
import { graphql } from 'gatsby'
import Layout from '../components/layout'

const useStyles = makeStyles((theme: Theme) =>({
    media: {
        objectFit: 'cover',
        width: '100%',
        height: '100%',
        margin: 0
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
                        width: number
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

    const [scrollStepperIndex, setScrollStepperIndex] = React.useState<number>(0)

    const { large, full } = image[scrollStepperIndex] && image[scrollStepperIndex].thumbnails
    const largeImg = large && large.url
    const largeImgWidth = large && large.width
    const fullImg = full && full.url
    const fullImgWidth = full && full.width

    const classes = useStyles()
    return (
        <Layout location={window.location} title={siteTitle}> 
            <Grid 
                container
                direction="column"
                justify="center"
                alignItems="flex-start"
            >
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
                <Grid container item xs={12} justify="center">
                    <Box style={{ maxHeight: 500 }}>
                        <img
                            src={largeImg || fullImg} 
                            srcSet={`${largeImg} ${largeImgWidth}w, ${fullImg} 800w`}                        
                            sizes="(max-width: 800px) 600px, 100vw"
                            alt={title}
                            className={classes.media}
                        />
                        <MobileStepper
                            steps={image.length}
                            position="static"
                            variant="text"
                            activeStep={scrollStepperIndex}
                            style={{ 
                                display: image.length <= 1 ? 'none' : ''
                            }}
                            nextButton={
                                <Button 
                                    size="small" 
                                    color="inherit"
                                    onClick={() => {
                                        setScrollStepperIndex((scrollStepperIndex) => scrollStepperIndex + 1)
                                    }} 
                                    disabled={scrollStepperIndex === image.length - 1}
                                >
                                    Next
                                    <KeyboardArrowRight />
                                </Button>
                            }
                            backButton={
                                <Button 
                                    size="small"
                                    color="primary" 
                                    onClick={() => {
                                        setScrollStepperIndex((scrollStepperIndex) => scrollStepperIndex - 1)
                                    }} 
                                    disabled={scrollStepperIndex === 0}
                                >
                                    <KeyboardArrowLeft /> 
                                    Back
                                </Button>
                            }
                        />
                    </Box>
                </Grid>
                {PostMarkdown &&
                    <Typography
                        variant='body1'
                        display='block' 
                        style={{
                            marginTop: image.length <= 1 ? '1rem' : '5rem' }}
                        dangerouslySetInnerHTML={{ __html: PostMarkdown }}
                    />
                }
            </Grid>           
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
                            width
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