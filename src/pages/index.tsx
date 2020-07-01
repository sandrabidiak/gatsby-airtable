import React, { FunctionComponent } from 'react'
import { makeStyles } from '@material-ui/styles'
import { Typography, Theme, Box, Grid } from '@material-ui/core'
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"

const useStyles = makeStyles((theme: Theme) =>({
    media: {
        objectFit: 'cover',
        width: '100%',
        height: '100%'
    }
}))

interface Props {
    data: {
        allAirtable: {
            edges: [{
                node: {
                    data: {
                        slug: string
                        title: string
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
            }]
        }
        site: {
            siteMetadata: {
              title: string
            }
        }
    }
}

const BlogIndex: FunctionComponent<Props> = (props) => {
    const { edges } = props.data.allAirtable
    const siteTitle = props.data.site.siteMetadata.title

    const classes = useStyles()

    return (
        <Layout location={window.location} title={siteTitle}>
            {edges.map(({ node: post }, index) => {
                const { slug, date, title, image } = post && post.data
                const { large, full } = image[0] && image[0].thumbnails
                const largeImg = large && large.url
                const largeImgWidth = large && large.width
                const fullImg = full && full.url

                return (
                    <Grid 
                        key={index}
                        container
                        spacing={3}
                        direction="column"
                        justify="center"
                        alignItems="flex-start"
                    >
                        {date &&
                            <Grid item xs={12}>
                                <Typography variant="overline" display="block" gutterBottom>
                                    {date}
                                </Typography>
                            </Grid>                                                
                        }
                        {title &&
                            <Grid item xs={12}>
                                <Typography 
                                    variant="h5" 
                                    display="block" 
                                    gutterBottom
                                    style={{
                                        fontWeight: 'bold'
                                    }}
                                >
                                    {title}
                                </Typography>
                            </Grid>
                        }                            
                        {(largeImg || fullImg) && 
                            <Grid container item xs={12} justify="center">
                                <Box style={{ maxHeight: 500 }}>                                
                                    <Link 
                                        to={slug}
                                        style={{
                                            boxShadow: `none`,
                                            color: `inherit`,
                                        }}
                                    >                                    
                                        <img 
                                            // srcSet={`${largeImg}, ${fullImg} 2x`} 
                                            srcSet={`${largeImg} ${largeImgWidth}, ${fullImg} 1000w`}                        
                                            sizes="(min-width: 600px) 1000px, 100vw"
                                            src={largeImg || fullImg}
                                            alt={title}
                                            className={classes.media}
                                        />
                                    </Link>
                                </Box>
                            </Grid>
                        }                                
                    </Grid>
                )}
            )}
        </Layout>
    )    
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
        }
        site {
            siteMetadata {
              title
            }
        }
    }
`
