import React, { useState, useEffect, useRef } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react'

import {
  ClassicEditor,
  AccessibilityHelp,
  Alignment,
  Autoformat,
  AutoImage,
  AutoLink,
  Autosave,
  BlockQuote,
  Bold,
  CKBox,
  CKBoxImageEdit,
  CloudServices,
  Code,
  Essentials,
  FindAndReplace,
  FontBackgroundColor,
  FontColor,
  FontFamily,
  FontSize,
  GeneralHtmlSupport,
  Heading,
  Highlight,
  HorizontalLine,
  ImageBlock,
  ImageCaption,
  ImageInline,
  ImageInsert,
  ImageInsertViaUrl,
  ImageResize,
  ImageStyle,
  ImageTextAlternative,
  ImageToolbar,
  ImageUpload,
  Indent,
  IndentBlock,
  Italic,
  Link,
  LinkImage,
  List,
  ListProperties,
  Mention,
  PageBreak,
  Paragraph,
  PasteFromOffice,
  PictureEditing,
  RemoveFormat,
  SelectAll,
  SpecialCharacters,
  SpecialCharactersArrows,
  SpecialCharactersCurrency,
  SpecialCharactersEssentials,
  SpecialCharactersLatin,
  SpecialCharactersMathematical,
  SpecialCharactersText,
  Strikethrough,
  Style,
  Subscript,
  Superscript,
  Table,
  TableCaption,
  TableCellProperties,
  TableColumnResize,
  TableProperties,
  TableToolbar,
  TextTransformation,
  TodoList,
  Underline,
  Undo,
} from 'ckeditor5'
import {
  CaseChange,
  ExportPdf,
  ExportWord,
  FormatPainter,
  ImportWord,
  MergeFields,
  MultiLevelList,
  PasteFromOfficeEnhanced,
  SlashCommand,
  TableOfContents,
  Template,
} from 'ckeditor5-premium-features'

import 'ckeditor5/ckeditor5.css'
import 'ckeditor5-premium-features/ckeditor5-premium-features.css'

import './App.css'

/**
 * Please update the following values with your actual tokens.
 * Instructions on how to obtain them: https://ckeditor.com/docs/trial/latest/guides/real-time/quick-start.html
 */
const LICENSE_KEY =
  'eFE2QUtDZEVneldWQWRXWEZ5OHp4QXhkMTUvaHZBdmFhb3lxYUdDV3ZOcXVWRzRSem82eThrZ0J6Sm9Vd2c9PS1NakF5TkRFeU1qWT0='
const CKBOX_TOKEN_URL =
  'https://117070.cke-cs.com/token/dev/d7yW03KXH8fremOe3Gq2vRaWQjYmHicxgQmA?limit=10'

