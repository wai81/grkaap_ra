import React from "react";
import styled from "styled-components";
const DivWrapper = styled('div')`
  background-color: #2d1630;
  height: 40px;
  color: white;
  padding: 10px ;
  font-size: 18px;
`;


const Header = () => {
    return(
        <DivWrapper>
               Календарь
        </DivWrapper>
    )
}
export default Header