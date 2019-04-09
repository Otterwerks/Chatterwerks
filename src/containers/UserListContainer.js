import { connect } from 'react-redux'
import UserList from '../components/UserList'

const mapStateToProps = state => ({
    users: state.message.subscribedUsers,
    user: state.user
})

export default connect(
    mapStateToProps,
)(UserList)