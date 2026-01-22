import { TanStackDevtools } from '@tanstack/react-devtools'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type FC,
  type PropsWithChildren,
} from 'react'

interface RootContextValue {
  tanstackDebug: boolean
}

const INIT_ROOTCONTEXT: RootContextValue = {
  tanstackDebug: false,
}

export const RootContext = createContext<RootContextValue>(INIT_ROOTCONTEXT)

export const RootContextProvider: FC<PropsWithChildren<{}>> = (props) => {
  const { children } = props
  const [value, setValue] = useState(INIT_ROOTCONTEXT)

  useEffect(() => {
    const tanstackDebug = localStorage.getItem('tanstackDebug') || ''
    setValue((prev) => ({ ...prev, tanstackDebug: tanstackDebug === 'true' }))
  }, [])

  return (
    <RootContext.Provider value={value}>
      {children}
      {value.tanstackDebug && (
        <TanStackDevtools
          config={{ position: 'bottom-left' }}
          plugins={[
            { name: 'TSK Router', render: <TanStackRouterDevtoolsPanel /> },
          ]}
        />
      )}
    </RootContext.Provider>
  )
}

export const useRootContext = () => {
  try {
    return useContext(RootContext)
  } catch (error) {
    console.warn('RootContext must be used in RootContextProvider')
    return null
  }
}
