import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {
    Button, Checkbox,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer, TableFooter,
    TableHead,
    TableRow, TextField
} from "@material-ui/core";
import {stat} from "fs";

interface DataEntity {
    u: number;
    f: number;
}

interface AppState {
    h: number,
    entities: Array<DataEntity>
}

function App() {

    let [state, setState] = useState<AppState>({
        h: 1,
        entities: [{u: 1, f: 1}]
    })

    function addRow() {
        state.entities.push({u: 1, f: 1})
        setState({h: state.h, entities: state.entities})
    }

    function updateH(value: number) {
        if (value === 0) {
            value = 1
        }
        setState({h: value, entities: state.entities})
    }

    function updateU(idx: number, value: number) {
        if (value === 0 || isNaN(value)) {
            alert("Вы ввели не правильное значенние")
            return
        }
        state.entities[idx].u = value
        setState({h: state.h, entities: state.entities})
    }

    function updateF(idx: number, value: number) {
        if (value === 0 || isNaN(value)) {
            alert("Вы ввели не правильное значенние")
            return
        }
        state.entities[idx].f = value
        setState({h: state.h, entities: state.entities})
    }

    return (
        <div>
            <Paper style={{margin: 16}} elevation={3}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell style={{fontWeight: "bold"}}>m (индекс)</TableCell>
                                <TableCell style={{fontWeight: "bold"}}>u (в часах)</TableCell>
                                <TableCell style={{fontWeight: "bold"}}>f/T (в часах)</TableCell>
                                <TableCell style={{fontWeight: "bold"}}>Константа?</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {state.entities.map((entity, idx) =>
                                <TableRow>
                                    <TableCell>{idx}</TableCell>
                                    <TableCell><TextField variant="outlined" size="small" defaultValue="1"
                                                          onChange={(event) => {
                                                              updateU(idx, parseInt(event.target.value))
                                                          }}/></TableCell>
                                    <TableCell><TextField variant="outlined" size="small" defaultValue="1"
                                                          onChange={(event) => {
                                                              updateF(idx, parseInt(event.target.value))
                                                          }}/></TableCell>
                                    <TableCell><Checkbox/></TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TableCell>
                                    <Button variant="contained" color={"primary"}
                                            onClick={() => addRow()}>Добавить</Button>
                                    <TextField style={{marginLeft: 16}} variant="outlined" label="h" size="small"
                                               defaultValue="1" onChange={(event) => {
                                        updateH(parseInt(event.target.value))
                                    }}/>
                                </TableCell>
                            </TableRow>
                        </TableFooter>
                    </Table>
                </TableContainer>
            </Paper>

            <Paper style={{margin: 16}} elevation={3}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell style={{fontWeight: "bold"}}>m</TableCell>
                                <TableCell style={{fontWeight: "bold"}}>P(преод)</TableCell>
                                <TableCell style={{fontWeight: "bold"}}>P(защ)</TableCell>
                                <TableCell style={{fontWeight: "bold"}}>P(конф)</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                (() => {
                                    let acc = 1

                                    return state.entities.map((entity, idx) => {
                                        let Pdef = (1 / state.h + 1 / entity.f) / (1 / state.h + 1 / entity.f + 1 / entity.u);
                                        acc = Pdef * acc
                                        return <TableRow>
                                            <TableCell>{idx}</TableCell>
                                            <TableCell>{1 - Pdef}</TableCell>
                                            <TableCell>{Pdef}</TableCell>
                                            <TableCell>{acc}</TableCell>
                                        </TableRow>
                                    })
                                })()
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </div>
    );
}

export default App;
