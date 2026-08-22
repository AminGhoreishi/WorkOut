export interface IranPayamakSamplePayload {
  text: string;
  recipients: string[];
  line_number: string;
  number_format?: string;
}

export interface IranPayamakPatternPayload {
  code: string;
  attributes: Record<string, string>;
  recipient: string;
  line_number: string;
  number_format?: string;
}

