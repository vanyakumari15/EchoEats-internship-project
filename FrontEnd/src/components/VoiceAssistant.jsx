import React, { useState, useContext, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlobalStateContext } from '../context/GlobalStateContext';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { Mic, X, Loader, Volume2, Send, Bot, User, MessageSquare } from 'lucide-react';

const playAudioFromText = async (text) => {
  const encodedText = encodeURIComponent(text);
  const googleTTSUrl = `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=${encodedText}&tl=en/`;
  const audio = new Audio(googleTTSUrl);
  audio.crossOrigin = 'anonymous';
  return new Promise((resolve, reject) => {
    audio.onended = resolve;
    audio.onerror = reject;
    audio.play().catch(reject);
  });
};

const VoiceAssistant = () => {
  const navigate = useNavigate();
  const { Togg, setTogg, updateQuantity, logout, foodData } = useContext(GlobalStateContext);

  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [speechMethod, setSpeechMethod] = useState('native');
  const [hasGreeted, setHasGreeted] = useState(false);
  
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  
  const messagesEndRef = useRef(null);
  const { 
    transcript, 
    listening, 
    resetTranscript,
    browserSupportsSpeechRecognition 
  } = useSpeechRecognition();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, transcript]);

  useEffect(() => {
    if ('speechSynthesis' in window) {
      const voices = speechSynthesis.getVoices();
      setSpeechMethod(voices.length > 0 ? 'native' : 'google');
    } else {
      setSpeechMethod('google');
    }

    if (!hasGreeted && !Togg) {
      setTimeout(() => {
        const greeting = "Hello! I am Echo, your AI assistant. How can I help you today?";
        setMessages([{ role: 'assistant', text: greeting }]);
        setHasGreeted(true);
      }, 1000);
    }
  }, []);

  const speakResponse = useCallback(async (text) => {
    setIsSpeaking(true);
    try {
      if (speechMethod === 'native') {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.9;
        utterance.pitch = 1.0;
        utterance.volume = 1.0;
        utterance.lang = 'en-US';
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => {
          setIsSpeaking(false);
          setSpeechMethod('google');
          speakResponse(text);
        };
        window.speechSynthesis.speak(utterance);
      } else {
        await playAudioFromText(text).catch(console.error);
        setIsSpeaking(false);
      }
    } catch {
      setIsSpeaking(false);
    }
  }, [speechMethod]);

  const handleCommand = useCallback(async (commandData) => {
    switch (commandData.command) {
      case 'NAVIGATE':
        if (commandData.path) navigate(commandData.path);
        break;
      case 'ORDER':
        if (commandData.items?.length) {
          for (const item of commandData.items) {
            const foodItem = foodData.find(f =>
              f.name.toLowerCase().includes(item.name.toLowerCase())
            );
            if (foodItem) {
              await updateQuantity(foodItem._id, item.quantity);
            }
          }
        }
        break;
      case 'REMOVE':
        if (commandData.items?.length) {
          for (const item of commandData.items) {
            const foodItem = foodData.find(f =>
              f.name.toLowerCase().includes(item.name.toLowerCase())
            );
            if (foodItem) {
              await updateQuantity(foodItem._id, -item.quantity);
            }
          }
        }
        break;
      case 'LOGOUT':
        logout();
        break;
      default:
        break;
    }
  }, [navigate, foodData, updateQuantity, logout]);

  const processCommand = useCallback(async (text) => {
    if (!text.trim()) return;
    
    // Add user message to chat
    setMessages(prev => [...prev, { role: 'user', text }]);
    setIsProcessing(true);
    
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const res = await fetch(`${API_URL}/voice`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transcript: text })
      });
      
      const data = await res.json();
      
      if (data.aiResponse) {
        const { response } = data.aiResponse;
        
        // Add assistant message to chat
        setMessages(prev => [...prev, { role: 'assistant', text: response }]);
        speakResponse(response);
        await handleCommand(data.aiResponse);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Error processing command:', error);
      const errorMsg = "Sorry, I'm having trouble connecting to my brain right now.";
      setMessages(prev => [...prev, { role: 'assistant', text: errorMsg }]);
      speakResponse(errorMsg);
    } finally {
      setIsProcessing(false);
    }
  }, [handleCommand, speakResponse]);

  const handleSendText = (e) => {
    e.preventDefault();
    if (inputText.trim() && !isProcessing) {
      processCommand(inputText);
      setInputText('');
    }
  };

  useEffect(() => {
    if (!listening && transcript && isListening) {
      setIsListening(false);
      processCommand(transcript);
      resetTranscript();
    }
  }, [listening, transcript, isListening, processCommand, resetTranscript]);

  const toggleListening = () => {
    if (!browserSupportsSpeechRecognition) {
      const msg = "Your browser does not support voice recognition. Please use a modern browser like Chrome.";
      setMessages(prev => [...prev, { role: 'assistant', text: msg }]);
      return;
    }

    if (isListening) {
      SpeechRecognition.stopListening();
      setIsListening(false);
    } else {
      window.speechSynthesis?.cancel();
      setIsSpeaking(false);
      setIsListening(true);
      resetTranscript();
      // Added a small timeout to ensure reset finishes before starting
      setTimeout(() => {
        SpeechRecognition.startListening({ continuous: true, language: 'en-US' });
      }, 100);
    }
  };

  const openAssistant = () => setTogg(true);
  const closeAssistant = () => {
    window.speechSynthesis?.cancel();
    setTogg(false);
    setIsListening(false);
    SpeechRecognition.stopListening();
  };

  if (!Togg) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <button 
            onClick={openAssistant} 
            className="w-16 h-16 bg-gradient-to-r from-orange-500 to-rose-600 rounded-full flex items-center justify-center text-white shadow-2xl hover:shadow-rose-500/50 hover:scale-110 transition-all focus:outline-none group"
            title="Open AI Assistant"
        >
          <MessageSquare className="w-8 h-8 group-hover:animate-bounce" />
          {isSpeaking && <span className="absolute inset-0 rounded-full border-4 border-rose-400 animate-ping opacity-75"></span>}
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-96 max-h-[600px] h-[80vh] bg-white/90 backdrop-blur-2xl rounded-3xl shadow-2xl z-50 overflow-hidden border border-white/60 flex flex-col animate-in slide-in-from-bottom-10 fade-in duration-300">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-rose-600 p-4 text-white flex justify-between items-center shadow-md z-10">
        <div className="flex items-center">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mr-3 backdrop-blur-md">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg leading-tight">Echo AI</h3>
              <p className="text-xs text-rose-100 flex items-center">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-1 animate-pulse"></span> Online
              </p>
            </div>
        </div>
        <button onClick={closeAssistant} className="text-white/80 hover:text-white hover:bg-white/20 p-2 rounded-full transition-colors">
            <X className="w-5 h-5" />
        </button>
      </div>

      {/* Chat History */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-stone-50/50 scroll-smooth">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${msg.role === 'user' ? 'bg-stone-200 ml-2' : 'bg-rose-100 mr-2'}`}>
                {msg.role === 'user' ? <User className="w-4 h-4 text-stone-600" /> : <Bot className="w-4 h-4 text-rose-600" />}
              </div>
              <div className={`p-3 rounded-2xl text-sm shadow-sm ${
                msg.role === 'user' 
                  ? 'bg-rose-600 text-white rounded-tr-none' 
                  : 'bg-white text-stone-800 border border-stone-100 rounded-tl-none'
              }`}>
                {msg.text}
              </div>
            </div>
          </div>
        ))}
        
        {/* Live Transcript Preview */}
        {transcript && isListening && (
          <div className="flex justify-end">
            <div className="flex max-w-[80%] flex-row-reverse">
              <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-stone-200 ml-2">
                <User className="w-4 h-4 text-stone-600" />
              </div>
              <div className="p-3 rounded-2xl text-sm shadow-sm bg-stone-100 text-stone-600 rounded-tr-none border border-stone-200 italic">
                {transcript}
                <span className="ml-1 inline-block w-1 h-4 bg-rose-500 animate-pulse align-middle"></span>
              </div>
            </div>
          </div>
        )}

        {isProcessing && (
          <div className="flex justify-start">
            <div className="flex max-w-[80%] flex-row">
              <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-rose-100 mr-2">
                <Bot className="w-4 h-4 text-rose-600" />
              </div>
              <div className="p-3 rounded-2xl bg-white border border-stone-100 rounded-tl-none flex items-center space-x-1 shadow-sm">
                <div className="w-2 h-2 bg-rose-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-rose-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-rose-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-stone-100">
        
        {/* Voice Visualizer */}
        {isListening && (
          <div className="flex justify-center items-center h-8 mb-4 space-x-1">
            {[...Array(6)].map((_, i) => (
              <div 
                key={i} 
                className="w-1.5 bg-rose-500 rounded-full animate-pulse" 
                style={{ 
                  height: `${Math.random() * 20 + 10}px`,
                  animationDuration: `${Math.random() * 0.5 + 0.5}s` 
                }}
              ></div>
            ))}
            <span className="text-xs text-rose-500 font-bold ml-2">Listening...</span>
          </div>
        )}

        <form onSubmit={handleSendText} className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleListening}
            className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-all ${
              isListening 
                ? 'bg-rose-100 text-rose-600 shadow-inner' 
                : 'bg-stone-100 text-stone-600 hover:bg-rose-50 hover:text-rose-600'
            }`}
          >
            <Mic className={`w-6 h-6 ${isListening ? 'animate-pulse' : ''}`} />
          </button>
          
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type your message..."
            disabled={isProcessing || isListening}
            className="flex-1 bg-stone-50 border border-stone-200 rounded-full px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-rose-500 transition-all disabled:opacity-50"
          />
          
          <button
            type="submit"
            disabled={!inputText.trim() || isProcessing}
            className="flex-shrink-0 w-12 h-12 rounded-full bg-orange-500 text-white flex items-center justify-center disabled:opacity-50 disabled:bg-stone-300 hover:bg-orange-600 transition-all shadow-md active:scale-95"
          >
            <Send className="w-5 h-5 ml-1" />
          </button>
        </form>
      </div>

    </div>
  );
};

export default VoiceAssistant;
