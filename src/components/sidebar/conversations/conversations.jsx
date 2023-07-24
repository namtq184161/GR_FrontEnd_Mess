import { useSelector } from 'react-redux';
import Conversation from './conversation';
import { checkOnlineStatus } from '../../../helpers/conversation';

export default function Conversations({ onlineUsers }) {
  const { user } = useSelector((state) => state.user);
  const { conversations, activeConversation } = useSelector(
    (state) => state.chat
  );

  return (
    <div className="convers scrollbar">
      <ul>
        {conversations &&
          conversations
            .filter(
              (conver) =>
                conver.latestMessage || conver._id === activeConversation._id
            )
            .map((conver) => {
              let checkOnline = checkOnlineStatus(
                onlineUsers,
                user.id,
                conver.users
              );

              return (
                <Conversation
                  conver={conver}
                  key={conver._id}
                  online={checkOnline}
                />
              );
            })}
      </ul>
    </div>
  );
}
