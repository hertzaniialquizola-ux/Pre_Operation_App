import React, { useState, useEffect, useMemo, useCallback, memo } from 'react';
import {
  Wind, ShieldCheck, ArrowLeft, Star, PlayCircle, Smile,
  Activity, Clock, CheckSquare, Pill, Utensils, Globe, Info,
  CheckCircle2, Search, BookOpen, Stethoscope, HeartPulse,
  IceCream, Bed, Gamepad2, FileText, ShoppingBag, User,
  Coins, Sparkles, ChevronRight, Lock, Sun, Moon, Ticket, Gift, X,
  Trophy, PartyPopper, ShowerHead, Microscope, Layers, Zap
} from 'lucide-react';

// --- Enhanced Translations ---
const LANGUAGES = {
  en: {
    welcome: "Hi, {name}!",
    countdown: "Sleeps Left",
    coins: "Hero Coins",
    prep: "Daily Quests",
    explore: "Training Room",
    recovery: "Victory Lap",
    shop: "Ticket Booth",
    back: "Back",
    start: "Start Quest",
    earned: "You earned {amt} Hero Coins!",
    buyTickets: "Buy Tickets",
    myWallet: "My Wallet",
    availableRewards: "Available Rewards",
    readyToShow: "Ready to show Parents",
    emptyWallet: "Your wallet is empty. Buy tickets from the store!",
    parentTicket: "Parent Ticket",
    redeem: "REDEEM",
    buyFor: "Buy for",
    finishQuest: "Finish Quest",
    missionObjective: "Mission Objective",
    checkWithParents: "Check with your parents before finishing this mission.",
    dailyQuestDesc: "Completing this helps your doctor keep you safe. Tap the button below when you've finished this task!",
    fastingRule: "No food or milk 8 hours before surgery. Clear liquids (water, juice) OK up to 2 hours before.",
    fastingHeader: "Surgery Rule",
    questFasting: "Empty Stomach",
    questChecklist: "Hero Packing",
    questClean: "Squeaky Clean",
    questTour: "OR Tour",
    cleanTitle: "Squeaky Clean",
    cleanDesc: "Take a shower or bath the morning of surgery. This keeps you extra safe!",
    cleanItems: "shower,wash hair,brush teeth,clean clothes",
    cleanDone: "I'm Squeaky Clean!",
    orTourTitle: "Operating Room Tour",
    orTourDesc: "Tap each item to learn what it does. Earn coins for every one!",
    orTourDone: "Tour Complete!",
    packingTitle: "Hero Packing List",
    packingDesc: "Check off everything before your big day!",
    packingDone: "All Packed!",
    victoryTitle: "Mission Accomplished!",
    victoryDesc: "You woke up from your super nap and did an amazing job!",
    claimVictory: "Claim Victory",
    returnBase: "Return to Base",
    congrats: "Hooray!",
    enjoyReward: "Show this to your parents to enjoy your reward!",
    close: "Done",
    redeemConfirm: "Did your parent agree to redeem this ticket?",
    recoveryLocked: "Unlock this after your big day!",
    recoveryReady: "Ready for your Victory Lap?",
    go: "Let's Go!",
    freeDayEarned: "You earned a Free Day ticket!",
    checkWallet: "Check your wallet for your new reward.",
    freeDay: "Free Day",
    freeDayDesc: "Sleep in and get proper rest!"
  },
  es: {
    welcome: "¡Hola, {name}!",
    countdown: "Dormidas Faltan",
    coins: "Monedas Heroe",
    prep: "Misiones Diarias",
    explore: "Sala de Entrenamiento",
    recovery: "Vuelta de Victoria",
    shop: "Taquilla",
    back: "Atrás",
    start: "Iniciar Misión",
    earned: "¡Ganaste {amt} Monedas!",
    buyTickets: "Comprar Boletos",
    myWallet: "Mi Cartera",
    availableRewards: "Premios Disponibles",
    readyToShow: "Listo para mostrar a papás",
    emptyWallet: "Tu cartera está vacía. ¡Compra boletos en la tienda!",
    parentTicket: "Boleto para Papás",
    redeem: "CANJEAR",
    buyFor: "Comprar por",
    finishQuest: "Terminar Misión",
    missionObjective: "Objetivo de la Misión",
    checkWithParents: "Consulta con tus padres antes de terminar esta misión.",
    dailyQuestDesc: "Completar esto ayuda a tu médico a mantenerte seguro. ¡Toca el botón cuando hayas terminado!",
    fastingRule: "Sin comida ni leche 8 horas antes de la cirugía. Líquidos claros (agua, jugo) aceptados hasta 2 horas antes.",
    fastingHeader: "Regla de Cirugía",
    questFasting: "Estómago Vacío",
    questChecklist: "Maleta de Héroe",
    questClean: "Bien Limpio",
    questTour: "Tour del Quirófano",
    cleanTitle: "¡Bien Limpio!",
    cleanDesc: "Dúchate o báñate la mañana de la cirugía. ¡Esto te mantiene extra seguro!",
    cleanItems: "ducha,lavarse el pelo,cepillarse los dientes,ropa limpia",
    cleanDone: "¡Estoy Limpio!",
    orTourTitle: "Tour del Quirófano",
    orTourDesc: "Toca cada objeto para saber qué hace. ¡Gana monedas por cada uno!",
    orTourDone: "¡Tour Completo!",
    packingTitle: "Lista de Héroe",
    packingDesc: "¡Marca todo antes de tu gran día!",
    packingDone: "¡Todo Empacado!",
    victoryTitle: "¡Misión Cumplida!",
    victoryDesc: "¡Te despertaste de tu súper siesta e hiciste un trabajo increíble!",
    claimVictory: "Reclamar Victoria",
    returnBase: "Volver a la Base",
    congrats: "¡Hurra!",
    enjoyReward: "¡Muestra esto a tus padres para disfrutar tu premio!",
    close: "Listo",
    redeemConfirm: "¿Tus padres aceptaron canjear este boleto?",
    recoveryLocked: "¡Desbloquea esto después de tu gran día!",
    recoveryReady: "¿Listo para tu Vuelta de Victoria?",
    go: "¡Vamos!",
    freeDayEarned: "¡Ganaste un boleto de Día Libre!",
    checkWallet: "Revisa tu cartera para tu nuevo premio.",
    freeDay: "Día Libre",
    freeDayDesc: "¡Duerme hasta tarde y descansa bien!"
  }
};

