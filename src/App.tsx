import logo from './logo.svg'
import './App.css'
import styled from '@emotion/styled'
import Text from './components/shared/Text'
import Button from './components/shared/Button'
import Input from './components/shared/Input'
import TextField from './components/shared/TextField'
import Alert from './components/shared/Alert'
import { useAlertContext } from './contexts/AlertContext'

function App() {
  const { open }: any = useAlertContext()
  return (
    <div>
      <Text typography="t1" display="block" color="red">
        t1
      </Text>
      <Text typography="t2">t2</Text>
      <Text typography="t3">t3</Text>
      <Text typography="t4">t4</Text>
      <Text typography="t5">t5</Text>
      <Button color="success">Primary</Button>
      <Button weak={true}>Success</Button>

      <div
        style={{
          height: 10,
          width: '100%',
          background: '#efefef',
        }}
      >
        <Input placeholder="로그인" aria-invalid={false} />
        <Input aria-invalid={true} />
        <TextField label="이메일" />
        <TextField label="패스워드" hasError={true} />
      </div>
      {/* <Alert
        title="알림"
        description="테스트용"
        onButtonClick={() => {}}
        open={true}
      /> */}
      <Button
        onClick={() => {
          open({
            title: '알림',
            description: '테스트용',
            onButtonClick: () => {},
          })
        }}
      >
        Alert 오픈
      </Button>
    </div>
  )
}

export default App
