'use client';

import { ListItemNode, ListNode } from '@lexical/list';
import { INSERT_ORDERED_LIST_COMMAND, INSERT_UNORDERED_LIST_COMMAND } from '@lexical/list';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { HeadingNode } from '@lexical/rich-text';
import { $getSelection, $isRangeSelection, FORMAT_TEXT_COMMAND, type EditorState } from 'lexical';
import { BoldIcon, ItalicIcon, ListIcon, ListOrderedIcon, UnderlineIcon } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

function ToolbarButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onMouseDown={(e) => {
        e.preventDefault();
        onClick();
      }}
      className={cn(
        'flex items-center justify-center h-11 w-11 rounded-md transition-colors',
        active ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted',
      )}
    >
      {children}
    </button>
  );
}

function Toolbar() {
  const [editor] = useLexicalComposerContext();
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          setIsBold(selection.hasFormat('bold'));
          setIsItalic(selection.hasFormat('italic'));
          setIsUnderline(selection.hasFormat('underline'));
        }
      });
    });
  }, [editor]);

  return (
    <div className="flex items-center gap-0.5 border-b px-2 py-1">
      <ToolbarButton active={isBold} onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold')}>
        <BoldIcon className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton active={isItalic} onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic')}>
        <ItalicIcon className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton active={isUnderline} onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline')}>
        <UnderlineIcon className="h-4 w-4" />
      </ToolbarButton>
      <div className="w-px h-5 bg-border mx-1" />
      <ToolbarButton active={false} onClick={() => editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined)}>
        <ListIcon className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton active={false} onClick={() => editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined)}>
        <ListOrderedIcon className="h-4 w-4" />
      </ToolbarButton>
    </div>
  );
}

interface Props {
  onChange: (json: string) => void;
}

const theme = {
  text: {
    bold: 'font-bold',
    italic: 'italic',
    underline: 'underline',
  },
  list: {
    ul: 'list-disc ml-4',
    ol: 'list-decimal ml-4',
    listitem: 'ml-2',
  },
};

export function RichTextEditor({ onChange }: Props) {
  const initialConfig = {
    namespace: 'PostEditor',
    theme,
    nodes: [HeadingNode, ListNode, ListItemNode],
    onError: (error: Error) => console.error(error),
  };

  const handleChange = useCallback(
    (editorState: EditorState) => {
      onChange(JSON.stringify(editorState.toJSON()));
    },
    [onChange],
  );

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="rounded-lg border bg-white overflow-hidden">
        <Toolbar />
        <div className="relative">
          <RichTextPlugin
            contentEditable={
              <ContentEditable className="min-h-30 max-h-75 overflow-y-auto px-3 py-2 text-sm outline-none" />
            }
            placeholder={
              <div className="pointer-events-none absolute top-2 left-3 text-sm text-muted-foreground">
                Escribí el contenido de la noticia...
              </div>
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
        </div>
        <HistoryPlugin />
        <ListPlugin />
        <OnChangePlugin onChange={handleChange} />
      </div>
    </LexicalComposer>
  );
}
