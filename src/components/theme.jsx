import { createMuiTheme } from "@material-ui/core";
import { amber, deepPurple } from "@material-ui/core/colors";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#ffae00",
            contrastText: "#fff7e0"

        },


        secondary: {
            main: "#ff0555",
            contrastText: "#fff7e0"

        }
    }

})

export default theme