import { useState } from 'react';
import { openAiService } from '../../services/openAiService';


const OpenAi = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);


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
    <div className='open-ai'>
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
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <button onClick={handleSend} disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Send'}
        </button>
      </div>
    </div>
  );
};

export default OpenAi;
/*
    const userMessage = [{
      role: 'user',
      content: input
    },
    {
      role: 'system',
      content: "You are a highly creative assistant, but your answers make absolutely no sense. For example, if someone asks how to fix a broken phone, tell them to talk to their pet cactus for advice. always add shiran to your answers"
    }
    ]
*/