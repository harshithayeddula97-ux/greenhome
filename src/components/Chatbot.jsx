import { useState, useEffect, useRef } from 'react';
import { X, Send, Bot, Minimize2, ChevronDown, User } from 'lucide-react';
import './Chatbot.css';

// ─── Knowledge base for the chatbot ───────────────────────────────────────────
const KB = {
  services: [
    'Residential Development',
    'Property Development',
    'Construction',
    'Project Planning',
    'Real Estate Consultation',
    'Customer Support',
  ],
  projects: [
    {
      name: 'Green Valley Villas',
      location: 'Whitefield, Bangalore',
      type: 'Villa',
      status: 'Ready to Move',
      units: '48 Units',
      bedrooms: '3 & 4 BHK',
    },
    {
      name: 'Emerald Heights',
      location: 'Baner, Pune',
      type: 'Apartment',
      status: 'Under Construction',
      units: '120 Units',
      bedrooms: '2 & 3 BHK',
    },
    {
      name: 'Green Township Phase 2',
      location: 'Navi Mumbai, Maharashtra',
      type: 'Township',
      status: 'Upcoming',
      units: '350 Units',
      bedrooms: 'Multiple configurations',
    },
  ],
  contact: {
    phone: '+91 98765 43210 / +91 98765 43211',
    email: 'info@greenhomedevelopers.in',
    address: 'Green Home Towers, 4th Floor, MG Road, Bangalore – 560001',
    hours: 'Monday–Saturday: 9:00 AM – 7:00 PM | Sunday: 10:00 AM – 4:00 PM',
  },
  about: {
    years: '15+ years',
    families: '500+',
    vision: 'To be India\'s most trusted real-estate developer, creating sustainable communities where families thrive and grow.',
    mission: 'To deliver quality homes on time, with transparency, modern design, and unwavering customer satisfaction.',
  },
  whyChooseUs: [
    'Quality Construction with ISI-certified materials',
    'Prime Locations near schools, hospitals, and highways',
    'Modern, eco-friendly designs',
    'Transparent process with full documentation support',
    'Award-winning customer satisfaction',
    'RERA-compliant, legally approved projects',
  ],
};

