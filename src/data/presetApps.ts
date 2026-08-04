import { ShortcutItem } from '../types';

export interface PresetApp {
  id: string;
  name: string;
  categoryTitle: string;
  accentColor: string;
  iconName: string;
  shortcuts: ShortcutItem[];
}

export const PRESET_APPS: PresetApp[] = [
  {
    id: 'app_photoshop',
    name: 'Adobe Photoshop',
    categoryTitle: 'Adobe Photoshop CC',
    accentColor: '#31A8FF',
    iconName: 'FileText',
    shortcuts: [
      { id: 'ps1', label: 'Vytvořit novou vrstvu (New Layer)', keys: ['⌘', '⇧', 'N'] },
      { id: 'ps2', label: 'Nástroj Ořez (Crop Tool)', keys: ['C'] },
      { id: 'ps3', label: 'Nástroj Štětec (Brush Tool)', keys: ['B'] },
      { id: 'ps4', label: 'Laso výběr (Lasso Tool)', keys: ['L'] },
      { id: 'ps5', label: 'Zrušit výběr (Deselect)', keys: ['⌘', 'D'] },
      { id: 'ps6', label: 'Volná transformace (Free Transform)', keys: ['⌘', 'T'] },
      { id: 'ps7', label: 'Velikost obrazu (Image Size)', keys: ['⌥', '⌘', 'I'] },
      { id: 'ps8', label: 'Uložit pro web (Export As)', keys: ['⌥', '⇧', '⌘', 'W'] }
    ]
  },
  {
    id: 'app_vscode',
    name: 'VS Code (Visual Studio Code)',
    categoryTitle: 'VS Code Editor',
    accentColor: '#007ACC',
    iconName: 'Terminal',
    shortcuts: [
      { id: 'vc1', label: 'Rychlé otevření souboru (Quick Open)', keys: ['⌘', 'P'] },
      { id: 'vc2', label: 'Příkazová paleta (Command Palette)', keys: ['⌘', '⇧', 'P'] },
      { id: 'vc3', label: 'Zobrazit / Skrýt integrovaný terminál', keys: ['⌃', '`'] },
      { id: 'vc4', label: 'Vyhledat napříč všemi soubory', keys: ['⌘', '⇧', 'F'] },
      { id: 'vc5', label: 'Duplikovat řádek dolů', keys: ['⌥', '⇧', '↓'] },
      { id: 'vc6', label: 'Smazat řádek (Delete Line)', keys: ['⌘', '⇧', 'K'] },
      { id: 'vc7', label: 'Přepnout řádkový komentář', keys: ['⌘', '/'] },
      { id: 'vc8', label: 'Formátovat dokument (Prettier)', keys: ['⌥', '⇧', 'F'] }
    ]
  },
  {
    id: 'app_ableton',
    name: 'Ableton Live',
    categoryTitle: 'Ableton Live DAW',
    accentColor: '#FF7600',
    iconName: 'Music',
    shortcuts: [
      { id: 'ab1', label: 'Vložit novou Audio stopu', keys: ['⌘', 'T'] },
      { id: 'ab2', label: 'Vložit novou MIDI stopu', keys: ['⌘', '⇧', 'T'] },
      { id: 'ab3', label: 'Vložit návratovou stopu (Return Track)', keys: ['⌥', '⌘', 'T'] },
      { id: 'ab4', label: 'Rozdělit klip v místě pozice (Split)', keys: ['⌘', 'E'] },
      { id: 'ab5', label: 'Spojit vybrané klipy (Consolidate)', keys: ['⌘', 'J'] },
      { id: 'ab6', label: 'Přepnout Session / Arrangement view', keys: ['Tab'] },
      { id: 'ab7', label: 'Zapnout / Vypnout mřížku (Grid Snap)', keys: ['⌘', '4'] },
      { id: 'ab8', label: 'Kvantizace MIDI not', keys: ['⌘', 'U'] }
    ]
  },
  {
    id: 'app_finalcut',
    name: 'Final Cut Pro',
    categoryTitle: 'Final Cut Pro X',
    accentColor: '#E53935',
    iconName: 'Laptop',
    shortcuts: [
      { id: 'fc1', label: 'Vložit na konec (Append Edit)', keys: ['E'] },
      { id: 'fc2', label: 'Vložit na pozici kurzoru (Insert)', keys: ['W'] },
      { id: 'fc3', label: 'Připojit k hlavní lince (Connect)', keys: ['Q'] },
      { id: 'fc4', label: 'Čepel / Rozseknutí stopy (Blade)', keys: ['⌘', 'B'] },
      { id: 'fc5', label: 'Vytvořit složený klip (Compound Clip)', keys: ['⌥', 'G'] },
      { id: 'fc6', label: 'Otevřít Inspektor', keys: ['⌘', '4'] },
      { id: 'fc7', label: 'Importovat média', keys: ['⌘', 'I'] }
    ]
  },
  {
    id: 'app_figma',
    name: 'Figma',
    categoryTitle: 'Figma Design',
    accentColor: '#F24E1E',
    iconName: 'LayoutGrid',
    shortcuts: [
      { id: 'fg1', label: 'Nástroj Rám (Frame Tool)', keys: ['F'] },
      { id: 'fg2', label: 'Aplikovat Auto Layout', keys: ['⇧', 'A'] },
      { id: 'fg3', label: 'Vytvořit Komponentu', keys: ['⌥', '⌘', 'K'] },
      { id: 'fg4', label: 'Zrušit skupinu (Ungroup)', keys: ['⌘', '⇧', 'G'] },
      { id: 'fg5', label: 'Zkopírovat vlastnosti stylu', keys: ['⌥', '⌘', 'C'] },
      { id: 'fg6', label: 'Vložit vlastnosti stylu', keys: ['⌥', '⌘', 'V'] },
      { id: 'fg7', label: 'Skrýt / Zobrazit rozvržení UI', keys: ['⌘', '\\'] }
    ]
  },
  {
    id: 'app_blender',
    name: 'Blender 3D',
    categoryTitle: 'Blender 3D Modeling',
    accentColor: '#EA7600',
    iconName: 'Sparkles',
    shortcuts: [
      { id: 'bl1', label: 'Nabídka vyhledávání příkazů', keys: ['F3'] },
      { id: 'bl2', label: 'Přepnout Edit / Object mode', keys: ['Tab'] },
      { id: 'bl3', label: 'Posun objektu (Grab / Move)', keys: ['G'] },
      { id: 'bl4', label: 'Rotace objektu (Rotate)', keys: ['R'] },
      { id: 'bl5', label: 'Změna měřítka (Scale)', keys: ['S'] },
      { id: 'bl6', label: 'Extrudovat plochu / hranu (Extrude)', keys: ['E'] },
      { id: 'bl7', label: 'Přidat nový objekt (Add Menu)', keys: ['⇧', 'A'] },
      { id: 'bl8', label: 'Renderovat scénu', keys: ['F12'] }
    ]
  }
];
