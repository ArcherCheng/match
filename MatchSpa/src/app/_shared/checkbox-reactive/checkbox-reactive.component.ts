import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { CheckboxItem } from '../interface/checkbox-item';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-checkbox-reactive',
  templateUrl: './checkbox-reactive.component.html',
  styleUrls: ['./checkbox-reactive.component.css']
})

export class CheckboxReactiveComponent implements OnInit, OnChanges {
  @Input() options = Array<CheckboxItem>();
  @Input() selectedValues = Array<string>();
  @Output() toggle = new EventEmitter<any[]>();

  checkboxFormArray = new FormGroup({
    items: new FormArray([])
  });

  get items(): FormArray {
    return this.checkboxFormArray.get('items') as FormArray;
  }

  constructor() { }

  ngOnInit() {
    this.checkboxFormArray.valueChanges.subscribe(value => {
      const optionsChecked = new Array<any>();
      for (let index = 0; index < this.items.length; index++) {
        const isOptionChecked = this.items.get(index.toString()).value;
        if (isOptionChecked) {
          const currentOptionValue = this.options[index].keyValue;
          optionsChecked.push(currentOptionValue);
        }
      }
      this.toggle.emit(optionsChecked);
    });
  }

  ngOnChanges(): void {
    if (this.items.length === 0 ) {
      this.options.forEach(x => {
        this.items.push(new FormControl(false));
      });
    }

    this.selectedValues.forEach(value => {
      const index: number = this.options.findIndex(opt => opt.keyValue === value);
      if (index >= 0 ) {
        this.items.get(index.toString()).setValue(true);
      }
    });
  }

}