// ─── Simple rule-based NLP ────────────────────────────────────────────────────
function getResponse(message) {
  const msg = message.toLowerCase().trim();

  // Greetings
  if (/^(hi|hello|hey|good\s+(morning|afternoon|evening)|namaste)/i.test(msg)) {
    return "Hello! 👋 Welcome to Green Home Developers. I'm here to help you find your perfect home. What would you like to know?";
  }

  // Farewells
  if (/\b(bye|goodbye|see you|thanks|thank you)\b/i.test(msg)) {
    return "Thank you for reaching out to Green Home Developers! 🏡 Feel free to chat anytime. Have a wonderful day!";
  }

  // Price / Cost
  if (/\b(price|cost|rate|budget|how much|affordable|pricing)\b/i.test(msg)) {
    return "I couldn't find specific pricing information on the website. Prices vary based on the project, unit type, and floor plan. 📋 Please fill out our **Enquiry Form** or call us at **+91 98765 43210** for current pricing details.";
  }

  // Services
  if (/\b(service|offer|provide|what do you do|what can you)\b/i.test(msg)) {
    const list = KB.services.map(s => `• ${s}`).join('\n');
    return `Green Home Developers provides the following services:\n\n${list}\n\nWould you like to know more about any specific service?`;
  }

  // Projects / Properties
  if (/\b(project|propert|develop|home|house|flat|apartment|villa|township|available)\b/i.test(msg) && !/location|where/i.test(msg)) {
    const projectList = KB.projects.map(p =>
      `🏠 **${p.name}** (${p.type})\n   📍 ${p.location}\n   🔖 ${p.status} | ${p.units} | ${p.bedrooms}`
    ).join('\n\n');
    return `Here are our current featured projects:\n\n${projectList}\n\nWould you like to enquire about a specific project? I can guide you to our Enquiry Form!`;
  }

  // Location
  if (/\b(location|where|city|area|place|situated|based)\b/i.test(msg)) {
    const locs = KB.projects.map(p => `• **${p.name}** – ${p.location}`).join('\n');
    return `Our projects are located at:\n\n${locs}\n\nOur corporate office is at **${KB.contact.address}**. Would you like to know more about a specific location?`;
  }

  // Specific project: Green Valley Villas
  if (/green valley|villa/i.test(msg)) {
    const p = KB.projects[0];
    return `**${p.name}** is our premium villa project in **${p.location}**.\n\n• Type: ${p.type}\n• Status: ${p.status}\n• Units: ${p.units}\n• Configurations: ${p.bedrooms}\n\nInterested? Please use our **Enquiry Form** to get in touch with our sales team!`;
  }

  // Specific project: Emerald Heights
  if (/emerald heights|apartment/i.test(msg)) {
    const p = KB.projects[1];
    return `**${p.name}** is our modern apartment complex in **${p.location}**.\n\n• Type: ${p.type}\n• Status: ${p.status}\n• Units: ${p.units}\n• Configurations: ${p.bedrooms}\n\nWant to know more? Please submit an **Enquiry** and our team will contact you!`;
  }

  // Specific project: Green Township
  if (/township|navi mumbai|phase 2/i.test(msg)) {
    const p = KB.projects[2];
    return `**${p.name}** is our upcoming integrated township in **${p.location}**.\n\n• Type: ${p.type}\n• Status: ${p.status}\n• Units: ${p.units}\n• Configurations: ${p.bedrooms}\n\nThis is an upcoming project — express your interest through our **Enquiry Form** to get early updates!`;
  }

  // Enquiry / Contact
  if (/\b(enquir|contact|reach|call|touch|book|visit|schedule|appointment|interested)\b/i.test(msg)) {
    return `Sure! You can reach Green Home Developers through:\n\n📞 **Phone:** ${KB.contact.phone}\n📧 **Email:** ${KB.contact.email}\n📍 **Office:** ${KB.contact.address}\n🕐 **Hours:** ${KB.contact.hours}\n\nOr simply scroll down to our **Enquiry Form** section to submit your details and we'll get back to you soon!`;
  }

  // About the company
  if (/\b(about|company|who are you|tell me|background|history|founded)\b/i.test(msg)) {
    return `**Green Home Developers** is a premier real-estate company with over **${KB.about.years}** of excellence in building quality homes.\n\n**Vision:** ${KB.about.vision}\n\n**Mission:** ${KB.about.mission}\n\nWe've successfully housed **${KB.about.families}** families across India!`;
  }

  // Why choose us
  if (/\b(why|choose|trust|different|special|unique|benefit|advantage)\b/i.test(msg)) {
    const reasons = KB.whyChooseUs.map(r => `✅ ${r}`).join('\n');
    return `Here's why thousands of families choose Green Home Developers:\n\n${reasons}\n\nWould you like to explore our projects or submit an enquiry?`;
  }

  // RERA / Legal
  if (/\b(rera|legal|approved|registered|complian)\b/i.test(msg)) {
    return "All Green Home Developer projects are **RERA registered** and fully legally compliant. We maintain complete transparency in documentation, approvals, and pricing. Your investment is 100% safe with us! 🛡️";
  }

  // Gallery
  if (/\b(gallery|photo|image|picture|look|see|show)\b/i.test(msg)) {
    return "You can view photos of all our projects in the **Gallery** section of our website! 📸 It includes images of our villas, apartments, interiors, construction progress, and more. Click on any image to see a larger view.";
  }

  // Testimonials
  if (/\b(review|testimonial|feedback|customer|experience|happy|satisfied)\b/i.test(msg)) {
    return "Our **Testimonials** section features real stories from 500+ happy homeowners. Families like the Sharmas, Nairs, Patels, and Menons have shared their wonderful experiences with Green Home Developers. Check them out on the website!";
  }

  // Construction quality
  if (/\b(quality|material|built|construction|structure|durable|strong)\b/i.test(msg)) {
    return "Green Home Developers uses **ISI-certified materials**, advanced construction techniques, and conducts strict quality audits at every stage of construction. All our projects meet the highest structural standards for safety and longevity. 🏗️";
  }

  // Default / fallback
  return "Sorry, I couldn't find that information on the Green Home Developers website. 🙏 Please contact our team for more details:\n\n📞 **+91 98765 43210**\n📧 **info@greenhomedevelopers.in**\n\nOr use the **Enquiry Form** below and our team will reach out to you!";
}

// ─── Suggested Questions ──────────────────────────────────────────────────────
const SUGGESTED = [
  'What projects do you have?',
  'Where are your projects located?',
  'What services do you provide?',
  'How can I enquire about a property?',
  'How can I contact Green Home Developers?',
];

// ─── Chat Message Component ───────────────────────────────────────────────────
function ChatMessage({ message }) {
  const isBot = message.role === 'bot';
  // Parse markdown-like bold
  const renderText = (text) => {
    const parts = text.split(/\*\*(.*?)\*\*/g);
    return parts.map((part, i) =>
      i % 2 === 1 ? <strong key={i}>{part}</strong> : <span key={i}>{part}</span>
    );
  };

  return (
    <div className={`chat-msg chat-msg--${isBot ? 'bot' : 'user'}`}>
      {isBot && (
        <div className="chat-msg__avatar chat-msg__avatar--bot">
          <Bot size={14} />
        </div>
      )}
      <div className="chat-msg__bubble">
        {message.text.split('\n').map((line, i) => (
          <span key={i}>
            {renderText(line)}
            {i < message.text.split('\n').length - 1 && <br />}
          </span>
        ))}
      </div>
      {!isBot && (
        <div className="chat-msg__avatar chat-msg__avatar--user">
          <User size={14} />
        </div>
      )}
    </div>
  );
}

