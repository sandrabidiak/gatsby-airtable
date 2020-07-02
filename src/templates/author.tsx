import React, { FunctionComponent } from 'react'
import { makeStyles } from '@material-ui/styles'
import { Theme, Typography, Grid } from '@material-ui/core'
import { graphql } from 'gatsby'
import Layout from '../components/layout'

const useStyles = makeStyles((theme: Theme) =>({

}))

interface Props {
  data: {
    airtable: {        
        data: {
            slug: string
            name: string
            bio: string
        }
    }
    site: {
      siteMetadata: {
        title: string
      }
    }
  }
}

const Author: FunctionComponent<Props> = (props) => {
    const siteTitle = props.data.site.siteMetadata.title
    const author = props.data && props.data.airtable
    const { name, bio } = author && author.data

    const classes = useStyles()

    return (
        <Layout location={window.location} title={siteTitle}> 
            <Grid 
                container
                direction="column"
                justify="center"
                alignItems="flex-start"
            >
                {name &&
                    <Typography 
                        variant="h3" 
                        style={{
                            fontWeight: 'bold'
                        }}
                    >
                        {name}
                    </Typography>
                }                      
                <Typography 
                    variant="h6" 
                    style={{
                        fontWeight: 'bold'
                    }}
                >
                    Bio:
                </Typography>
                {bio &&
                    <Typography
                        variant='body1'
                        display='block' 
                        dangerouslySetInnerHTML={{ __html: bio }}
                    />
                }
            </Grid>           
        </Layout>        
    )
}

export default Author

export const query = graphql`
    query getAuthor($slug: String) {
        airtable(
            table: { eq: "author" },
            data: { slug: { eq: $slug } }
        ) {
            data {
                slug
                name
                bio
            }
        }
        site {
            siteMetadata {
              title
            }
        }
    }
`