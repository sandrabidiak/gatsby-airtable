import React, { FunctionComponent } from 'react'
import { makeStyles } from '@material-ui/styles'
import { Theme, Divider } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) =>({
    footer: {
        padding: '60px 13% 45px 13%'
    },
    divider: {
        marginTop: 30,
        marginBottom: 10,
        height: 2,
    }
}))

const Footer: FunctionComponent = () => {
    const classes = useStyles()

    return (     
        <div className={classes.footer}>
            <Divider
                variant="fullWidth"
                className={classes.divider}
            />  
            © {new Date().getFullYear()}, Built with
            {` `}
            <a href="https://www.gatsbyjs.org" target="_blank">Gatsby</a>
        </div>
    )
}

export default Footer