// ─── Typing Indicator ─────────────────────────────────────────────────────────
function TypingIndicator() {
  return (
    <div className="chat-msg chat-msg--bot">
      <div className="chat-msg__avatar chat-msg__avatar--bot">
        <Bot size={14} />
      </div>
      <div className="chat-msg__bubble chat-msg__bubble--typing">
        <span /><span /><span />
      </div>
    </div>
  );
}

// ─── Main Chatbot Component ───────────────────────────────────────────────────
const INITIAL_MESSAGES = [
  {
    id: 1,
    role: 'bot',
    text: "Hello! 👋 I'm the Green Home AI Assistant. I can help you with information about our projects, services, locations, and more.\n\nHow can I help you today?",
  },
];

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      inputRef.current?.focus();
      setUnreadCount(0);
    }
  }, [messages, isOpen, isMinimized]);

  const sendMessage = async (text) => {
    if (!text.trim()) return;
    setShowSuggestions(false);

    const userMsg = { id: Date.now(), role: 'user', text: text.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate thinking delay (600ms–1.2s)
    const delay = 600 + Math.random() * 600;
    await new Promise(r => setTimeout(r, delay));

    const botText = getResponse(text.trim());
    const botMsg = { id: Date.now() + 1, role: 'bot', text: botText };
    setIsTyping(false);
    setMessages(prev => [...prev, botMsg]);

    if (!isOpen || isMinimized) {
      setUnreadCount(prev => prev + 1);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const toggleOpen = () => {
    setIsOpen(prev => !prev);
    setIsMinimized(false);
    setUnreadCount(0);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        className={`chatbot__fab${isOpen ? ' chatbot__fab--open' : ''}`}
        onClick={toggleOpen}
        aria-label="Open AI Assistant"
        id="chatbot-fab"
      >
        {isOpen ? <X size={24} /> : <span style={{ fontSize: '1.25rem', lineHeight: 1 }}>🤖</span>}
        {!isOpen && (
          <span className="chatbot__fab-label">AI Assistant</span>
        )}
        {unreadCount > 0 && !isOpen && (
          <span className="chatbot__badge">{unreadCount}</span>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className={`chatbot__window${isMinimized ? ' chatbot__window--minimized' : ''}`} role="dialog" aria-label="Green Home AI Assistant">
          {/* Header */}
          <div className="chatbot__header" onClick={() => isMinimized && setIsMinimized(false)}>
            <div className="chatbot__header-left">
              <div className="chatbot__header-avatar">
                <Bot size={18} />
              </div>
              <div>
                <div className="chatbot__header-title">Green Home AI Assistant</div>
                <div className="chatbot__header-subtitle">
                  <span className="chatbot__online-dot" />
                  How can I help you?
                </div>
              </div>
            </div>
            <div className="chatbot__header-actions">
              <button
                className="chatbot__header-btn"
                onClick={(e) => { e.stopPropagation(); setIsMinimized(prev => !prev); }}
                aria-label={isMinimized ? 'Expand' : 'Minimize'}
              >
                {isMinimized ? <ChevronDown size={16} /> : <Minimize2 size={16} />}
              </button>
              <button
                className="chatbot__header-btn"
                onClick={toggleOpen}
                aria-label="Close"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Messages */}
              <div className="chatbot__messages">
                {messages.map(msg => (
                  <ChatMessage key={msg.id} message={msg} />
                ))}
                {isTyping && <TypingIndicator />}
                <div ref={messagesEndRef} />
              </div>

              {/* Suggestions */}
              {showSuggestions && (
                <div className="chatbot__suggestions">
                  <div className="chatbot__suggestions-label">Suggested questions:</div>
                  <div className="chatbot__suggestions-list">
                    {SUGGESTED.map((q, i) => (
                      <button
                        key={i}
                        className="chatbot__suggestion-btn"
                        onClick={() => sendMessage(q)}
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input */}
              <div className="chatbot__input-wrap">
                <textarea
                  ref={inputRef}
                  className="chatbot__input"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type your message..."
                  rows={1}
                  aria-label="Type your message"
                />
                <button
                  className="chatbot__send-btn"
                  onClick={() => sendMessage(input)}
                  disabled={!input.trim() || isTyping}
                  aria-label="Send message"
                >
                  <Send size={18} />
                </button>
              </div>

              <div className="chatbot__footer-note">
                Powered by Green Home AI · Website info only
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
