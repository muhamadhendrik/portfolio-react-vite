import { useState, useEffect } from 'react';
import { Card, CardContent } from '../ui/card';
import { Mail, Calendar } from 'lucide-react';
import { contactService } from '../../services/contactService';

export default function ContactMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    try {
      setLoading(true);
      const data = await contactService.getMessages();
      setMessages(data);
    } catch (error) {
      console.error('Failed to load messages:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          <span className="gradient-text">Messages</span>
        </h1>
        <p className="text-gray-400 mt-2">Messages from your contact form</p>
      </div>

      {messages.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center text-gray-400">
            <Mail className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No messages yet</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <Card key={msg.id}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold">{msg.name}</h3>
                    <p className="text-sm text-gray-400">{msg.email}</p>
                  </div>
                  <span className="text-xs text-gray-500 flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(msg.created_at).toLocaleDateString()}
                  </span>
                </div>
                {msg.subject && (
                  <p className="text-sm font-medium mb-2">{msg.subject}</p>
                )}
                <p className="text-gray-300">{msg.message}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
