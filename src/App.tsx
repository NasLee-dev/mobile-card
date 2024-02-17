import logo from './logo.svg'
import './App.css'
import styled from '@emotion/styled'
import Text from './components/shared/Text'
import Button from './components/shared/Button'

function App() {
  return (
    <div>
      <Text typography="t1" display="block" color="red">
        t1
      </Text>
      <Text typography="t2">t2</Text>
      <Text typography="t3">t3</Text>
      <Text typography="t4">t4</Text>
      <Text typography="t5">t5</Text>

      <div
        style={{
          height: 10,
          width: '100%',
          background: '#efefef',
        }}
      >
        <Button color="success">Primary</Button>
        <Button weak={true}>Success</Button>
      </div>
    </div>
  )
}

export default App
