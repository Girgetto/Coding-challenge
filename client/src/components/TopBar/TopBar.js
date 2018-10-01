import React from 'react';
import logo from '../../assets/img/descarga.png'
import './styles.css'

export default class TopBar extends React.Component {
    state = {
        value: '',
    }

    handleChange = ({ target }) => {
        this.setState({ value: target.value })
    }

    handleSubmit = event => {
        this.props.handleSubmit(this.state.value);
        this.setState({ value : ''});
        event.preventDefault();
    }

    render() {
        return (
            <div className="flex">
                <form onSubmit={this.handleSubmit}>
                    <label>
                        ADD CARD
                    </label>
                    <input
                        type="text"
                        value={this.state.value}
                        onChange={this.handleChange}
                    />
                </form>
                <div className="flex">
                    <img src={logo} className="logo"></img>
                    <h1>Iron Notes</h1>
                </div>
            </div>
        );
    }
}