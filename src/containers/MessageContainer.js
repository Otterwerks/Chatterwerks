import { connect } from 'react-redux'
import Message from '../components/Message'

const mapStateToProps = state => ({
    userName: state.user.userName,
})

export default connect(
    mapStateToProps,
)(Message)