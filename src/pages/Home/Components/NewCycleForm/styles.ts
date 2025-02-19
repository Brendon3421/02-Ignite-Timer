import styled from "styled-components";

const BaseInput = styled.input`
background: transparent;
height: 2.5rem;
border: 0;
border-bottom: 3px solid ${(props) => props.theme['gray-500']};
font-size: 1.125rem;
font-weight: bold;
flex-wrap: wrap;
padding: 0 0.5rem;
color: ${(props) => props.theme['gray-100']};

&:focus{
    box-shadow: none;
    border-color: ${props => props.theme['green-500']};

}
&::placeholder{
    color: ${props => props.theme['gray-500']};

}
`;

export const TaskInput = styled(BaseInput)`
flex:1;

&::-webkit-calendar-pickel-indicator{
    display: none !important
}

`;

export const MinutesAmountInput = styled(BaseInput)`
width: 4rem;
`;


export const FormContainer = styled.div`

width: 100%;
display: flex;
align-items: center;
justify-content: center;
gap: 0.5rem;
color: ${props => props.theme['gray-100']};
font-size: 1.125rem;
font-weight: bold;
flex-wrap: wrap;

`;