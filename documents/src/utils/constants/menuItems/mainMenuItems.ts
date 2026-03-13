import type { IMenuItem } from '@/types/menu'
import { Component, LayoutGrid, LayoutPanelLeft, Puzzle } from 'lucide-react'

export const MAIN_MENUITEMS: IMenuItem[] = [
  {
    key: 'docs',
    label: 'Docs',
    children: [
      { key: 'getting-started', label: 'Getting Started', icon: LayoutGrid },
      { key: 'api-reference', label: 'API Reference', icon: LayoutPanelLeft },
    ],
  },
  {
    key: 'tutorials',
    label: 'Tutorials',
    children: [
      { key: 'beginner', label: 'Beginner', icon: Component },
      { key: 'advanced', label: 'Advanced', icon: Puzzle },
    ],
  },
  {
    key: 'blog',
    label: 'Blog',
    children: [],
  },
  {
    key: 'about',
    label: 'About',
    children: [],
  },
]
