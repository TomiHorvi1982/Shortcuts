import { ShortcutCategory } from '../types';

export const SHORTCUT_CATEGORIES: ShortcutCategory[] = [
  {
    id: 'favorites',
    title: '⭐ Nejpoužívanější',
    accentColor: '#FFD60A',
    badgeBg: 'rgba(255, 214, 10, 0.2)',
    borderColor: 'rgba(255, 214, 10, 0.5)',
    iconName: 'Sparkles',
    shortcuts: [
      { id: 'fav1', label: 'Spustit / Zastavit přehrávání', keys: ['Mezerník'], isFavorite: true, categoryName: 'Logic Pro' },
      { id: 'fav2', label: 'Spustit nahrávání (Record)', keys: ['R'], isFavorite: true, categoryName: 'Logic Pro' },
      { id: 'fav3', label: 'Rozdělení regionu v místě hlavice', keys: ['⌘', 'T'], isFavorite: true, categoryName: 'Logic Pro' },
      { id: 'fav4', label: 'Vyhledávání (Spotlight)', keys: ['⌘', 'Mezerník'], isFavorite: true, categoryName: 'Systém' },
      { id: 'fav5', label: 'Zobrazit / Skrýt Směšovač (Mixer)', keys: ['X'], isFavorite: true, categoryName: 'Logic Pro' },
      { id: 'fav6', label: 'Zobrazit / Skrýt Automatizaci', keys: ['A'], isFavorite: true, categoryName: 'Logic Pro' },
      { id: 'fav7', label: 'Zapnout / Vypnout metronom (Click)', keys: ['K'], isFavorite: true, categoryName: 'Logic Pro' },
      { id: 'fav8', label: 'Kvantizace výběru (Quantize)', keys: ['Q'], isFavorite: true, categoryName: 'Logic Pro' }
    ]
  },
  {
    id: 'logic_general',
    title: 'Logic Pro: Transport & Základní',
    accentColor: '#30D158',
    badgeBg: 'rgba(48, 209, 88, 0.15)',
    borderColor: 'rgba(48, 209, 88, 0.35)',
    iconName: 'Music',
    shortcuts: [
      { id: 'l_g1', label: 'Přehrát / Zastavit (Play/Stop)', keys: ['Mezerník'], isFavorite: true },
      { id: 'l_g2', label: 'Skočit na začátek (Go to Beginning)', keys: ['Return'], isFavorite: false },
      { id: 'l_g3', label: 'Zastavit a vrátit na začátek', keys: ['⇧', 'Return'], isFavorite: false },
      { id: 'l_g4', label: 'Nahrávat (Record)', keys: ['R'], isFavorite: true },
      { id: 'l_g5', label: 'Zpět (Undo)', keys: ['⌘', 'Z'], isFavorite: false },
      { id: 'l_g6', label: 'Znovu (Redo)', keys: ['⌘', '⇧', 'Z'], isFavorite: false },
      { id: 'l_g7', label: 'Uložit projekt (Save)', keys: ['⌘', 'S'], isFavorite: false },
      { id: 'l_g8', label: 'Nový projekt', keys: ['⌘', 'N'], isFavorite: false },
      { id: 'l_g9', label: 'Otevřít projekt', keys: ['⌘', 'O'], isFavorite: false },
      { id: 'l_g10', label: 'Přidat nové stopy (New Tracks)', keys: ['⌥', '⌘', 'N'], isFavorite: false },
      { id: 'l_g11', label: 'Posun vpřed o 1 takt', keys: ['.'], isFavorite: false },
      { id: 'l_g12', label: 'Posun zpět o 1 takt', keys: [','], isFavorite: false },
      { id: 'l_g13', label: 'Posun vpřed o 8 taktů', keys: ['⇧', '.'], isFavorite: false },
      { id: 'l_g14', label: 'Posun zpět o 8 taktů', keys: ['⇧', ','], isFavorite: false },
      { id: 'l_g15', label: 'Přehrát od výběru', keys: ['⌥', 'Mezerník'], isFavorite: false },
      { id: 'l_g16', label: 'Přehrát od předchozí pozice', keys: ['⌃', 'Mezerník'], isFavorite: false },
      { id: 'l_g17', label: 'Stop a návrat na hranu cyklu', keys: ['⌃', '⇧', 'Mezerník'], isFavorite: false }
    ]
  },
  {
    id: 'logic_midi_tools',
    title: 'Logic Pro: MIDI & Nástroje',
    accentColor: '#0A84FF',
    badgeBg: 'rgba(10, 132, 255, 0.15)',
    borderColor: 'rgba(10, 132, 255, 0.35)',
    iconName: 'Terminal',
    shortcuts: [
      { id: 'l_m1', label: 'Otevřít Piano Roll editor', keys: ['⌘', '4'], isFavorite: false },
      { id: 'l_m2', label: 'Otevřít Score editor (Noty)', keys: ['⌘', '5'], isFavorite: false },
      { id: 'l_m3', label: 'Kvantizovat vybrané noty', keys: ['Q'], isFavorite: true },
      { id: 'l_m4', label: 'Kvantizovat siluetou (Q-Flam)', keys: ['⌘', '⇧', 'Q'], isFavorite: false },
      { id: 'l_m5', label: 'Obrátit pořadí MIDI not (Reverse)', keys: ['⌘', '⇧', 'R'], isFavorite: false },
      { id: 'l_m6', label: 'Transpozice o oktávu nahoru/dolů', keys: ['⇧', '⌥', '↑/↓'], isFavorite: false },
      { id: 'l_m7', label: 'Transpozice o půltón nahoru/dolů', keys: ['⇧', '↑/↓'], isFavorite: false },
      { id: 'l_m8', label: 'Nabídka nástrojů (Tool Menu)', keys: ['T'], isFavorite: true },
      { id: 'l_m9', label: 'Aktivovat Ukazovátko (Pointer)', keys: ['T', 'I'], isFavorite: false },
      { id: 'l_m10', label: 'Aktivovat Tužku (Pencil)', keys: ['T', 'P'], isFavorite: false },
      { id: 'l_m11', label: 'Aktivovat Gumu (Eraser)', keys: ['T', 'E'], isFavorite: false },
      { id: 'l_m12', label: 'Aktivovat Nůžky (Scissors)', keys: ['T', 'C'], isFavorite: false },
      { id: 'l_m13', label: 'Aktivovat Výběrový rám (Marquee)', keys: ['T', 'M'], isFavorite: false },
      { id: 'l_m14', label: 'Aktivovat Prolínačku (Fade)', keys: ['T', 'F'], isFavorite: false }
    ]
  },
  {
    id: 'logic_tracks_mixer',
    title: 'Logic Pro: Stopy & Směšovač',
    accentColor: '#BF5AF2',
    badgeBg: 'rgba(191, 90, 242, 0.15)',
    borderColor: 'rgba(191, 90, 242, 0.35)',
    iconName: 'LayoutGrid',
    shortcuts: [
      { id: 'l_tm1', label: 'Rozdělit region v místě hlavice', keys: ['⌘', 'T'], isFavorite: true },
      { id: 'l_tm2', label: 'Spojit regiony (Join Regions)', keys: ['⌘', 'J'], isFavorite: false },
      { id: 'l_tm3', label: 'Smazat vybraný region', keys: ['Delete'], isFavorite: false },
      { id: 'l_tm4', label: 'Duplikovat region nebo stopu', keys: ['⌘', 'D'], isFavorite: false },
      { id: 'l_tm5', label: 'Převést smyčky na regiony', keys: ['⇧', '⌘', 'D'], isFavorite: false },
      { id: 'l_tm6', label: 'Kopírovat přetažením', keys: ['⌥', 'Drag'], isFavorite: false },
      { id: 'l_tm7', label: 'Zobrazit / Skrýt Směšovač (Mixer)', keys: ['X'], isFavorite: true },
      { id: 'l_tm8', label: 'Přepnout automatizaci (Automation)', keys: ['A'], isFavorite: true },
      { id: 'l_tm9', label: 'Zapnout / Vypnout automatizaci stopy', keys: ['⇧', 'A'], isFavorite: false },
      { id: 'l_tm10', label: 'Sólovat stopu (Solo)', keys: ['S'], isFavorite: true },
      { id: 'l_tm11', label: 'Ztišit stopu (Mute)', keys: ['M'], isFavorite: true },
      { id: 'l_tm12', label: 'Knihovna zvuku (Library)', keys: ['Y'], isFavorite: false },
      { id: 'l_tm13', label: 'Inspektor stopy (Inspector)', keys: ['I'], isFavorite: false },
      { id: 'l_tm14', label: 'Smart Controls okno', keys: ['B'], isFavorite: false }
    ]
  },
  {
    id: 'logic_export_nav',
    title: 'Logic Pro: Export & Navigace',
    accentColor: '#FF9F0A',
    badgeBg: 'rgba(255, 159, 10, 0.15)',
    borderColor: 'rgba(255, 159, 10, 0.35)',
    iconName: 'Laptop',
    shortcuts: [
      { id: 'l_en1', label: 'Exportovat / Bounce projekt', keys: ['⌘', 'B'], isFavorite: false },
      { id: 'l_en2', label: 'Bounce vybraných regionů', keys: ['⌘', '⇧', 'B'], isFavorite: false },
      { id: 'l_en3', label: 'Export stopy jako audio file', keys: ['⌘', '⌥', 'E'], isFavorite: false },
      { id: 'l_en4', label: 'Exportovat výběr', keys: ['⌘', '⇧', 'E'], isFavorite: false },
      { id: 'l_en5', label: 'Zoom na výběr (Zoom to Selection)', keys: ['Z'], isFavorite: true },
      { id: 'l_en6', label: 'Přiblížit / Oddálit vertikálně', keys: ['⌘', '↑/↓'], isFavorite: false },
      { id: 'l_en7', label: 'Přiblížit / Oddálit horizontálně', keys: ['⌘', '←/→'], isFavorite: false },
      { id: 'l_en8', label: 'Přizpůsobit výběr obrazovce', keys: ['⌘', '⇧', 'F'], isFavorite: false },
      { id: 'l_en9', label: 'Prohlížeč smyček (Loop Browser)', keys: ['O'], isFavorite: false },
      { id: 'l_en10', label: 'Souborový prohlížeč (Media Browser)', keys: ['F'], isFavorite: false },
      { id: 'l_en11', label: 'Zapnout smyčku cyklu (Cycle)', keys: ['C'], isFavorite: true },
      { id: 'l_en12', label: 'Vytvořit nový marker', keys: ['⌥', '⌘', 'K'], isFavorite: false },
      { id: 'l_en13', label: 'Otevřít seznam markerů', keys: ['⇧', '⌘', 'K'], isFavorite: false }
    ]
  },
  {
    id: 'system',
    title: 'Systém macOS & GUI',
    accentColor: '#0A84FF',
    badgeBg: 'rgba(10, 132, 255, 0.15)',
    borderColor: 'rgba(10, 132, 255, 0.35)',
    iconName: 'Laptop',
    shortcuts: [
      { id: 's1', label: 'Vyhledávání Spotlight', keys: ['⌘', 'Mezerník'], isFavorite: true },
      { id: 's2', label: 'Snímek obrazovky (výřez)', keys: ['⌘', '⇧', '4'], isFavorite: true },
      { id: 's3', label: 'Snímek celé obrazovky', keys: ['⌘', '⇧', '3'], isFavorite: false },
      { id: 's4', label: 'Lišta snímků & nahrávání videa', keys: ['⌘', '⇧', '5'], isFavorite: false },
      { id: 's5', label: 'Nastavení systému (Preferences)', keys: ['⌘', ','], isFavorite: false },
      { id: 's6', label: 'Vynucené ukončení aplikace (Force Quit)', keys: ['⌘', '⌥', 'Esc'], isFavorite: true },
      { id: 's7', label: 'Vyhledat v dokumentu', keys: ['⌘', 'F'], isFavorite: false },
      { id: 's8', label: 'Uzamčení obrazovky', keys: ['⌃', '⌘', 'Q'], isFavorite: false },
      { id: 's9', label: 'Rychlý náhled souboru (Quick Look)', keys: ['Mezerník'], isFavorite: false },
      { id: 's10', label: 'Přesunout soubor do koše', keys: ['⌘', 'Delete'], isFavorite: false },
      { id: 's11', label: 'Vysypat koš s potvrzením', keys: ['⌘', '⇧', 'Delete'], isFavorite: false },
      { id: 's12', label: 'Skrýt ostatní okna aplikací', keys: ['⌘', '⌥', 'H'], isFavorite: false }
    ]
  },
  {
    id: 'terminal',
    title: 'Terminál & CLI',
    accentColor: '#30D158',
    badgeBg: 'rgba(48, 209, 88, 0.15)',
    borderColor: 'rgba(48, 209, 88, 0.35)',
    iconName: 'Terminal',
    shortcuts: [
      { id: 't1', label: 'Vyčištění obrazovky terminálu', keys: ['⌘', 'K'], isFavorite: false },
      { id: 't2', label: 'Přerušení běhu procesu (SIGINT)', keys: ['⌃', 'C'], isFavorite: true },
      { id: 't3', label: 'Ukončení vstupu / Odhlášení (EOF)', keys: ['⌃', 'D'], isFavorite: false },
      { id: 't4', label: 'Nový panel v terminálu', keys: ['⌘', 'T'], isFavorite: false },
      { id: 't5', label: 'Nové okno terminálu', keys: ['⌘', 'N'], isFavorite: false },
      { id: 't6', label: 'Skok na začátek řádku', keys: ['⌃', 'A'], isFavorite: false },
      { id: 't7', label: 'Skok na konec řádku', keys: ['⌃', 'E'], isFavorite: false },
      { id: 't8', label: 'Smazání celého řádku před kurzorem', keys: ['⌃', 'U'], isFavorite: false },
      { id: 't9', label: 'Zpětné vyhledávání v historii (Reverse Search)', keys: ['⌃', 'R'], isFavorite: false }
    ]
  },
  {
    id: 'text',
    title: 'Text & Prohlížeče',
    accentColor: '#FF9F0A',
    badgeBg: 'rgba(255, 159, 10, 0.15)',
    borderColor: 'rgba(255, 159, 10, 0.35)',
    iconName: 'FileText',
    shortcuts: [
      { id: 'tx1', label: 'Zavřít aktuální panel / okno', keys: ['⌘', 'W'], isFavorite: false },
      { id: 'tx2', label: 'Obnovit naposledy zavřený panel', keys: ['⌘', '⇧', 'T'], isFavorite: true },
      { id: 'tx3', label: 'Skok po celých slovech v textu', keys: ['⌥', '←/→'], isFavorite: false },
      { id: 'tx4', label: 'Označení textu po celých slovech', keys: ['⌥', '⇧', '←/→'], isFavorite: false },
      { id: 'tx5', label: 'Označení celého řádku textu', keys: ['⌘', '⇧', '←/→'], isFavorite: false },
      { id: 'tx6', label: 'Vložení textu bez formátování', keys: ['⌘', '⌥', '⇧', 'V'], isFavorite: true },
      { id: 'tx7', label: 'Otevřít vývojářské nástroje (DevTools)', keys: ['⌘', '⌥', 'I'], isFavorite: false },
      { id: 'tx8', label: 'Tvrdé obnovení stránky (Hard Reload)', keys: ['⌘', '⇧', 'R'], isFavorite: false }
    ]
  },
  {
    id: 'windows',
    title: 'Správa oken & Aplikací',
    accentColor: '#BF5AF2',
    badgeBg: 'rgba(191, 90, 242, 0.15)',
    borderColor: 'rgba(191, 90, 242, 0.35)',
    iconName: 'LayoutGrid',
    shortcuts: [
      { id: 'w1', label: 'Přepínání mezi běžíci aplikacemi', keys: ['⌘', 'Tab'], isFavorite: true },
      { id: 'w2', label: 'Přepínání oken v rámci jedné aplikace', keys: ['⌘', '~'], isFavorite: false },
      { id: 'w3', label: 'Skrýt okno aktivní aplikace', keys: ['⌘', 'H'], isFavorite: false },
      { id: 'w4', label: 'Mission Control (zobrazit všechna okna)', keys: ['⌃', '↑'], isFavorite: false },
      { id: 'w5', label: 'Zobrazit plochu (Desktop view)', keys: ['F11', '⌘', 'F3'], isFavorite: false },
      { id: 'w6', label: 'Otevřít novou plochu v Stage Manageru', keys: ['⌃', '→'], isFavorite: false }
    ]
  }
];
