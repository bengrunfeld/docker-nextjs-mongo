import styled from "styled-components";

export const PageLayout = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Title = styled.h1`
  font-family: galada, verdana;
  font-size: 4.6rem;
  letter-spacing: 0.15rem;
  color: ${({ theme }) => theme.colors.darkBlue};
`;

export const Message = styled.p`
  font-family: verdana;
  font-size: 1.8rem;
  color: ${({ theme }) => theme.colors.black};
  padding: 2rem;
  border: 0.3rem solid
    ${({ theme, type }) => {
      if (type === "loading") return theme.colors.darkGreen;

      if (type === "error") return theme.colors.darkRed;
    }};
  background: ${({ theme, type }) => {
    if (type === "loading") return theme.colors.lightGreen;

    if (type === "error") return theme.colors.lightRed;
  }};
  border-radius: 0.5rem;
`;
