import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

// Configuration des formats et modules Quill
const modules = {
  toolbar: {
    container: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'link'],
      [{ 'list': 'bullet' }],
      ['code'],
    ],
  },
  clipboard: {
    matchers: [],
  },
};

const formats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'link',
  'list',
  'bullet',
  'code',
];

// Personnalisation du CSS de Quill pour correspondre au Figma
const QuillStyles = () => (
  <style jsx global>{`
    .rich-text-editor .ql-snow {
      border: 1px solid #e5e7eb;
      border-radius: 0.5rem;
      background: white;
    }
    .rich-text-editor .ql-snow .ql-toolbar {
      border: none;
      border-bottom: 1px solid #e5e7eb;
      border-radius: 0.5rem 0.5rem 0 0;
      padding: 0.5rem;
      background: white;
    }
    .rich-text-editor .ql-snow .ql-container {
      border: none;
      border-radius: 0 0 0.5rem 0.5rem;
      font-family: "Olympic_sans", sans-serif;
    }
    .rich-text-editor .ql-snow .ql-editor {
      padding: 1rem;
      font-size: 1rem;
      line-height: 1.6;
      color: #1f2937;
      min-height: 250px;
    }
    .rich-text-editor .ql-snow .ql-editor::before {
      color: #9ca3af;
      font-style: italic;
    }
    .rich-text-editor .ql-snow .ql-formats {
      display: flex;
      flex-wrap: wrap;
      gap: 0.25rem;
      font-family: "Olympic_sans", sans-serif;
    }
    .rich-text-editor .ql-snow .ql-formats button {
      font-family: "Olympic_sans", sans-serif;
      font-size: 0.875rem;
      padding: 0.375rem 0.75rem;
      border: 1px solid #d1d5db;
      border-radius: 0.375rem;
      background: white;
      color: #374151;
      display: flex;
      align-items: center;
      gap: 0.25rem;
    }
    .rich-text-editor .ql-snow .ql-formats button:hover {
      background: #f3f4f6;
      border-color: #9ca3af;
    }
    .rich-text-editor .ql-snow .ql-formats button.ql-active {
      background: #0284c7;
      border-color: #0284c7;
      color: white;
    }
    .rich-text-editor .ql-snow .ql-formats button svg {
      display: none;
    }
    .rich-text-editor .ql-snow .ql-formats button::before {
      content: attr(data-label);
    }
    .rich-text-editor .ql-snow .ql-header[value="1"] { --label: "Titre 1"; }
    .rich-text-editor .ql-snow .ql-header[value="2"] { --label: "Titre 2"; }
    .rich-text-editor .ql-snow .ql-header[value=""] { --label: "Normal"; }
    .rich-text-editor .ql-snow .ql-bold { --label: "Gras"; }
    .rich-text-editor .ql-snow .ql-italic { --label: "Italique"; }
    .rich-text-editor .ql-snow .ql-underline { --label: "Souligné"; }
    .rich-text-editor .ql-snow .ql-strike { --label: "Barré"; }
    .rich-text-editor .ql-snow .ql-blockquote { --label: "Citation"; }
    .rich-text-editor .ql-snow .ql-link { --label: "Lien"; }
    .rich-text-editor .ql-snow .ql-list[value="bullet"] { --label: "Liste à puces"; }
    .rich-text-editor .ql-snow .ql-code { --label: "Code"; }
    .rich-text-editor .ql-snow button::before {
      content: var(--label);
    }
    .rich-text-editor .ql-snow .ql-picker {
      font-family: "Olympic_sans", sans-serif;
    }
    .rich-text-editor .ql-snow .ql-picker-label::before {
      font-family: "Olympic_sans", sans-serif;
    }
    .rich-text-editor .ql-snow .ql-stroke {
      stroke: #1f2937;
    }
    .rich-text-editor .ql-snow .ql-fill {
      fill: #1f2937;
    }
    .rich-text-editor .ql-snow .ql-active .ql-stroke {
      stroke: #0284c7;
    }
    .rich-text-editor .ql-snow .ql-active .ql-fill {
      fill: #0284c7;
    }
  `}</style>
);

const RichTextEditor = ({ value, onChange, placeholder = "Commencez à écrire votre article..." }) => {
  return (
    <div className="rich-text-editor">
      <QuillStyles />
      <ReactQuill
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
        theme="snow"
      />
    </div>
  );
};

export default RichTextEditor;
