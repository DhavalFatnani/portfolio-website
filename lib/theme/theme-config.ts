/**
 * Theme configuration
 * Defines color schemes for light and dark modes
 */

export const themeConfig = {
  light: {
    background: '#ffffff',
    foreground: '#0a0a0a',
    primary: '#0a0a0a',
    'primary-foreground': '#ffffff',
    secondary: '#f4f4f5',
    'secondary-foreground': '#18181b',
    accent: '#f4f4f5',
    'accent-foreground': '#18181b',
    muted: '#f4f4f5',
    'muted-foreground': '#71717a',
    border: '#e4e4e7',
    card: '#ffffff',
    'card-foreground': '#0a0a0a',
  },
  dark: {
    background: '#0a0a0a',
    foreground: '#fafafa',
    primary: '#fafafa',
    'primary-foreground': '#0a0a0a',
    secondary: '#27272a',
    'secondary-foreground': '#fafafa',
    accent: '#27272a',
    'accent-foreground': '#fafafa',
    muted: '#27272a',
    'muted-foreground': '#a1a1aa',
    border: '#27272a',
    card: '#18181b',
    'card-foreground': '#fafafa',
  },
} as const

export type Theme = 'light' | 'dark' | 'system'

