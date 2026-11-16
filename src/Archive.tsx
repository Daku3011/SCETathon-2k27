import { Link } from 'react-router-dom';

const milestones = [
  ['2 March · 11:59 am', 'Idea submissions closed', 'Teams submitted their first-round ideas online.'],
  ['6 March · 11 am', 'Campus finale began', 'Qualified teams gathered at SCET for the 24-hour build.'],
  ['7 March · 11 am', 'Build time ended', 'The on-campus development window closed.'],
];

export function Timeline() {
  return <section className="archive-section wrap"><header><span className="eyebrow">MARCH 2026</span><h2>Event timeline</h2><p>Previous edition in Surat · All times IST</p></header>
    <ol className="rail">{milestones.map(([time,title,detail]) => <li key={time}><small>{time}</small><h3>{title}</h3><p>{detail}</p></li>)}</ol>
    <p className="notice">Next edition · Registration and event dates are awaiting announcement.</p>
    <Link className="textlink" to="/gallery">Explore the 2026 gallery →</Link></section>;
}

export function Gallery() {
  return <main className="wrap page"><span className="eyebrow">SCETATHON / MARCH 2026</span><h1>Edition gallery</h1><p className="pagelead">A look back at the Surat campus and one of the teams recognized at SCETATHON 2026.</p>
    <div className="photo-grid">{[
      ['novex.jpeg','Team Novex','First place in Computer Engineering for Swach App.'],
      ['scet_bg.jpg','SCET campus','Surat venue for the 24-hour finale.'],
    ].map(([file,title,caption]) => <figure key={file}><a href={'/archive/'+file} aria-label={'Open full photo of '+title}><img src={'/archive/'+file} alt={title}/></a><figcaption><h3>{title}</h3><p>{caption}</p></figcaption></figure>)}</div>
    <a className="btn dark archive-link" href="https://www.scetathon.com/winners">View all winners in the official archive ↗</a></main>;
}
