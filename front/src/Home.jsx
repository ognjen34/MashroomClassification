import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Grid, Typography, Button, MenuItem, Snackbar, Alert } from "@mui/material";
import axios from "axios";

const Home = () => {

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("info");

    const [model, setModel] = useState("KNN");



    const [formData, setFormData] = useState({
        "cap-diameter": "",
        "cap-shape": "",
        "cap-surface": "",
        "cap-color": "",
        "does-bruise-or-bleed": "",
        "gill-attachment": "",
        "gill-spacing": "",
        "gill-color": "",
        "stem-height": "",
        "stem-width": "",
        "stem-root": "",
        "stem-surface": "",
        "stem-color": "",
        "veil-type": "",
        "veil-color": "",
        "has-ring": "",
        "ring-type": "",
        "spore-print-color": "",
        habitat: "",
        season: ""
    });

    const handleModelChange = (event) => {
        setModel(event.target.value);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };

    const handleTrain = (event) => {
        event.preventDefault();
    
        axios.get("http://localhost:5001", {
            params: {
                model: model
            }
        }).then((response) => {
            console.log(response.data);
        }).catch((error) => {
            console.log(error);
        });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();


        axios.post("http://localhost:5001/process-data", formData, {}).then((response) => {
            console.log(response.data.result)
            if (response.data.result == "e") {
                console.log(response.data.result)
                setSnackbarMessage("Edible");
                setSnackbarSeverity("success");

            } else if (response.data.result == "p") {
                setSnackbarMessage("Poisonous");
                setSnackbarSeverity("error");
            }
            setSnackbarOpen(true);

        }).catch((error) => {
            console.log(error);
        });




    };

    return (
        <div>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
            >
                <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
            <Grid container spacing={2} sx = {{marginBottom :"10px",marginTop :"10px"}}>
                <Grid item xs={3}>
                    <Typography variant="h4" gutterBottom>
                        Mushroom Attributes Form
                    </Typography>
                </Grid>
                
                <Grid item xs={6}>
                <TextField
                            fullWidth
                            id="model"
                            name="model"
                            label="Model"
                            variant="outlined"
                            value={model}
                            onChange={handleModelChange}
                            select
                        >
                            <MenuItem value="KNN">KNN</MenuItem>
                            <MenuItem value="RandomForest">RandomForest</MenuItem>
                            <MenuItem value="LogisticRegression">LogisticRegression</MenuItem>
                            <MenuItem value="NaiveBayes">NaiveBayes</MenuItem>
                            <MenuItem value="GradientBoosting">GradientBoosting</MenuItem>
                            <MenuItem value="DecisionTree">DecisionTree</MenuItem>
                        </TextField>
                    
                </Grid>
                <Grid item xs={3}>
                <Button onClick={handleTrain}>
                    Train
                </Button>
                </Grid>
            </Grid>
            <form >
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            id="cap-diameter"
                            name="cap-diameter"
                            label="Cap Diameter (cm)"
                            variant="outlined"
                            type="number"
                            value={formData["cap-diameter"]}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            id="cap-shape"
                            name="cap-shape"
                            label="Cap Shape"
                            variant="outlined"
                            value={formData["cap-shape"]}
                            onChange={handleChange}
                            select
                        >
                            <MenuItem value="b">Bell</MenuItem>
                            <MenuItem value="c">Conical</MenuItem>
                            <MenuItem value="x">Convex</MenuItem>
                            <MenuItem value="f">Flat</MenuItem>
                            <MenuItem value="s">Sunken</MenuItem>
                            <MenuItem value="p">Spherical</MenuItem>
                            <MenuItem value="o">Other</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            id="cap-surface"
                            name="cap-surface"
                            label="Cap Surface"
                            variant="outlined"
                            value={formData["cap-surface"]}
                            onChange={handleChange}
                            select
                        >
                            <MenuItem value="i">Fibrous</MenuItem>
                            <MenuItem value="g">Grooves</MenuItem>
                            <MenuItem value="y">Scaly</MenuItem>
                            <MenuItem value="s">Smooth</MenuItem>
                            <MenuItem value="h">Shiny</MenuItem>
                            <MenuItem value="l">Leathery</MenuItem>
                            <MenuItem value="k">Silky</MenuItem>
                            <MenuItem value="t">Sticky</MenuItem>
                            <MenuItem value="w">Wrinkled</MenuItem>
                            <MenuItem value="e">Fleshy</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            id="cap-color"
                            name="cap-color"
                            label="Cap Color"
                            variant="outlined"
                            value={formData["cap-color"]}
                            onChange={handleChange}
                            select
                        >
                            <MenuItem value="n">Brown</MenuItem>
                            <MenuItem value="b">Buff</MenuItem>
                            <MenuItem value="g">Gray</MenuItem>
                            <MenuItem value="r">Green</MenuItem>
                            <MenuItem value="p">Pink</MenuItem>
                            <MenuItem value="u">Purple</MenuItem>
                            <MenuItem value="e">Red</MenuItem>
                            <MenuItem value="w">White</MenuItem>
                            <MenuItem value="y">Yellow</MenuItem>
                            <MenuItem value="l">Blue</MenuItem>
                            <MenuItem value="o">Orange</MenuItem>
                            <MenuItem value="k">Black</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            id="does-bruise-or-bleed"
                            name="does-bruise-or-bleed"
                            label="Does Bruise or Bleed?"
                            variant="outlined"
                            value={formData["does-bruise-or-bleed"]}
                            onChange={handleChange}
                            select
                        >
                            <MenuItem value="t">Yes</MenuItem>
                            <MenuItem value="f">No</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            id="gill-attachment"
                            name="gill-attachment"
                            label="Gill Attachment"
                            variant="outlined"
                            value={formData["gill-attachment"]}
                            onChange={handleChange}
                            select
                        >
                            <MenuItem value="a">Adnate</MenuItem>
                            <MenuItem value="x">Adnexed</MenuItem>
                            <MenuItem value="d">Decurrent</MenuItem>
                            <MenuItem value="e">Free</MenuItem>
                            <MenuItem value="s">Sinuate</MenuItem>
                            <MenuItem value="p">Pores</MenuItem>
                            <MenuItem value="f">None</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            id="gill-spacing"
                            name="gill-spacing"
                            label="Gill Spacing"
                            variant="outlined"
                            value={formData["gill-spacing"]}
                            onChange={handleChange}
                            select
                        >
                            <MenuItem value="c">Close</MenuItem>
                            <MenuItem value="d">Distant</MenuItem>
                            <MenuItem value="f">None</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            id="gill-color"
                            name="gill-color"
                            label="Gill Color"
                            variant="outlined"
                            value={formData["gill-color"]}
                            onChange={handleChange}
                            select
                        >
                            <MenuItem value="n">Brown</MenuItem>
                            <MenuItem value="b">Buff</MenuItem>
                            <MenuItem value="g">Gray</MenuItem>
                            <MenuItem value="r">Green</MenuItem>
                            <MenuItem value="p">Pink</MenuItem>
                            <MenuItem value="u">Purple</MenuItem>
                            <MenuItem value="e">Red</MenuItem>
                            <MenuItem value="w">White</MenuItem>
                            <MenuItem value="y">Yellow</MenuItem>
                            <MenuItem value="o">Orange</MenuItem>
                            <MenuItem value="k">Black</MenuItem>
                            <MenuItem value="f">None</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            id="stem-height"
                            name="stem-height"
                            label="Stem Height (cm)"
                            variant="outlined"
                            type="number"
                            value={formData["stem-height"]}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            id="stem-width"
                            name="stem-width"
                            label="Stem Width (mm)"
                            variant="outlined"
                            type="number"
                            value={formData["stem-width"]}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            id="stem-root"
                            name="stem-root"
                            label="Stem Root"
                            variant="outlined"
                            value={formData["stem-root"]}
                            onChange={handleChange}
                            select
                        >
                            <MenuItem value="b">Bulbous</MenuItem>
                            <MenuItem value="s">Swollen</MenuItem>
                            <MenuItem value="c">Club</MenuItem>
                            <MenuItem value="r">Rooted</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            id="stem-surface"
                            name="stem-surface"
                            label="Stem Surface"
                            variant="outlined"
                            value={formData["stem-surface"]}
                            onChange={handleChange}
                            select
                        >
                            <MenuItem value="i">Fibrous</MenuItem>
                            <MenuItem value="g">Grooves</MenuItem>
                            <MenuItem value="y">Scaly</MenuItem>
                            <MenuItem value="s">Smooth</MenuItem>
                            <MenuItem value="h">Shiny</MenuItem>
                            <MenuItem value="k">Silky</MenuItem>
                            <MenuItem value="t">Sticky</MenuItem>
                            <MenuItem value="f">None</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            id="stem-color"
                            name="stem-color"
                            label="Stem Color"
                            variant="outlined"
                            value={formData["stem-color"]}
                            onChange={handleChange}
                            select
                        >
                            <MenuItem value="n">Brown</MenuItem>
                            <MenuItem value="b">Buff</MenuItem>
                            <MenuItem value="g">Gray</MenuItem>
                            <MenuItem value="r">Green</MenuItem>
                            <MenuItem value="p">Pink</MenuItem>
                            <MenuItem value="u">Purple</MenuItem>
                            <MenuItem value="e">Red</MenuItem>
                            <MenuItem value="w">White</MenuItem>
                            <MenuItem value="y">Yellow</MenuItem>
                            <MenuItem value="l">Blue</MenuItem>
                            <MenuItem value="o">Orange</MenuItem>
                            <MenuItem value="k">Black</MenuItem>
                            <MenuItem value="f">None</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            id="veil-type"
                            name="veil-type"
                            label="Veil Type"
                            variant="outlined"
                            value={formData["veil-type"]}
                            onChange={handleChange}
                            select
                        >
                            <MenuItem value="p">Partial</MenuItem>
                            <MenuItem value="u">Universal</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            id="veil-color"
                            name="veil-color"
                            label="Veil Color"
                            variant="outlined"
                            value={formData["veil-color"]}
                            onChange={handleChange}
                            select
                        >
                            <MenuItem value="n">Brown</MenuItem>
                            <MenuItem value="u">Purple</MenuItem>
                            <MenuItem value="e">Red</MenuItem>
                            <MenuItem value="w">White</MenuItem>
                            <MenuItem value="y">Yellow</MenuItem>
                            <MenuItem value="k">Black</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            id="has-ring"
                            name="has-ring"
                            label="Has Ring?"
                            variant="outlined"
                            value={formData["has-ring"]}
                            onChange={handleChange}
                            select
                        >
                            <MenuItem value="t">Yes</MenuItem>
                            <MenuItem value="f">No</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            id="ring-type"
                            name="ring-type"
                            label="Ring Type"
                            variant="outlined"
                            value={formData["ring-type"]}
                            onChange={handleChange}
                            select
                        >
                            <MenuItem value="e">Evanescent</MenuItem>
                            <MenuItem value="r">Flaring</MenuItem>
                            <MenuItem value="g">Grooved</MenuItem>
                            <MenuItem value="l">Large</MenuItem>
                            <MenuItem value="p">Pendant</MenuItem>
                            <MenuItem value="z">Zone</MenuItem>
                            <MenuItem value="m">Movable</MenuItem>
                            <MenuItem value="f">None</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            id="spore-print-color"
                            name="spore-print-color"
                            label="Spore Print Color"
                            variant="outlined"
                            value={formData["spore-print-color"]}
                            onChange={handleChange}
                            select
                        >
                            <MenuItem value="n">Brown</MenuItem>
                            <MenuItem value="g">Gray</MenuItem>
                            <MenuItem value="r">Green</MenuItem>
                            <MenuItem value="p">Pink</MenuItem>
                            <MenuItem value="u">Purple</MenuItem>
                            <MenuItem value="w">White</MenuItem>
                            <MenuItem value="k">Black</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            id="habitat"
                            name="habitat"
                            label="Habitat"
                            variant="outlined"
                            value={formData["habitat"]}
                            onChange={handleChange}
                            select
                        >
                            <MenuItem value="g">Grasses</MenuItem>
                            <MenuItem value="l">Leaves</MenuItem>
                            <MenuItem value="m">Meadows</MenuItem>
                            <MenuItem value="p">Paths</MenuItem>
                            <MenuItem value="h">Heaths</MenuItem>
                            <MenuItem value="u">Urban</MenuItem>
                            <MenuItem value="w">Waste</MenuItem>
                            <MenuItem value="d">Woods</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            id="season"
                            name="season"
                            label="Season"
                            variant="outlined"
                            value={formData["season"]}
                            onChange={handleChange}
                            select
                        >
                            <MenuItem value="s">Spring</MenuItem>
                            <MenuItem value="u">Summer</MenuItem>
                            <MenuItem value="a">Autumn</MenuItem>
                            <MenuItem value="w">Winter</MenuItem>
                        </TextField>
                    </Grid>
                </Grid>
                <Button type="button" variant="contained" color="primary" onClick={handleSubmit}>
                    Submit
                </Button>
            </form>

        </div>
    );
};

export default Home;
