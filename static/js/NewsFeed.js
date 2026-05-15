import React, { useState, useMemo, useEffect } from 'react';
import { 
  Menu, 
  Search, 
  Sun, 
  Moon,
  ChevronRight,
  TrendingUp,
  Filter,
  Shield, 
  Briefcase,
  Home,
  Cpu,
  Coins,
  Globe,
  Lock,
  CheckCircle,
  X,
  Share2,
  Bookmark,
  ExternalLink,
  Server
} from 'lucide-react';

const CATEGORIES = [
  { id: 'all', label: 'Top Stories', icon: Globe },
  { id: 'Tech', label: 'Tech', icon: Cpu },
  { id: 'Finance', label: 'Finance', icon: TrendingUp },
  { id: 'Business', label: 'Business', icon: Briefcase },
  { id: 'Crypto', label: 'Crypto', icon: Coins },
  { id: 'Real Estate', label: 'Real Estate', icon: Home },
  { id: 'Cybersecurity', label: 'Cybersecurity', icon: Shield },
];

const NewsFeed = () => {
  const [articles, setArticles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/news')
      .then(res => res.json())
      .then(data => {
        setArticles(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching news:', err);
        setLoading(false);
      });
  }, []);

  const filteredArticles = useMemo(() => {
    if (selectedCategory === 'all') return articles;
    return articles.filter(a => a.category === selectedCategory);
  }, [articles, selectedCategory]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Category Navigation */}
      <div className="flex gap-2 overflow-x-auto pb-6 scrollbar-hide">
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap ${
              selectedCategory === cat.id
                ? 'bg-slate-900 text-white shadow-lg'
                : 'bg-white text-slate-500 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <cat.icon size={14} />
            {cat.label}
          </button>
        ))}
      </div>

      {/* Article Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.map(article => (
          <div 
            key={article.id}
            onClick={() => setSelectedArticle(article)}
            className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-slate-100 flex flex-col h-full cursor-pointer"
          >
            <div className="relative h-48 overflow-hidden">
              <img 
                src={article.imageUrl} 
                alt={article.title} 
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3">
                <span className="px-2 py-1 bg-slate-900/90 backdrop-blur text-xs font-bold rounded-md text-white uppercase tracking-wide">
                  {article.category}
                </span>
              </div>
            </div>
            <div className="p-5 flex flex-col flex-1">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-semibold text-slate-500 uppercase">{article.source}</span>
                <span className="text-slate-300">•</span>
                <span className="text-xs text-slate-400">{article.time}</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 leading-tight mb-3 group-hover:text-blue-600 transition-colors">
                {article.title}
              </h3>
              <p className="text-sm text-slate-600 line-clamp-2">
                {article.excerpt}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Article Detail View */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 bg-white flex flex-col animate-in slide-in-from-bottom-10 duration-300">
          <div className="h-14 bg-slate-900 text-white flex items-center justify-between px-4 border-b border-slate-700">
            <div className="flex items-center gap-2">
              <Server size={18} className="text-emerald-400" />
              <span className="font-bold">GEM Assist | Secure Gateway</span>
            </div>
            <button onClick={() => setSelectedArticle(null)} className="p-2 hover:bg-slate-800 rounded-full text-slate-400 hover:text-white">
              <X size={20}/>
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-6 md:p-12">
            <div className="max-w-3xl mx-auto">
              <div className="mb-6 flex items-center gap-2">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-bold uppercase">
                  {selectedArticle.category}
                </span>
                <span className="text-slate-400 text-sm">• {selectedArticle.source}</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-8 leading-tight">
                {selectedArticle.title}
              </h1>
              <img src={selectedArticle.imageUrl} alt={selectedArticle.title} className="w-full aspect-video object-cover rounded-2xl mb-8 shadow-xl" />
              <div className="prose max-w-none">
                <p className="text-xl text-slate-600 leading-relaxed mb-6 font-medium">
                  {selectedArticle.excerpt}
                </p>
                <div className="h-px bg-slate-200 my-8 w-full" />
                <p className="text-slate-700 leading-relaxed">
                  {selectedArticle.content || "Content retrieved from secure archive. Session isolated by GEM Assist backend engine."}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsFeed;
