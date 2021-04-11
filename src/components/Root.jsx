import React from 'react'
import { ThemeProvider } from '@material-ui/core/styles';
import App from './App'
import theme from './theme'

export default function Root() {
    return (
        <div>
            <ThemeProvider theme={theme}>
                <App />
            </ThemeProvider>
        </div>
    )
}
