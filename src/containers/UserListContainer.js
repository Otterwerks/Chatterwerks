import { connect } from 'react-redux'
import UserList from '../components/UserList'

const mapStateToProps = state => ({
    users: state.message.subscribedUsers,
})

export default connect(
    mapStateToProps,
)(UserList)