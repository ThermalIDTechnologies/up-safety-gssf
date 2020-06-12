import { Link, navigate } from "gatsby"
import PropTypes from "prop-types"
import React, { useContext } from "react"
import { FirebaseContext } from "./Firebase"
import styled from "styled-components"

const LogoutLink = styled.span`
  color: white;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`

const LoginLink = styled(Link)`
  color: white;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`

const Divider = styled.span`
  margin: 0 0.5rem;
  padding-right: 1px;
  background: #ddd;
`

const Header = ({ siteTitle }) => {
  const { firebase, user } = useContext(FirebaseContext)
  console.log(firebase, user)

  const handleLogout = () => {
    firebase.logout().then(() => navigate("/login"))
  }

  return (
    <header
      style={{
        background: `rebeccapurple`,
        marginBottom: `1.45rem`,
      }}
    >
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `1.45rem 1.0875rem`,
          display: `flex`,
          alignItems: `center`,
        }}
      >
        <h1 style={{ margin: 0, flexGrow: 1 }}>
          <Link
            to="/"
            style={{
              color: `white`,
              textDecoration: `none`,
            }}
          >
            {siteTitle}
          </Link>
        </h1>
        <div>
          {!!user && !!user.email ? (
            <div
              style={{
                color: `white`,
                display: `flex`,
                flexDirection: `column`,
                textAlign: `right`,
              }}
            >
              Hello, {user.username || user.email}
              <LogoutLink onClick={handleLogout}>Logout</LogoutLink>
            </div>
          ) : (
            <div>
              <LoginLink to="/login">Login</LoginLink>
              <Divider />
              <LoginLink to="/signup">Signup</LoginLink>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
