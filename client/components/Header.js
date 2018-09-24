import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import CardContent from '@material-ui/core/CardContent'
import Card from '@material-ui/core/Card'

class Header extends React.Component {
  setHeader(pathName) {
    if (pathName) {
      const initialCap = name[0].toUpperCase()
      return `${initialCap}${name.slice(1)}`
    }
  }
  render() {
    return (
      <div className="header">
        <Card>
          <CardContent>{this.setHeader(this.props.header)}</CardContent>
        </Card>
      </div>
    )
  }
}

const mapStateToProps = state => ({header: state.header})

export default withRouter(connect(mapStateToProps)(Header))
