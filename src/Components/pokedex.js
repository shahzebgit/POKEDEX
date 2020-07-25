import React from "react";
import { AppBar, ToolBar,Grid,Card,CardContent } from '@material-ui/core'
import { makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles({
  pokedexContainer:{
    paddingTop:'20px',
    paddingLeft:'50px',
    paddingRight:'50px'
  },
}
)

const pokemonGrid =()=>{
  return(
   <Grid item xs={12} sm={4}>
     <Card/>
   </Grid> 
  )
}
const Pokedex = () => {
  const classes = useStyles();
  return (
    <>
    <AppBar position='static'>
      <ToolBar/>
    </AppBar>
    <Grid container spacing={4} className={classes.pokedexContainer}>
      {
        pokemonGrid()
      }
    </Grid>
    </>
    )
};

export default Pokedex;
