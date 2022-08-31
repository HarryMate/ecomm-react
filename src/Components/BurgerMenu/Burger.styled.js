import styled from 'styled-components';

//Code is from https://css-tricks.com/hamburger-menu-with-a-side-of-react-hooks-and-styled-components/

export const StyledBurger = styled.button`
  position: sticky;
  top: 5px;
  left: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 2rem;
  height: 2rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 10;
  
  &:focus {
    outline: none;
  }
  
  div {
    width: 2rem;
    height: 0.25rem;
    background: #0D0C1D;
    border-radius: 10px;
    transition: all 0.3s linear;
    position: relative;
    transform-origin: 1px;
  }`