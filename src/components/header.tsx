import React, { FunctionComponent } from 'react'
import { makeStyles } from '@material-ui/styles'
import { Theme, Typography, Box } from '@material-ui/core'
import { Link } from 'gatsby'

const useStyles = makeStyles((theme: Theme) =>({

}))

const Header: FunctionComponent = (props) => {
    const classes = useStyles()

    return (
        <Box marginTop={5}>     
            <Typography
                variant="h2"
            >
                <Link
                    style={{
                        boxShadow: `none`,
                        color: `inherit`,
                    }}
                    to={`/`}
                >
                    {props.children}
                </Link>
            </Typography>
        </Box>
    )
}

export default Header
