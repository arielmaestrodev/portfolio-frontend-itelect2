"use client"

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, User, Bot, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { aiService, ChatMessage } from "@/services/ai.service";
import { Typewriter } from "@/components/common/Typewriter";

const CHAT_STORAGE_KEY = "portfolio_chat_history";

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Load history from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(CHAT_STORAGE_KEY);
    if (saved) {
      try {
        setMessages(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse chat history", e);
      }
    } else {
      // Default welcome message
      setMessages([
        { role: "bot", content: "Hello! I'm Ariel Batoon. Learn more about my experience, technical skills, and past projects. How can I assist you today?" },
      ]);
    }
  }, []);

  // Save history to localStorage whenever it changes
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(messages));
    }
  }, [messages]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userQuestion = input.trim();
    const userMessage: ChatMessage = { role: "user", content: userQuestion };
    
    // Add user message to UI
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setIsTyping(true);

    try {
      const response = await aiService.ask(userQuestion, messages);
      
      // Backend returns { code: 200, data: { answer: "...", sources: [...] } }
      const botText = response.data?.answer || response.data || "I'm sorry, I couldn't process that request.";
      
      const botMessage: ChatMessage = {
        role: "bot",
        content: botText,
      };
      
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("AI Chat Error:", error);
      setMessages((prev) => [...prev, { 
        role: "bot", 
        content: "Oops! I encountered an error connecting to my database. Please try again in a moment." 
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const clearChat = () => {
    localStorage.removeItem(CHAT_STORAGE_KEY);
    setMessages([
      { role: "bot", content: "Hello! I'm Ariel Batoon. Chat history has been cleared. How can I assist you now?" },
    ]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60] flex flex-col items-end">
      {isOpen && (
        <Card className="!pt-0 mb-4 w-[350px] sm:w-[400px] h-[550px] flex flex-col shadow-2xl border-primary/20 animate-in slide-in-from-bottom-5 duration-300 overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4 bg-primary text-primary-foreground rounded-t-lg">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="size-10 rounded-full border-2 border-primary-foreground/20 overflow-hidden bg-background/10">
                  <img 
                    src="/ariel-business-suit-night.png" 
                    alt="Ariel Batoon" 
                    className="size-full object-cover"
                  />
                </div>
                <span className="absolute bottom-0 right-0 size-3 bg-green-500 border-2 border-primary rounded-full" />
              </div>
              <div className="flex flex-col">
                <CardTitle className="text-base font-bold leading-tight">
                  Ariel Batoon
                </CardTitle>
                <span className="text-[10px] text-primary-foreground/70 flex items-center gap-1">
                  Online
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="size-8 text-primary-foreground hover:bg-primary-foreground/10"
                onClick={clearChat}
                title="Clear Chat"
              >
                <Trash2 className="size-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="size-8 text-primary-foreground hover:bg-primary-foreground/10"
                onClick={() => setIsOpen(false)}
              >
                <X className="size-5" />
              </Button>
            </div>
          </CardHeader>
          <CardContent 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth bg-background"
          >
            {messages.map((message, index) => {
              const isLastMessage = index === messages.length - 1;
              const isBot = message.role === "bot";
              
              return (
                <div
                  key={index}
                  className={cn(
                    "flex items-start gap-3",
                    message.role === "user" ? "flex-row-reverse" : "flex-row"
                  )}
                >
                  <div className={cn(
                    "size-8 rounded-full flex items-center justify-center shrink-0 shadow-sm overflow-hidden",
                    message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted border"
                  )}>
                    {message.role === "user" ? (
                      <User className="size-4" />
                    ) : (
                      <img 
                        src="/ariel-business-suit-night.png" 
                        alt="Ariel" 
                        className="size-full object-cover"
                      />
                    )}
                  </div>
                  <div className={cn(
                    "rounded-2xl px-4 py-2.5 max-w-[85%] text-sm leading-relaxed shadow-sm",
                    message.role === "user" 
                      ? "bg-primary text-primary-foreground rounded-tr-none" 
                      : "bg-muted text-foreground rounded-tl-none border"
                  )}>
                    {isBot && isLastMessage && !isTyping ? (
                      <Typewriter text={message.content} speed={15} />
                    ) : (
                      message.content
                    )}
                  </div>
                </div>
              );
            })}
            {isTyping && (
              <div className="flex items-start gap-3 animate-in fade-in duration-300">
                <div className="size-8 rounded-full bg-muted border shadow-sm overflow-hidden flex items-center justify-center">
                  <img 
                    src="/ariel-business-suit-night.png" 
                    alt="Ariel" 
                    className="size-full object-cover opacity-70"
                  />
                </div>
                <div className="bg-muted text-foreground rounded-2xl rounded-tl-none px-4 py-2.5 text-sm border shadow-sm">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="w-1.5 h-1.5 bg-primary/60 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="w-1.5 h-1.5 bg-primary/80 rounded-full animate-bounce"></span>
                    <span className="ml-2 italic text-muted-foreground/80">Ariel is typing...</span>
                  </div>
                </div>
              </div>
            )}
          </CardContent>

          <CardFooter className="p-4 border-t bg-card/50 backdrop-blur-sm">
            <form 
              className="flex w-full items-end gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
            >
              <Textarea
                placeholder="Ask Ariel anything..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                rows={1}
                className="flex-1 min-h-[40px] max-h-[120px] bg-background resize-none py-2.5"
                autoComplete="off"
              />
              <Button type="submit" size="icon" className="shrink-0 mb-0.5" disabled={!input.trim() || isTyping}>
                <Send className="size-4" />
              </Button>
            </form>
          </CardFooter>
        </Card>
      )}
      
      <Button
        size="icon"
        className={cn(
          "size-14 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 p-0 overflow-hidden border-2 border-primary",
          isOpen ? "rotate-90 bg-destructive hover:bg-destructive/90" : "bg-primary"
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <X className="size-6" />
        ) : (
          <img 
            src="/ariel-business-suit-night.png" 
            alt="Ariel Batoon" 
            className="size-full object-cover"
          />
        )}
      </Button>
    </div>
  );
}