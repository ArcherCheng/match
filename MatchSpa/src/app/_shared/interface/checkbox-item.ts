export class CheckboxItem {
  keySeq: number;
  keyValue: string;
  keyLabel: string;
  isChecked: boolean;
  constructor(keySeq: any, keyValue: any, isChecked?: boolean, keyLable?: string) {
    this.keySeq = keySeq;
    this.keyValue = keyValue,
    this.isChecked = isChecked ? isChecked : false;
    this.keyLabel = keyLable ? keyLable : keyValue;
  }
}
