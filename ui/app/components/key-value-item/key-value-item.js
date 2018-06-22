import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: row;
`

const Item = styled.div`
    font-weight: 300;
    font-size: 13px;
    line-height: 21px;
    letter-spacing: 0.09px;
`

const Key = styled.div`
    color: #6AA0BF;
`

const Value = styled.div`
    color: #FFFFFF;    
    padding-bottom: 3px;
`

const Indentation = styled.div`
    width: 20px;
    height: 10px;
    border: 1px solid yellow;
    margin: 2.5px;
`

class KeyValueItem extends React.Component {

    renderIndentations (level) {

        var indentations = []
        for(var i=0; i<level; i++) {
            indentations.push(<Indentation/>)
        }
        return indentations
    }

    render () {
        const indentations = this.props.indentLevel 

        return (
            <Container>
                {this.renderIndentations(indentations)}
                <Item>
                    <Key>{this.props.displayKey}</Key>
                    <Value>{this.props.displayValue}</Value>
                </Item>
            </Container>
        )
    }    
}

export default KeyValueItem
