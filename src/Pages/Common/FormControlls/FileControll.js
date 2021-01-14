import React, { Component } from 'react';

export default class FileControll extends Component {
    constructor(props) {
        super(props)
        this.onChange = this.onChange.bind(this)
    }

    onChange(e) {
        const { input: { onChange } } = this.props
        onChange(e.target.files[0])
    }

    render() {
        return (

            <input hidden
                type='file'
                accept='.jpg, .png, .jpeg'
                onChange={this.onChange}
            />
        )
    }
}
