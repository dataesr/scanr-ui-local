import { Container, Button } from '@dataesr/react-dsfr';
import { Highlight, themes } from 'prism-react-renderer'
import './styles.scss';
import useCopyToClipboard from '../../hooks/useCopyToClipboard';

export type CodeProps = {
  code: string;
  language?: string;
}

export function Code({ code, language = 'jsx' }: CodeProps) {
  const [copyStatus, copy] = useCopyToClipboard()

  return (
    <Container className="code-wrapper" fluid>
      <Highlight theme={themes.github} language={language} code={code}>
        {({ style, tokens, getLineProps, getTokenProps }) => (
          <pre className="highlight" style={style}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
      <Button
        size="sm"
        icon="links-line"
        style={{ position: 'absolute', bottom: '.5rem', right: '.25rem' }}
        onClick={() => copy(code)}
        variant="secondary"
      >
        {copyStatus || 'Copier'}
      </Button>
    </Container>
  )
}
