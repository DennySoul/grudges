import React, { Component } from 'react';
import NewGrudge from './NewGrudge';
import Grudges from './Grudges';
import './Application.css';

import { withAuthenticator } from 'aws-amplify-react';
import { API } from 'aws-amplify';

class Application extends Component {
    state = {
        grudges: [],
    };

    componentDidMount() {
        API.get('aws-workshopCRUD', '/aws-workshop')
            .then(res => {
                this.setState((prevState, state) => ({ ...prevState, grudges: res }));
            })
    }

    addGrudge = grudge => {
        API.post('aws-workshopCRUD', '/aws-workshop', { body: grudge })
            .then(() => this.setState({ grudges: [grudge, ...this.state.grudges] }));
    };

    removeGrudge = ({ id }) => {
        API.get('aws-workshopCRUD', `/aws-workshop/object/${id}`)
            .then(() =>
                this.setState({
                    grudges: this.state.grudges.filter(other => other.id !== id),
                }
            ));
    };

    toggle = grudge => {
        const updatedGrudge = {
            ...grudge,
            avenged: !grudge.avenged
        };

        API.put('aws-workshopCRUD', '/aws-workshop', { body: updatedGrudge })
            .then(() => {
                const othergrudges = this.state.grudges.filter(
                    other => other.id !== grudge.id,
                );

                this.setState({ grudges: [updatedGrudge, ...othergrudges] });
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

export default withAuthenticator(Application);
