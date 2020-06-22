import React from 'react';
import {SquareCotainer} from './styles'

const Square = ({color}) => {
    return(
        <>
            <SquareCotainer color={color}>
                <div className="left top" />
                <div className="right top" />
                <div className="right btm" />
                <div className="left btm" />
            </SquareCotainer>
        </>
    )
}


export default Square;