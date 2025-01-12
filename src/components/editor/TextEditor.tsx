import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";

import { BiBold, BiItalic } from "react-icons/bi";
import { GoListOrdered } from "react-icons/go";
import { GrStrikeThrough } from "react-icons/gr";
import { LuListEnd } from "react-icons/lu";
import { useFormContext } from "react-hook-form";
import { useEffect } from "react";
const Tiptap = ({ desc }: { desc?: string | undefined }) => {
  const { setValue } = useFormContext();

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        orderedList: {
          HTMLAttributes: {
            class: "list-decimal px-4",
          },
        },
        bulletList: {
          HTMLAttributes: {
            class: "list-disc px-4",
          },
        },
      }),
      Image,
    ],
    onUpdate: ({ editor }) => {
      const content = editor.getHTML();
      setValue("desc", content, {
        shouldValidate: true,
        shouldDirty: true,
      });
    },
    editorProps: {
      attributes: {
        class:
          "max-h-[200px] min-h-[80px] overflow-y-scroll w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      },
    },
    content: "",
  });
  useEffect(() => {
    if (editor && desc) {
      editor.commands.setContent(desc);
    }
  }, [editor, desc]);
  return (
    <div>
      <div className="flex items-center gap-x-4 mb-4">
        <button
          type="button"
          aria-label="Toggle bold"
          //   pressed={editor.isActive("bold")}
          onClick={() => editor?.chain().focus().toggleBold().run()}>
          <BiBold className="w-4 h-4" />
        </button>
        <button
          type="button"
          aria-label="Toggle bold"
          onClick={() => editor?.chain().focus().toggleItalic().run()}>
          <BiItalic className="w-4 h-4" />
        </button>
        <button
          type="button"
          aria-label="Toggle bold"
          //   pressed={editor.isActive("bold")}
          onClick={() => editor?.chain().focus().toggleStrike().run()}>
          <GrStrikeThrough className="w-4 h-4" />
        </button>
        <button
          type="button"
          aria-label="Toggle bold"
          //   pressed={editor.isActive("bold")}
          onClick={() => editor?.chain().focus().toggleBulletList().run()}>
          <LuListEnd className="w-4 h-4" />
        </button>
        <button
          type="button"
          aria-label="Toggle bold"
          onClick={() => editor?.chain().focus().toggleOrderedList().run()}>
          <GoListOrdered className="w-4 h-4" />
        </button>
      </div>

      <EditorContent editor={editor} />
    </div>
  );
};

export default Tiptap;
