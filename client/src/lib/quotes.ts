// DailyRise – Curated thought-provoking famous quotes
// Organized by theme for daily rotation

export interface Quote {
  id: number;
  text: string;
  author: string;
  category: string;
}

export const quotes: Quote[] = [
  // Purpose & Meaning
  { id: 1, text: "The two most important days in your life are the day you are born and the day you find out why.", author: "Mark Twain", category: "Purpose" },
  { id: 2, text: "He who has a why to live can bear almost any how.", author: "Friedrich Nietzsche", category: "Purpose" },
  { id: 3, text: "The purpose of life is not to be happy. It is to be useful, to be honorable, to be compassionate, to have it make some difference that you have lived and lived well.", author: "Ralph Waldo Emerson", category: "Purpose" },
  { id: 4, text: "Your time is limited, so don't waste it living someone else's life.", author: "Steve Jobs", category: "Purpose" },

  // Courage & Action
  { id: 5, text: "You miss 100% of the shots you don't take.", author: "Wayne Gretzky", category: "Courage" },
  { id: 6, text: "It is not the mountain we conquer, but ourselves.", author: "Edmund Hillary", category: "Courage" },
  { id: 7, text: "Courage is not the absence of fear, but the triumph over it.", author: "Nelson Mandela", category: "Courage" },
  { id: 8, text: "Do one thing every day that scares you.", author: "Eleanor Roosevelt", category: "Courage" },
  { id: 9, text: "The secret of getting ahead is getting started.", author: "Mark Twain", category: "Courage" },

  // Growth & Change
  { id: 10, text: "Be the change you wish to see in the world.", author: "Mahatma Gandhi", category: "Growth" },
  { id: 11, text: "The only way to do great work is to love what you do.", author: "Steve Jobs", category: "Growth" },
  { id: 12, text: "In the middle of difficulty lies opportunity.", author: "Albert Einstein", category: "Growth" },
  { id: 13, text: "Life is not about finding yourself. Life is about creating yourself.", author: "George Bernard Shaw", category: "Growth" },
  { id: 14, text: "What lies behind us and what lies before us are tiny matters compared to what lies within us.", author: "Ralph Waldo Emerson", category: "Growth" },
  { id: 15, text: "The mind is everything. What you think, you become.", author: "Buddha", category: "Growth" },

  // Resilience
  { id: 16, text: "Fall seven times, stand up eight.", author: "Japanese Proverb", category: "Resilience" },
  { id: 17, text: "The oak fought the wind and was broken, the willow bent when it must and survived.", author: "Robert Jordan", category: "Resilience" },
  { id: 18, text: "Rock bottom became the solid foundation on which I rebuilt my life.", author: "J.K. Rowling", category: "Resilience" },
  { id: 19, text: "Hardships often prepare ordinary people for an extraordinary destiny.", author: "C.S. Lewis", category: "Resilience" },
  { id: 20, text: "The human capacity for burden is like bamboo — far more flexible than you'd ever believe at first glance.", author: "Jodi Picoult", category: "Resilience" },

  // Wisdom
  { id: 21, text: "Knowing yourself is the beginning of all wisdom.", author: "Aristotle", category: "Wisdom" },
  { id: 22, text: "The unexamined life is not worth living.", author: "Socrates", category: "Wisdom" },
  { id: 23, text: "Yesterday I was clever, so I wanted to change the world. Today I am wise, so I am changing myself.", author: "Rumi", category: "Wisdom" },
  { id: 24, text: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.", author: "Aristotle", category: "Wisdom" },
  { id: 25, text: "The greatest glory in living lies not in never falling, but in rising every time we fall.", author: "Nelson Mandela", category: "Wisdom" },

  // Mindset
  { id: 26, text: "Whether you think you can or you think you can't, you're right.", author: "Henry Ford", category: "Mindset" },
  { id: 27, text: "The only limit to our realization of tomorrow is our doubts of today.", author: "Franklin D. Roosevelt", category: "Mindset" },
  { id: 28, text: "Your beliefs become your thoughts, your thoughts become your words, your words become your actions.", author: "Mahatma Gandhi", category: "Mindset" },
  { id: 29, text: "A person who never made a mistake never tried anything new.", author: "Albert Einstein", category: "Mindset" },
  { id: 30, text: "The mind is not a vessel to be filled, but a fire to be kindled.", author: "Plutarch", category: "Mindset" },

  // Dreams & Vision
  { id: 31, text: "All our dreams can come true, if we have the courage to pursue them.", author: "Walt Disney", category: "Dreams" },
  { id: 32, text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt", category: "Dreams" },
  { id: 33, text: "Imagination is more important than knowledge.", author: "Albert Einstein", category: "Dreams" },
  { id: 34, text: "The biggest adventure you can take is to live the life of your dreams.", author: "Oprah Winfrey", category: "Dreams" },
  { id: 35, text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson", category: "Dreams" },

  // Present Moment
  { id: 36, text: "The present moment is the only moment available to us, and it is the door to all moments.", author: "Thich Nhat Hanh", category: "Presence" },
  { id: 37, text: "Yesterday is history, tomorrow is a mystery, today is a gift of God, which is why we call it the present.", author: "Bill Keane", category: "Presence" },
  { id: 38, text: "Life is what happens when you're busy making other plans.", author: "John Lennon", category: "Presence" },
  { id: 39, text: "In the end, it's not the years in your life that count. It's the life in your years.", author: "Abraham Lincoln", category: "Presence" },

  // Love & Connection
  { id: 40, text: "You yourself, as much as anybody in the entire universe, deserve your love and affection.", author: "Buddha", category: "Love" },
  { id: 41, text: "The best and most beautiful things in the world cannot be seen or even touched — they must be felt with the heart.", author: "Helen Keller", category: "Love" },
  { id: 42, text: "Where there is love there is life.", author: "Mahatma Gandhi", category: "Love" },

  // Success & Effort
  { id: 43, text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill", category: "Success" },
  { id: 44, text: "I have not failed. I've just found 10,000 ways that won't work.", author: "Thomas Edison", category: "Success" },
  { id: 45, text: "The road to success and the road to failure are almost exactly the same.", author: "Colin R. Davis", category: "Success" },
  { id: 46, text: "Success usually comes to those who are too busy to be looking for it.", author: "Henry David Thoreau", category: "Success" },
  { id: 47, text: "Opportunities don't happen. You create them.", author: "Chris Grosser", category: "Success" },

  // Gratitude
  { id: 48, text: "Gratitude turns what we have into enough.", author: "Aesop", category: "Gratitude" },
  { id: 49, text: "When you are grateful, fear disappears and abundance appears.", author: "Anthony Robbins", category: "Gratitude" },
  { id: 50, text: "Enjoy the little things, for one day you may look back and realize they were the big things.", author: "Robert Brault", category: "Gratitude" },

  // Leadership & Impact
  { id: 51, text: "Leadership is not about being in charge. It is about taking care of those in your charge.", author: "Simon Sinek", category: "Leadership" },
  { id: 52, text: "The best time to plant a tree was 20 years ago. The second best time is now.", author: "Chinese Proverb", category: "Leadership" },
  { id: 53, text: "A leader is one who knows the way, goes the way, and shows the way.", author: "John C. Maxwell", category: "Leadership" },

  // Creativity
  { id: 54, text: "Creativity is intelligence having fun.", author: "Albert Einstein", category: "Creativity" },
  { id: 55, text: "Every artist was first an amateur.", author: "Ralph Waldo Emerson", category: "Creativity" },
  { id: 56, text: "You can't use up creativity. The more you use, the more you have.", author: "Maya Angelou", category: "Creativity" },

  // Perseverance
  { id: 57, text: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius", category: "Perseverance" },
  { id: 58, text: "Energy and persistence conquer all things.", author: "Benjamin Franklin", category: "Perseverance" },
  { id: 59, text: "The difference between a stumbling block and a stepping stone is how high you raise your foot.", author: "Benny Lewis", category: "Perseverance" },
  { id: 60, text: "Our greatest weakness lies in giving up. The most certain way to succeed is always to try just one more time.", author: "Thomas Edison", category: "Perseverance" },
];

// Get today's quote based on day of year
export function getDailyQuote(): Quote {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);
  return quotes[dayOfYear % quotes.length];
}

// Get a random quote (different from current)
export function getRandomQuote(excludeId?: number): Quote {
  const available = excludeId ? quotes.filter(q => q.id !== excludeId) : quotes;
  return available[Math.floor(Math.random() * available.length)];
}

// Get quotes by category
export function getQuotesByCategory(category: string): Quote[] {
  return quotes.filter(q => q.category === category);
}

export const categories = Array.from(new Set(quotes.map(q => q.category)));
