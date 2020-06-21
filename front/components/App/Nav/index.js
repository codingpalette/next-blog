import React from 'react';
import Link from 'next/link';
import { NavContainer, Content } from './styles';
import Square from "../../Square";

const Nav = () => {
    return(
        <>
            <NavContainer>
                <Square />
                <Content>
                    <div className="top">
                        <button>Back</button>
                        <h1>CodingPalette</h1>
                    </div>
                    <div className="btm">
                        <button className="menu_btn">Menu items</button>
                    </div>
                </Content>
            </NavContainer>
        </>
    )
};

export default Nav