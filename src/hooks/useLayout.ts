import { useState } from 'react'
import { LayoutChangeEvent } from 'react-native'

type LayoutState = LayoutChangeEvent['nativeEvent']['layout']

const useLayout = (): [LayoutState, { onLayout: (event: LayoutChangeEvent) => void }] => {
  const [layout, setLayout] = useState<LayoutState>({
    height: 0,
    width: 0,
    x: 0,
    y: 0,
  })

  const bindLayout = {
    onLayout: ({ nativeEvent: { layout } }: LayoutChangeEvent) => setLayout(layout),
  }

  return [layout, bindLayout]
}

export default useLayout
