import styled from "styled-components";

export const Point = styled.div`
  display: flex;
  font-family: verdana;
  font-size: 1.6rem;
  padding: 1rem;
  margin: 2rem 0;
  border: 0.1rem solid ${({ theme }) => theme.colors.darkGray};
  background: ${({ theme }) => theme.colors.lightGray};
  border-radius: 0.5rem;

  > * {
    padding: 0.5rem;
  }
`;

export const Editable = styled.input`
  margin: 1rem;
  text-align: center;
`;

export const Text = styled.p``;
