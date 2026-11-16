import { createClient } from '@supabase/supabase-js';
const url=import.meta.env.VITE_SUPABASE_URL;
const key=import.meta.env.VITE_SUPABASE_ANON_KEY;
export const configured=Boolean(import.meta.env.VITE_DEMO_MODE !== 'true' && url && key && !url.includes('YOUR_PROJECT'));
export const supabase=configured?createClient(url,key):null;
export const event={edition:'Next edition',name:'SCETATHON',college:'Sarvajanik College of Engineering & Technology',university:'Sarvajanik University',city:'Surat, Gujarat',email:'scetathon@scet.ac.in',duration:'24 hours',rounds:'2 rounds',teamSize:'3–5',problems:'8 (previous edition)',registration:'To be announced',dates:'To be announced'};
export type Challenge={id:string;title:string;category:string;description:string;status:string};
export const fallbackChallenges:Challenge[]=[
{id:'sample-1',title:'Smart campus experiences',category:'Campus technology',description:'Example track: improve everyday campus life with thoughtful digital tools.',status:'Illustrative'},
{id:'sample-2',title:'Responsible AI solutions',category:'Artificial intelligence',description:'Example track: build useful and transparent AI-enabled applications.',status:'Illustrative'},
{id:'sample-3',title:'Sustainable resource management',category:'Sustainability',description:'Example track: reduce waste and make resource use more efficient.',status:'Illustrative'},
{id:'sample-4',title:'Accessible digital services',category:'Web & mobile',description:'Example track: make essential services easier for everyone to use.',status:'Illustrative'}];
export function message(e:unknown){return e instanceof Error?e.message:String(e)}