const TICKETS_DATA = [
  { id: 'icecream', nameEn: 'Ice Cream Date', nameEs: 'Cita por Helado', cost: 150, icon: '🍦', color: 'bg-pink-500', descEn: 'Redeem for one ice cream trip!', descEs: '¡Canjea por un viaje por helado!' },
  { id: 'movie', nameEn: 'Pick the Movie', nameEs: 'Elige la Película', cost: 200, icon: '🍿', color: 'bg-indigo-500', descEn: 'You are the boss of movie night.', descEs: 'Tú mandas en la noche de películas.' },
  { id: 'fastfood', nameEn: 'Fast Food Run', nameEs: 'Comida Rápida', cost: 300, icon: '🍔', color: 'bg-amber-500', descEn: 'Chick-fil-A, or your favorite spot!', descEs: '¡Chick-fil-A o tu lugar favorito!' },
  { id: 'screentime', nameEn: 'Extra Screen Time', nameEs: 'Tiempo de Pantalla', cost: 100, icon: '📱', color: 'bg-cyan-500', descEn: '30 extra minutes of tablet/gaming.', descEs: '30 minutos extra de tablet o juegos.' },
  { id: 'toy', nameEn: 'New Small Toy', nameEs: 'Juguete Nuevo', cost: 500, icon: '🧸', color: 'bg-emerald-500', descEn: 'A surprise trip to the toy aisle.', descEs: 'Un viaje sorpresa al pasillo de juguetes.' },
  { id: 'bedtime', nameEn: 'Stay Up Late', nameEs: 'Quedarse Despierto', cost: 250, icon: '🦉', color: 'bg-purple-500', descEn: 'Stay up 30 minutes past bedtime.', descEs: 'Quédate despierto 30 minutos más.' },
];

// Stabilized confetti positions — generated once at module load, not on every render
const CONFETTI_ITEMS = [...Array(30)].map((_, i) => ({
  key: i,
  left: `${Math.random() * 100}%`,
  color: ['#f43f5e', '#3b82f6', '#eab308', '#22c55e', '#a855f7', '#ff7eb3'][Math.floor(Math.random() * 6)],
  animationDelay: `${Math.random() * 2}s`,
  animationDuration: `${1.5 + Math.random() * 2}s`,
}));

// --- Lifted-out static/pure components (no longer re-created on every App render) ---

const ConfettiEffect = memo(() => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden z-50">
    {CONFETTI_ITEMS.map(({ key, left, color, animationDelay, animationDuration }) => (
      <div
        key={key}
        className="absolute animate-confetti w-3 h-3 rounded-sm"
        style={{ left, backgroundColor: color, animationDelay, animationDuration }}
      />
    ))}
  </div>
));

const PageContainer = memo(({ children, className = "", isDark }) => (
  <div className={`h-full flex flex-col overflow-hidden transition-colors duration-500 ${isDark ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'}`}>
    <div className={`flex-grow overflow-y-auto scroll-smooth custom-scrollbar p-6 ${className}`}>
      {children}
    </div>
  </div>
));

