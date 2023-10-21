import { createContext, useState, useContext, useCallback } from 'react';
import { createPortal } from 'react-dom';
import OpenGraphLinkDialog, {
  type OpenGraphLinkDialogProps,
} from '@/components/Editor/Toolbar/Dialog/OpenGraphLinkDialog';
import LinkDialog, { type LinkDialogProps } from '@/components/Editor/Toolbar/Dialog/LinkDialog';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

interface EditorDialogPayload {
  openGraphLink: OpenGraphLinkDialogProps;
  link: LinkDialogProps;
}

type EditorDialogType = keyof EditorDialogPayload;

interface EditorDialogContextState {
  open: boolean;
  type: EditorDialogType;
  payload: EditorDialogPayload[EditorDialogType];
}

interface EditorDialogContext {
  open: <T extends EditorDialogType>(type: T, payload: EditorDialogPayload[T]) => void;
  close: (type: EditorDialogType) => void;
}

interface EdiotrDialogProviderProps {
  children: React.ReactNode;
}

export const EditorDialogContext = createContext<EditorDialogContext>({
  open(type, payload) {},
  close(type) {},
});

export function EditorDialogContextProvider({ children }: EdiotrDialogProviderProps) {
  const [editor] = useLexicalComposerContext();

  const [dialogState, setDialogState] = useState<EditorDialogContextState>({
    open: false,
    type: 'openGraphLink',
    payload: {} as any,
  });

  const open: EditorDialogContext['open'] = useCallback((type, payload) => {
    setDialogState((prev) => ({
      ...prev,
      open: true,
      type,
      payload,
    }));
  }, []);

  const close: EditorDialogContext['close'] = useCallback(
    (type) => {
      if (dialogState.type === type) {
        setDialogState((prev) => ({
          ...prev,
          open: false,
        }));
      }
    },
    [dialogState.type],
  );

  return (
    <>
      <EditorDialogContext.Provider value={{ open, close }}>
        {children}
        <EditorDialog open={dialogState.open} type={dialogState.type} payload={dialogState.payload} />
      </EditorDialogContext.Provider>
    </>
  );
}

function EditorDialog({ open, type, payload }: EditorDialogContextState) {
  const Dialog = () => {
    switch (type) {
      case 'openGraphLink':
        // const {} = payload as EditorDialogPayload['openGraphLink'];
        return <OpenGraphLinkDialog />;
      case 'link':
        const { linkNodeKey } = payload as EditorDialogPayload['link'];

        return <LinkDialog linkNodeKey={linkNodeKey} />;
    }
  };

  return open ? createPortal(<Dialog />, document.body) : null;
}

export function useEditorDialog() {
  const { open, close } = useContext(EditorDialogContext);

  return { open, close };
}
