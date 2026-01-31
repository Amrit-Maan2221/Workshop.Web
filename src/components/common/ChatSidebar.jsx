import { useState } from "react";
import { Send, User2, X, ChevronLeft, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

// Mock data for the conversation list
const chatList = [
  { id: 1, name: "Robert Johnson", lastMsg: "When will my car be ready?", time: "10:30 AM", unread: 2 },
  { id: 2, name: "Sarah Smith (Mechanic)", lastMsg: "Brake pads are installed.", time: "9:15 AM", unread: 0 },
  { id: 3, name: "Michael Chen", lastMsg: "Thanks for the quick service!", time: "Yesterday", unread: 0 },
  { id: 4, name: "Emily Davis", lastMsg: "Did you find the oil leak?", time: "Yesterday", unread: 1 },
  { id: 5, name: "David Wilson", lastMsg: "I'll be there at 5 PM.", time: "Monday", unread: 0 },
];

export default function ChatSidebar({ onClose, showClose = true }) {
  const [selectedChat, setSelectedChat] = useState(null);

  return (
    <div className="border-l bg-card flex flex-col h-full overflow-hidden">
      {/* HEADER */}
      <div className="p-4 border-b flex items-center justify-between bg-muted/20 h-16">
        <div className="flex items-center gap-2">
          {selectedChat && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 -ml-2" 
              onClick={() => setSelectedChat(null)}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          )}
          <div>
            <h3 className="font-semibold text-sm">
              {selectedChat ? selectedChat.name : "Messages"}
            </h3>
            <p className="text-[10px] text-muted-foreground">
              {selectedChat ? "Online" : "Workshop Communications"}
            </p>
          </div>
        </div>
        {showClose && (
          <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* SEARCH (Only in list view) */}
      {!selectedChat && (
        <div className="p-3 border-b">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
            <Input placeholder="Search chats..." className="pl-8 h-9 text-xs bg-muted/30 border-none shadow-none" />
          </div>
        </div>
      )}

      {/* CONTENT AREA */}
      <ScrollArea className="flex-1">
        {selectedChat ? (
          // DRILL-IN VIEW: Messages
          <div className="p-4 space-y-4">
            <ChatMessage user={selectedChat.name} message={selectedChat.lastMsg} time="10:30 AM" />
            <ChatMessage user="You" message="I'm checking the status with the team now." time="10:32 AM" isMe />
          </div>
        ) : (
          // LIST VIEW: WhatsApp Style
          <div className="divide-y divide-border/50">
            {chatList.map((chat) => (
              <button
                key={chat.id}
                onClick={() => setSelectedChat(chat)}
                className="w-full flex items-center gap-3 p-4 transition-colors hover:bg-muted/50 text-left"
              >
                <Avatar className="h-10 w-10 border border-border">
                  <AvatarFallback className="text-xs bg-background text-muted-foreground">
                    {chat.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-0.5 gap-3">
                    <span className="text-sm font-medium truncate">{chat.name}</span>
                    <span className="text-[10px] text-muted-foreground whitespace-nowrap">{chat.time}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-xs text-muted-foreground truncate pr-2">{chat.lastMsg}</p>
                    {chat.unread > 0 && (
                      <span className="h-4 w-4 rounded-full bg-primary text-[10px] text-primary-foreground flex items-center justify-center font-bold">
                        {chat.unread}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </ScrollArea>

      {/* INPUT AREA (Only shown when a chat is selected) */}
      {selectedChat && (
        <div className="p-4 border-t bg-background">
          <div className="flex gap-2">
            <Input placeholder="Type a message..." className="h-9 text-sm focus-visible:ring-1" />
            <Button size="icon" className="h-9 w-9 shrink-0 shadow-sm">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

function ChatMessage({ user, message, time, isMe }) {
  return (
    <div className={`flex flex-col ${isMe ? "items-end" : "items-start"} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
      <span className="text-[10px] text-muted-foreground mb-1">{user} • {time}</span>
      <div className={`rounded-2xl px-3 py-2 text-xs max-w-[85%] shadow-sm ${
        isMe ? "bg-primary text-primary-foreground rounded-tr-none" : "bg-muted rounded-tl-none border"
      }`}>
        {message}
      </div>
    </div>
  );
}