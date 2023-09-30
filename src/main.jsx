import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    brand: {
      primary: "#fff",
    },
    dashboard: {
      primary: "#330582",
    },
    border: "#bebebe",
    button: {
      light_color: "#333",
      light_backgroundColor: "#fff",
      light_boxShadow: "0 2px 1px rgb(29 39 59 / 7%)",
      active_light_backgroundColor: "#f2f2f2",
      hover_light_boxShadow: "0px 6px 8px 2px rgb(30 40 61 / 12%)",

      dark_color: "#fff",
      dark_backgroundColor: "#330582",
      active_dark_backgroundColor: "#CBD5DF",
      hover_dark_backgroundColor: "#5B369D",

      borderRadius: "20px",
      hover_transform: "translateY(-0.2rem)",

      buttonColor: "#330582",
      buttonHover: "#5F38A2",
    },
  },
  fontSize: {
    normal: "14px",
  },
});


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
)
