import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SendIcon } from '../../../svg';
import Attachments from './attachments';
import Input from './input';
import { sendMessage } from '../../../reducers/features/chatSlice';
import { DotLoader } from 'react-spinners';
import EmojiPickerWrap from './emojiPickerWrap';

export default function ChatActions() {
  const dispatch = useDispatch();

  const { activeConversation, status } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.user);

  const [message, setMessage] = useState('');

  const values = {
    message,
    converId: activeConversation._id,
    files: [],
    loginToken: user.loginToken,
  };
  const sendMessageHandler = async (eve) => {
    eve.preventDefault();
    await dispatch(sendMessage(values));
    setMessage('');
  };

  return (
    <form
      onSubmit={(eve) => sendMessageHandler(eve)}
      className="dark:bg-dark_bg_2 h-[60px] w-full flex items-center absolute bottom-0 py-2 px-4 select-none"
    >
      <div className="w-full flex items-center gap-x-2">
        <ul className="flex gap-x-2">
          <EmojiPickerWrap />
          <Attachments />
        </ul>
        <Input message={message} setMessage={setMessage} />
        <button type="submit" className="btn">
          {status === 'loading' ? (
            <DotLoader color="#e9edef" size={25} speedMultiplier={3} />
          ) : (
            <SendIcon className="dark:fill-dark_svg_1" />
          )}
        </button>
      </div>
    </form>
  );
}