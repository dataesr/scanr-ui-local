import { useState } from 'react';
import { LiveProvider, LiveEditor, LivePreview, LiveError } from 'react-live';
import { ButtonGroup, Button } from '@dataesr/react-dsfr';
import { themes } from 'prism-react-renderer';
import useCopyToClipboard from '../../hooks/useCopyToClipboard';
import './styles.scss';

export type PlaygroundProps = {
  code: string;
  scope: Record<string, unknown>;
  defaultShowCode?: boolean;
}

const Playground = ({ code, scope, defaultShowCode = false }: PlaygroundProps) => {
  const [copyStatus, copy] = useCopyToClipboard()
  const [editor, setEditor] = useState(defaultShowCode);

  return (
    <LiveProvider code={code} scope={scope}>
      <div className="playground-wrappers fr-mb-2w">
        <LivePreview className="playground-preview" />
        <LiveError />
        <ButtonGroup style={{ position: 'absolute', bottom: 0, left: '.5rem', right: '.5rem' }}>
          <Button
            className='fr-mb-1v'
            size="sm"
            icon="code-s-slash-line"
            variant="text"
            onClick={() => setEditor((prev) => !prev)}
          >
            {editor ? "Masquer l'éditeur de code" : "Afficher l'éditeur de code"}
          </Button>
        </ButtonGroup>
      </div>
      {editor && (<div className="playground-wrappers">
        <Button
          size="sm"
          icon="links-line"
          style={{ position: 'absolute', bottom: '.25rem', right: '.25rem' }}
          onClick={() => copy(code)}
        >
          {copyStatus || 'Copier'}
        </Button>
        <LiveEditor className="playground-editor" theme={themes.github} />
      </div>)}
    </LiveProvider>
  );
};

export default Playground;