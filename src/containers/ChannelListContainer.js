import { connect } from 'react-redux'
import ChannelList from '../components/ChannelList'

const mapStateToProps = state => ({
    threads: state.user.availableThreads,
})

export default connect(
    mapStateToProps,
)(ChannelList)