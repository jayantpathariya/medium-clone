/* eslint-disable */
// @ts-nocheck

import Embed from "@editorjs/embed";
import Table from "@editorjs/table";
import List from "@editorjs/list";
import Warning from "@editorjs/warning";
import Code from "@editorjs/code";
import LinkTool from "@editorjs/link";
import Image from "@editorjs/image";
import Raw from "@editorjs/raw";
import Header from "@editorjs/header";
import Quote from "@editorjs/quote";
import Marker from "@editorjs/marker";
import CheckList from "@editorjs/checklist";
import Paragraph from "@editorjs/paragraph";
import { getImageUrl } from "./actions/image.action";

const uploadImageByFile = async (file: File) => {
  try {
    const imageUrl = await getImageUrl(file.type, file.size);

    console.log(imageUrl);

    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        resolve({
          success: 1,
          file: {
            url: e.target?.result,
          },
        });
      };

      reader.readAsDataURL(file);
    });
  } catch (error) {
    console.log(error);
  }
};

const uploadImageByURL = async (e: string) => {
  const imageUrl = await new Promise((resolve, reject) => {
    try {
      resolve(e);
    } catch (error) {
      reject(error);
    }
  });

  return {
    success: 1,
    file: {
      url: imageUrl,
    },
  };
};

export const EDITOR_TOOLS = {
  header: {
    class: Header,
    config: {
      placeholder: "Enter a header",
      levels: [2, 3, 4, 5],
      defaultLevel: 2,
    },
  },
  paragraph: {
    class: Paragraph,
    inlineToolbar: true,
  },
  embed: Embed,
  image: {
    class: Image,
    config: {
      uploader: {
        uploadByUrl: uploadImageByURL,
        uploadByFile: uploadImageByFile,
      },
    },
  },
  code: Code,
  table: Table,
  list: {
    class: List,
    inlineToolbar: true,
  },
  warning: Warning,
  linkTool: LinkTool,
  raw: Raw,
  quote: {
    class: Quote,
    inlineToolbar: true,
  },
  marker: Marker,
  checklist: CheckList,
};
