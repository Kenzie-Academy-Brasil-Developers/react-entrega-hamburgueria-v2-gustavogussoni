import styled from "styled-components";

export const DivReg = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;
  gap: 14px;
  padding: 30px 13px;

  @media (min-width: 800px) {
    flex-direction: row;
    gap: 50px;
    height: 100vh;
  }
`;
