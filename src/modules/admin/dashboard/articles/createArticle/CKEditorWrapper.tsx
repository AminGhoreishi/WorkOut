"use client";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import type { CKEditorWrapperProps } from "@/types/blog";

export default function CKEditorWrapper({
  value,
  onChange,
}: CKEditorWrapperProps) {
  const CKEditorComponent = CKEditor as any;
  return (
    <CKEditorComponent
      editor={
        ClassicEditor as unknown as ConstructorParameters<
          typeof import("@ckeditor/ckeditor5-react").CKEditor
        >[0]["editor"]
      }
      data={value}
      onChange={(_: any, editor: any) => onChange(editor.getData())}
      config={{
        licenseKey: "GPL",
        language: "fa",
        toolbar: [
          "heading",
          "|",
          "bold",
          "italic",
          "link",
          "bulletedList",
          "numberedList",
          "|",
          "blockQuote",
          "insertTable",
          "mediaEmbed",
          "|",
          "undo",
          "redo",
        ],
      }}
    />
  );
}
