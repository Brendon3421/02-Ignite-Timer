import { HeaderContainer } from "./styles";
import { Timer, Scroll } from "phosphor-react";
import logoIgnite from '../../assets/logo-ignite.svg'
import { NavLink } from "react-router-dom";

export function Header() {
    return (

        <HeaderContainer>
            <img src={logoIgnite} />
            <nav>
                <NavLink to="02-Ignite-Timer/" title="Timer"> <Timer size={24} /></NavLink>
                <NavLink to="02-Ignite-Timer/history" title="Historico"> <Scroll size={24} /></NavLink>
            </nav>
        </HeaderContainer>
    )
}