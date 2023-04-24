import React, { Component} from 'react';
import './Searchbar.css';
import { ImSearch } from 'react-icons/im';
import PropTypes from 'prop-types';

class Searchbar extends Component {
    state = {inputData: '',};


onChangeInput = e => { 
    this.setState({ inputData: e.currenrTarget.value.toLowerCase() });
};

handleSubmit = e => { 
    e.preventDefault();
    this.props.onSubmit({ inputData: '' });
};

render() { 
    const { inputData } = this.state.inputData;

    return (
        <header className="Searchbar">
            <form className="SearchForm" onSubmit={this.handleSubmit}>
                <button type="submit" className="SearchForm-button">
                    <ImSearch size={25} />
                </button>

                <input
                    className="SearchForm-input"
                    name="inputData"
                    value={inputData}
                    onChange={this.onChangeInput}
                    type="text"
                    autocomplete="off"
                    autofocus
                    placeholder="Search images and photos"
                />
            </form>
        </header>
    );
}
}

export default Searchbar;

Searchbar.propType = {
    onSubmit: PropTypes.func.isRequired,
};

