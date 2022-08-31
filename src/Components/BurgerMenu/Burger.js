import React from 'react';
import { StyledBurger } from './Burger.styled';

//Code is from https://css-tricks.com/hamburger-menu-with-a-side-of-react-hooks-and-styled-components/

const Burger = ({ open, setOpen }) => {
    return (
        <StyledBurger open={open} onClick={() => setOpen(!open)}>
            <div />
            <div />
            <div />
        </StyledBurger>
    )
}

export default Burger;