import React, { Component } from 'react'
import { connect } from 'react-redux'
import ChatHeader from 'components/ChatHeader'
import ChatControl from 'components/ChatControl'
import MessageItem from 'components/MessageItem'

class MessagesList extends Component {
	constructor() {
		super()

		this.ul = null
		this.chatWrap = null
	}

	componentDidUpdate() {		
		this.chatWrap.scrollTop = this.ul.scrollHeight
	}

	render() {
		return (
			<div class="chat" ref={chatWrap => this.chatWrap = chatWrap}>
				<ChatHeader/>
				<div class="chat-history" > 
					<ul ref={ul => this.ul = ul}>
						{this.props.messages.map(m => {
							return (
								<MessageItem key={m.time} {...m} />
							)
						})}
					</ul>

				</div>
				<ChatControl/>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		messages: state.messagesReducer
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		dispatch
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MessagesList)
