import { theme } from '@/utils/theme'
import { ThemeProvider } from '@mui/material'
import {
  createContext,
  useCallback,
  useContext,
  useState,
  type FC,
  type PropsWithChildren,
} from 'react'

type AppContextState = {
  themeMode: 'light' | 'dark'
}

type AppContextActions = {
  onChangeThemeMode: (mode: 'light' | 'dark') => void
}

export type AppContextProps = AppContextState & AppContextActions

const INIT_APPCONTEXT: AppContextProps = {
  themeMode: 'dark',
  onChangeThemeMode: () => {},
}

export const AppContext = createContext<AppContextProps>(INIT_APPCONTEXT)

export const AppContextProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  const [state, setState] = useState<AppContextState>(INIT_APPCONTEXT)

  const onChangeThemeMode = useCallback(
    (mode: 'light' | 'dark') => {
      setState((prev) => ({ ...prev, themeMode: mode }))
    },
    [state.themeMode],
  )

  return (
    <AppContext.Provider value={{ ...state, onChangeThemeMode }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </AppContext.Provider>
  )
}

export const useAppContext = () => {
  try {
    return useContext(AppContext)
  } catch (error) {
    console.warn('AppContext must be used in AppContextProvider')
    return null
  }
}
