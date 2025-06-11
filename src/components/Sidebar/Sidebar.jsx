import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled, { css, ThemeProvider } from "styled-components";
import logo from "../../assets/logo.png";
import PropTypes from "prop-types";
import { themes } from "./theme";

const routes = [
  { title: "Home", icon: "fas-solid fa-house", path: "/" },
  { title: "Sales", icon: "chart-line", path: "/sales" },
  { title: "Costs", icon: "chart-column", path: "/costs" },
  { title: "Payments", icon: "wallet", path: "/payments" },
  { title: "Finances", icon: "chart-pie", path: "/finances" },
  { title: "Messages", icon: "envelope", path: "/messages" },
];

const bottomRoutes = [
  { title: "Settings", icon: "sliders", path: "/settings" },
  { title: "Support", icon: "phone-volume", path: "/support" },
];

const MainContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 20px 20px 20px 20px;
  height: 100vh;
  max-width: ${({ $isOpened }) => ($isOpened ? "200px" : "70px")};
  background-color: ${({ theme }) => theme.sidebar.default};

  color: ${({ theme }) => theme.text.default};
  transition: max-width 0.6s ease-in-out;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  margin-block-end: 20px;
  width: 100%;
`;

const Logo = styled.img`
  width: 30px;
`;

const LogoText = styled.span`
  color: ${({ theme }) => theme.text.logo};
  font-weight: bold;
  font-size: 20px;
  margin-inline-start: 10px;
  transition: opacity 0.2s ease-in-out;
  transition-delay: ${({ $isOpened }) => ($isOpened ? "0.6s" : "0s")};
  opacity: ${({ $isOpened }) => ($isOpened ? "1" : "0")};
`;

const ToggleSidebar = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  right: ${({ $isOpened }) => ($isOpened ? "-35px" : "-60px")};
  width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor: pointer;

  background-color: ${({ theme, $isOpened }) =>
    $isOpened ? theme.button.active : theme.button.default};
  transition: transform 0.6s ease-in-out, right 0.6s ease-in-out;
  ${({ $isOpened }) =>
    $isOpened &&
    css`
      transform: rotateZ(-180deg);
    `}
`;

const NavContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  & :hover {
    background-color: ${({ theme }) => theme.sidebar.hover};
    color: ${({ theme }) => theme.text.hover};
  }
  & :active {
    background-color: ${({ theme }) => theme.sidebar.active};
    color: ${({ theme }) => theme.text.active};
  }
`;

const NavItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  padding: 6px;
  border-radius: 5px;
  position: relative;
`;

const NavText = styled.span`
  transition: opacity 0.2s ease-in-out;
  transition-delay: ${({ $isOpened }) => ($isOpened ? "0.6s" : "0s")};
  opacity: ${({ $isOpened }) => ($isOpened ? "1" : "0")};
`;

const Sidebar = (props) => {
  const { color } = props;

  const [isOpened, setIsOpened] = useState(false);

  const toggleSidebar = () => {
    setIsOpened((v) => !v);
  };

  const currentTheme = themes[color];

  return (
    <ThemeProvider theme={currentTheme}>
      <MainContainer $isOpened={isOpened}>
        <LogoContainer>
          <Logo src={logo} alt="TensorFlow logo" />
          <LogoText $isOpened={isOpened}>TensorFlow</LogoText>
          <ToggleSidebar $isOpened={isOpened} onClick={toggleSidebar}>
            <FontAwesomeIcon icon="angle-right" />
          </ToggleSidebar>
        </LogoContainer>
        <NavContainer>
          {routes.map((route) => (
            <NavItem key={route.title}>
              <FontAwesomeIcon icon={route.icon} />
              <NavText $isOpened={isOpened}>{route.title}</NavText>
            </NavItem>
          ))}
        </NavContainer>
        <NavContainer style={{ marginTop: "auto" }}>
          {bottomRoutes.map((route) => (
            <NavItem key={route.title}>
              <FontAwesomeIcon icon={route.icon} />
              <NavText $isOpened={isOpened}>{route.title}</NavText>
            </NavItem>
          ))}
        </NavContainer>
      </MainContainer>
    </ThemeProvider>
  );
};

Sidebar.propTypes = {
  color: PropTypes.string,
};

export default Sidebar;
