import React from "react";
import styled from "styled-components";
const DivWrapper = styled('div')`
  background-color: #2A2B2D;
  height: 40px;
  color: white;
`;


const Header = () => {
    return(
        <DivWrapper>
                Бронь транспорта
        </DivWrapper>
    )
}
export default Header