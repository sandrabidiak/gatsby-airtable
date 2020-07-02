import React, { FunctionComponent } from 'react'
import { makeStyles } from '@material-ui/styles'
import { Typography, Theme, Box, Grid } from '@material-ui/core'
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"

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
                const fullImgWidth = full && full.width

                return (
                    <Grid 
                        key={index}
                        container
                        direction="column"
                        justify="center"
                        alignItems="flex-start"
                        style={{ marginBottom: 50 }}
                    >
                        {date &&
                            <Grid 
                                item 
                                xs={12}
                                style={{ padding: 0 }}
                            >
                                <Typography variant="overline" display="block" gutterBottom>
                                    {date}
                                </Typography>
                            </Grid>                                                
                        }
                        {title &&
                            <Grid 
                                item 
                                xs={12}
                                style={{ padding: 0 }}
                            >
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
                                            srcSet={`${largeImg} ${largeImgWidth}w, ${fullImg} 800w`}                        
                                            sizes="(max-width: 700px) 600px, 100vw"
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
        allAirtable(
            filter: { table: { eq: "CMS" } },
            sort: { fields: [data___date], order: DESC }
        ) {
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
        }
        site {
            siteMetadata {
              title
            }
        }
    }
`
