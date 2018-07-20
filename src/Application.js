import React, { Component } from 'react';
import NewGrudge from './NewGrudge';
import Grudges from './Grudges';
import './Application.css';

import { API, graphqlOperation } from 'aws-amplify';
import {
    CreateGrudge, DeleteGrudge, ListGrudges, SubscribeToNewGrudge, UpdateGrudge
} from './graphql';

class Application extends Component {
    state = {
        grudges: [],
    };

    componentDidMount() {
        API.graphql(graphqlOperation(SubscribeToNewGrudge))
            .subscribe({
                next: response => {
                    const grudge = response.value.data.onCreateGrudge;

                    this.setState((state, props) => ({ ...state, grudges: [...state.grudges, grudge] }));
                }
            });

        API.graphql(graphqlOperation(ListGrudges))
            .then(({ data: { listGrudges: { items: grudges }}}) => {
                this.setState((state, props) => ({ ...state, grudges }));
            })
            .catch(e => console.log(e));
    }

    addGrudge = grudge => {
        API.graphql(graphqlOperation(CreateGrudge, grudge));
    };

    removeGrudge = ({ id }) => {
        console.log(id)
        API.graphql(graphqlOperation(DeleteGrudge, { id }))
            .then((res) => {
                console.log(res);
                this.setState({
                    grudges: this.state.grudges.filter(other => other.id !== id),
                });
            })
            .catch(e => console.log(e));
    };

    toggle = grudge => {
        const updatedGrudge = {
            ...grudge,
            avenged: !grudge.avenged
        };

        API.graphql(graphqlOperation(UpdateGrudge, updatedGrudge))
            .then(({ data }) => {
                console.log(data);
                const otherGrudges = this.state.grudges.filter(
                    other => other.id !== grudge.id,
                );

                console.log({ grudges: [...otherGrudges, updatedGrudge] });

                this.setState((state, props) => ({ grudges: [...otherGrudges, updatedGrudge] }));
            });
    };

    render() {
        const { grudges } = this.state;
        const unavengedgrudges = grudges.filter(grudge => !grudge.avenged);
        const avengedgrudges = grudges.filter(grudge => grudge.avenged);

        return (
            <div className="Application">
                <NewGrudge onSubmit={this.addGrudge}/>
                <Grudges
                    title="Unavenged Grudges"
                    grudges={unavengedgrudges}
                    onCheckOff={this.toggle}
                    onRemove={this.removeGrudge}
                />
                <Grudges
                    title="Avenged Grudges"
                    grudges={avengedgrudges}
                    onCheckOff={this.toggle}
                    onRemove={this.removeGrudge}
                />
            </div>
        );
    }
}

export default Application;
