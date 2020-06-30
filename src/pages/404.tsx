import React, { FunctionComponent } from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"

interface Props {
    data: {
        site: {
            siteMetadata: {
                title: string
            }
        }
    }
}

const NotFoundPage: FunctionComponent<Props> = (props) => {
    const siteTitle = props.data.site.siteMetadata.title

    return (
        <Layout location={window.location} title={siteTitle}>
            <h1>Not Found</h1>
            <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
        </Layout>
    )
}

export default NotFoundPage

export const pageQuery = graphql`
  query {
    site {
        siteMetadata {
            title
        }
    }
  }
`
