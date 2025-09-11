import axios from 'axios';
import React, { useEffect, useState } from 'react'

// API config (env fallback to provided demo key)
const API_URL = 'https://api.worldnewsapi.com/search-news';
const API_KEY = import.meta.env.VITE_WORLDNEWS_API_KEY || '79b48a74e26f4bb390cabc64f18f2bb5';
 
export default function CityNews({ country }) {
  console.log(country);
  
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!country) return;

    const fetchNews = async () => {
      try {
        setLoading(true);
        setError("");
        const { data } = await axios.get(API_URL, {
          params: {
            'api-key': API_KEY,
            'source-countries': country.toUpperCase(),
            number: 4,
          },
          withCredentials: false,
        });
        console.log(data);
        
        const mapped = (data?.news || []).map((n) => ({
          id: n?.id,
          date: new Date(n?.publish_date?.replace(' ', 'T')).toLocaleDateString(),
          title: n?.title,
          excerpt: n?.summary || n.text?.slice(0, 120),
          author: n?.author,
          category: n?.category,
          image: n?.image,
          url: n?.url,
          source_country: n?.source_country,
        }));
        if (mapped.length > 0) {
          setItems(mapped);
        }
      } catch (err) {
        console.error('Error fetching news:', err);
        setError(err.response.data.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [country]);
  
  return (
    <section className="w-full py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <header className="mb-10">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800">Be Updated with City News</h2>
          <p className="text-gray-500 mt-2">Read the News Updates and Articles about Government</p>
          {loading && <p className="text-sm text-blue-600 mt-2">Loading latest headlines…</p>}
          {error && <p className="text-sm text-orange-600 mt-2">{error}</p>}
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <article key={item.id} className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden flex flex-col h-full">
              <div className="relative">
                {item.image ? (
                  <img 
                    src={item.image} 
                    alt={item.title?.split(" ").slice(0, 2).join(" ")} 
                    className="h-44 w-full object-cover" 
                    loading="lazy" 
                    decoding="async"
                  />
                ) : (
                  <div className="h-44 w-full bg-gray-200" />
                )}
                <span className="absolute top-3 right-3 text-white text-xs font-semibold bg-blue-600 rounded px-2 py-1">
                  {item.category}
                </span>
              </div>
              <div className="px-5 py-4 flex-1">
                <p className="text-xs text-gray-400 mb-2">{item.date}</p>
                <h3 className="text-lg font-semibold text-gray-800 leading-snug">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 mt-3 line-clamp-3">{item.excerpt}</p>
              </div>
              <div className="mt-auto flex items-end justify-between px-5 py-3 border-t">
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                  <span className="inline-flex items-center justify-center h-7 w-7 rounded-full bg-gray-100">👤</span>
                  <span>{item?.author}</span>
                </div>
                {item?.url ? (
                  <a
                    href={item?.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-7 w-7 inline-flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200"
                    aria-label="Open article"
                  >
                    →
                  </a>
                ) : (
                  <button className="h-7 w-7 inline-flex items-center justify-center rounded-full bg-gray-100">→</button>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
