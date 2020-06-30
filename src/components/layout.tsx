import React, { FunctionComponent } from 'react'
import { makeStyles } from '@material-ui/styles'
import { Theme, Container, Box, MuiThemeProvider } from '@material-ui/core'
import Header from './header'
import Footer from './footer'
import theme from '../../theme'

const useStyles = makeStyles((theme: Theme) =>({
    container: {        
        paddingLeft: '32px',
        paddingRight: '32px'
    }
}))

interface ParentProps {
    children?: React.ReactNode
    title?: string
    location?: Location
}

const Layout: FunctionComponent<ParentProps> = (props) => {
    const { children, title, location } = props

    const classes = useStyles()
    //const rootPath = `${__PATH_PREFIX__}/`
    
    return (
        <MuiThemeProvider theme={theme}>
            <Container maxWidth="md" component="main" className={classes.container}>
                <Header>
                    {title}
                </Header>
                <Box marginTop={5}>
                    {children}
                </Box>
            </Container>          
            <Footer />
        </MuiThemeProvider>
    )
}

export default Layout