export default function App({ setDescription, handleEditorReady, data }) {
  const editorContainerRef = useRef(null)
  const editorRef = useRef(null)
  const [isLayoutReady, setIsLayoutReady] = useState(false)

  useEffect(() => {
    setIsLayoutReady(true)

    return () => setIsLayoutReady(false)
  }, [])

  const editorConfig = {
    toolbar: {
      items: [
        'undo',
        'redo',
        '|',
        'insertMergeField',
        'previewMergeFields',
        '|',
        'formatPainter',
        '|',
        'heading',
        'style',
        '|',
        'fontSize',
        'fontFamily',
        'fontColor',
        'fontBackgroundColor',
        '|',
        'bold',
        'italic',
        'underline',
        '|',
        'link',
        'insertImage',
        'insertTable',
        'highlight',
        'blockQuote',
        '|',
        'alignment',
        '|',
        'bulletedList',
        'numberedList',
        'multiLevelList',
        'todoList',
        'outdent',
        'indent',
      ],
      shouldNotGroupWhenFull: false,
    },
    plugins: [
      AccessibilityHelp,
      Alignment,
      Autoformat,
      AutoImage,
      AutoLink,
      Autosave,
      BlockQuote,
      Bold,
      CaseChange,
      CKBox,
      CKBoxImageEdit,
      CloudServices,
      Code,
      Essentials,
      ExportPdf,
      ExportWord,
      FindAndReplace,
      FontBackgroundColor,
      FontColor,
      FontFamily,
      FontSize,
      FormatPainter,
      GeneralHtmlSupport,
      Heading,
      Highlight,
      HorizontalLine,
      ImageBlock,
      ImageCaption,
      ImageInline,
      ImageInsert,
      ImageInsertViaUrl,
      ImageResize,
      ImageStyle,
      ImageTextAlternative,
      ImageToolbar,
      ImageUpload,
      ImportWord,
      Indent,
      IndentBlock,
      Italic,
      Link,
      LinkImage,
      List,
      ListProperties,
      Mention,
      MergeFields,
      MultiLevelList,
      PageBreak,
      Paragraph,
      PasteFromOffice,
      PasteFromOfficeEnhanced,
      PictureEditing,
      RemoveFormat,
      SelectAll,
      SlashCommand,
      SpecialCharacters,
      SpecialCharactersArrows,
      SpecialCharactersCurrency,
      SpecialCharactersEssentials,
      SpecialCharactersLatin,
      SpecialCharactersMathematical,
      SpecialCharactersText,
      Strikethrough,
      Style,
      Subscript,
      Superscript,
      Table,
      TableCaption,
      TableCellProperties,
      TableColumnResize,
      TableOfContents,
      TableProperties,
      TableToolbar,
      Template,
      TextTransformation,
      TodoList,
      Underline,
      Undo,
    ],
    ckbox: {
      tokenUrl: CKBOX_TOKEN_URL,
    },
    exportPdf: {
      stylesheets: [
        /* This path should point to application stylesheets. */
        /* See: https://ckeditor.com/docs/ckeditor5/latest/features/converters/export-pdf.html */
        './App.css',
        /* Export PDF needs access to stylesheets that style the content. */
        'https://cdn.ckeditor.com/ckeditor5/43.0.0/ckeditor5.css',
        'https://cdn.ckeditor.com/ckeditor5-premium-features/43.0.0/ckeditor5-premium-features.css',
      ],
      fileName: 'export-pdf-demo.pdf',
      converterOptions: {
        format: 'Tabloid',
        margin_top: '20mm',
        margin_bottom: '20mm',
        margin_right: '24mm',
        margin_left: '24mm',
        page_orientation: 'portrait',
      },
    },
    exportWord: {
      stylesheets: [
        /* This path should point to application stylesheets. */
        /* See: https://ckeditor.com/docs/ckeditor5/latest/features/converters/export-word.html */
        './App.css',
        /* Export Word needs access to stylesheets that style the content. */
        'https://cdn.ckeditor.com/ckeditor5/43.0.0/ckeditor5.css',
        'https://cdn.ckeditor.com/ckeditor5-premium-features/43.0.0/ckeditor5-premium-features.css',
      ],
      fileName: 'export-word-demo.docx',
      converterOptions: {
        document: {
          orientation: 'portrait',
          size: 'Tabloid',
          margins: {
            top: '20mm',
            bottom: '20mm',
            right: '24mm',
            left: '24mm',
          },
        },
      },
    },
    fontFamily: {
      supportAllValues: true,
    },
    fontSize: {
      options: [10, 12, 14, 'default', 18, 20, 22],
      supportAllValues: true,
    },
    heading: {
      options: [
        {
          model: 'paragraph',
          title: 'Paragraph',
          class: 'ck-heading_paragraph',
        },
        {
          model: 'heading1',
          view: 'h1',
          title: 'Heading 1',
          class: 'ck-heading_heading1',
        },
        {
          model: 'heading2',
          view: 'h2',
          title: 'Heading 2',
          class: 'ck-heading_heading2',
        },
        {
          model: 'heading3',
          view: 'h3',
          title: 'Heading 3',
          class: 'ck-heading_heading3',
        },
        {
          model: 'heading4',
          view: 'h4',
          title: 'Heading 4',
          class: 'ck-heading_heading4',
        },
        {
          model: 'heading5',
          view: 'h5',
          title: 'Heading 5',
          class: 'ck-heading_heading5',
        },
        {
          model: 'heading6',
          view: 'h6',
          title: 'Heading 6',
          class: 'ck-heading_heading6',
        },
      ],
    },
    htmlSupport: {
      allow: [
        {
          name: /^.*$/,
          styles: true,
          attributes: true,
          classes: true,
        },
      ],
    },
    image: {
      resizeOptions: [
        {
          name: 'resizeImage:original',
          label: 'Original size',
          value: null,
        },
        {
          name: 'resizeImage:50',
          label: '50%',
          value: '50',
        },
        {
          name: 'resizeImage:75',
          label: '75%',
          value: '75',
        },
      ],
      toolbar: [
        'toggleImageCaption',
        'imageTextAlternative',
        '|',
        'imageStyle:inline',
        'imageStyle:wrapText',
        'imageStyle:breakText',
        '|',
        'ckboxImageEdit',
        'imageStyle:full',
        'imageStyle:side',
        'resizeImage',
      ],
      styles: ['alignLeft', 'alignCenter', 'alignRight'],
    },
    initialData: data,
    licenseKey: LICENSE_KEY,
    link: {
      addTargetToExternalLinks: true,
      defaultProtocol: 'https://',
      decorators: {
        toggleDownloadable: {
          mode: 'manual',
          label: 'Downloadable',
          attributes: {
            download: 'file',
          },
        },
      },
    },
    list: {
      properties: {
        styles: true,
        startIndex: true,
        reversed: true,
      },
    },
    mention: {
      feeds: [
        {
          marker: '@',
          feed: [
            /* See: https://ckeditor.com/docs/ckeditor5/latest/features/mentions.html */
          ],
        },
      ],
    },
    menuBar: {
      isVisible: true,
    },
    mergeFields: {
      /* Read more: https://ckeditor.com/docs/ckeditor5/latest/features/merge-fields.html#configuration */
    },
    placeholder: 'Type or paste your content here!',
    style: {
      definitions: [
        {
          name: 'Article category',
          element: 'h3',
          classes: ['category'],
        },
        {
          name: 'Title',
          element: 'h2',
          classes: ['document-title'],
        },
        {
          name: 'Subtitle',
          element: 'h3',
          classes: ['document-subtitle'],
        },
        {
          name: 'Info box',
          element: 'p',
          classes: ['info-box'],
        },
        {
          name: 'Side quote',
          element: 'blockquote',
          classes: ['side-quote'],
        },
        {
          name: 'Marker',
          element: 'span',
          classes: ['marker'],
        },
        {
          name: 'Spoiler',
          element: 'span',
          classes: ['spoiler'],
        },
        {
          name: 'Code (dark)',
          element: 'pre',
          classes: ['fancy-code', 'fancy-code-dark'],
        },
        {
          name: 'Code (bright)',
          element: 'pre',
          classes: ['fancy-code', 'fancy-code-bright'],
        },
      ],
    },
    table: {
      contentToolbar: [
        'tableColumn',
        'tableRow',
        'mergeTableCells',
        'tableProperties',
        'tableCellProperties',
      ],
    },
    template: {
      definitions: [
        {
          title: 'Introduction',
          description: 'Simple introduction to an article',
          icon: '<svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">\n    <g id="icons/article-image-right">\n        <rect id="icon-bg" width="45" height="45" rx="2" fill="#A5E7EB"/>\n        <g id="page" filter="url(#filter0_d_1_507)">\n            <path d="M9 41H36V12L28 5H9V41Z" fill="white"/>\n            <path d="M35.25 12.3403V40.25H9.75V5.75H27.7182L35.25 12.3403Z" stroke="#333333" stroke-width="1.5"/>\n        </g>\n        <g id="image">\n            <path id="Rectangle 22" d="M21.5 23C21.5 22.1716 22.1716 21.5 23 21.5H31C31.8284 21.5 32.5 22.1716 32.5 23V29C32.5 29.8284 31.8284 30.5 31 30.5H23C22.1716 30.5 21.5 29.8284 21.5 29V23Z" fill="#B6E3FC" stroke="#333333"/>\n            <path id="Vector 1" d="M24.1184 27.8255C23.9404 27.7499 23.7347 27.7838 23.5904 27.9125L21.6673 29.6268C21.5124 29.7648 21.4589 29.9842 21.5328 30.178C21.6066 30.3719 21.7925 30.5 22 30.5H32C32.2761 30.5 32.5 30.2761 32.5 30V27.7143C32.5 27.5717 32.4391 27.4359 32.3327 27.3411L30.4096 25.6268C30.2125 25.451 29.9127 25.4589 29.7251 25.6448L26.5019 28.8372L24.1184 27.8255Z" fill="#44D500" stroke="#333333" stroke-linejoin="round"/>\n            <circle id="Ellipse 1" cx="26" cy="25" r="1.5" fill="#FFD12D" stroke="#333333"/>\n        </g>\n        <rect id="Rectangle 23" x="13" y="13" width="12" height="2" rx="1" fill="#B4B4B4"/>\n        <rect id="Rectangle 24" x="13" y="17" width="19" height="2" rx="1" fill="#B4B4B4"/>\n        <rect id="Rectangle 25" x="13" y="21" width="6" height="2" rx="1" fill="#B4B4B4"/>\n        <rect id="Rectangle 26" x="13" y="25" width="6" height="2" rx="1" fill="#B4B4B4"/>\n        <rect id="Rectangle 27" x="13" y="29" width="6" height="2" rx="1" fill="#B4B4B4"/>\n        <rect id="Rectangle 28" x="13" y="33" width="16" height="2" rx="1" fill="#B4B4B4"/>\n    </g>\n    <defs>\n        <filter id="filter0_d_1_507" x="9" y="5" width="28" height="37" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\n            <feFlood flood-opacity="0" result="BackgroundImageFix"/>\n            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>\n            <feOffset dx="1" dy="1"/>\n            <feComposite in2="hardAlpha" operator="out"/>\n            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.29 0"/>\n            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_507"/>\n            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_507" result="shape"/>\n        </filter>\n    </defs>\n</svg>\n',
          data: "<h2>Introduction</h2><p>In today's fast-paced world, keeping up with the latest trends and insights is essential for both personal growth and professional development. This article aims to shed light on a topic that resonates with many, providing valuable information and actionable advice. Whether you're seeking to enhance your knowledge, improve your skills, or simply stay informed, our comprehensive analysis offers a deep dive into the subject matter, designed to empower and inspire our readers.</p>",
        },
      ],
    },
  }

  configUpdateAlert(editorConfig)

  return (
    <div>
      <div className='main-container'>
        <div
          className='editor-container editor-container_classic-editor editor-container_include-style'
          ref={editorContainerRef}
        >
          <div className='editor-container__editor'>
            <div ref={editorRef}>
              {isLayoutReady && (
                <CKEditor
                  editor={ClassicEditor}
                  config={editorConfig}
                  // data={data}
                  onChange={(event, editor) => {
                    const data = editor.getData()
                    setDescription(data)
                  }}
                  /** ADAPTADOR PARA MANEJO INTERNO DE LAS IMAGENES **/
                  // onReady={handleEditorReady}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * This function exists to remind you to update the config needed for premium features.
 * The function can be safely removed. Make sure to also remove call to this function when doing so.
 */
function configUpdateAlert(config) {
  if (configUpdateAlert.configUpdateAlertShown) {
    return
  }

  const isModifiedByUser = (currentValue, forbiddenValue) => {
    if (currentValue === forbiddenValue) {
      return false
    }

    if (currentValue === undefined) {
      return false
    }

    return true
  }

  const valuesToUpdate = []

  configUpdateAlert.configUpdateAlertShown = true

  if (!isModifiedByUser(config.licenseKey, '<YOUR_LICENSE_KEY>')) {
    valuesToUpdate.push('LICENSE_KEY')
  }

  if (!isModifiedByUser(config.ckbox?.tokenUrl, '<YOUR_CKBOX_TOKEN_URL>')) {
    valuesToUpdate.push('CKBOX_TOKEN_URL')
  }

  if (valuesToUpdate.length) {
    window.alert(
      [
        'Please update the following values in your editor config',
        'in order to receive full access to the Premium Features:',
        '',
        ...valuesToUpdate.map((value) => ` - ${value}`),
      ].join('\n')
    )
  }
}
