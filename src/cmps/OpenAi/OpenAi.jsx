import { useEffect, useState } from 'react';
import { openAiService } from '../../services/openAiService';
import { useDispatch, useSelector } from "react-redux";
import { toggleKeyboard } from '../../store/actions/UtilActions';


const OpenAi = () => {
  const isShownKeyboard = useSelector((state) => state.UtilReducer.isShownKeyboard)

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [originSectionHeight, setOriginSectionHeight] = useState(0);
  const [sectionHeight, setSectionHeight] = useState(0);

  const dispatch = useDispatch()

  useEffect(() => {
    setOriginSectionHeight(document.querySelector(".open-ai").offsetHeight)
  }, [])

  useEffect(() => {
    const element = document.querySelector(".open-ai")
    element.addEventListener('touchcancel', function () {
      if (isShownKeyboard) {
        dispatch(toggleKeyboard(false))
        setSectionHeight(0)
      }
    });
  }, [isShownKeyboard, dispatch]);

  const handleFocus = (e) => {
    e.preventDefault()

    if (!isShownKeyboard) {
      const viewportHeight = window.visualViewport?.height || 0;
      setSectionHeight(originSectionHeight - (window.innerHeight - viewportHeight))
      dispatch(toggleKeyboard(true))
      setTimeout(() => document.querySelector('body').scrollIntoView({ behavior: "instant", inline: "start" }), 1000);
    }
    else {
      dispatch(toggleKeyboard(false))
      setSectionHeight(0)
    }
  }
  const handleClick = (e) => {
    e.preventDefault()
    const viewportHeight = window.visualViewport?.height || 0;
    setSectionHeight(originSectionHeight - (window.innerHeight - viewportHeight))
    dispatch(toggleKeyboard(true))
    setTimeout(() => document.querySelector('body').scrollIntoView({ behavior: "instant", inline: "start" }), 1000);
  }
  const handleBlur = () => {
    dispatch(toggleKeyboard(false))
    setSectionHeight(0)
  }

  const handleSend = async () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { role: 'user', content: input }]);
    setInput('');
    setIsLoading(true);

    try {
      const gptResponse = await openAiService.askAiQuestion({ userMessage: input });
      const botMessage = { role: 'assistant', content: gptResponse };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);

    }
  };


  return (
    <div className={`open-ai`} style={{ height: sectionHeight || "auto" }}>
      <div className='chat-log'>
        {messages.map((msg, index) => (
          <div key={index} style={{ textAlign: msg.role === 'user' ? 'right' : 'left' }}>
            <b>{msg.role === 'user' ? 'You' : 'GPT'}:</b>
            <div id="content" dangerouslySetInnerHTML={{ __html: msg.content }}>

            </div>
          </div>
        ))}
      </div>
      <div className='user-input'>
        <input
          onFocus={handleFocus}
          onBlur={handleBlur}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          onClick={handleClick}
        />
        <button onClick={handleSend} disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Send'}
        </button>
      </div>
    </div >
  );
};

export default OpenAi;