const ThemeToggle = memo(({ isDark, onToggle }) => (
  <button
    onClick={onToggle}
    className={`p-2 rounded-xl border transition-all ${isDark ? 'bg-white/10 border-white/20 text-yellow-400' : 'bg-slate-200 border-slate-300 text-slate-700'}`}
  >
    {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
  </button>
));

// --- Pure child components with React.memo to avoid unnecessary re-renders ---

const QuestCard = memo(function QuestCard({ icon, title, color, done, onClick, isDark }) {
  return (
    <button
      onClick={onClick}
      className={`relative p-5 rounded-[2.5rem] border transition-all active:scale-95 ${done ? (isDark ? 'bg-indigo-600 border-indigo-400' : 'bg-indigo-500 border-indigo-400 shadow-lg') : (isDark ? 'bg-slate-900/50 border-white/5 hover:bg-white/5' : 'bg-white border-slate-200 shadow-sm')}`}
    >
      <div className={`${done ? 'bg-white/20' : color} p-3 rounded-2xl w-fit mb-3 text-white shadow-lg`}>{icon}</div>
      <h3 className={`font-black text-left text-sm ${done ? 'text-white' : (isDark ? 'text-slate-300' : 'text-slate-700')}`}>{title}</h3>
      {done && <CheckCircle2 className="absolute top-4 right-4 w-5 h-5 text-indigo-100" />}
    </button>
  );
});

// Hero Packing — interactive checklist
const PACKING_ITEMS = [
  { id: 'pjs',      en: 'Comfy PJs',       es: 'Pijama Cómoda',     icon: '🛏️' },
  { id: 'toy',      en: 'Favorite Toy',    es: 'Juguete Favorito',  icon: '🧸' },
  { id: 'tablet',   en: 'Tablet/Charger',  es: 'Tablet/Cargador',   icon: '📱' },
  { id: 'blanket',  en: 'Cozy Blanket',    es: 'Cobija Favorita',   icon: '🧣' },
  { id: 'snacks',   en: 'Post-Op Snacks',  es: 'Bocadillos',        icon: '🍎' },
  { id: 'book',     en: 'Book or Game',    es: 'Libro o Juego',     icon: '📚' },
];

const ChecklistView = memo(function ChecklistView({ onBack, onDone, isDark, t, lang, isComplete }) {
  const [checked, setChecked] = useState({});
  const allChecked = PACKING_ITEMS.every(i => checked[i.id]);

  const toggle = useCallback((id) => {
    setChecked(prev => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const handleDone = useCallback(() => {
    onDone();
    onBack();
  }, [onDone, onBack]);

  return (
    <div className={`h-full flex flex-col p-6 transition-colors duration-500 ${isDark ? 'bg-purple-950 text-white' : 'bg-purple-50 text-slate-900'}`}>
      <button onClick={onBack} className="self-start p-3 rounded-2xl border mb-6"><ArrowLeft /></button>
      <h2 className="text-3xl font-black mb-1">{t('packingTitle')}</h2>
      <p className={`text-sm mb-6 opacity-60`}>{t('packingDesc')}</p>
      <div className="space-y-3 flex-grow overflow-y-auto pr-1 custom-scrollbar pb-4">
        {PACKING_ITEMS.map(item => (
          <button
            key={item.id}
            onClick={() => toggle(item.id)}
            className={`w-full flex items-center p-4 rounded-2xl border transition-all active:scale-95 ${
              checked[item.id]
                ? (isDark ? 'bg-purple-600 border-purple-400' : 'bg-purple-500 border-purple-400')
                : (isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200 shadow-sm')
            }`}
          >
            <span className="text-3xl mr-4">{item.icon}</span>
            <span className={`font-black text-base flex-grow text-left ${checked[item.id] ? 'text-white line-through opacity-70' : ''}`}>
              {lang === 'es' ? item.es : item.en}
            </span>
            {checked[item.id] && <CheckCircle2 className="w-6 h-6 text-white" />}
          </button>
        ))}
      </div>
      <button
        onClick={handleDone}
        disabled={!allChecked && !isComplete}
        className={`mt-6 py-5 rounded-[2.5rem] font-black text-xl shadow-2xl transition-all active:scale-95 ${
          allChecked || isComplete
            ? 'bg-purple-500 text-white'
            : (isDark ? 'bg-white/10 text-white/30 cursor-not-allowed' : 'bg-slate-200 text-slate-400 cursor-not-allowed')
        }`}
      >
        {t('packingDone')} +100 <Coins className="w-4 h-4 inline ml-1" />
      </button>
    </div>
  );
});

// Squeaky Clean — shower checklist
const CLEAN_ITEMS = [
  { id: 'shower',  en: 'Take a shower',      es: 'Tomar una ducha',       icon: '🚿' },
  { id: 'hair',    en: 'Wash your hair',      es: 'Lavarse el pelo',       icon: '💆' },
  { id: 'teeth',   en: 'Brush your teeth',   es: 'Cepillarse los dientes', icon: '🦷' },
  { id: 'clothes', en: 'Put on clean clothes', es: 'Ropa limpia',          icon: '👕' },
];

const SqueakyCleanView = memo(function SqueakyCleanView({ onBack, onDone, isDark, t, lang, isComplete }) {
  const [checked, setChecked] = useState({});
  const allChecked = CLEAN_ITEMS.every(i => checked[i.id]);

  const toggle = useCallback((id) => {
    setChecked(prev => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const handleDone = useCallback(() => {
    onDone();
    onBack();
  }, [onDone, onBack]);

  return (
    <div className={`h-full flex flex-col p-6 transition-colors duration-500 ${isDark ? 'bg-teal-950 text-white' : 'bg-teal-50 text-teal-900'}`}>
      <button onClick={onBack} className="self-start p-3 rounded-2xl border mb-6"><ArrowLeft /></button>
      <h2 className="text-3xl font-black mb-1">{t('cleanTitle')}</h2>
      <p className="text-sm mb-6 opacity-60">{t('cleanDesc')}</p>
      <div className="space-y-3 flex-grow overflow-y-auto pr-1 custom-scrollbar pb-4">
        {CLEAN_ITEMS.map(item => (
          <button
            key={item.id}
            onClick={() => toggle(item.id)}
            className={`w-full flex items-center p-4 rounded-2xl border transition-all active:scale-95 ${
              checked[item.id]
                ? (isDark ? 'bg-teal-600 border-teal-400' : 'bg-teal-500 border-teal-400')
                : (isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200 shadow-sm')
            }`}
          >
            <span className="text-3xl mr-4">{item.icon}</span>
            <span className={`font-black text-base flex-grow text-left ${checked[item.id] ? 'text-white line-through opacity-70' : ''}`}>
              {lang === 'es' ? item.es : item.en}
            </span>
            {checked[item.id] && <CheckCircle2 className="w-6 h-6 text-white" />}
          </button>
        ))}
      </div>
      <button
        onClick={handleDone}
        disabled={!allChecked && !isComplete}
        className={`mt-6 py-5 rounded-[2.5rem] font-black text-xl shadow-2xl transition-all active:scale-95 ${
          allChecked || isComplete
            ? 'bg-teal-500 text-white'
            : (isDark ? 'bg-white/10 text-white/30 cursor-not-allowed' : 'bg-slate-200 text-slate-400 cursor-not-allowed')
        }`}
      >
        {t('cleanDone')} +75 <Coins className="w-4 h-4 inline ml-1" />
      </button>
    </div>
  );
});

// OR Tour — tappable equipment cards
const OR_TOUR_ITEMS = [
  { id: 'mask',     en: 'Oxygen Mask',      es: 'Máscara de Oxígeno', icon: <Wind className="w-7 h-7 text-white" />,        color: 'bg-emerald-500', fact: 'Helps you breathe the sleepy-air that keeps you resting.',        factEs: 'Te ayuda a respirar el aire mágico que te mantiene dormido.' },
  { id: 'monitor',  en: 'Heart Monitor',    es: 'Monitor Cardíaco',   icon: <Activity className="w-7 h-7 text-white" />,    color: 'bg-rose-500',    fact: 'Watches your heart beat to keep you super safe.',               factEs: 'Vigila los latidos de tu corazón para mantenerte seguro.' },
  { id: 'blanket',  en: 'Warm Blankets',   es: 'Cobijas Cálidas',     icon: <Bed className="w-7 h-7 text-white" />,          color: 'bg-amber-500',   fact: 'Keeps you warm and cozy the whole time.',                      factEs: 'Te mantiene calientito y cómodo todo el tiempo.' },
  { id: 'light',    en: 'Big OR Light',    es: 'Luz del Quirófano',   icon: <Zap className="w-7 h-7 text-white" />,          color: 'bg-yellow-500',  fact: 'A giant lamp so the doctors can see really well.',             factEs: 'Una lámpara gigante para que los doctores vean muy bien.' },
  { id: 'scope',    en: 'Stethoscope',     es: 'Estetoscopio',        icon: <Stethoscope className="w-7 h-7 text-white" />, color: 'bg-indigo-500',  fact: 'Your doctor uses this to listen to your heart and lungs.',     factEs: 'Tu médico lo usa para escuchar tu corazón y pulmones.' },
];

const ORTourView = memo(function ORTourView({ onBack, onDone, isDark, t, lang, isComplete }) {
  const [seen, setSeen] = useState({});
  const [expanded, setExpanded] = useState(null);
  const allSeen = OR_TOUR_ITEMS.every(i => seen[i.id]);

  const tap = useCallback((id) => {
    setSeen(prev => ({ ...prev, [id]: true }));
    setExpanded(prev => prev === id ? null : id);
  }, []);

  const handleDone = useCallback(() => {
    onDone();
    onBack();
  }, [onDone, onBack]);

  return (
    <div className={`h-full flex flex-col p-6 transition-colors duration-500 ${isDark ? 'bg-cyan-950 text-white' : 'bg-cyan-50 text-cyan-900'}`}>
      <button onClick={onBack} className="self-start p-3 rounded-2xl border mb-6"><ArrowLeft /></button>
      <h2 className="text-3xl font-black mb-1">{t('orTourTitle')}</h2>
      <p className="text-sm mb-6 opacity-60">{t('orTourDesc')}</p>
      <div className="space-y-3 flex-grow overflow-y-auto pr-1 custom-scrollbar pb-4">
        {OR_TOUR_ITEMS.map(item => (
          <div
            key={item.id}
            onClick={() => tap(item.id)}
            className={`rounded-2xl border overflow-hidden transition-all active:scale-95 cursor-pointer ${
              seen[item.id]
                ? (isDark ? 'bg-cyan-800/60 border-cyan-600' : 'bg-cyan-100 border-cyan-300')
                : (isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200 shadow-sm')
            }`}
          >
            <div className="flex items-center p-4">
              <div className={`${item.color} p-3 rounded-2xl mr-4 shadow-lg flex-shrink-0`}>{item.icon}</div>
              <span className="font-black text-base flex-grow">{lang === 'es' ? item.es : item.en}</span>
              {seen[item.id] && <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0" />}
            </div>
            {expanded === item.id && (
              <div className={`px-5 pb-4 text-sm leading-relaxed opacity-80 animate-in fade-in duration-200`}>
                {lang === 'es' ? item.factEs : item.fact}
              </div>
            )}
          </div>
        ))}
      </div>
      <button
        onClick={handleDone}
        disabled={!allSeen && !isComplete}
        className={`mt-6 py-5 rounded-[2.5rem] font-black text-xl shadow-2xl transition-all active:scale-95 ${
          allSeen || isComplete
            ? 'bg-cyan-500 text-white'
            : (isDark ? 'bg-white/10 text-white/30 cursor-not-allowed' : 'bg-slate-200 text-slate-400 cursor-not-allowed')
        }`}
      >
        {t('orTourDone')} +80 <Coins className="w-4 h-4 inline ml-1" />
      </button>
    </div>
  );
});

// Fasting View — specific medical instructions
const FastingView = memo(function FastingView({ onBack, onDone, isDark, t, isComplete }) {
  const handleDone = useCallback(() => {
    onDone();
    onBack();
  }, [onDone, onBack]);

  return (
    <div className={`h-full flex flex-col p-6 transition-colors duration-500 ${isDark ? 'bg-amber-950 text-white' : 'bg-amber-50 text-slate-900'}`}>
      <button onClick={onBack} className="self-start p-3 rounded-2xl border mb-8"><ArrowLeft /></button>
      <h2 className="text-4xl font-black mb-6 leading-tight">{t('questFasting')}</h2>
      <div className="space-y-4 flex-grow overflow-y-auto pr-2 custom-scrollbar">
        <div className={`p-6 rounded-[2.5rem] border ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'}`}>
          <h3 className="font-black mb-2 text-amber-400">{t('fastingHeader')}</h3>
          <p className="text-sm opacity-80 leading-relaxed font-medium">{t('fastingRule')}</p>
        </div>
        <div className="bg-amber-500 text-white p-6 rounded-[2.5rem] shadow-xl">
          <p className="font-black text-xl">{t('missionObjective')}</p>
          <p className="text-sm font-medium opacity-90 mt-2">{t('dailyQuestDesc')}</p>
        </div>
      </div>
      <button
        onClick={handleDone}
        className="mt-8 py-5 rounded-[2.5rem] font-black text-xl shadow-2xl transition-all active:scale-95 bg-amber-500 text-white"
      >
        {t('finishQuest')} +100 <Coins className="w-4 h-4 inline ml-1" />
      </button>
    </div>
  );
});

const RecoveryView = memo(function RecoveryView({ isDark, onBack, onClaim, hasClaimed, t }) {
  const [started, setStarted] = useState(hasClaimed);

  const handleClaim = useCallback(() => {
    onClaim();
    setStarted(true);
  }, [onClaim]);

  return (
    <div className={`h-full flex flex-col p-6 transition-colors duration-500 ${isDark ? 'bg-emerald-950 text-white' : 'bg-emerald-50 text-emerald-900'}`}>
      {!started ? (
        <div className="flex-grow flex flex-col items-center justify-center text-center">
          <Sparkles className="w-20 h-20 text-yellow-400 mb-8 animate-bounce" />
          <h2 className="text-4xl font-black mb-4 leading-tight">{t('victoryTitle')}</h2>
          <p className="opacity-60 mb-12 max-w-xs mx-auto">{t('victoryDesc')}</p>
          <button onClick={handleClaim} className="bg-emerald-500 w-full max-w-xs py-5 rounded-[2.5rem] font-black text-xl text-white shadow-xl active:scale-95 transition-all">{t('claimVictory')}</button>
          <button onClick={onBack} className="mt-8 opacity-40 font-black uppercase tracking-[0.2em] text-[10px]">{t('returnBase')}</button>
        </div>
      ) : (
        <div className="flex flex-col h-full">
          <header className="flex items-center mb-8"><button onClick={onBack} className="p-3 rounded-2xl border mr-4"><ArrowLeft /></button></header>
          <div className="flex-grow flex flex-col items-center justify-center animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="text-center w-full">
              <Trophy className="w-32 h-32 text-yellow-400 mx-auto mb-6" />
              <h3 className="text-3xl font-black mb-2">{t('victoryTitle')}</h3>
              <p className="opacity-60 text-sm mb-10">{t('freeDayEarned')}</p>

              <div className="bg-blue-500 text-white p-6 rounded-[2.5rem] shadow-2xl relative overflow-hidden max-w-xs mx-auto mb-8">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Bed className="w-32 h-32 transform rotate-12" />
                </div>
                <div className="relative z-10 flex items-center">
                  <div className="text-5xl mr-5 shadow-sm">🛌</div>
                  <div className="text-left">
                    <h4 className="font-black text-xl mb-1">{t('freeDay')}</h4>
                    <p className="text-xs opacity-90">{t('freeDayDesc')}</p>
                  </div>
                </div>
              </div>
              <p className="mt-8 text-xs font-bold opacity-50 uppercase tracking-widest">{t('checkWallet')}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

// Lifted out of App — no longer re-defined on every render
const RedemptionCelebration = memo(function RedemptionCelebration({ ticket, isDark, onConfirm, t, lang }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/90 backdrop-blur-xl animate-in fade-in duration-300">
      <ConfettiEffect />
      <div className={`w-full max-w-sm p-10 rounded-[3.5rem] text-center relative animate-in zoom-in-95 slide-in-from-bottom-10 duration-500 ${isDark ? 'bg-slate-900 border border-white/10' : 'bg-white shadow-2xl'}`}>
        <div className="absolute -top-12 left-1/2 -translate-x-1/2">
          <div className="bg-yellow-400 p-4 rounded-full shadow-lg shadow-yellow-400/20 animate-bounce">
            <PartyPopper className="w-10 h-10 text-yellow-900" />
          </div>
        </div>

        <div className={`${ticket.color} w-32 h-32 rounded-[2.5rem] mx-auto mb-8 flex items-center justify-center text-6xl shadow-2xl rotate-6 ring-8 ring-white/10`}>
          {ticket.icon}
        </div>

        <h2 className={`text-4xl font-black mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>{t('congrats')}</h2>
        <p className={`opacity-60 text-sm mb-10 px-4 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{t('enjoyReward')}</p>

        <div className={`relative p-6 rounded-3xl border-2 border-dashed mb-10 overflow-hidden ${isDark ? 'bg-white/5 border-white/20' : 'bg-slate-50 border-slate-200'}`}>
          <div className="absolute top-0 bottom-0 left-0 w-2 bg-indigo-500 opacity-50" />
          <div className="absolute top-0 bottom-0 right-0 w-2 bg-indigo-500 opacity-50" />
          <span className="font-black text-2xl block mb-1">
            {lang === 'es' ? ticket.nameEs : ticket.nameEn}
          </span>
          <span className="text-[10px] uppercase tracking-widest font-bold opacity-40">Verified Hero Reward</span>
        </div>

        <button
          onClick={onConfirm}
          className="w-full bg-indigo-500 text-white py-5 rounded-2xl font-black text-xl shadow-xl shadow-indigo-500/30 active:scale-95 transition-all hover:bg-indigo-400"
        >
          {t('close')}
        </button>
      </div>
    </div>
  );
});

// Lifted out of App — no more re-creation on every render
const TicketStoreView = memo(function TicketStoreView({ coins, isDark, myTickets, onBack, onBuyTicket, onTriggerRedeem, t, lang }) {
  const [tab, setTab] = useState('store');

  const handleStore = useCallback(() => setTab('store'), []);
  const handleWallet = useCallback(() => setTab('wallet'), []);

  return (
    <PageContainer isDark={isDark}>
      <div className="flex justify-between items-center mb-6">
        <button onClick={onBack} className={`p-3 rounded-2xl border ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200 shadow-sm'}`}><ArrowLeft /></button>
        <div className={`px-4 py-2 rounded-2xl flex items-center border ${isDark ? 'bg-amber-400/10 border-amber-400/20' : 'bg-amber-50 border-amber-200 shadow-sm'}`}>
          <Coins className="w-4 h-4 text-amber-500 mr-2" />
          <span className="font-black text-amber-500">{coins}</span>
        </div>
      </div>

      <div className={`flex p-1.5 rounded-full mb-8 ${isDark ? 'bg-slate-900 border border-white/5' : 'bg-slate-200'}`}>
        <button onClick={handleStore} className={`flex-1 py-3 rounded-full text-sm font-black transition-all ${tab === 'store' ? (isDark ? 'bg-indigo-500 text-white shadow-lg' : 'bg-white text-indigo-600 shadow-md') : 'opacity-50'}`}>{t('buyTickets')}</button>
        <button onClick={handleWallet} className={`flex-1 py-3 rounded-full text-sm font-black transition-all flex justify-center items-center ${tab === 'wallet' ? (isDark ? 'bg-indigo-500 text-white shadow-lg' : 'bg-white text-indigo-600 shadow-md') : 'opacity-50'}`}>
          {t('myWallet')} {myTickets.length > 0 && <span className="ml-2 bg-amber-400 text-amber-900 text-[10px] px-2 py-0.5 rounded-full">{myTickets.length}</span>}
        </button>
      </div>

      {tab === 'store' ? (
        <div className="space-y-4 pb-12">
          <h3 className="text-[10px] font-black opacity-40 uppercase tracking-widest mb-4 px-2">{t('availableRewards')}</h3>
          {TICKETS_DATA.map(ticket => (
            <div key={ticket.id} className={`p-5 rounded-[2rem] border relative overflow-hidden flex flex-col ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200 shadow-sm'}`}>
              <div className={`absolute left-0 top-0 bottom-0 w-3 border-r-4 border-dashed ${isDark ? 'border-slate-950 bg-white/5' : 'border-slate-50 bg-slate-100'}`} />
              <div className="ml-4 flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`${ticket.color} p-3 rounded-2xl text-2xl shadow-lg mr-4`}>{ticket.icon}</div>
                  <div>
                    <h4 className="font-black text-lg">{lang === 'es' ? ticket.nameEs : ticket.nameEn}</h4>
                    <p className="text-xs opacity-60 mt-0.5">{lang === 'es' ? ticket.descEs : ticket.descEn}</p>
                  </div>
                </div>
              </div>
              <div className="ml-4 mt-5 flex justify-end">
                <button
                  onClick={() => onBuyTicket(ticket)}
                  disabled={coins < ticket.cost}
                  className={`px-6 py-3 rounded-xl font-black text-sm flex items-center transition-all active:scale-95 ${coins >= ticket.cost ? 'bg-indigo-500 text-white hover:bg-indigo-400 shadow-lg' : (isDark ? 'bg-white/5 text-white/30 cursor-not-allowed' : 'bg-slate-100 text-slate-400 cursor-not-allowed')}`}
                >
                  {t('buyFor')} {ticket.cost} <Coins className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4 pb-12">
          <h3 className="text-[10px] font-black opacity-40 uppercase tracking-widest mb-4 px-2">{t('readyToShow')}</h3>
          {myTickets.length === 0 ? (
            <div className={`text-center p-8 rounded-[2rem] border border-dashed ${isDark ? 'border-white/20' : 'border-slate-300'}`}>
              <Ticket className="w-12 h-12 mx-auto mb-3 opacity-20" />
              <p className="opacity-50 font-medium">{t('emptyWallet')}</p>
            </div>
          ) : (
            myTickets.map(ticket => (
              <div key={ticket.instanceId} onClick={() => onTriggerRedeem(ticket)} className={`p-6 rounded-[2rem] cursor-pointer relative overflow-hidden flex items-center justify-between transition-transform active:scale-95 ${ticket.color} text-white shadow-xl`}>
                <div className="absolute left-0 top-0 bottom-0 w-4 border-r-4 border-dashed border-white/30 bg-black/10" />
                <div className="ml-4 flex items-center z-10">
                  <div className="text-4xl mr-4 drop-shadow-md">{ticket.icon}</div>
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-widest bg-black/20 px-2 py-0.5 rounded w-fit mb-1">{t('parentTicket')}</div>
                    <h4 className="font-black text-xl leading-tight">{lang === 'es' ? ticket.nameEs : ticket.nameEn}</h4>
                  </div>
                </div>
                <div className="z-10 bg-white/20 p-3 rounded-2xl backdrop-blur-sm">
                  <span className="font-bold text-xs">{t('redeem')}</span>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </PageContainer>
  );
});

// Pure helper — outside of component tree
function calculateSleeps(date) {
  if (!date) return "?";
  const diff = new Date(date) - new Date();
  const sleeps = Math.ceil(diff / (1000 * 60 * 60 * 24));
  return sleeps > 0 ? sleeps : 0;
}

export default function App() {
  // --- Core State ---
  const [currentView, setCurrentView] = useState('onboarding');
  const [lang, setLang] = useState('en');
  const [theme, setTheme] = useState('dark');
  const [childName, setChildName] = useState('');
  const [surgeryDate, setSurgeryDate] = useState('');
  const [coins, setCoins] = useState(100);
  const [myTickets, setMyTickets] = useState([]);
  const [completedQuests, setCompletedQuests] = useState([]);
  const [celebrationTicket, setCelebrationTicket] = useState(null);

  const isDark = theme === 'dark';

  // Memoized translation function — only recreated when lang changes
  const t = useCallback((key, params = {}) => {
    let str = LANGUAGES[lang]?.[key] || LANGUAGES['en'][key] || key;
    Object.keys(params).forEach(p => str = str.replace(`{${p}}`, params[p]));
    return str;
  }, [lang]);

  // Memoized sleeps count — only recalculates when surgeryDate changes
  const sleepsLeft = useMemo(() => calculateSleeps(surgeryDate), [surgeryDate]);

  // --- Stable callbacks ---
  const addCoins = useCallback((amount, questId) => {
    setCompletedQuests(prev => {
      if (prev.includes(questId)) return prev;
      setCoins(c => c + amount);
      return [...prev, questId];
    });
  }, []);

  const buyTicket = useCallback((ticket) => {
    setCoins(c => {
      if (c >= ticket.cost) {
        setMyTickets(prev => [...prev, { ...ticket, instanceId: Date.now() }]);
        return c - ticket.cost;
      }
      return c;
    });
  }, []);

  const triggerRedeem = useCallback((ticket) => {
    setCelebrationTicket(ticket);
  }, []);

  const confirmRedeem = useCallback(() => {
    setMyTickets(prev => prev.filter(t => t.instanceId !== celebrationTicket.instanceId));
    setCelebrationTicket(null);
  }, [celebrationTicket]);

  const claimVictoryLap = useCallback(() => {
    setCompletedQuests(prev => {
      if (prev.includes('victory')) return prev;
      const freeDayTicket = {
        id: 'freeday', nameEn: 'Free Day', nameEs: 'Día Libre',
        cost: 0, icon: '🛌', color: 'bg-blue-500',
        descEn: 'Sleep in and get proper rest!', descEs: '¡Duerme hasta tarde y descansa bien!'
      };
      setMyTickets(p => [{ ...freeDayTicket, instanceId: Date.now() }, ...p]);
      return [...prev, 'victory'];
    });
  }, []);

  const toggleTheme = useCallback(() => setTheme(t => t === 'dark' ? 'light' : 'dark'), []);
  const goToDashboard = useCallback(() => setCurrentView('dashboard'), []);
  const goToShop = useCallback(() => setCurrentView('shop'), []);
  const goToClean = useCallback(() => setCurrentView('clean'), []);
  const goToExplorer = useCallback(() => setCurrentView('explorer'), []);
  const goToRecovery = useCallback(() => setCurrentView('recovery'), []);
  const goToFasting = useCallback(() => setCurrentView('fasting'), []);
  const goToChecklist = useCallback(() => setCurrentView('checklist'), []);

  // Memoized quest completion flags to avoid repeated .includes() calls in render
  const questDone = useMemo(() => ({
    fasting: completedQuests.includes('fasting'),
    checklist: completedQuests.includes('checklist'),
    clean: completedQuests.includes('clean'),
    explorer: completedQuests.includes('explorer'),
    victory: completedQuests.includes('victory'),
  }), [completedQuests]);

  const renderOnboarding = () => (
    <div className={`h-full flex flex-col items-center justify-center p-8 transition-colors duration-500 ${isDark ? 'bg-slate-950 text-white' : 'bg-indigo-600 text-white'}`}>
      <div className="absolute top-6 right-6 flex items-center space-x-3 z-20">
        <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
        <select
          className="bg-white/10 border border-white/20 rounded-xl px-4 py-2 backdrop-blur-md outline-none text-sm font-bold"
          value={lang} onChange={(e) => setLang(e.target.value)}
        >
          <option value="en" className="text-black">English</option>
          <option value="es" className="text-black">Español</option>
        </select>
      </div>
      <div className="relative mb-12">
        <div className={`absolute -inset-10 blur-3xl rounded-full animate-pulse ${isDark ? 'bg-indigo-500/20' : 'bg-white/20'}`} />
        <div className={`relative p-8 rounded-[3rem] shadow-2xl border ${isDark ? 'bg-slate-900 border-white/10' : 'bg-white/20 border-white/30'}`}>
          <Sparkles className="w-16 h-16 text-yellow-300" />
        </div>
      </div>
      <h1 className="text-4xl font-black mb-2 tracking-tight text-center">Surgery Safari</h1>
      <form onSubmit={(e) => { e.preventDefault(); setCurrentView('dashboard'); }} className="w-full max-w-sm space-y-4">
        <div className={`border p-6 rounded-[2.5rem] backdrop-blur-xl ${isDark ? 'bg-white/5 border-white/10' : 'bg-white/10 border-white/20'}`}>
          <input
            type="text" placeholder="Hero Name"
            className={`w-full rounded-2xl px-5 py-4 text-xl focus:ring-2 focus:ring-indigo-400 outline-none transition-all placeholder:opacity-30 ${isDark ? 'bg-white/10 border-white/10' : 'bg-white/20 border-white/30'}`}
            value={childName} onChange={(e) => setChildName(e.target.value)} required
          />
          <input
            type="date"
            className={`w-full rounded-2xl px-5 py-4 mt-4 focus:ring-2 focus:ring-indigo-400 outline-none transition-all ${isDark ? 'bg-white/10 border-white/10' : 'bg-white/20 border-white/30'}`}
            value={surgeryDate} onChange={(e) => setSurgeryDate(e.target.value)} required
          />
        </div>
        <button type="submit" className="w-full bg-white text-indigo-600 hover:bg-indigo-50 font-black py-5 rounded-[2rem] text-xl shadow-xl active:scale-95 transition-all uppercase tracking-tighter">
          Start Adventure
        </button>
      </form>
    </div>
  );

  const renderDashboard = () => (
    <PageContainer isDark={isDark}>
      <header className="flex justify-between items-center mb-8 sticky top-0 bg-inherit z-10 py-2">
        <div>
          <h1 className="text-2xl font-black">{t('welcome', { name: childName })}</h1>
          <div className="flex items-center text-indigo-500 text-sm font-bold mt-0.5">
            <Clock className="w-4 h-4 mr-1" />
            <span>{sleepsLeft} {t('countdown')}</span>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
          <div className={`px-4 py-2 rounded-2xl flex items-center border ${isDark ? 'bg-amber-400/10 border-amber-400/20' : 'bg-amber-50 border-amber-200 shadow-sm'}`}>
            <Coins className="w-5 h-5 text-amber-500 mr-2" />
            <span className="font-black text-amber-500 text-lg leading-none">{coins}</span>
          </div>
        </div>
      </header>

      {/* Ticket Booth Entry */}
      <div
        onClick={goToShop}
        className={`mb-8 relative overflow-hidden rounded-[2.8rem] cursor-pointer transition-transform active:scale-95 border-2 shadow-xl p-6 flex items-center ${isDark ? 'bg-gradient-to-br from-indigo-900 to-purple-900 border-white/10' : 'bg-gradient-to-br from-indigo-500 to-purple-600 border-indigo-400 text-white'}`}
      >
        <div className="absolute top-0 right-0 p-8 opacity-20">
          <Ticket className="w-32 h-32 transform rotate-12" />
        </div>
        <div className="relative z-10 flex-grow">
          <div className="bg-white/20 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest w-fit mb-2 backdrop-blur-sm">
            {t('shop')}
          </div>
          <h2 className="text-2xl font-black text-white">{t('parentTicket')}</h2>
          <p className="text-indigo-100 mt-1 text-sm font-medium">
            {myTickets.length} {t('myWallet')}
          </p>
        </div>
        <div className="relative z-10 bg-white p-4 rounded-2xl shadow-lg ml-4">
          <Gift className="text-indigo-600 w-8 h-8" />
        </div>
      </div>

      <div className="space-y-10 pb-12">
        {/* Daily Quests Section */}
        <section>
          <h2 className="text-[11px] font-black opacity-50 uppercase tracking-[0.2em] mb-4 flex items-center px-2">
            <Star className="w-4 h-4 mr-2 text-indigo-500" /> {t('prep')}
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <QuestCard icon={<Utensils />} title={t('questFasting')} color="bg-amber-500" done={questDone.fasting} onClick={goToFasting} isDark={isDark} />
            <QuestCard icon={<CheckSquare />} title={t('questChecklist')} color="bg-purple-500" done={questDone.checklist} onClick={goToChecklist} isDark={isDark} />
            <QuestCard icon={<ShowerHead />} title={t('questClean')} color="bg-teal-500" done={questDone.clean} onClick={goToClean} isDark={isDark} />
            <QuestCard icon={<Stethoscope />} title={t('questTour')} color="bg-cyan-500" done={questDone.explorer} onClick={goToExplorer} isDark={isDark} />
          </div>
        </section>

        {/* Victory Lap Section */}
        <section>
          <h2 className="text-[11px] font-black opacity-50 uppercase tracking-[0.2em] mb-4 flex items-center px-2">
            <Trophy className="w-4 h-4 mr-2 text-emerald-500" /> {t('recovery')}
          </h2>
          <div
            onClick={goToRecovery}
            className={`p-6 rounded-[2.5rem] border flex items-center justify-between transition-all active:scale-95 cursor-pointer ${isDark ? 'bg-white/5 border-white/5' : 'bg-white border-slate-200 shadow-sm'}`}
          >
            <div className="flex items-center">
              <div className={`p-4 rounded-2xl mr-4 ${questDone.victory ? (isDark ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-600') : (isDark ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-100 text-emerald-600')}`}>
                {questDone.victory ? <Bed className="w-6 h-6" /> : <Trophy className="w-6 h-6" />}
              </div>
              <div>
                <h3 className="font-black text-lg">{questDone.victory ? t('victoryTitle') : t('recoveryReady')}</h3>
                <p className="text-xs opacity-50">{questDone.victory ? t('checkWallet') : t('recoveryLocked')}</p>
              </div>
            </div>
            <div className={`${questDone.victory ? 'bg-blue-500' : 'bg-emerald-500'} text-white px-4 py-2 rounded-xl text-xs font-black`}>
              {questDone.victory ? t('close') : t('go')}
            </div>
          </div>
        </section>
      </div>
    </PageContainer>
  );

  return (
    <div className="max-w-md mx-auto h-screen bg-slate-900 relative shadow-2xl overflow-hidden font-sans selection:bg-indigo-500/30">
      <style>{`
        @keyframes confetti-fall {
          0% { transform: translateY(-100px) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
        }
        .animate-confetti { animation: confetti-fall linear infinite; }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { 
          background: ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}; 
          border-radius: 20px; 
        }
      `}</style>

      {celebrationTicket && (
        <RedemptionCelebration
          ticket={celebrationTicket}
          isDark={isDark}
          onConfirm={confirmRedeem}
          t={t}
          lang={lang}
        />
      )}

      {currentView === 'onboarding' && renderOnboarding()}
      {currentView === 'dashboard' && renderDashboard()}
      {currentView === 'shop' && (
        <TicketStoreView
          coins={coins}
          isDark={isDark}
          myTickets={myTickets}
          onBack={goToDashboard}
          onBuyTicket={buyTicket}
          onTriggerRedeem={triggerRedeem}
          t={t}
          lang={lang}
        />
      )}

      {currentView === 'clean' && (
        <SqueakyCleanView
          onBack={goToDashboard}
          onDone={() => addCoins(75, 'clean')}
          isComplete={questDone.clean}
          isDark={isDark} t={t} lang={lang}
        />
      )}
      {currentView === 'explorer' && (
        <ORTourView
          onBack={goToDashboard}
          onDone={() => addCoins(80, 'explorer')}
          isComplete={questDone.explorer}
          isDark={isDark} t={t} lang={lang}
        />
      )}
      {currentView === 'recovery' && (
        <RecoveryView isDark={isDark} onBack={goToDashboard} onClaim={claimVictoryLap} hasClaimed={questDone.victory} t={t} />
      )}
      {currentView === 'fasting' && (
        <FastingView onBack={goToDashboard} onDone={() => addCoins(100, 'fasting')} isComplete={questDone.fasting} isDark={isDark} t={t} />
      )}
      {currentView === 'checklist' && (
        <ChecklistView onBack={goToDashboard} onDone={() => addCoins(100, 'checklist')} isComplete={questDone.checklist} isDark={isDark} t={t} lang={lang} />
      )}
    </div>
  );
}