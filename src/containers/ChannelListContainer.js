import { connect } from 'react-redux'
import ChannelList from '../components/ChannelList'

const mapStateToProps = state => ({
    users: state.message.subscribedUsers,
})

export default connect(
    mapStateToProps,
)(ChannelList)