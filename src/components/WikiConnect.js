import React from 'react';
import Grid from '@material-ui/core/Grid';
import getSearchResults from '../WikiAPI/GetSearchResults';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';
import findPath from '../WikiAPI/FindPath';


class WikiConnect extends React.Component {
    constructor (props) {
        super(props);
        this.availableTerms1 = [];
        this.searchTerm1 = "";
        this.selectedRootNode1 = "";

        this.availableTerms2 = [];
        this.searchTerm2 = "";
        this.selectedRootNode2 = "";
    }

    render () {
        return (
            <Grid container>
                <Grid item md={6}>
                    <Autocomplete
                        id="search-box-1"
                        options={this.availableTerms1}
                        getOptionLabel={(option) => option.title}
                        style={{ width: "75%", marginLeft: "1rem", marginBottom: "1rem", marginTop: "1rem" }}
                        autoHighlight
                        onSelect={(event) => {
                            this.selectedRootNode1 = event.target.value;
                            this.setState({selectedRootNode1: this.selectedRootNode1});
                        }}
                        renderInput={(params) => 
                        <Grid conatiner> 
                            <Grid item>           
                                <TextField {...params} 
                                    label="Search" 
                                    variant="outlined"
                                    value={this.searchTerm1}
                                    display="inline"
                                    onChange={(event) => {
                                        this.searchTerm1 = event.target.value;
                                        this.setState({searchTerm1: this.searchTerm1});

                                        if (event.target.value) {
                                            try {
                                                getSearchResults(event.target.value).then((response) => {
                                                    this.availableTerms1 = response;
                                                    this.setState({availableTerms1: this.availableTerms1});
                                                })
                                            } catch (e) {
                                                console.error(e);
                                            }
                                        }
                                    }} />
                            </Grid>
                        </Grid>
                        }
                    />
                </Grid>

                <Grid item md={6}>
                    <Autocomplete
                        id="search-box-2"
                        options={this.availableTerms2}
                        getOptionLabel={(option) => option.title}
                        style={{ width: "75%", marginBottom: "1rem", marginTop: "1rem" }}
                        autoHighlight
                        onSelect={(event) => {
                            this.selectedRootNode2 = event.target.value;
                            this.setState({selectedRootNode2: this.selectedRootNode2});
                        }}
                        renderInput={(params) => 
                        <Grid conatiner> 
                            <Grid item>           
                                <TextField {...params} 
                                    label="Search" 
                                    variant="outlined"
                                    value={this.searchTerm2}
                                    display="inline"
                                    onChange={(event) => {
                                        this.searchTerm2 = event.target.value;
                                        this.setState({searchTerm2: this.searchTerm2});

                                        if (event.target.value) {
                                            try {
                                                getSearchResults(event.target.value).then((response) => {
                                                    this.availableTerms2 = response;
                                                    this.setState({availableTerms2: this.availableTerms2});
                                                })
                                            } catch (e) {
                                                console.error(e);
                                            }
                                        }
                                    }} />
                            </Grid>
                        </Grid>
                        }
                    />
                </Grid>

                <Grid item md={6}>
                    <h1>Search Term 1: {this.selectedRootNode1}</h1>
                </Grid>
                <Grid item md={6}>
                    <h1>Search Term 2: {this.selectedRootNode2}</h1>
                </Grid>
                <Grid item md={12} alignContent="center">
                    <Button onClick={() => {
                        findPath(this.selectedRootNode1, this.selectedRootNode2).then((result) => {
                            console.log("!!!!!!! RESULT !!!!!!!", result);
                        });
                    }}
                    variant="outlined"
                    color="primary"
                    size="large"
                    >
                        Connect
                    </Button>
                </Grid>
            </Grid>
        );
    }
}

export default WikiConnect;