export interface Section {
  id: string | '',
  label: string,
  description: string | null,
  fields: Field[],
}

export interface Field {
  id: string | '',
  label: string,
  placeholder: string,
  description: string | null,
  value: any | any[] | null,
  type: string,
  required: boolean,
  disabled: boolean,
  size: number,
  settings: Settings,
  options: Option[] | [],
}

export interface Option {
  id: string,
  option: any,
  selected: boolean,
}

export interface Settings {
  file_upload_settings: UploadSetting | null
}


export interface UploadSetting {
  restricted: boolean,
  extensions: FileExtenstion[],
  number_of_files: number,
  max_size: number,
}

export interface FileExtenstion {
  value: string,
  label: string,
  selected: boolean
}

export const DefaultFileExtenstions: FileExtenstion[] = [
  {
      value: '.doc, .docx',
      label: 'Document',
      selected: false
  },
  {
      value: '.csv, .xlsx',
      label: 'Spreadsheet',
      selected: false
  },
  {
      value: '.pdf',
      label: 'PDF',
      selected: false
  },
  {
      value: '.ppt, .pptx',
      label: 'Powerpoint',
      selected: false
  },
  {
      value: 'video/*',
      label: 'Video',
      selected: false
  },
  {
      value: 'image/*',
      label: 'Image',
      selected: false
  },
] 