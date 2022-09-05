import styled from 'styled-components';

//Code is from https://css-tricks.com/hamburger-menu-with-a-side-of-react-hooks-and-styled-components/

export const StyledMenu = styled.nav`
  display: flex;
  flex-direction: column;
  background: #2a77db;
  transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(-100%)'};
  height: 100vh;
  text-align: left;
  padding: 2rem;
  position: absolute;
  top: 0;
  left: 0;
  transition: transform 0.3s ease-in-out;
  z-index: 5;
  
  @media (max-width: 576px) {
    width: 90%;
  }

  a {
    font-size: 2rem;
    padding: 2rem 0;
    font-weight: bold;
    color: #0D0C1D;
    text-decoration: none;
    transition: color 0.3s linear;
  }
  
  .menu_logout {
    font-size: 2rem;
    padding: 2rem 0;
    font-weight: bold;
    color: #0D0C1D;
    text-decoration: none;
    transition: color 0.3s linear;
    cursor: pointer;
  }
  `