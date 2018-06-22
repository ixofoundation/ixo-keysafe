import React from 'react';
import styled from 'styled-components';

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

class KeyValueItem extends React.Component {

    render () {
        return (
            <Item>
                <Key>{this.props.displayKey}</Key>
                <Value>{this.props.displayValue}</Value>
            </Item>
        )
    }    
}

export default KeyValueItem
