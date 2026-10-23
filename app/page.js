'use client';
import { useState } from 'react';

const suggestions = ["Why did my friend leave me on read?", "Why does my cat stare at the wall?", "Why did my coworker say 'interesting'?", "Why did someone unfollow me?"];
const starter = {role:'assistant', content:'Detective Overthink reporting for duty. 🕵️ Tell me about a suspiciously ordinary event and I shall open a case file.'};

export default function Home() {
  const [temperature, setTemperature] = useState(0.5);
  const [messages, setMessages] = useState([starter]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const mood = temperature < 0.34 ? 'RATIONAL' : temperature < 0.75 ? 'SUSPICIOUS' : 'CONSPIRACY';
  async function send(text) {
    const question = (text || input).trim();
    if (!question || loading) return;
    const next = [...messages, {role:'user', content:question}];
    setMessages(next);
    setInput(''); setLoading(true); setError('');
    try {
      const response = await fetch('/api/chat', {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({messages:next.slice(-12),temperature})});
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Something went wrong.');
      setMessages(current => [...current, {role:'assistant',content:result.reply}]);
    } catch (e) { setError(e.message); }
    finally { setLoading(false); }
  }
  return <main className="shell">
    <header className="topbar"><div className="brand"><span className="logo">⌕</span><div><strong>DETECTIVE OVERTHINK</strong><small>PRIVATE INVESTIGATIONS · EST. 2026</small></div></div><span className="online"><span className="dot"/> DETECTIVE ON DUTY</span></header>
    <div className="content">
      <section className="case-panel"><div className="eyebrow">CONFIDENTIAL · CASE FILE #001</div><h1>Nothing is<br/><em>a coincidence.</em></h1><p className="description">Someone left you on read? Your cat is acting suspicious? No mystery is too small. Present your evidence.</p><div className="stamp">TOP SECRET<br/>PROBABLY</div>
        <div className="sidebar"><div className="slider-heading"><span>DETECTIVE'S SUSPICION LEVEL</span><b>{temperature.toFixed(2)}</b></div><input className="slider" type="range" min="0" max="1" step="0.01" value={temperature} onChange={e=>setTemperature(Number(e.target.value))}/><div className="extremes"><span>RATIONAL</span><span>UNHINGED</span></div><div className="mood">CURRENT MODE: <strong>{mood}</strong></div><p className="hint">Turn it up for wilder, obviously fictional theories.</p></div>
      </section>
      <section className="chat-panel"><div className="chat-header"><span>◉ LIVE INTERROGATION</span><span>ENCRYPTED* <span className="tiny">(*not actually encrypted)</span></span></div><div className="messages" aria-live="polite">{messages.map((m,i)=><div key={i} className={'bubble '+(m.role==='user'?'user':'assistant')}><div className="speaker">{m.role==='user'?'WITNESS':'DETECTIVE OVERTHINK'}</div><div className="message-text">{m.content}</div></div>)}{loading&&<div className="thinking">Examining the evidence…</div>}</div><div className="chat-footer"><div className="suggestions">{suggestions.map(s=><button disabled={loading} key={s} onClick={()=>send(s)}>{s}</button>)}</div><form onSubmit={e=>{e.preventDefault();send();}}><input aria-label="Your mystery" value={input} maxLength={1200} onChange={e=>setInput(e.target.value)} placeholder="Describe your suspicious situation…"/><button disabled={loading||!input.trim()} type="submit">INVESTIGATE ↗</button></form>{error&&<p className="error">{error}</p>}<p className="disclaimer">FOR ENTERTAINMENT ONLY · THEORIES ARE NOT EVIDENCE</p></div></section>
    </div>
    <footer>DETECTIVE OVERTHINK © 2026 <span>TRUST NO PIGEON.</span></footer>
  </main>;
}
