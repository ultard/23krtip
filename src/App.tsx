import { useState, useRef } from 'react'
import styled from '@emotion/styled'
import html2canvas from 'html2canvas'
import { css } from '@emotion/react'

const Container = styled.div`
  font-family: 'Inter', sans-serif;
  max-width: 600px;
  margin: 40px auto;
  padding: 20px;
  text-align: center;
  background: #1a1a1a;
  color: white;
  border-radius: 16px;
`

const Preview = styled.div`
  position: relative;
  display: inline-block;
  margin: 30px 0;
  box-shadow: 0 10px 30px rgba(0,0,0,0.5);
  border-radius: 8px;
  overflow: hidden;
`

const memeTextCss = css`
  position: absolute;
  left: 0;
  right: 0;
  color: white;
  font-weight: 900;
  font-size: 48px;
  text-transform: uppercase;
  text-shadow:
    -3px -3px 0 #000,
    3px -3px 0 #000,
    -3px 3px 0 #000,
    3px 3px 0 #000,
    -3px 0 0 #000,
    3px 0 0 #000,
    0 -3px 0 #000,
    0 3px 0 #000;
  pointer-events: none;
  text-align: center;
  padding: 0 20px;
  line-height: 1.2;
  letter-spacing: 2px;
  user-select: none;
`

const TopText = styled.div`
  ${memeTextCss};
  top: 20px;
`

const BottomText = styled.div`
  ${memeTextCss};
  bottom: 20px;
`

const Input = styled.input`
  width: 100%;
  padding: 14px;
  margin: 10px 0;
  border: none;
  border-radius: 8px;
  font-size: 18px;
  font-family: 'Inter', sans-serif;
`

const Button = styled.button`
  background: #00ff9d;
  color: #000;
  border: none;
  padding: 14px 32px;
  font-size: 18px;
  font-weight: 700;
  border-radius: 8px;
  cursor: pointer;
  margin: 10px;
  transition: all 0.2s;

  &:hover {
    background: #00cc7a;
    transform: translateY(-2px);
  }
`

function App() {
    const [image, setImage] = useState<string | null>(null)
    const [topText, setTopText] = useState('Когда понял')
    const [bottomText, setBottomText] = useState('что завтра понедельник')
    const previewRef = useRef<HTMLDivElement>(null)

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = () => setImage(reader.result as string)
            reader.readAsDataURL(file)
        }
    }

    const downloadMeme = async () => {
        if (!previewRef.current) return

        const canvas = await html2canvas(previewRef.current, {
            backgroundColor: null,
            scale: 2,
        })
        const link = document.createElement('a')
        link.download = 'meme.png'
        link.href = canvas.toDataURL()
        link.click()
    }

    return (
        <Container>
            <h1>Генератор мемов</h1>

            <div>
                <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                />
            </div>

            <Input
                type="text"
                placeholder="Верхний текст"
                value={topText}
                onChange={(e) => setTopText(e.target.value)}
            />

            <Input
                type="text"
                placeholder="Нижний текст"
                value={bottomText}
                onChange={(e) => setBottomText(e.target.value)}
            />

            {image ? (
                <Preview ref={previewRef}>
                    <img src={image} alt="meme" style={{ maxWidth: '100%', display: 'block' }} />
                    <TopText>{topText}</TopText>
                    <BottomText>{bottomText}</BottomText>
                </Preview>
            ) : (
                <div style={{ color: '#888', margin: '40px' }}>
                    Загрузи картинку, чтобы начать
                </div>
            )}

            <div>
                <Button onClick={downloadMeme} disabled={!image}>
                    Скачать мем
                </Button>
            </div>
        </Container>
    )
}

export default App