import { ShortcutCategory } from '../types';

export const SHORTCUT_CATEGORIES: ShortcutCategory[] = [
  {
    id: 'system',
    title: 'Systém & GUI',
    accentColor: '#0A84FF',
    badgeBg: 'rgba(10, 132, 255, 0.15)',
    borderColor: 'rgba(10, 132, 255, 0.35)',
    iconName: 'Laptop',
    shortcuts: [
      { id: 's1', label: 'Vyhledávání (Spotlight)', keys: ['⌘', 'Mezerník'] },
      { id: 's2', label: 'Snímek obrazovky (výřez)', keys: ['⌘', '⇧', '4'] },
      { id: 's3', label: 'Nastavení systému', keys: ['⌘', ','] },
      { id: 's4', label: 'Vynucené ukončení aplikace', keys: ['⌘', '⌥', 'Esc'] },
      { id: 's5', label: 'Vyhledat v dokumentu / stránce', keys: ['⌘', 'F'] },
      { id: 's6', label: 'Uzamčení obrazovky', keys: ['⌃', '⌘', 'Q'] }
    ]
  },
  {
    id: 'terminal',
    title: 'Terminál',
    accentColor: '#30D158',
    badgeBg: 'rgba(48, 209, 88, 0.15)',
    borderColor: 'rgba(48, 209, 88, 0.35)',
    iconName: 'Terminal',
    shortcuts: [
      { id: 't1', label: 'Vyčištění obrazovky', keys: ['⌘', 'K'] },
      { id: 't2', label: 'Přerušení probíhajícího procesu', keys: ['⌃', 'C'] },
      { id: 't3', label: 'Otevření nového okna', keys: ['⌘', 'N'] },
      { id: 't4', label: 'Otevření nového panelu', keys: ['⌘', 'T'] },
      { id: 't5', label: 'Konec relace / Odhlášení', keys: ['⌃', 'D'] },
      { id: 't6', label: 'Skok na začátek / konec řádku', keys: ['⌃', 'A', '/', '⌃', 'E'] }
    ]
  },
  {
    id: 'logic',
    title: 'Logic Pro',
    accentColor: '#FFD60A',
    badgeBg: 'rgba(255, 214, 10, 0.15)',
    borderColor: 'rgba(255, 214, 10, 0.35)',
    iconName: 'Music',
    shortcuts: [
      { id: 'l1', label: 'Spustit / Zastavit přehrávání', keys: ['Mezerník'] },
      { id: 'l2', label: 'Spustit nahrávání', keys: ['R'] },
      { id: 'l3', label: 'Rozdělení regionu v místě hlavice', keys: ['⌘', 'T'] },
      { id: 'l4', label: 'Zapnout / Vypnout metronom', keys: ['K'] },
      { id: 'l5', label: 'Zobrazit / Skrýt Směšovač (Mixer)', keys: ['X'] },
      { id: 'l6', label: 'Zobrazit / Skrýt Smart Controls', keys: ['B'] },
      { id: 'l7', label: 'Zobrazit / Skrýt Editor', keys: ['E'] },
      { id: 'l8', label: 'Návrat na začátek projektu', keys: ['Enter'] }
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
      { id: 'tx1', label: 'Zavřít aktuální panel', keys: ['⌘', 'W'] },
      { id: 'tx2', label: 'Obnovit zavřený panel', keys: ['⌘', '⇧', 'T'] },
      { id: 'tx3', label: 'Skok po celých slovech', keys: ['⌥', '← / →'] },
      { id: 'tx4', label: 'Označení textu po slovech', keys: ['⌥', '⇧', '← / →'] },
      { id: 'tx5', label: 'Označení celého řádku', keys: ['⌘', '⇧', '← / →'] },
      { id: 'tx6', label: 'Vložení bez formátování', keys: ['⌘', '⌥', '⇧', 'V'] }
    ]
  },
  {
    id: 'windows',
    title: 'Správa oken',
    accentColor: '#BF5AF2',
    badgeBg: 'rgba(191, 90, 242, 0.15)',
    borderColor: 'rgba(191, 90, 242, 0.35)',
    iconName: 'LayoutGrid',
    shortcuts: [
      { id: 'w1', label: 'Přepínání mezi aplikacemi', keys: ['⌘', 'Tab'] },
      { id: 'w2', label: 'Přepínání oken stejné aplikace', keys: ['⌘', '~'] },
      { id: 'w3', label: 'Skrýt aktivní aplikaci', keys: ['⌘', 'H'] },
      { id: 'w4', label: 'Mission Control (všechna okna)', keys: ['⌃', '↑'] },
      { id: 'w5', label: 'Zobrazit plochu', keys: ['F11', 'nebo', '⌘', 'F3'] }
    ]
  }
];
